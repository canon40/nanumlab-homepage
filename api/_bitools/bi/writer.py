"""원고 점검 화면의 자동 글쓰기 (2026-11-14, 개인용 로컬 서버 전용 — 공개본에는 없음).

노릴 키워드(+ 원하는 제목·메모) → 엔진 .env 의 Gemini 키로 제목·본문 초안.
점검 기준(draft.check)에 맞춰 쓰게 하고, 광고 표현이 나오면 한 번 고쳐 쓴다.
"""
from __future__ import annotations

import json
import os
import re

from . import draft
from .naver_api import _env_file_value


def _key() -> str:
    return (os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
            or _env_file_value("GEMINI_API_KEY") or _env_file_value("GOOGLE_API_KEY"))


def _models() -> list[str]:
    raw = os.getenv("GEMINI_MODEL_FALLBACKS") or _env_file_value("GEMINI_MODEL_FALLBACKS") or "gemini-flash-latest"
    return list(dict.fromkeys(m.strip() for m in raw.split(",") if m.strip()))


def _llm(prompt: str) -> str:
    """503(수요 폭주)·429 면 다음 모델로."""
    from google import genai
    from google.genai import types

    key = _key()
    if not key:
        raise RuntimeError("엔진 .env 에 GEMINI_API_KEY 가 없습니다.")
    # 모델당 45초 제한 — 503(수요 폭주)이면 첫 모델이 2분 가까이 붙잡고 있었다 (2026-11-14 실측 119초)
    client = genai.Client(api_key=key, http_options=types.HttpOptions(timeout=45_000))
    last: Exception | None = None
    for m in _models():
        try:
            r = client.models.generate_content(
                model=m, contents=prompt, config=types.GenerateContentConfig(response_mime_type="application/json"))
            return r.text or ""
        except Exception as e:
            last = e
    raise RuntimeError(f"모든 모델 실패: {str(last)[:120]}")


def _prompt(keyword: str, title: str, notes: str, fix: list[str]) -> str:
    again = ("\n\n지난 답에 표시광고법 문제 표현이 있었다. 이번엔 이 말을 쓰지 마라: " + ", ".join(fix)) if fix else ""
    return f"""네이버 블로그 정보글을 한국어로 쓴다. JSON 으로만 답하라: {{"title": "", "body": "", "tags": []}}
노릴 키워드: {keyword}
{f"원하는 제목(다듬어도 됨): {title}" if title else ""}
{f"꼭 넣을 내용·메모: {notes}" if notes else ""}

규칙:
- title: 15~40자, 키워드를 앞쪽에 그대로 넣는다. 구체적인 상황·질문형. '~, 확인할 점' 같은 판박이 제목 금지.
- body: 공백 빼고 1,800~2,400자 (1,500자 밑이면 안 된다). 마크다운 소제목(## ) 4~5개. 소제목마다 바로 아래 줄에 [사진] 한 줄.
- 첫 문단 2~3줄에 질문에 대한 핵심 답을 먼저 쓴다.
- 키워드는 본문에 자연스럽게 3~6번. 억지 반복 금지.
- 표시광고법: 최고·최상·최초·1위·100%·완벽·보장·영구·무조건·부작용 없음·즉시 효과·유일·절대 같은 최상급·단정·보장 표현 금지.
  근거 없는 수치·기간·다른 제품과 비교·경쟁사 이름도 쓰지 않는다. 문제가 될 수 있는 문장은 아예 빼라.
- 문체: 사람이 쓴 듯 자연스럽게. '~할 수 있다' 남발, '다양한·효과적인·핵심적인' 같은 상투어, 문장마다 쉼표 금지.
- tags: 네이버 블로그 태그 5~10개. 공백 없는 짧은 말, # 없이. 키워드와 관련된 것만.
- 마지막 소제목은 정리(관리할 때 확인할 점 등). 과장된 마무리·구매 권유 금지.{again}"""


def _tags(got: dict) -> list[str]:
    raw = got.get("tags") or []
    if isinstance(raw, str):
        raw = re.split(r"[,#\s]+", raw)
    out = []
    for t in raw:
        t = re.sub(r"[#\s]", "", str(t))[:20]
        if t and t not in out:
            out.append(t)
    return out[:10]


def _parse(text: str) -> tuple[str, str, list[str]]:
    try:
        got = json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", text, re.S)
        got = json.loads(m.group(0)) if m else {}
    if isinstance(got, list):
        got = got[0] if got else {}
    if not isinstance(got, dict):
        got = {}
    return str(got.get("title", "")).strip(), str(got.get("body", "")).strip(), _tags(got)


def _claims(title: str, body: str) -> list[str]:
    return draft.claims(f"{title} {body}")


def write(keyword: str, title: str = "", notes: str = "") -> dict:
    """{'title', 'body', 'claims', 'tags'} — claims 가 비어 있지 않으면 고쳐 쓴 뒤에도 남은 광고 표현."""
    fix: list[str] = []
    t = b = ""
    tags: list[str] = []
    for _ in range(2):  # 처음 + 고쳐 쓰기 1번
        t, b, tags = _parse(_llm(_prompt(keyword, title, notes, fix)))
        if not (t and b):
            raise RuntimeError("AI 답에 제목이나 본문이 비어 있습니다.")
        fix = _claims(t, b)
        if not fix:
            break
    return {"title": t, "body": b, "claims": fix, "tags": tags}
