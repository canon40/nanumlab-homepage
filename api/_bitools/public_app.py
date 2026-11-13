# -*- coding: utf-8 -*-
"""nanumlab.store/tools 공개용 API (Vercel 파이썬 함수).

로컬 server.py 와 달리:
- 사장님 채널 목록·기록(대시보드)·영상·이미지 만들기는 없다.
- 방문자가 넣은 블로그 ID만 분석한다 (형식 검사는 feeds.rss_url).
- 한 IP당 하루 사용 횟수를 제한한다 (서버 인스턴스별 메모리라 대략적인 제한).
- 키는 Vercel 환경변수 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET / NAVER_AD_* 에만 둔다.
"""
from __future__ import annotations

import time
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

from bi import analyze, compare, draft, feeds, lowq, missing, naver_api, rank, searchad

P = "/api/tools"
app = FastAPI(title="블로그 진단실 (공개)", docs_url=None, redoc_url=None, openapi_url=None)

# 하루 한도 (IP당). 검색 API 소모가 큰 기능일수록 낮게.
LIMITS = {"analyze": 40, "rank": 15, "missing": 5, "lowq": 5, "draft": 60, "compare": 20, "keywords": 20}
_USED: dict[tuple[str, str, str], int] = defaultdict(int)
KINDS = {"naver", "tistory", "blogger"}


def _ip(req: Request) -> str:
    fwd = req.headers.get("x-forwarded-for", "")
    return (fwd.split(",")[0].strip() or (req.client.host if req.client else "")) or "?"


def limit(req: Request, kind: str) -> None:
    day = time.strftime("%Y-%m-%d")
    key = (_ip(req), kind, day)
    if _USED[key] >= LIMITS[kind]:
        raise HTTPException(429, f"오늘 이 기능은 {LIMITS[kind]}번까지 쓸 수 있습니다. 내일 다시 이용해 주세요.")
    _USED[key] += 1


def _target(kind: str | None, name: str | None) -> tuple[str, str]:
    k, n = (kind or "naver").strip(), (name or "").strip()
    try:  # 블로그 주소를 붙여 넣은 경우 종류·ID 자동 인식
        auto_k, n = feeds.split_target(n)
        k = auto_k or k
    except ValueError as e:
        raise HTTPException(400, str(e))
    if k not in KINDS:
        raise HTTPException(400, "블로그 종류는 네이버·티스토리·블로거만 됩니다.")
    try:
        feeds.rss_url(k, n)
    except ValueError as e:
        raise HTTPException(400, str(e))
    return k, n


def _posts(k: str, n: str, timeout: int = 15):
    try:
        return feeds.fetch_posts(k, n, timeout=timeout)
    except Exception:
        raise HTTPException(502, "블로그 RSS를 읽지 못했습니다. ID가 맞는지, RSS가 공개돼 있는지 확인해 주세요.")


@app.get(P + "/channels")
def channels():
    return {"channels": [], "naver_keys": naver_api.has_keys(), "ad_keys": searchad.has_keys(), "public": True}


@app.get(P + "/analyze")
def api_analyze(req: Request, kind: str | None = None, name: str | None = None):
    k, n = _target(kind, name)
    limit(req, "analyze")
    posts = _posts(k, n)
    res = analyze.analyze_posts(posts)
    res["posts"] = [p.to_dict() for p in posts]
    res["history"] = []
    return res


class RankReq(BaseModel):
    keyword: str
    kind: str | None = "naver"
    name: str | None = None


def _score(bid: str) -> int | None:
    try:
        return analyze.analyze_posts(feeds.fetch_posts("naver", bid, timeout=8))["score"]["total"]
    except Exception:
        return None


@app.post(P + "/rank")
def api_rank(req: Request, body: RankReq):
    k, n = _target(body.kind, body.name)
    kw = body.keyword.strip()[:40]
    if not kw:
        raise HTTPException(400, "키워드를 넣어 주세요.")
    if not naver_api.has_keys():
        raise HTTPException(428, "지금은 순위 확인을 쓸 수 없습니다 (서버 설정 준비 중).")
    limit(req, "rank")
    try:
        items = naver_api.search(kw, kind="blog" if k == "naver" else "webkr", display=100)
    except Exception:
        raise HTTPException(502, "네이버 검색 결과를 가져오지 못했습니다. 잠시 뒤 다시 시도해 주세요.")
    my_key = f"{k}:{n}"
    my_rank = rank.find_rank(items, my_key)
    top = [{"rank": i, "title": it.get("title"), "link": it.get("link"), "blogger": it.get("bloggername") or "",
            "owner": rank.owner_key(it.get("link", ""))} for i, it in enumerate(items[:10], 1)]
    if k == "naver":
        ids = [t["owner"].split(":", 1)[1] for t in top if t["owner"] and t["owner"].startswith("naver:")]
        with ThreadPoolExecutor(8) as ex:
            scores = dict(zip(ids, ex.map(_score, ids + [n])))
        my_score = _score(n) if n not in scores else scores[n]
        for t in top:
            if t["owner"] and t["owner"].startswith("naver:"):
                t["score"] = scores.get(t["owner"].split(":", 1)[1])
        rivals = [t["score"] for t in top if t.get("score") is not None and t["owner"] != my_key]
        v = rank.verdict(my_rank, my_score or 0, rivals) if my_score is not None else \
            {"status": "unknown", "text": "내 블로그 점수를 잴 수 없어 판정을 보류합니다."}
    else:
        my_score = None
        v = ({"status": "page1", "text": f"웹문서 1페이지 {my_rank}위입니다."} if my_rank and my_rank <= 10 else
             {"status": "unknown", "text": "티스토리·블로거는 웹문서 순위만 확인합니다 (점수 비교 없음)."})
    return {"keyword": kw, "target": my_key, "my_rank": my_rank, "my_score": my_score,
            "searched": len(items), "top": top, "verdict": v}


class MissingReq(BaseModel):
    kind: str | None = "naver"
    name: str | None = None
    count: int = 10


def _missing(req: Request, body: MissingReq, kind: str) -> dict:
    k, n = _target(body.kind, body.name)
    if not naver_api.has_keys():
        raise HTTPException(428, "지금은 누락 확인을 쓸 수 없습니다 (서버 설정 준비 중).")
    limit(req, kind)
    posts = _posts(k, n)[: max(1, min(body.count, 15))]
    api_kind = "blog" if k == "naver" else "webkr"
    rows = missing.check(posts, lambda q: naver_api.search(q, kind=api_kind, display=30))
    for r in rows:  # 내부 오류 문구는 숨긴다
        if r["status"] == "unknown":
            r["note"] = "검색 결과를 가져오지 못했습니다."
    summary = {s: sum(1 for r in rows if r["status"] == s) for s in ("shown", "missing", "unknown")}
    return {"target": f"{k}:{n}", "rows": rows, "summary": summary}


@app.post(P + "/missing")
def api_missing(req: Request, body: MissingReq):
    return _missing(req, body, "missing")


@app.post(P + "/lowq")
def api_lowq(req: Request, body: MissingReq):
    body.count = 15
    res = _missing(req, body, "lowq")
    return {**res, "lowq": lowq.summarize(res["rows"])}


class DraftReq(BaseModel):
    title: str = ""
    body: str = ""
    keyword: str = ""


@app.post(P + "/draft")
def api_draft(req: Request, body: DraftReq):
    if not body.title.strip() and not body.body.strip():
        raise HTTPException(400, "제목이나 본문을 넣어 주세요.")
    if len(body.body) > 30000:
        raise HTTPException(400, "본문은 3만 자까지 점검할 수 있습니다.")
    limit(req, "draft")
    res = draft.check(body.title[:200], body.body, body.keyword[:40])
    res["compare"], res["compare_note"] = None, ""
    kw = body.keyword.strip()[:40]
    if kw and naver_api.has_keys():
        try:
            limit(req, "compare")
            top = naver_api.search(kw, kind="blog", display=10)
            res["compare"] = compare.compare(body.title[:200], body.body, kw, top)
        except HTTPException:
            res["compare_note"] = "오늘 상위 글 비교 횟수를 다 썼습니다. 내일 다시 이용해 주세요."
        except Exception:
            res["compare_note"] = "상위 글을 가져오지 못했습니다. 잠시 뒤 다시 시도해 주세요."
    elif kw:
        res["compare_note"] = "상위 글 비교는 준비 중입니다."
    return res


class KeywordReq(BaseModel):
    hints: list[str]


@app.post(P + "/keywords")
def api_keywords(req: Request, body: KeywordReq):
    hints = [h.strip()[:30] for h in body.hints if h.strip()][:5]
    if not hints:
        raise HTTPException(400, "키워드를 1~5개 넣어 주세요.")
    if not searchad.has_keys():
        raise HTTPException(428, "지금은 키워드 조회를 쓸 수 없습니다 (서버 설정 준비 중).")
    limit(req, "keywords")
    try:
        return {"hints": hints, "rows": searchad.keyword_tool(hints)}
    except Exception:
        raise HTTPException(502, "키워드 정보를 가져오지 못했습니다. 잠시 뒤 다시 시도해 주세요.")
