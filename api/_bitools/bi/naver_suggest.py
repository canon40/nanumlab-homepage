"""네이버 검색 자동완성 (스튜디오 post_score.suggest 와 같은 호출, 2026-11-16 공개 스튜디오용).

제목을 자동완성 키워드로 시작하면 사람들이 실제로 치는 말과 맞출 수 있다. 키 필요 없음.
"""
from __future__ import annotations

import re
import time

import requests

_CACHE: dict[str, tuple[float, list[str]]] = {}


def suggest(q: str) -> list[str]:
    q = re.sub(r"\s+", " ", q).strip()[:40]
    if not q:
        return []
    hit = _CACHE.get(q)
    if hit and time.time() - hit[0] < 86400:
        return hit[1]
    try:
        r = requests.get(
            "https://ac.search.naver.com/nx/ac",
            params={"q": q, "con": 0, "frm": "nv", "ans": 2, "r_format": "json", "r_enc": "UTF-8",
                    "r_unicode": 0, "t_koreng": 1, "run": 2, "rev": 4, "q_enc": "UTF-8", "st": 100},
            headers={"User-Agent": "Mozilla/5.0"}, timeout=8)
        items = r.json().get("items") or [[]]
        s = [x[0] for x in items[0] if x][:10]
    except Exception:
        return []
    if len(_CACHE) > 5000:
        _CACHE.clear()
    _CACHE[q] = (time.time(), s)
    return s
