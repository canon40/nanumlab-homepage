# -*- coding: utf-8 -*-
"""블로그 진단실 공개 API (Vercel 파이썬 함수). 원본: gemini+chatgpt+replit/blog-inspector/backend/public_app.py

vercel.json 이 /api/tools/<경로> 를 /api/tools?__path=<경로> 로 넘긴다.
함수가 받은 경로가 /api/tools 뿐이면 __path 로 원래 경로를 되살린다.
"""
import os
import sys
from urllib.parse import parse_qsl, urlencode

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "_bitools"))

from public_app import app as _inner  # noqa: E402


async def app(scope, receive, send):
    if scope.get("type") == "http" and scope.get("path", "").rstrip("/") == "/api/tools":
        qs = parse_qsl(scope.get("query_string", b"").decode(), keep_blank_values=True)
        sub = next((v for k, v in qs if k == "__path"), "")
        if sub:
            rest = urlencode([(k, v) for k, v in qs if k != "__path"]).encode()
            scope = {**scope, "path": "/api/tools/" + sub.lstrip("/"), "raw_path": None, "query_string": rest}
    await _inner(scope, receive, send)
