"""블로그 단위 저품질 '추정' 요약 — 누락 점검 결과를 모아 본다. 네이버 공식 판정이 아니다."""
from __future__ import annotations

NOTE = "네이버 공식 판정이 아니라 제목 검색 결과로 본 추정입니다."


def summarize(rows: list[dict]) -> dict:
    shown = sum(1 for r in rows if r.get("status") == "shown")
    miss = sum(1 for r in rows if r.get("status") == "missing")
    unk = sum(1 for r in rows if r.get("status") == "unknown")
    checked = shown + miss
    if checked == 0:
        return {"level": "unknown", "ratio": None, "shown": shown, "missing": miss, "unknown": unk,
                "text": f"확인한 글이 없어 판단을 보류합니다. {NOTE}"}
    ratio = miss / checked
    if ratio >= 0.5:
        lv, msg = "suspect", f"확인한 글 {checked}개 중 {miss}개가 제목 검색에서 보이지 않습니다. 며칠 뒤 다시 재서 계속 그렇다면 최근 글의 반복 문구·외부 링크·같은 사진 재사용을 점검해 보세요."
    elif ratio >= 0.2:
        lv, msg = "caution", f"확인한 글 {checked}개 중 {miss}개가 보이지 않습니다. 발행 직후 글은 늦게 잡히기도 하니 하루 이틀 뒤 다시 확인하세요."
    else:
        lv, msg = "normal", f"확인한 글 {checked}개 중 {shown}개가 제목 검색에 보입니다."
    return {"level": lv, "ratio": round(ratio, 2), "shown": shown, "missing": miss, "unknown": unk,
            "text": f"{msg} {NOTE}"}
