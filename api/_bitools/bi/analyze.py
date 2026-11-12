"""블로그 지표 계산과 점수. 점수는 이 도구의 자체 기준이며 네이버 공식 지수가 아니다."""
from __future__ import annotations

import re
from collections import Counter
from datetime import datetime, timezone

from .feeds import Post

_WORD = re.compile(r"[가-힣A-Za-z]{2,}")
_STOP = {"이렇게", "그리고", "자주", "정말", "제대로", "쉽게", "간단", "하는", "있는", "방법", "정리", "후기", "이유", "가지", "에서", "으로"}


def _words(title: str) -> set[str]:
    return {w for w in _WORD.findall(title) if w not in _STOP}


def topic_focus(titles: list[str]) -> float:
    """가장 많이 나온 단어 3개 중 하나라도 들어간 제목의 비율."""
    if not titles:
        return 0.0
    cnt = Counter(w for t in titles for w in _words(t))
    top = {w for w, _ in cnt.most_common(3)}
    if not top:
        return 0.0
    return sum(1 for t in titles if _words(t) & top) / len(titles)


def metrics(posts: list[Post], now: datetime | None = None) -> dict:
    now = now or datetime.now(timezone.utc)
    dated = sorted([p for p in posts if p.date], key=lambda p: p.date, reverse=True)
    m = {"post_count": len(posts), "days_since_last": None, "avg_gap_days": None,
         "posts_30d": 0, "avg_title_len": 0.0, "avg_images": 0.0, "topic_focus": 0.0,
         "top_words": []}
    if not posts:
        return m
    if dated:
        m["days_since_last"] = round((now - dated[0].date).total_seconds() / 86400, 2)
        m["posts_30d"] = sum(1 for p in dated if (now - p.date).days < 30)
        if len(dated) > 1:
            span = (dated[0].date - dated[-1].date).total_seconds() / 86400
            m["avg_gap_days"] = round(span / (len(dated) - 1), 2)
    m["avg_title_len"] = round(sum(len(p.title) for p in posts) / len(posts), 1)
    m["avg_images"] = round(sum(p.images for p in posts) / len(posts), 1)
    titles = [p.title for p in posts]
    m["topic_focus"] = round(topic_focus(titles), 2)
    m["top_words"] = [w for w, _ in Counter(w for t in titles for w in _words(t)).most_common(5)]
    return m


def _clip(x: float, lo: float = 0, hi: float = 1) -> float:
    return max(lo, min(hi, x))


def score(m: dict) -> dict:
    items = []

    def add(key, label, value, pts, mx, reason):
        items.append({"key": key, "label": label, "value": value,
                      "points": round(pts), "max": mx, "reason": reason})

    if m["post_count"] == 0:
        for key, label, mx in [("recent", "최근 활동", 25), ("cadence", "발행 꾸준함", 25),
                               ("focus", "주제 집중도", 20), ("title", "제목 길이", 15), ("images", "이미지", 15)]:
            add(key, label, None, 0, mx, "읽을 수 있는 글이 없습니다.")
        return {"items": items, "total": 0, "level": 1}

    d = m["days_since_last"]
    if d is None:
        add("recent", "최근 활동", None, 0, 25, "발행일을 읽지 못했습니다.")
    else:
        add("recent", "최근 활동", d, 25 * _clip(1 - (d - 2) / 28), 25,
            (f"마지막 글이 {d:.0f}일 전입니다." if d >= 1 else "마지막 글이 오늘 올라왔습니다.") + " 2일 이내면 만점, 30일 지나면 0점.")

    g = m["avg_gap_days"]
    if g is None:
        add("cadence", "발행 꾸준함", None, 0, 25, "글이 1개뿐이라 간격을 잴 수 없습니다.")
    else:
        add("cadence", "발행 꾸준함", g, 25 * _clip(1 - (g - 1) / 13), 25,
            f"평균 {g:.1f}일마다 1개 발행. 하루 1개면 만점, 14일 이상이면 0점.")

    f = m["topic_focus"]
    add("focus", "주제 집중도", f, 20 * _clip((f - 0.2) / 0.6), 20,
        f"제목의 {f * 100:.0f}%가 자주 쓰는 단어({', '.join(m['top_words'][:3]) or '-'})를 포함. 80% 이상이면 만점.")

    t = m["avg_title_len"]
    tp = 15 if 15 <= t <= 40 else 15 * _clip(1 - min(abs(t - 15), abs(t - 40)) / 20)
    add("title", "제목 길이", t, tp, 15, f"평균 {t:.0f}자. 15~40자면 만점.")

    im = m["avg_images"]
    add("images", "이미지", im, 15 * _clip(im / 3), 15,
        f"RSS 요약 기준 글당 이미지 {im:.1f}장. 3장 이상이면 만점 (네이버 RSS는 첫 이미지만 보이는 경우가 많음).")

    total = int(round(sum(it["points"] for it in items)))
    total = max(0, min(100, total))
    level = max(1, min(10, total // 10 + 1))
    return {"items": items, "total": total, "level": level}


def analyze_posts(posts: list[Post], now: datetime | None = None) -> dict:
    m = metrics(posts, now)
    return {"metrics": m, "score": score(m)}
