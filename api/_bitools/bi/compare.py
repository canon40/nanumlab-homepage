"""내 원고 ↔ 키워드 상위 글 비교. 네이버 검색 API 결과(제목·요약·날짜)만 쓴다 (본문 수집 안 함)."""
from __future__ import annotations

import re
from collections import Counter
from datetime import datetime

_WORD = re.compile(r"[가-힣A-Za-z0-9]{2,}")
_STOP = {"방법", "정리", "후기", "이유", "가지", "하는", "있는", "그리고", "이렇게", "총정리", "추천", "꿀팁", "까지", "으로"}


def _words(text: str) -> list[str]:
    out = []
    for w in _WORD.findall(text):
        w = re.sub(r"(으로|에서|에게|까지|부터|이랑|하고|은|는|이|가|을|를|의|에|도|로|와|과)$", "", w)
        if len(w) >= 2 and w not in _STOP:
            out.append(w)
    return out


def compare(title: str, body: str, keyword: str, top: list[dict], today: str | None = None) -> dict:
    n = len(top)
    kw_words = set(_words(keyword))
    res = {"count": n, "kw_in_title_ratio": 0.0, "top_title_len_avg": 0.0, "my_title_len": len(title.strip()),
           "recent_ratio": 0.0, "missing_words": [], "top": [], "tips": []}
    if not n:
        res["tips"] = ["비교할 상위 글을 가져오지 못했습니다."]
        return res
    kw = keyword.strip()
    res["kw_in_title_ratio"] = round(sum(1 for t in top if kw and kw.replace(" ", "") in t["title"].replace(" ", "")) / n, 2)
    res["top_title_len_avg"] = round(sum(len(t["title"]) for t in top) / n, 1)
    now = datetime.strptime(today or datetime.now().strftime("%Y%m%d"), "%Y%m%d")
    recent = 0
    for t in top:
        try:
            if (now - datetime.strptime(t.get("postdate", ""), "%Y%m%d")).days <= 90:
                recent += 1
        except ValueError:
            pass
    res["recent_ratio"] = round(recent / n, 2)

    # 상위 글 제목·요약에 여러 번 나오는데 내 글에는 없는 단어 (키워드 단어 제외)
    df = Counter()
    for t in top:
        df.update(set(_words(t["title"] + " " + t.get("description", ""))))
    mine = set(_words(title + " " + body))
    missing = [{"word": w, "in_top": c} for w, c in df.most_common(40)
               if c >= max(2, n // 4) and w not in mine and w not in kw_words][:10]
    res["missing_words"] = missing
    res["top"] = [{"rank": i, "title": t["title"], "link": t.get("link"), "postdate": t.get("postdate")}
                  for i, t in enumerate(top[:10], 1)]

    tips = []
    if kw and kw.replace(" ", "") not in title.replace(" ", "") and res["kw_in_title_ratio"] >= 0.5:
        tips.append(f"상위 글 {round(res['kw_in_title_ratio'] * 100)}%가 제목에 '{kw}'를 넣었습니다. 내 제목에도 넣어 보세요.")
    gap = res["my_title_len"] - res["top_title_len_avg"]
    if abs(gap) >= 10:
        tips.append(f"상위 글 제목은 평균 {res['top_title_len_avg']:.0f}자, 내 제목은 {res['my_title_len']}자입니다.")
    if missing:
        tips.append("상위 글에 자주 나오는데 내 글에 없는 말: " + ", ".join(m["word"] for m in missing[:6])
                    + ". 내용에 맞는 것만 자연스럽게 다뤄 보세요.")
    if res["recent_ratio"] >= 0.6:
        tips.append("상위 글 대부분이 최근 90일 안의 글입니다. 새 글이 잘 올라오는 키워드입니다.")
    elif res["recent_ratio"] <= 0.2:
        tips.append("상위 글 대부분이 오래된 글입니다. 자리가 잘 바뀌지 않는 키워드일 수 있습니다.")
    res["tips"] = tips or ["상위 글과 비교해 크게 다른 점이 없습니다."]
    return res
