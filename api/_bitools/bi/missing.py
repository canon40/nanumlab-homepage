"""누락 글 찾기 — 글 제목으로 검색해 내 글이 나오는지. 네이버 공식 저품질 판정이 아니라 추정이다."""
from __future__ import annotations

from typing import Callable

from .feeds import Post
from .rank import post_id


def check(posts: list[Post], search: Callable[[str], list[dict]]) -> list[dict]:
    out = []
    for p in posts:
        pid = post_id(p.link)
        row = {"title": p.title, "link": p.link, "date": p.date.isoformat() if p.date else None}
        try:
            items = search(p.title)
        except Exception as e:  # 키 없음·네트워크 오류
            row.update(status="unknown", note=str(e)[:200])
            out.append(row)
            continue
        hit = next((i for i, it in enumerate(items, 1) if pid and post_id(it.get("link", "")) == pid), None)
        if hit:
            row.update(status="shown", rank=hit, note=f"제목 검색 {hit}위에 보입니다.")
        else:
            row.update(status="missing", note=f"제목 검색 상위 {len(items)}개 안에 이 글이 없습니다.")
        out.append(row)
    return out
