"""블로그 단위 저품질 '추정' 요약 — 누락 점검 결과를 모아 본다. 네이버 공식 판정이 아니다."""
from __future__ import annotations

NOTE = "네이버 공식 판정이 아니라 제목 검색 결과로 본 추정입니다."


WEB_NOTE = ("티스토리·블로거 글은 네이버 웹문서 검색에 거의 잡히지 않아 이 방법으로는 저품질을 판단할 수 없습니다. "
            "구글 서치 콘솔의 '페이지 색인 생성'에서 색인된 글 수를 확인하세요.")


def summarize(rows: list[dict], kind: str = "naver") -> dict:
    shown = sum(1 for r in rows if r.get("status") == "shown")
    miss = sum(1 for r in rows if r.get("status") == "missing")
    unk = sum(1 for r in rows if r.get("status") == "unknown")
    checked = shown + miss
    if kind != "naver":
        # 2026-11-16: 티스토리·블로거가 100% 누락 → '저품질 의심'으로 떠서 오해를 샀다. 네이버 블로그만 판정한다.
        return {"level": "unknown", "ratio": None, "shown": shown, "missing": miss, "unknown": unk,
                "text": f"{WEB_NOTE} (참고: 네이버 웹문서 검색 노출 {shown}편 · 안 보임 {miss}편)"}
    if checked == 0:
        return {"level": "unknown", "ratio": None, "shown": shown, "missing": miss, "unknown": unk,
                "text": f"확인한 글이 없어 판단을 보류합니다. {NOTE}"}
    ratio = miss / checked
    # 2026-11-16: 예전 글 누락까지 한 비율로 섞어 '저품질 의심'이 계속 떴다. 블로그 전체가 막혔는지는 최근 글로 본다.
    dated = sorted((r for r in rows if r.get("date") and r.get("status") in ("shown", "missing")),
                   key=lambda r: r["date"], reverse=True)[:5]
    if len(dated) >= 3:
        r_miss = sum(1 for r in dated if r["status"] == "missing")
        base = {"ratio": round(ratio, 2), "shown": shown, "missing": miss, "unknown": unk,
                "recent": len(dated), "recent_missing": r_miss}
        if r_miss <= 1:
            if ratio < 0.2:
                return {**base, "level": "normal",
                        "text": f"최근 글 {len(dated)}편 중 {len(dated) - r_miss}편이 제목 검색에 보이고, 확인한 글 {checked}개 중 {shown}개가 보입니다. {NOTE}"}
            return {**base, "level": "caution",
                    "text": (f"블로그 전체 저품질은 아닙니다 — 최근 글 {len(dated)}편 중 {len(dated) - r_miss}편이 제목 검색에 보입니다. "
                             f"다만 예전 글 {miss}개가 하나씩 검색에서 빠져 있습니다(판박이 제목, 같은 날 비슷한 주제를 몰아 쓴 글에 많음). "
                             f"빠진 글은 시간이 지나도 잘 돌아오지 않으니, 앞으로 쓰는 글의 제목을 구체적으로 쓰는 것이 중요합니다. {NOTE}")}
        if r_miss >= 3:
            return {**base, "level": "suspect",
                    "text": (f"최근 글 {len(dated)}편 중 {r_miss}편이 제목 검색에 보이지 않습니다. 블로그 전체가 검색에서 밀렸을 수 있습니다. "
                             f"며칠 발행을 쉬고 다시 재 보세요. {NOTE}")}
    if ratio >= 0.5:
        lv, msg = "suspect", f"확인한 글 {checked}개 중 {miss}개가 제목 검색에서 보이지 않습니다. 며칠 뒤 다시 재서 계속 그렇다면 최근 글의 반복 문구·외부 링크·같은 사진 재사용을 점검해 보세요."
    elif ratio >= 0.2:
        lv, msg = "caution", f"확인한 글 {checked}개 중 {miss}개가 보이지 않습니다. 발행 직후 글은 늦게 잡히기도 하니 하루 이틀 뒤 다시 확인하세요."
    else:
        lv, msg = "normal", f"확인한 글 {checked}개 중 {shown}개가 제목 검색에 보입니다."
    return {"level": lv, "ratio": round(ratio, 2), "shown": shown, "missing": miss, "unknown": unk,
            "text": f"{msg} {NOTE}"}
