# -*- coding: utf-8 -*-
"""한국어 AI 문체 검사 — korean-skills:humanizer 스킬의 40개 패턴 중 기계로 잡을 수 있는 것 (2026-10-29).

사용자 요청: "글쓰기에도 동영상 만들기에도 내가 사용하는 모든 곳에 사용을 해야해".
Claude Code 세션에서는 humanizer 스킬을 직접 쓰고, 자동 글쓰기(write_posts_claude·Gemini 경로)와
발행 게이트·영상 나레이션은 이 모듈로 같은 기준을 적용한다.

심각도와 등급은 스킬 정의를 그대로 따른다.
  S1: 한 번만 나와도 신호 / S2: 3회 이상 반복이면 신호 / S3: 약한 신호
  A: S1 0 + S2 ≤2 / B: S1 1~2 또는 S2 3~5 / C: S1 3+ 또는 S2 6+ / D: S1 5+ 그리고 S2 8+
발행 게이트는 C·D 를 막고(고쳐 쓰기), A·B 는 통과시킨다.

  python korean_lint.py 글.md [글2.md ...]
"""
from __future__ import annotations

import re
import statistics
import sys

# (이름, 정규식, 심각도) — S2 는 3회 이상일 때만 센다
S1_PATTERNS: list[tuple[str, str]] = [
    ("'~에 있어(서)' 격식 차용", r"에 있어(서)?\s"),
    ("'가지고 있다' 잉여 동사", r"(을|를) 가지고 있(다|습니다|어요|는)"),
    ("이중 피동 '~되어지다'", r"되어지|되어진|되어졌"),
    ("AI 유행어(중요·핵심적·효과적·다양한·필수적·지속가능·혁신적)",
     r"중요합니다|중요하다|중요한 (것|점)|핵심적|효과적|다양한|필수적|지속 ?가능|혁신적"),
    ("AI 결말 관용구", r"결론적으로|시사하는 바|주목할 만|본질적으로|핵심적으로|요약하자면"),
    ("AI 결말 공식", r"지금이야말로|할 때입니다|할 때다\b|할 시점입니다|할 시점이다"),
    ("다중 가능 표현 '~할 수 있을 것'", r"수 있을 것"),
    ("추상 주어 + 만능 동사", r"(이러한|이런|이) \S+(은|는) [^.!?\n]{0,25}(가져옵|가져온|일으킵|이끕|이끌어|제공합)"),
    ("AI 상투 도입", r"알아보겠습니다|살펴보겠습니다|에 대해 알아보|하시기 바랍니다"),
]
S2_PATTERNS: list[tuple[str, str]] = [
    ("'~에 대해(서)' 남발", r"에 대해(서)?\s"),
    ("'~를 통해' 남발", r"(을|를) 통해|(을|를) 통하여"),
    ("'~와 관련하여/관련된'", r"(와|과) 관련(하여|된|해)"),
    ("'~에 기반/바탕으로'", r"에 기반|(을|를) 바탕으로"),
    ("'~에 의해' 영어식 피동", r"에 의해"),
    ("'~할 수 있다' 남발", r"수 있(다|습니다|어요|는)"),
    ("'~을 위해' 목적절 남발", r"(을|를) 위해"),
    ("'~라는 점에서'", r"(라는|다는) 점에서"),
    ("'~것이다' 미래 단정", r"것(이다|입니다)"),
    ("hype 어휘", r"획기적|압도적|치명적|전례 없는|강력한|파격적|엄청난|놀라운"),
    ("'~적 N' 추상 체인", r"\S+적 \S+적"),
    ("지시관형사 '이러한/이와 같은'", r"이러한|이와 같은|그러한"),
]
_CONNECTIVE_COMMA = re.compile(r"(고|어서|아서|지만|면서|는데|은데|며),")

# 글쓰기 프롬프트에 넣는 규칙 — 쓰는 단계에서 미리 피하게
PROMPT_RULES = (
    "한국어 문체(humanizer 기준) — 아래는 AI가 쓴 티가 나는 표현이라 쓰지 않는다.\n"
    "- '~에 있어서', '~을 가지고 있다', '~되어지다', '결론적으로', '지금이야말로', '~할 수 있을 것이다'\n"
    "- 중요하다·핵심적·효과적·다양한·필수적·혁신적 같은 뭉뚱그린 말 대신 구체적인 대상과 행동을 쓴다\n"
    "- '~에 대해', '~를 통해', '~을 위해', '~할 수 있다', '~것입니다', '이러한'은 글 전체에서 각각 2번 이하\n"
    "- 쉼표는 문장 열 개 중 네 개 이하로. '~고,', '~지만,'처럼 연결어미 뒤에 쉼표를 찍지 않는다\n"
    "- 문장 길이를 섞는다(짧은 문장과 조금 긴 문장). 같은 어미로 연달아 끝내지 않는다\n"
)


def _plain(text: str) -> str:
    t = re.sub(r"<!--.*?-->", "", text or "", flags=re.S)
    t = re.sub(r"https?://\S+", "", t)
    t = re.sub(r"^[ \t]*[#>*\-][#>*\- \t]*|\*\*", "", t, flags=re.M)
    return t


def _sentences(t: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.?!])\s+|\n+", t) if len(s.strip()) > 5]


def check(text: str) -> dict:
    """{'grade','s1','s2','s3','hits':[(심각도, 이름, 횟수, 예)]}"""
    t = _plain(text)
    hits: list[tuple[str, str, int, str]] = []
    for name, pat in S1_PATTERNS:
        found = [m.group(0) for m in re.finditer(pat, t)]
        if found:
            hits.append(("S1", name, len(found), found[0]))
    for name, pat in S2_PATTERNS:
        found = [m.group(0) for m in re.finditer(pat, t)]
        if len(found) >= 3:
            hits.append(("S2", name, len(found), found[0]))
    sents = _sentences(t)
    if len(sents) >= 5:
        comma = sum(1 for s in sents if "," in s) / len(sents)
        if comma > 0.40:
            hits.append(("S2", f"쉼표 문장 비율 {comma:.0%} (기준 40%)", round(comma * 100), ""))
    cc = _CONNECTIVE_COMMA.findall(t)
    if len(cc) >= 3:
        hits.append(("S2", "연결어미 뒤 쉼표", len(cc), cc[0] + ","))
    if len(sents) >= 8:
        lens = [len(s) for s in sents]
        cv = statistics.pstdev(lens) / max(1, statistics.mean(lens))
        if cv < 0.25:
            hits.append(("S3", f"문장 길이가 너무 고름 (변동 {cv:.2f})", len(sents), ""))
        ends = [re.sub(r"[.?!]+$", "", s)[-2:] for s in sents]
        run = max((len(list(g)) for _, g in __import__("itertools").groupby(ends)), default=0)
        if run >= 4:
            hits.append(("S3", f"같은 어미 {run}문장 연속", run, ""))
    s1 = sum(1 for h in hits if h[0] == "S1")
    s2 = sum(1 for h in hits if h[0] == "S2")
    s3 = sum(1 for h in hits if h[0] == "S3")
    if s1 >= 5 and s2 >= 8:
        grade = "D"
    elif s1 >= 3 or s2 >= 6:
        grade = "C"
    elif s1 >= 1 or s2 >= 3:
        grade = "B"
    else:
        grade = "A"
    return {"grade": grade, "s1": s1, "s2": s2, "s3": s3, "hits": hits}


def issues(text: str, *, block: str = "CD") -> list[str]:
    """게이트·글쓰기 검사용: 등급이 block 안에 있으면 고칠 목록을 돌려준다."""
    r = check(text)
    if r["grade"] not in block:
        return []
    top = "; ".join(f"{n}({c})" for sev, n, c, _ in r["hits"] if sev in ("S1", "S2"))[:300]
    return [f"AI 문체 {r['grade']}등급 (S1 {r['s1']}·S2 {r['s2']}) — 고칠 것: {top}"]


def label(text: str) -> str:
    r = check(text)
    return f"문체 {r['grade']} (S1 {r['s1']}·S2 {r['s2']}·S3 {r['s3']})"


if __name__ == "__main__":
    for _s in (sys.stdout,):
        try:
            _s.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass
    for p in sys.argv[1:]:
        r = check(open(p, encoding="utf-8").read())
        print(f"{r['grade']}  S1 {r['s1']} · S2 {r['s2']} · S3 {r['s3']}  {p}")
        for sev, name, n, ex in r["hits"]:
            print(f"    {sev} {name} ×{n}  {ex}")
