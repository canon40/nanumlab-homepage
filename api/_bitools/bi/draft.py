"""발행 전 원고 점검. 이 도구의 자체 기준이며 노출을 약속하지 않는다."""
from __future__ import annotations

import re
import sys

from .naver_api import ENGINE

# 표시광고법상 문제 될 수 있는 표현 (최상급·단정·보장)
CLAIM_WORDS = ["최고", "최상", "최초", "1위", "일등", "넘버원", "100%", "완벽", "보장", "영구", "무조건",
               "부작용 없", "부작용이 없", "즉시 효과", "기적", "유일", "특효", "절대"]
_HEAD = re.compile(r"^\s*(#{1,4}\s|■|▶|\[\s*\d|\d+[.)]\s|<h[2-4])", re.M)
_IMG = re.compile(r"<img\b|!\[|\[사진\]|\[이미지\]", re.I)


def _lint(text: str) -> dict | None:
    try:  # 배포본: 같은 폴더에 복사된 korean_lint
        from . import korean_lint as kl  # type: ignore[attr-defined]
        return kl.check(text)
    except Exception:
        pass
    try:
        if str(ENGINE) not in sys.path:
            sys.path.append(str(ENGINE))
        import korean_lint  # 엔진 모듈 (읽기만)
        return korean_lint.check(text)
    except Exception:
        return None


def check(title: str, body: str, keyword: str = "") -> dict:
    title, body, kw = title.strip(), body.strip(), keyword.strip()
    plain = re.sub(r"<[^>]+>", " ", body)
    items = []

    def add(key, label, status, detail, weight):
        items.append({"key": key, "label": label, "status": status, "detail": detail, "weight": weight})

    tl = len(title)
    add("title_len", "제목 길이", "ok" if 15 <= tl <= 40 else "warn", f"{tl}자 (15~40자 권장)", 10)

    if kw:
        add("kw_title", "제목에 키워드", "ok" if kw in title else "bad",
            "제목에 들어 있습니다." if kw in title else f"제목에 '{kw}'가 없습니다.", 15)
        n = plain.count(kw)
        per_k = n / max(1, len(plain) / 1000)
        st = "bad" if n == 0 or per_k > 8 else ("warn" if n < 2 else "ok")
        dens = f" (1000자당 {per_k:.1f}번)" if len(plain) >= 1000 else ""
        msg = (f"본문에 {n}번{dens}. " +
               ("반복이 많아 억지로 넣은 글처럼 보일 수 있습니다." if per_k > 8 else
                "본문에 키워드가 없습니다." if n == 0 else "2~8번 정도면 자연스럽습니다."))
        add("kw_body", "본문 키워드", st, msg, 15)
    else:
        add("kw_title", "제목에 키워드", "warn", "키워드를 넣으면 같이 확인합니다.", 15)
        add("kw_body", "본문 키워드", "warn", "키워드를 넣으면 같이 확인합니다.", 15)

    ln = len(re.sub(r"\s", "", plain))
    add("length", "본문 분량", "ok" if ln >= 1500 else ("warn" if ln >= 800 else "bad"),
        f"공백 빼고 {ln}자 (1500자 이상 권장)", 15)

    hc = len(_HEAD.findall(body))
    add("headings", "소제목", "ok" if hc >= 3 else ("warn" if hc >= 1 else "bad"),
        f"{hc}개 (3개 이상이면 읽기 쉽습니다. ##, ■, 1. 로 시작하는 줄을 셉니다)", 10)

    ic = len(_IMG.findall(body))
    add("images", "이미지 표시", "ok" if ic >= 3 else "warn",
        f"{ic}개 확인 ([사진], <img>, ![] 표시를 셉니다. 붙여 넣을 때 사진이 빠지면 0개로 보일 수 있습니다)", 10)

    found = [w for w in CLAIM_WORDS if w in title + " " + plain]
    add("claims", "광고 표현", "bad" if found else "ok",
        ("고칠 표현: " + ", ".join(found) + " — 근거 없는 최상급·보장 표현은 표시광고법 문제가 될 수 있습니다.")
        if found else "최상급·보장 표현이 없습니다.", 15)

    lint = _lint(plain)
    if lint:
        g = lint["grade"]
        tops = ", ".join(h[1] for h in lint["hits"][:4]) or "-"
        add("style", "문장 자연스러움", {"A": "ok", "B": "ok", "C": "warn"}.get(g, "bad"),
            f"{g}등급 (기계적 문체 신호: {tops})", 10)
    else:
        add("style", "문장 자연스러움", "warn", "문체 검사 모듈을 불러오지 못했습니다.", 10)

    pts = {"ok": 1.0, "warn": 0.5, "bad": 0.0}
    total = round(sum(it["weight"] * pts[it["status"]] for it in items))
    return {"items": items, "total": max(0, min(100, total))}
