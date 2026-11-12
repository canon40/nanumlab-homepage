// nanumlab.store 정적 페이지 생성 — `vite build` 다음에 실행된다.
// 사이트는 코팅제(퍼마코트: 자동차·바이크)와 리빙코팅제(듀라코트 리빙코트) 전용 블로그다 (2026-11-08).
// content/posts/*.md (글쓰기 프로그램이 넣는 글) → dist/index.html(첫 화면), dist/blog/<slug>/index.html,
// dist/blog/posts.json, dist/sitemap.xml, dist/rss.xml. 기존 회사 소개(React) 화면은 dist/about/ 으로 옮긴다.
// 글 목록은 날짜 최신순. 검색 로봇이 바로 읽도록 자바스크립트 없이 HTML 로 만든다.
// 2026-11-09 사용자: 이 사이트는 제품을 알리고 블로그 글을 네이버·다음·구글에 노출하기 위한 곳.
// → 발행된 글은 '요약 페이지'(자체 문장 요약 + 원문 링크)로 만들고 이 페이지 자체를 색인시킨다.
//   본문 전체를 복사하지 않아 원문(네이버 등)이 유사문서로 밀리지 않는다. 요약은 publish_homepage.py 가 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'content', 'posts');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://nanumlab.store';
const STORE = 'https://smartstore.naver.com/nanumlab';
// 스마트스토어가 열리지 않는 동안(2026-11-08~) 스토어 버튼과 본문 속 스토어 링크 줄을 모두 숨긴다.
// 스토어가 다시 열리면 true 로 바꾸면 된다 (또는 빌드 환경변수 STORE_OPEN=1).
// 2026-11-09 사용자: 스토어 다시 열림 → 기본 켬. 다시 닫히면 STORE_OPEN=0 으로 빌드.
const STORE_OPEN = process.env.STORE_OPEN !== '0';
const UTM = '?utm_source=nanumlab_store&utm_medium=referral';

// 검색엔진 소유 확인 코드 — site-verification.json {"naver": "", "google": "", "daum": ""}. 빈 값은 넣지 않는다.
const VERIFY = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'site-verification.json'), 'utf8'));
  } catch {
    return {};
  }
})();
const VERIFY_META = [
  ['naver-site-verification', VERIFY.naver],
  ['google-site-verification', VERIFY.google],
]
  .filter(([, v]) => v)
  .map(([k, v]) => `\n<meta name="${k}" content="${String(v).replace(/"/g, '')}" />`)
  .join('');

// 원문 우선순위: 네이버 → 티스토리 → 블로거
const ORIGIN = [
  ['naver', '네이버 블로그'],
  ['tistory', '티스토리'],
  ['blogger', '블로거'],
];

// 글 분류(니치) → 사이트 분류. 자동차·바이크 글은 '코팅제', 생활 글은 '리빙코팅제'.
const GROUP_OF = { car: 'coating', bike: 'coating', living: 'living' };
const GROUPS = { coating: '코팅제', living: '리빙코팅제' };
// 전체 글 목록(content/external-index.json)에만 있는 분류: 코팅·생활과 무관한 예전 글
const LIST_GROUPS = { ...GROUPS, etc: '기타 글' };
const INDEX_FILE = path.join(ROOT, 'content', 'external-index.json');
const NAVER_ACC = { hymini1: '네이버1', selfcoat: '네이버2', 'a-easy': '네이버3' };

// 제품 정보는 엔진(make_sales_blog_post.PRODUCTS)과 판매글에 있는 사실만 쓴다. 효능 단정·최상급 금지 (표시광고법).
const PRODUCTS = {
  coating: {
    name: '퍼마코트',
    en: 'DURACOAT PERMACOAT',
    image: '/products/permacoat.jpg',
    text: '자동차·바이크 도장면에 쓰는 셀프 코팅제입니다. 세차 후 물자국과 오염 관리에 도움이 되도록 표면에 코팅막을 만듭니다.',
    links: [
      ['자동차용 구매하기', 'https://smartstore.naver.com/nanumlab/products/12809532969'],
      ['바이크용 구매하기', 'https://smartstore.naver.com/nanumlab/products/12808836901'],
    ],
  },
  living: {
    name: '듀라코트 리빙코트',
    en: 'DURACOAT LIVINGCOAT',
    image: '/products/livingcoat.jpg',
    text: '욕실·주방 같은 생활 표면과 차량 유리·플라스틱·휠에 함께 쓰는 리빙코팅제입니다. 물과 오염이 덜 달라붙게 도와 평소 관리가 쉬워집니다.',
    links: [['스토어에서 구매하기', 'https://smartstore.naver.com/nanumlab/products/13740782664']],
    // 판매자 확인 가격 (product_facts.LIVINGCOAT_PRICE, 2026-10-21). 퍼마코트 가격은 받지 않아 표시하지 않는다.
    price: '정가 47,500원 → 블로그 링크 42,900원',
  },
};

// 발행처 링크 (글쓰기 프로그램이 머리말 links 에 넣는다). SNS 는 게시물 주소가 없어 계정 페이지로 간다.
const CHANNELS = [
  ['naver', '네이버 블로그'],
  ['tistory', '티스토리'],
  ['blogger', '블로거'],
  ['instagram', '인스타그램'],
  ['facebook', '페이스북'],
  ['threads', '스레드'],
];

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 머리말: --- 사이 `key: <JSON 값>` 줄. 글쓰기 프로그램이 JSON 으로 써서 따옴표·콜론이 안전하다.
function parse(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    const v = line.slice(i + 1).trim();
    try { meta[line.slice(0, i).trim()] = JSON.parse(v); } catch { meta[line.slice(0, i).trim()] = v; }
  }
  if (!meta.title || !meta.date) return null;
  const slug = meta.slug || path.basename(file, '.md');
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.warn(`건너뜀 (slug 형식): ${file}`);
    return null;
  }
  let body = m[2]
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*#\s+.*\r?\n/, ''); // 본문 첫 # 제목은 페이지 제목과 겹치므로 뺀다
  if (!STORE_OPEN) body = body.replace(/^.*smartstore\.naver\.com.*(\r?\n|$)/gm, '');
  const text = body.replace(/[#>*_`\-\[\]()!]/g, ' ').replace(/\s+/g, ' ').trim();
  return {
    slug,
    title: meta.title,
    date: meta.date,
    category: meta.category || '',
    group: GROUP_OF[meta.category] || 'coating',
    description: (meta.summary && meta.summary.lead) || meta.description || text.slice(0, 120),
    image: meta.image || '',
    canonical: meta.canonical || `${SITE}/blog/${slug}/`,
    pending: meta.pending === true, // 아직 네이버 등에 발행 전: 보여 주되 검색 색인은 막는다
    links: meta.links && typeof meta.links === 'object' ? meta.links : {},
    html: marked.parse(body),
    // 요약 {lead, points[], tip} — 발행된 글이면 요약 페이지로 만든다
    summary: meta.summary && typeof meta.summary === 'object' && meta.summary.lead ? meta.summary : null,
  };
}

const fmtDate = (d) => {
  const [y, mo, da] = String(d).slice(0, 10).split('-');
  return `${y}. ${Number(mo)}. ${Number(da)}.`;
};

const STYLE = `
:root{--radius:.5rem;--bg:#fff;--fg:oklch(18% .004 285);--primary:#e25500;--muted:oklch(96.5% .002 285);--muted-fg:oklch(50% .006 285);
--accent:#f5eeec;--accent-fg:#511900;--line:oklch(90% .003 285);--ink:oklch(16% .004 285);--ink-soft:oklch(23% .005 285);--ink-fg:oklch(98% 0 0);--ink-muted:oklch(72% .004 285);
--shadow:0 1px 2px oklch(16% .004 285/.06),0 8px 24px oklch(16% .004 285/.06);--surface:#fff;--header:rgba(255,255,255,.92);--img-bg:#e9e9ec}
:root[data-theme=dark]{--bg:oklch(14% .004 285);--fg:oklch(95% 0 0);--muted:oklch(19% .004 285);--muted-fg:oklch(72% .004 285);--accent:oklch(26% .03 45);--accent-fg:#ffd9c2;--line:oklch(30% .004 285);--ink:oklch(10% .004 285);--surface:oklch(20% .004 285);--header:rgba(20,20,24,.92);--img-bg:oklch(24% .004 285);--shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.35);color-scheme:dark}
.theme{border:1px solid var(--line);background:transparent;color:inherit;border-radius:999px;padding:.35rem .8rem;font:inherit;font-size:.82rem;font-weight:700;cursor:pointer}.theme:hover{border-color:var(--primary);color:var(--primary)}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-family:"Pretendard Variable",Pretendard,"Noto Sans KR",system-ui,-apple-system,sans-serif;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}
.wrap{max-width:72rem;margin:0 auto;padding:0 1.25rem}
header{position:sticky;top:0;z-index:20;background:var(--header);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.bar{height:4rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.brand{display:flex;flex-direction:column;line-height:1.2}.brand b{font-size:1.1rem;font-weight:800}.brand span{font-size:.75rem;color:var(--muted-fg)}
.bar nav{display:flex;align-items:center;gap:1.5rem;font-size:.95rem;font-weight:600}.bar nav a.t:hover{color:var(--primary)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;border-radius:var(--radius);font-weight:800;padding:.85rem 1.6rem;font-size:1.05rem;border:2px solid transparent;transition:filter .15s,background .15s}
.btn-p{background:var(--primary);color:#fff}.btn-p:hover{filter:brightness(1.08)}
.btn-o{border-color:currentColor}.btn-o:hover{background:rgba(255,255,255,.08)}
.btn-sm{padding:.45rem .9rem;font-size:.85rem}
.hero{background:var(--ink);color:var(--ink-fg);padding:5rem 0 4.5rem}
.kicker{color:var(--primary);font-weight:800;letter-spacing:.08em;font-size:.85rem}
.hero h1{font-size:3.4rem;line-height:1.2;font-weight:800;margin:.75rem 0 1.25rem;letter-spacing:-.02em}.hero h1 em{font-style:normal;color:var(--primary)}
.hero p{font-size:1.2rem;color:var(--ink-muted);max-width:36rem;margin:0 0 2rem}
.cta{display:flex;flex-wrap:wrap;gap:.75rem}
.sec{padding:4.5rem 0}.sec-h{font-size:2.1rem;font-weight:800;margin:0 0 .5rem;letter-spacing:-.01em}.sec-p{color:var(--muted-fg);margin:0 0 2.25rem}
.products{display:grid;gap:1.5rem;grid-template-columns:1fr 1fr}
.product{display:grid;grid-template-columns:42% 1fr;border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow);border:1px solid var(--line);background:var(--surface)}
.product img{width:100%;height:100%;object-fit:cover;object-position:center 62%;background:var(--muted)}
.product .in{padding:1.6rem;display:flex;flex-direction:column}
.badge{align-self:flex-start;background:var(--accent);color:var(--accent-fg);font-weight:800;font-size:.78rem;border-radius:999px;padding:.2rem .7rem}
.product h3{font-size:1.5rem;font-weight:800;margin:.6rem 0 0;line-height:1.3}.product small{color:var(--muted-fg);letter-spacing:.06em;font-size:.72rem}
.product p{color:var(--muted-fg);font-size:.95rem;margin:.75rem 0 1.25rem}
.product .price{margin:-.5rem 0 1rem;font-weight:800;color:var(--primary);font-size:1rem}.product .price span{display:block;font-weight:400;font-size:.75rem;color:var(--muted-fg)}
.product .acts{margin-top:auto;display:flex;flex-wrap:wrap;gap:.5rem}
.product .acts a{font-weight:700;font-size:.9rem;border-radius:var(--radius);padding:.5rem .9rem;border:1px solid var(--line)}.product .acts a.p{background:var(--primary);border-color:var(--primary);color:#fff}
.product .acts a:not(.p):hover{border-color:var(--primary);color:var(--primary)}
.posts{background:var(--muted)}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}.chips button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:.45rem 1.1rem;font:inherit;font-size:.95rem;font-weight:600;cursor:pointer;color:var(--muted-fg)}
.find{display:flex;gap:.75rem;align-items:center;margin:-1rem 0 2rem}.find input{flex:1;max-width:28rem;border:1px solid var(--line);background:var(--surface);color:var(--fg);border-radius:var(--radius);padding:.65rem .9rem;font:inherit}.find span{color:var(--muted-fg);font-weight:700}.more-wrap{text-align:center;margin-top:2rem}.card.ext .go{background:none;color:var(--primary);font-weight:800}.chips.src{margin-top:-1.25rem;align-items:center}.chips.src span{font-size:.9rem;font-weight:700;color:var(--muted-fg);margin-right:.25rem}.chips button.on{background:var(--fg);border-color:var(--fg);color:var(--bg)}.chips em{font-style:normal;opacity:.6;margin-left:.3rem;font-size:.85em}
.grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))}
.card{background:var(--surface);border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .15s}
.card:hover{transform:translateY(-2px)}.card img{width:100%;aspect-ratio:16/10;object-fit:cover;background:var(--img-bg)}
.card .in{padding:1.1rem 1.2rem 1.3rem}.meta{font-size:.8rem;color:var(--muted-fg)}.cat{color:var(--primary);font-weight:800;margin-right:.5rem}
.ch{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.8rem}.ch span{font-size:.72rem;font-weight:700;border-radius:999px;padding:.12rem .55rem;background:var(--muted);color:var(--muted-fg)}
.ch .ch-naver{background:#e9f8ee;color:#0a7a3c}.ch .ch-tistory{background:#fff1e8;color:#b44400}.ch .ch-blogger{background:#fff4e0;color:#a15c00}
.ch .ch-instagram,.ch .ch-facebook,.ch .ch-threads{background:#eef0ff;color:#3a3f9e}
.card h2{font-size:1.1rem;line-height:1.45;margin:.35rem 0 .5rem}.card p{margin:0;color:var(--muted-fg);font-size:.9rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.feature{display:grid;grid-template-columns:1.2fr 1fr;margin-bottom:1.5rem}.feature img{aspect-ratio:auto;height:100%;min-height:17rem}.feature .in{padding:2rem;display:flex;flex-direction:column;justify-content:center}.feature h2{font-size:1.6rem}.feature p{-webkit-line-clamp:4;font-size:1rem}
.empty{color:var(--muted-fg);padding:4rem 0;text-align:center}
article{max-width:44rem;margin:0 auto;padding:3rem 0 4rem}article h1{font-size:2.1rem;line-height:1.35;font-weight:800;margin:.5rem 0 1rem;letter-spacing:-.01em}
article .hero-img{width:100%;border-radius:.75rem;margin:1.5rem 0}
.body{font-size:1.05rem}.body h2{font-size:1.4rem;margin:2.5rem 0 .75rem}.body h3{font-size:1.15rem;margin:2rem 0 .5rem}
.body img{border-radius:.5rem}.body a{color:var(--primary);text-decoration:underline}.body blockquote{margin:1.5rem 0;padding:.5rem 1rem;border-left:3px solid var(--primary);background:var(--accent);color:var(--accent-fg)}
.summary .lead{font-size:1.15rem;line-height:1.8}.summary ul{padding-left:1.2rem}.summary li{margin:.4rem 0}.summary .tip{margin-top:1.5rem;padding:.75rem 1rem;border-radius:.5rem;background:var(--accent);color:var(--accent-fg)}.summary .tip b{margin-right:.5rem}.summary a.orig{display:inline-flex;margin-top:2rem;color:#fff;text-decoration:none}.summary .orig-note{display:block;margin-top:.5rem;color:var(--muted-fg)}
.rel{margin-top:3rem;display:grid;grid-template-columns:8rem 1fr;gap:1.25rem;align-items:center;background:var(--ink);color:var(--ink-fg);border-radius:.75rem;padding:1.25rem;box-shadow:var(--shadow)}
.rel img{border-radius:.5rem;aspect-ratio:1;object-fit:cover}.rel .k{color:var(--primary);font-weight:800;font-size:.8rem}.rel b{display:block;font-size:1.2rem;margin:.1rem 0 .4rem}
.rel p{margin:0 0 .9rem;color:var(--ink-muted);font-size:.9rem}.rel .acts{display:flex;flex-wrap:wrap;gap:.5rem}
.where{margin-top:1.5rem;padding:1.25rem 1.4rem;border:1px solid var(--line);border-radius:.75rem}
.where h3{margin:0 0 .75rem;font-size:1rem}.where div{display:flex;flex-wrap:wrap;gap:.5rem}
.where a{border:1px solid var(--line);border-radius:999px;padding:.4rem 1rem;font-size:.9rem;font-weight:600}.where a:hover{border-color:var(--primary);color:var(--primary)}
.where small{display:block;margin-top:.6rem;color:var(--muted-fg);font-size:.78rem}
.back{display:inline-block;margin-top:2.5rem;color:var(--primary);font-weight:800}
footer{background:var(--ink);color:var(--ink-muted);font-size:.85rem;padding:2.5rem 0}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem}footer b{color:var(--ink-fg)}footer a:hover{color:var(--ink-fg)}footer nav{display:flex;gap:1.25rem}
@media(max-width:900px){.products{grid-template-columns:1fr}}
@media(max-width:768px){.hero{padding:3.5rem 0}.hero h1{font-size:2.3rem}.hero p{font-size:1.05rem}.sec{padding:3.5rem 0}.sec-h{font-size:1.7rem}
.bar nav a.t{display:none}.product{grid-template-columns:1fr}.product img{aspect-ratio:16/10}
.feature{grid-template-columns:1fr}.feature img{min-height:0;aspect-ratio:16/10}.feature .in{padding:1.2rem}.feature h2{font-size:1.3rem}
article{padding:2rem 0 3rem}article h1{font-size:1.6rem}.rel{grid-template-columns:5rem 1fr}}
`;

function layout({ title, description, canonical, image, body, on, noindex = false }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${esc(canonical)}" />${noindex ? '<meta name="robots" content="noindex" />' : ''}
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="alternate" type="application/rss+xml" title="나눔랩 코팅" href="${SITE}/rss.xml" />${VERIFY_META}
<meta property="og:type" content="${on === 'post' ? 'article' : 'website'}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
${image ? `<meta property="og:image" content="${esc(/^https?:/.test(image) ? image : SITE + image)}" />` : ''}
<meta property="og:locale" content="ko_KR" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<style>${STYLE}</style>
</head>
<body>
<header><div class="wrap bar"><a class="brand" href="/"><b>나눔랩 코팅</b><span>코팅제 · 리빙코팅제 이야기</span></a>
<nav><button class="theme" type="button" onclick="(function(b){var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}b.textContent=n==='dark'?'흰 화면':'검정 화면'})(this)">검정 화면</button><a class="t" href="/#coating">코팅제</a><a class="t" href="/#living">리빙코팅제</a><a class="t" href="/tools/">블로그 진단</a>${STORE_OPEN
    ? `<a class="btn btn-p btn-sm" href="${STORE}" target="_blank" rel="noopener">스마트스토어</a>`
    : '<a class="btn btn-p btn-sm" href="/#products">제품 소개</a>'}</nav></div></header>
<main>${body}</main>
<footer><div class="wrap"><div><b>주식회사 나눔랩</b> · 듀라코트 퍼마코트 · 듀라코트 리빙코트</div>
<nav>${STORE_OPEN ? `<a href="${STORE}" target="_blank" rel="noopener">스마트스토어</a>` : ''}<a href="/tools/">블로그 진단</a><a href="/about/">회사 소개</a></nav></div>
<div class="wrap" style="margin-top:.75rem">&copy; ${new Date().getFullYear()} NANUM LAB Co., Ltd.</div></footer>
<script>if(document.documentElement.dataset.theme==='dark'){var b=document.querySelector('.theme');if(b)b.textContent='흰 화면'}</script>
</body>
</html>`;
}

function where(links) {
  const items = CHANNELS.filter(([k]) => /^https:\/\//.test(links[k] || ''));
  if (!items.length) return '';
  const sns = items.some(([k]) => ['instagram', 'facebook', 'threads'].includes(k));
  return `<section class="where"><h3>이 글은 여기에도 올라가 있어요</h3><div>${items
    .map(([k, label]) => `<a href="${esc(links[k])}" target="_blank" rel="noopener">${label}</a>`)
    .join('')}</div>${sns ? '<small>SNS는 계정 페이지로 연결됩니다.</small>' : ''}</section>`;
}

function productCard(key, count) {
  const p = PRODUCTS[key];
  return `<div class="product"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" />
<div class="in"><span class="badge">${GROUPS[key]}</span><h3>${esc(p.name)}</h3><small>${p.en}</small><p>${esc(p.text)}</p>${STORE_OPEN && p.price ? `<p class="price">${esc(p.price)}<span>할인가는 스토어 사정에 따라 바뀔 수 있어요. 구매 전 상세페이지 확인</span></p>` : ''}
<div class="acts"><a class="p" href="/#${key}">관련 글 ${count}편</a>${(STORE_OPEN ? p.links : [])
    .map(([label, url]) => `<a href="${url}${UTM}" target="_blank" rel="noopener">${label}</a>`)
    .join('')}</div></div></div>`;
}

function related(group) {
  const p = PRODUCTS[group];
  const acts = STORE_OPEN
    ? p.links.map(([label, url]) => `<a class="btn btn-p btn-sm" href="${url}${UTM}" target="_blank" rel="noopener">${label}</a>`).join('')
    : `<a class="btn btn-p btn-sm" href="/#${group}">${GROUPS[group]} 글 더 보기</a>`;
  const note = STORE_OPEN
    ? (p.price ? `${p.price}. 할인가는 스토어 사정에 따라 바뀔 수 있으니 구매 전 상세페이지에서 확인하세요.` : '가격·용량과 사용 방법은 스마트스토어 상세 페이지에서 확인하세요.')
    : '시공 순서와 관리 방법은 관련 글에서 더 볼 수 있습니다.';
  return `<aside class="rel"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" /><div><span class="k">${GROUPS[group]}</span><b>${esc(p.name)}</b>
<p>${note}</p><div class="acts">${acts}</div></div></aside>`;
}

function card(p, cls = '') {
  return `<a class="card${cls}" href="/blog/${p.slug}/" data-cat="${p.group}" data-src="${srcs(p.links).join(' ')}">
${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" />` : ''}
<div class="in"><div class="meta"><span class="cat">${GROUPS[p.group]}</span>${fmtDate(p.date)}</div>
<h2>${esc(p.title)}</h2><p>${esc(p.description)}</p>${chips(p.links)}</div></a>`;
}

// 목록 카드용 발행처 표시 (카드 전체가 링크라 표시만 — 실제 링크는 글 페이지 아래 칸)
const SHORT = { naver: '네이버', tistory: '티스토리', blogger: '블로거', instagram: '인스타', facebook: '페북', threads: '스레드' };
function chips(links) {
  const on = CHANNELS.filter(([k]) => /^https:\/\//.test(links[k] || ''));
  return on.length ? `<div class="ch">${on.map(([k]) => `<span class="ch-${k}">${SHORT[k]}</span>`).join('')}</div>` : '';
}

// 발행처 분류: 네이버 / 티스토리 / 블로거 / SNS(인스타·페북·스레드)
const SRC = [['naver', '네이버'], ['tistory', '티스토리'], ['blogger', '블로거'], ['sns', 'SNS']];
function srcs(links) {
  const has = (k) => /^https:\/\//.test(links[k] || '');
  return SRC.map(([k]) => k).filter((k) => (k === 'sns' ? ['instagram', 'facebook', 'threads'].some(has) : has(k)));
}

function origin(p) {
  for (const [k, label] of ORIGIN) if (/^https:\/\//.test(p.links[k] || '')) return { key: k, label, url: p.links[k] };
  return null;
}

// 요약 페이지 본문: 자체 문장 요약 + 핵심 정리 + 원문 전체 보기 버튼 (원문 문장은 옮기지 않는다)
function summaryHtml(p, o) {
  const s = p.summary;
  const points = (Array.isArray(s.points) ? s.points : []).filter(Boolean);
  return `<div class="body summary"><p class="lead">${esc(s.lead)}</p>
${points.length ? `<h2>핵심 정리</h2><ul>${points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
${s.tip ? `<p class="tip"><b>한 줄 팁</b> ${esc(s.tip)}</p>` : ''}
<a class="btn btn-p orig" href="${esc(o.url)}" target="_blank" rel="noopener">원문 전체 보기 · ${o.label}</a>
<small class="orig-note">자세한 순서와 사진은 원문에 있습니다.</small></div>`;
}

function main() {
  if (!fs.existsSync(DIST)) throw new Error('dist 가 없습니다. vite build 를 먼저 하세요.');
  const files = fs.existsSync(POSTS) ? fs.readdirSync(POSTS).filter((f) => f.endsWith('.md')) : [];
  const posts = files
    .map((f) => parse(path.join(POSTS, f)))
    .filter(Boolean)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.slug.localeCompare(b.slug));
  const count = (g) => posts.filter((p) => p.group === g).length;

  const blogDir = path.join(DIST, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  // 분류 버튼: 주소 #coating / #living 으로도 열린다 (상단 메뉴·제품 카드 링크) → 글 목록으로 내려간다.
  // 전체 글 목록: 이 사이트의 글(요약 페이지) + 네이버1·2·3·티스토리·블로거에 공개된 모든 글 (2026-11-09 사용자 요청)
  // 이 사이트에 페이지가 없는 글은 카드를 누르면 원문으로 바로 간다. 목록 데이터는 /blog/all.json (화면에서 불러옴).
  const accOf = (links) => {
    const acc = [];
    const nv = (links.naver || '').match(/blog\.naver\.com\/([\w-]+)/);
    if (nv) acc.push(NAVER_ACC[nv[1]] || '네이버');
    if (/^https:\/\//.test(links.tistory || '')) acc.push('티스토리');
    if (/^https:\/\//.test(links.blogger || '')) acc.push('블로거');
    if (['instagram', 'facebook', 'threads'].some((k) => /^https:\/\//.test(links[k] || ''))) acc.push('SNS');
    return acc;
  };
  const norm = (u) => String(u).replace(/[?#].*$/, '').replace(/\/$/, '');
  const tkey = (t) => String(t || '').replace(/[^0-9A-Za-z가-힣]+/g, '').toLowerCase();
  const own = new Set(); // "주소|제목" — 같은 주소라도 발행처 제목이 다르면(티스토리·블로거용 정보글) 따로 보여 준다
  const all = posts.map((p) => {
    Object.values(p.links).forEach((u) => own.add(`${norm(u)}|${tkey(p.title)}`));
    return { t: p.title, d: String(p.date).slice(0, 10), g: p.group, u: `/blog/${p.slug}/`, a: accOf(p.links), i: p.image || '', s: p.description };
  });
  let index = [];
  try {
    index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  } catch {
    index = [];
  }
  for (const e of index) {
    if (own.has(`${norm(e.url)}|${tkey(e.title)}`)) continue; // 이미 같은 제목의 요약 페이지가 있는 글
    all.push({ t: e.title, d: String(e.date).slice(0, 10), g: GROUP_OF[e.cat] || 'etc', u: e.url, a: [e.a], x: 1 });
  }
  all.sort((a, b) => b.d.localeCompare(a.d) || (a.x ? 1 : 0) - (b.x ? 1 : 0));
  fs.writeFileSync(path.join(blogDir, 'all.json'), JSON.stringify(all));
  const ACCS = ['네이버1', '네이버2', '네이버3', '티스토리', '블로거', 'SNS'];
  const gCount = (g) => all.filter((x) => x.g === g).length;
  const aCount = (a) => all.filter((x) => x.a.includes(a)).length;
  const chips = `<div class="chips" data-k="c"><button class="on" data-v="">전체<em>${all.length}</em></button>${Object.entries(LIST_GROUPS)
    .map(([k, v]) => `<button data-v="${k}">${v}<em>${gCount(k)}</em></button>`)
    .join('')}</div>
<div class="chips src" data-k="s"><span>올라간 곳</span><button class="on" data-v="">모두</button>${ACCS.map((a) => `<button data-v="${a}">${a}<em>${aCount(a)}</em></button>`).join('')}</div>
<div class="find"><input id="q" type="search" placeholder="제목으로 찾기 (예: 욕실, 와이퍼, 퍼마코트)" /><span id="n"></span></div>`;
  const [first, ...rest] = posts;
  const staticList = posts.length
    ? `${card(first, ' feature')}<div class="grid">${rest.map((p) => card(p)).join('\n')}</div>`
    : '<div class="empty">아직 올라온 글이 없습니다.</div>';
  // 자바스크립트가 없으면(검색 로봇 등) 이 사이트의 글 목록을 그대로 보여 준다. 있으면 전체 글 목록으로 바꾼다.
  const list = `<div id="list">${staticList}</div><div class="more-wrap"><button id="more" class="btn btn-o" hidden>더 보기</button></div>
<script>(function(){var G=${JSON.stringify(LIST_GROUPS)},ACC=${JSON.stringify(ACCS)},st={c:'',s:'',q:''},all=null,shown=0,PAGE=48,box=document.getElementById('list'),more=document.getElementById('more'),n=document.getElementById('n');
function esc(t){return String(t||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fd(d){var p=d.split('-');return p.length===3?(+p[0])+'. '+(+p[1])+'. '+(+p[2])+'.':d}
function card(x){var ext=x.x?' target="_blank" rel="noopener"':'';return '<a class="card'+(x.x?' ext':'')+'" href="'+esc(x.u)+'"'+ext+'>'+(x.i?'<img src="'+esc(x.i)+'" alt="" loading="lazy" />':'')+'<div class="in"><div class="meta"><span class="cat">'+(G[x.g]||'')+'</span>'+fd(x.d)+'</div><h2>'+esc(x.t)+'</h2>'+(x.s?'<p>'+esc(x.s)+'</p>':'')+'<div class="ch">'+x.a.map(function(a){return '<span>'+esc(a)+'</span>'}).join('')+(x.x?'<span class="go">원문 보기 ↗</span>':'')+'</div></div></a>'}
function pick(){var q=st.q.trim().toLowerCase();return all.filter(function(x){return(!st.c||x.g===st.c)&&(!st.s||x.a.indexOf(st.s)>=0)&&(!q||x.t.toLowerCase().indexOf(q)>=0)})}
function render(reset){if(!all)return;var L=pick();if(reset){shown=0;box.innerHTML='<div class="grid"></div>'}n.textContent=L.length+'편';if(!L.length){box.innerHTML='<div class="empty">맞는 글이 없습니다.</div>';more.hidden=true;return}var g=box.querySelector('.grid'),next=L.slice(shown,shown+PAGE);g.insertAdjacentHTML('beforeend',next.map(card).join(''));shown+=next.length;more.hidden=shown>=L.length}
function mark(){document.querySelectorAll('.chips').forEach(function(g){g.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x.dataset.v===st[g.dataset.k])})})}
document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){st[b.parentNode.dataset.k]=b.dataset.v;mark();var h=[st.c,st.s].filter(Boolean).join('-');history.replaceState(null,'',h?'#'+encodeURIComponent(h):location.pathname);render(true)}});
var tm;document.getElementById('q').oninput=function(e){clearTimeout(tm);tm=setTimeout(function(){st.q=e.target.value;render(true)},200)};
more.onclick=function(){render(false)};
var ALIAS={tistory:'티스토리',blogger:'블로거',sns:'SNS',naver:'네이버1',naver1:'네이버1',naver2:'네이버2',naver3:'네이버3'};
function fromHash(){var h=decodeURIComponent(location.hash.slice(1)).split('-');st.c='';st.s='';h.forEach(function(k){if(G[k])st.c=k;if(ACC.indexOf(k)>=0)st.s=k;if(ALIAS[k])st.s=ALIAS[k]});mark();render(true);if(st.c||st.s)document.getElementById('posts').scrollIntoView()}
window.addEventListener('hashchange',fromHash);
fetch('/blog/all.json').then(function(r){return r.json()}).then(function(d){all=d;fromHash()}).catch(function(){})})()</script>`;

  const home = layout({
    title: '나눔랩 코팅 | 코팅제·리빙코팅제 사용법과 관리 정보',
    description: '퍼마코트(자동차·바이크 코팅제)와 듀라코트 리빙코트(리빙코팅제) 사용법, 시공 순서, 관리 정보를 최신순으로 정리합니다.',
    canonical: `${SITE}/`,
    image: PRODUCTS.living.image,
    on: 'list',
    body: `<section class="hero"><div class="wrap"><div class="kicker">DURACOAT · NANUM LAB</div>
<h1>코팅제와 리빙코팅제,<br /><em>제대로 쓰는 법</em>을 모았습니다</h1>
<p>자동차·바이크 도장면 코팅부터 욕실·주방 생활 표면 코팅까지. 시공 순서와 관리 방법을 글로 정리해 두었습니다.</p>
<div class="cta"><a class="btn btn-p" href="#coating">코팅제 글 보기</a><a class="btn btn-o" href="#living">리빙코팅제 글 보기</a></div></div></section>
<section class="sec" id="products"><div class="wrap"><h2 class="sec-h">다루는 제품</h2><p class="sec-p">글은 두 가지 제품을 중심으로 씁니다.</p>
<div class="products">${productCard('coating', count('coating'))}${productCard('living', count('living'))}</div></div></section>
<section class="sec posts" id="posts"><div class="wrap"><h2 class="sec-h">전체 글</h2><p class="sec-p">네이버 블로그 3곳·티스토리·블로거에 올린 글을 모두 모았습니다. 최신순이며 새 글은 자동으로 더해집니다.</p>${chips}${list}</div></section>`,
  });

  // 사이트 첫 화면 = 코팅 블로그. 기존 회사 소개(React) 화면은 /about/ 으로 옮긴다.
  const rootIndex = path.join(DIST, 'index.html');
  const aboutDir = path.join(DIST, 'about');
  fs.mkdirSync(aboutDir, { recursive: true });
  const about = fs.readFileSync(rootIndex, 'utf8')
    .replaceAll(`href="${SITE}/"`, `href="${SITE}/about/"`)
    .replaceAll(`content="${SITE}/"`, `content="${SITE}/about/"`);
  fs.writeFileSync(path.join(aboutDir, 'index.html'), about);
  fs.writeFileSync(rootIndex, home);
  fs.writeFileSync(path.join(blogDir, 'index.html'), home);

  for (const p of posts) {
    const dir = path.join(blogDir, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    const head = `<div class="wrap"><article><div class="meta"><a class="cat" href="/#${p.group}">${GROUPS[p.group]}</a>${fmtDate(p.date)}</div>
<h1>${esc(p.title)}</h1>${p.image ? `<img class="hero-img" src="${esc(p.image)}" alt="" />` : ''}`;
    const tail = `${related(p.group)}${where(p.links)}<a class="back" href="/#${p.group}">← ${GROUPS[p.group]} 글 목록</a></article></div>`;
    const o = origin(p);
    const isSummary = Boolean(p.summary && o && !p.pending);
    p.indexUrl = isSummary ? `${SITE}/blog/${p.slug}/` : ''; // 사이트맵·RSS 에는 요약 페이지만
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      layout({
        title: `${p.title} | 나눔랩 코팅`,
        description: p.description,
        // 요약 페이지는 이 페이지가 원본 (자체 문장) → 자기 주소. 아니면 예전처럼 원문 주소.
        canonical: isSummary ? `${SITE}/blog/${p.slug}/` : p.canonical,
        image: p.image,
        on: 'post',
        noindex: p.pending,
        body: isSummary ? `${head}${summaryHtml(p, o)}${tail}` : `${head}<div class="body">${p.html}</div>${tail}`,
      }),
    );
  }
  const indexed = posts.filter((p) => p.indexUrl && p.indexUrl.startsWith(SITE));

  // RSS — 네이버 서치어드바이저·다음에 제출해 새 요약 페이지를 바로 수집하게 한다
  const rssItems = indexed
    .slice(0, 50)
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${p.indexUrl}</link><guid>${p.indexUrl}</guid>
<description>${esc(p.description)}</description><category>${GROUPS[p.group]}</category><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`,
    )
    .join('\n');
  fs.writeFileSync(
    path.join(DIST, 'rss.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>나눔랩 코팅</title><link>${SITE}/</link>
<description>퍼마코트·듀라코트 리빙코트 사용법과 관리 정보</description><language>ko</language>
${rssItems}
</channel></rss>
`,
  );

  // 다음 웹마스터도구 확인 — robots.txt 맨 위 주석 한 줄
  if (VERIFY.daum) {
    const rb = path.join(DIST, 'robots.txt');
    const cur = fs.existsSync(rb) ? fs.readFileSync(rb, 'utf8') : 'User-agent: *\nAllow: /\n';
    fs.writeFileSync(rb, `#DaumWebMasterTool:${String(VERIFY.daum).trim()}\n${cur}`);
  }

  fs.writeFileSync(
    path.join(blogDir, 'posts.json'),
    JSON.stringify(posts.map(({ html, canonical, ...rest }) => rest)),
  );

  // sitemap: public/sitemap.xml 에 주소를 더한다 (원본이 다른 곳인 글·발행 전 글은 뺀다)
  const smPath = path.join(DIST, 'sitemap.xml');
  if (fs.existsSync(smPath)) {
    const urls = [`${SITE}/about/`, ...indexed.map((p) => p.indexUrl)];
    const add = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
    const sm = fs.readFileSync(smPath, 'utf8').replace('</urlset>', `${add}\n</urlset>`);
    fs.writeFileSync(smPath, sm);
  }
  console.log(
    `블로그: 글 ${posts.length}편 생성 (코팅제 ${count('coating')} · 리빙코팅제 ${count('living')}) · 색인용 요약 페이지 ${indexed.length}편`,
  );
}

main();
