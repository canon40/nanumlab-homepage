"""공개 RSS 읽기 — 네이버 블로그·티스토리·블로거."""
from __future__ import annotations

import html as _html
import re
import xml.etree.ElementTree as ET
from dataclasses import dataclass, asdict
from datetime import datetime
from email.utils import parsedate_to_datetime

import requests

UA = {"User-Agent": "Mozilla/5.0 (blog-inspector local tool)"}

CHANNELS = [
    {"id": "naver:hymini1", "kind": "naver", "name": "hymini1", "label": "네이버 · hymini1"},
    {"id": "naver:selfcoat", "kind": "naver", "name": "selfcoat", "label": "네이버 · selfcoat (hymini11)"},
    {"id": "naver:a-easy", "kind": "naver", "name": "a-easy", "label": "네이버 · a-easy"},
    {"id": "tistory:hymini1", "kind": "tistory", "name": "hymini1", "label": "티스토리 · hymini1"},
    {"id": "blogger:permacoatkorea", "kind": "blogger", "name": "permacoatkorea", "label": "블로거 · permacoatkorea"},
    {"id": "blogger:canon4041", "kind": "blogger", "name": "canon4041", "label": "블로거 · canon4041"},
]


@dataclass
class Post:
    title: str
    link: str
    date: datetime | None
    images: int
    text: str

    def to_dict(self) -> dict:
        d = asdict(self)
        d["date"] = self.date.isoformat() if self.date else None
        return d


_NAME = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{1,39}$")


def rss_url(kind: str, name: str) -> str:
    # 블로그 ID 로 주소를 만들므로 형식을 엄격히 검사한다 (다른 사이트 호출 방지)
    if not _NAME.match(name or ""):
        raise ValueError("블로그 ID는 영문·숫자·-·_ 2~40자만 됩니다.")
    if kind == "naver":
        return f"https://rss.blog.naver.com/{name}.xml"
    if kind == "tistory":
        return f"https://{name}.tistory.com/rss"
    if kind == "blogger":
        return f"https://{name}.blogspot.com/feeds/posts/default?alt=rss&max-results=50"
    raise ValueError(f"모르는 채널 종류: {kind}")


_IMG = re.compile(r"<img\b", re.I)
_TAG = re.compile(r"<[^>]+>")


def _text(el, tag: str) -> str:
    x = el.find(tag)
    return (x.text or "").strip() if x is not None else ""


def parse_rss(xml_text: str) -> list[Post]:
    root = ET.fromstring(xml_text.strip().encode("utf-8"))
    out: list[Post] = []
    for it in root.iter("item"):
        desc = _text(it, "description")
        if "&lt;" in desc:  # 블로거는 HTML을 한 번 더 이스케이프
            desc = _html.unescape(desc)
        try:
            dt = parsedate_to_datetime(_text(it, "pubDate"))
        except Exception:
            dt = None
        out.append(Post(
            title=_html.unescape(_text(it, "title")),
            link=_text(it, "link"),
            date=dt,
            images=len(_IMG.findall(desc)),
            text=re.sub(r"\s+", " ", _TAG.sub(" ", desc)).strip()[:400],
        ))
    return out


def fetch_posts(kind: str, name: str, timeout: int = 20) -> list[Post]:
    r = requests.get(rss_url(kind, name), headers=UA, timeout=timeout)
    r.raise_for_status()
    r.encoding = r.encoding or "utf-8"
    return parse_rss(r.text)


UNSUPPORTED = ("지원하지 않는 주소입니다. 네이버 블로그(blog.naver.com/아이디), 티스토리(아이디.tistory.com), "
               "블로거(아이디.blogspot.com) 주소나 블로그 ID를 넣어 주세요.")


def split_target(text: str) -> tuple[str | None, str]:
    """입력이 블로그 주소면 (종류, ID)로 바꾼다. 그냥 ID면 (None, ID). 다른 사이트 주소면 ValueError."""
    t = (text or "").strip()
    if not re.search(r"[./:]", t):
        return None, t
    from .rank import owner_key  # 순환 import 방지
    url = t if re.match(r"https?://", t, re.I) else "https://" + t
    key = owner_key(url)
    if not key:
        raise ValueError(UNSUPPORTED)
    kind, name = key.split(":", 1)
    return kind, name


def find_channel(cid: str) -> dict | None:
    return next((c for c in CHANNELS if c["id"] == cid), None)
