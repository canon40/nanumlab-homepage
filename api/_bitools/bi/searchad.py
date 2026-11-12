"""네이버 검색광고 API — 키워드 도구(연관 키워드·월간 검색량·경쟁도).

키(엔진 .env): NAVER_AD_CUSTOMER_ID, NAVER_AD_API_KEY(액세스라이선스), NAVER_AD_SECRET(비밀키)
발급: searchad.naver.com → 도구 → API 사용 관리. 키워드 조회만 하고 광고·입찰은 바꾸지 않는다.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import os
import time

import requests

from .naver_api import _env_file_value

BASE = "https://api.searchad.naver.com"


def keys() -> tuple[str, str, str]:
    g = lambda n: os.getenv(n) or _env_file_value(n)  # noqa: E731
    return g("NAVER_AD_CUSTOMER_ID"), g("NAVER_AD_API_KEY"), g("NAVER_AD_SECRET")


def has_keys() -> bool:
    return all(keys())


def signature(ts: str, method: str, uri: str, secret: str) -> str:
    msg = f"{ts}.{method}.{uri}".encode()
    return base64.b64encode(hmac.new(secret.encode(), msg, hashlib.sha256).digest()).decode()


def _num(v) -> float:
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip()
    if s.startswith("<"):
        return 5.0  # "< 10" → 대략 5
    try:
        return float(s.replace(",", ""))
    except ValueError:
        return 0.0


COMP = {"낮음": 1.0, "중간": 2.0, "높음": 3.0}


def normalize(rows: list[dict]) -> list[dict]:
    out = []
    for r in rows:
        pc, mo = _num(r.get("monthlyPcQcCnt")), _num(r.get("monthlyMobileQcCnt"))
        total = pc + mo
        comp = r.get("compIdx") or "-"
        clicks = _num(r.get("monthlyAvePcClkCnt")) + _num(r.get("monthlyAveMobileClkCnt"))
        out.append({
            "keyword": r.get("relKeyword"), "pc": int(pc), "mobile": int(mo), "total": int(total),
            "comp": comp, "ad_depth": _num(r.get("plAvgDepth")), "ad_clicks": round(clicks, 1),
            # 기회 점수: 검색량은 많고 광고 경쟁은 낮을수록 높다 (이 도구의 참고값)
            "opportunity": round(total / COMP.get(comp, 2.0) / (1 + _num(r.get("plAvgDepth")) / 10)),
        })
    return out


def keyword_tool(hints: list[str]) -> list[dict]:
    cust, api_key, secret = keys()
    if not (cust and api_key and secret):
        raise RuntimeError("네이버 검색광고 API 키가 없습니다. 엔진 .env 에 NAVER_AD_CUSTOMER_ID / NAVER_AD_API_KEY / NAVER_AD_SECRET 을 넣어 주세요.")
    uri, ts = "/keywordstool", str(int(time.time() * 1000))
    hint = ",".join(h.replace(" ", "") for h in hints if h.strip())[:200]
    r = requests.get(BASE + uri, params={"hintKeywords": hint, "showDetail": 1}, timeout=15, headers={
        "X-Timestamp": ts, "X-API-KEY": api_key, "X-Customer": str(cust),
        "X-Signature": signature(ts, "GET", uri, secret)})
    if r.status_code != 200:
        raise RuntimeError(f"검색광고 API 오류 {r.status_code}: {r.text[:150]}")
    return normalize(r.json().get("keywordList") or [])
