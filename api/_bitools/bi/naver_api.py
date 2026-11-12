"""네이버 검색 API (공식). 키는 엔진 .env의 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET."""
from __future__ import annotations

import html
import os
import re
from pathlib import Path

import requests

ENGINE = Path(r"D:\@code\gemini+chatgpt")
_TAG = re.compile(r"<[^>]+>")


class KeyMissing(RuntimeError):
    pass


def _env_file_value(name: str) -> str:
    f = ENGINE / ".env"
    if not f.is_file():
        return ""
    for ln in f.read_text(encoding="utf-8", errors="replace").splitlines():
        if ln.strip().startswith(name + "="):
            return ln.split("=", 1)[1].strip().strip("'\"")
    return ""


def keys() -> tuple[str, str]:
    cid = os.getenv("NAVER_CLIENT_ID") or _env_file_value("NAVER_CLIENT_ID")
    sec = os.getenv("NAVER_CLIENT_SECRET") or _env_file_value("NAVER_CLIENT_SECRET")
    return cid, sec


def has_keys() -> bool:
    return all(keys())


def search(query: str, kind: str = "blog", display: int = 100, start: int = 1) -> list[dict]:
    """kind: blog | webkr. 결과 item: title, link, description, bloggername, bloggerlink, postdate."""
    cid, sec = keys()
    if not (cid and sec):
        raise KeyMissing("네이버 검색 API 키가 없습니다. 엔진 .env 에 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 을 넣어 주세요.")
    r = requests.get(f"https://openapi.naver.com/v1/search/{kind}.json",
                     headers={"X-Naver-Client-Id": cid, "X-Naver-Client-Secret": sec},
                     params={"query": query, "display": min(display, 100), "start": start, "sort": "sim"},
                     timeout=15)
    if r.status_code != 200:
        raise RuntimeError(f"네이버 API 오류 {r.status_code}: {r.text[:150]}")
    items = r.json().get("items") or []
    for it in items:
        for k in ("title", "description"):
            it[k] = html.unescape(_TAG.sub("", it.get(k, "")))
    return items
