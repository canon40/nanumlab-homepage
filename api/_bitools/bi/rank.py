"""검색 결과에서 블로그 주인 찾기, 순위, 진입 판정."""
from __future__ import annotations

import re
from urllib.parse import parse_qs, urlparse


def _naver_parts(link: str) -> tuple[str | None, str | None]:
    u = urlparse(link)
    host = (u.hostname or "").lower()
    if host.endswith("blog.me"):
        parts = [p for p in u.path.split("/") if p]
        return host.split(".")[0], (parts[0] if parts else None)
    if host not in ("blog.naver.com", "m.blog.naver.com"):
        return None, None
    q = parse_qs(u.query)
    if "blogId" in q:
        return q["blogId"][0], (q.get("logNo") or [None])[0]
    parts = [p for p in u.path.split("/") if p]
    if not parts:
        return None, None
    return parts[0], (parts[1] if len(parts) > 1 else None)


def owner_key(link: str) -> str | None:
    host = (urlparse(link).hostname or "").lower()
    bid, _ = _naver_parts(link)
    if bid:
        return f"naver:{bid}"
    if host.endswith(".tistory.com"):
        return f"tistory:{host.split('.')[0]}"
    if host.endswith(".blogspot.com"):
        return f"blogger:{host.split('.')[0]}"
    return None


def post_id(link: str) -> str | None:
    bid, log_no = _naver_parts(link)
    if bid:
        return f"naver:{bid}/{log_no}" if log_no else None
    key = owner_key(link)
    if not key:
        return None
    path = urlparse(link).path.rstrip("/")
    m = re.search(r"/(\d+)$", path) if key.startswith("tistory") else None
    return f"{key}/{m.group(1) if m else path.lstrip('/')}"


def find_rank(items: list[dict], my_key: str) -> int | None:
    for i, it in enumerate(items, 1):
        if owner_key(it.get("link", "")) == my_key:
            return i
    return None


def verdict(my_rank: int | None, my_score: int, rival_scores: list[int]) -> dict:
    """우리 점수 기준의 참고 판정. 확률이나 보장이 아니다."""
    if my_rank is not None and my_rank <= 10:
        return {"status": "page1", "text": f"이미 1페이지 {my_rank}위에 있습니다. 판정 대신 현재 순위를 보여 드립니다."}
    if not rival_scores:
        return {"status": "unknown", "text": "1페이지 블로그 점수를 잴 수 없어 판정을 보류합니다."}
    s = sorted(rival_scores)
    cut = s[len(s) // 2]  # 1페이지 블로그 점수의 중간값
    low = s[0]
    if my_score >= cut:
        st, txt = "possible", f"내 점수 {my_score}점이 1페이지 중간값 {cut}점 이상입니다. 글 품질이 받쳐 주면 도전해 볼 만합니다."
    elif my_score >= low:
        st, txt = "close", f"내 점수 {my_score}점은 1페이지 최저 {low}점과 중간값 {cut}점 사이입니다."
    else:
        st, txt = "hard", f"내 점수 {my_score}점이 1페이지 최저 {low}점보다 낮습니다. 경쟁이 덜한 키워드를 권합니다."
    return {"status": st, "text": txt, "cutline": cut, "lowest": low}
