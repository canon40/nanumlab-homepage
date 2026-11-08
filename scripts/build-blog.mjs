// nanumlab.store 정적 페이지 생성 — `vite build` 다음에 실행된다.
// 사이트는 코팅제(퍼마코트: 자동차·바이크)와 리빙코팅제(듀라코트 리빙코트) 전용 블로그다 (2026-11-08).
// content/posts/*.md (글쓰기 프로그램이 넣는 글) → dist/index.html(첫 화면), dist/blog/<slug>/index.html,
// dist/blog/posts.json, dist/sitemap.xml. 기존 회사 소개(React) 화면은 dist/about/ 으로 옮긴다.
// 글 목록은 날짜 최신순. 검색 로봇이 바로 읽도록 자바스크립트 없이 HTML 로 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'content', 'posts');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://nanumlab.store';
const STORE = 'https://smartstore.naver.com/nanumlab';

// 글 분류(니치) → 사이트 분류. 자동차·바이크 글은 '코팅제', 생활 글은 '리빙코팅제'.
const GROUP_OF = { car: 'coating', bike: 'coating', living: 'living' };
const GROUPS = { coating: '코팅제', living: '리빙코팅제' };

// 제품 정보는 엔진(make_sales_blog_post.PRODUCTS)과 판매글에 있는 사실만 쓴다. 효능 단정·최상급 금지 (표시광고법).
const PRODUCTS = {
  coating: {
    name: '퍼마코트',
    en: 'DURACOAT PERMACOAT',
    image: '/products/permacoat.jpg',
    text: '자동차·바이크 도장면에 쓰는 셀프 코팅제입니다. 세차 후 물자국과 오염 관리에 도움이 되도록 표면에 코팅막을 만듭니다.',
    links: [
      ['자동차용 보기', 'https://smartstore.naver.com/nanumlab/products/12809532969'],
      ['바이크용 보기', 'https://smartstore.naver.com/nanumlab/products/12808836901'],
    ],
  },
  living: {
    name: '듀라코트 리빙코트',
    en: 'DURACOAT LIVINGCOAT',
    image: '/products/livingcoat.jpg',
    text: '욕실·주방 같은 생활 표면과 차량 유리·플라스틱·휠에 함께 쓰는 리빙코팅제입니다. 물과 오염이 덜 달라붙게 도와 평소 관리가 쉬워집니다.',
    links: [['스토어에서 보기', 'https://smartstore.naver.com/nanumlab/products/13740782664']],
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
  const body = m[2]
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*#\s+.*\r?\n/, ''); // 본문 첫 # 제목은 페이지 제목과 겹치므로 뺀다
  const text = body.replace(/[#>*_`\-\[\]()!]/g, ' ').replace(/\s+/g, ' ').trim();
  return {
    slug,
    title: meta.title,
    date: meta.date,
    category: meta.category || '',
    group: GROUP_OF[meta.category] || 'coating',
    description: meta.description || text.slice(0, 120),
    image: meta.image || '',
    canonical: meta.canonical || `${SITE}/blog/${slug}/`,
    pending: meta.pending === true, // 아직 네이버 등에 발행 전: 보여 주되 검색 색인은 막는다
    links: meta.links && typeof meta.links === 'object' ? meta.links : {},
    html: marked.parse(body),
  };
}

const fmtDate = (d) => {
  const [y, mo, da] = String(d).slice(0, 10).split('-');
  return `${y}. ${Number(mo)}. ${Number(da)}.`;
};

const STYLE = `
:root{--radius:.5rem;--bg:#fff;--fg:oklch(18% .004 285);--primary:#e25500;--muted:oklch(96.5% .002 285);--muted-fg:oklch(50% .006 285);
--accent:#f5eeec;--accent-fg:#511900;--line:oklch(90% .003 285);--ink:oklch(16% .004 285);--ink-soft:oklch(23% .005 285);--ink-fg:oklch(98% 0 0);--ink-muted:oklch(72% .004 285);
--shadow:0 1px 2px oklch(16% .004 285/.06),0 8px 24px oklch(16% .004 285/.06)}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-family:"Pretendard Variable",Pretendard,"Noto Sans KR",system-ui,-apple-system,sans-serif;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}
.wrap{max-width:72rem;margin:0 auto;padding:0 1.25rem}
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
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
.product{display:grid;grid-template-columns:42% 1fr;border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow);border:1px solid var(--line);background:#fff}
.product img{width:100%;height:100%;object-fit:cover;object-position:center 62%;background:var(--muted)}
.product .in{padding:1.6rem;display:flex;flex-direction:column}
.badge{align-self:flex-start;background:var(--accent);color:var(--accent-fg);font-weight:800;font-size:.78rem;border-radius:999px;padding:.2rem .7rem}
.product h3{font-size:1.5rem;font-weight:800;margin:.6rem 0 0;line-height:1.3}.product small{color:var(--muted-fg);letter-spacing:.06em;font-size:.72rem}
.product p{color:var(--muted-fg);font-size:.95rem;margin:.75rem 0 1.25rem}
.product .acts{margin-top:auto;display:flex;flex-wrap:wrap;gap:.5rem}
.product .acts a{font-weight:700;font-size:.9rem;border-radius:var(--radius);padding:.5rem .9rem;border:1px solid var(--line)}.product .acts a.p{background:var(--primary);border-color:var(--primary);color:#fff}
.product .acts a:not(.p):hover{border-color:var(--primary);color:var(--primary)}
.posts{background:var(--muted)}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}.chips button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:.45rem 1.1rem;font:inherit;font-size:.95rem;font-weight:600;cursor:pointer;color:var(--muted-fg)}
.chips button.on{background:var(--fg);border-color:var(--fg);color:#fff}.chips em{font-style:normal;opacity:.6;margin-left:.3rem;font-size:.85em}
.grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))}
.card{background:#fff;border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .15s}
.card:hover{transform:translateY(-2px)}.card img{width:100%;aspect-ratio:16/10;object-fit:cover;background:#e9e9ec}
.card .in{padding:1.1rem 1.2rem 1.3rem}.meta{font-size:.8rem;color:var(--muted-fg)}.cat{color:var(--primary);font-weight:800;margin-right:.5rem}
.card h2{font-size:1.1rem;line-height:1.45;margin:.35rem 0 .5rem}.card p{margin:0;color:var(--muted-fg);font-size:.9rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.feature{display:grid;grid-template-columns:1.2fr 1fr;margin-bottom:1.5rem}.feature img{aspect-ratio:auto;height:100%;min-height:17rem}.feature .in{padding:2rem;display:flex;flex-direction:column;justify-content:center}.feature h2{font-size:1.6rem}.feature p{-webkit-line-clamp:4;font-size:1rem}
.empty{color:var(--muted-fg);padding:4rem 0;text-align:center}
article{max-width:44rem;margin:0 auto;padding:3rem 0 4rem}article h1{font-size:2.1rem;line-height:1.35;font-weight:800;margin:.5rem 0 1rem;letter-spacing:-.01em}
article .hero-img{width:100%;border-radius:.75rem;margin:1.5rem 0}
.body{font-size:1.05rem}.body h2{font-size:1.4rem;margin:2.5rem 0 .75rem}.body h3{font-size:1.15rem;margin:2rem 0 .5rem}
.body img{border-radius:.5rem}.body a{color:var(--primary);text-decoration:underline}.body blockquote{margin:1.5rem 0;padding:.5rem 1rem;border-left:3px solid var(--primary);background:var(--accent);color:var(--accent-fg)}
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
<meta property="og:type" content="${on === 'post' ? 'article' : 'website'}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
${image ? `<meta property="og:image" content="${esc(SITE + image)}" />` : ''}
<meta property="og:locale" content="ko_KR" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<style>${STYLE}</style>
</head>
<body>
<header><div class="wrap bar"><a class="brand" href="/"><b>나눔랩 코팅</b><span>코팅제 · 리빙코팅제 이야기</span></a>
<nav><a class="t" href="/#coating">코팅제</a><a class="t" href="/#living">리빙코팅제</a><a class="btn btn-p btn-sm" href="${STORE}" target="_blank" rel="noopener">스마트스토어</a></nav></div></header>
<main>${body}</main>
<footer><div class="wrap"><div><b>주식회사 나눔랩</b> · 듀라코트 퍼마코트 · 듀라코트 리빙코트</div>
<nav><a href="${STORE}" target="_blank" rel="noopener">스마트스토어</a><a href="/about/">회사 소개</a></nav></div>
<div class="wrap" style="margin-top:.75rem">&copy; ${new Date().getFullYear()} NANUM LAB Co., Ltd.</div></footer>
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
<div class="in"><span class="badge">${GROUPS[key]}</span><h3>${esc(p.name)}</h3><small>${p.en}</small><p>${esc(p.text)}</p>
<div class="acts"><a class="p" href="/#${key}">관련 글 ${count}편</a>${p.links
    .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
    .join('')}</div></div></div>`;
}

function related(group) {
  const p = PRODUCTS[group];
  return `<aside class="rel"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" /><div><span class="k">${GROUPS[group]}</span><b>${esc(p.name)}</b>
<p>제품 구성과 사용 방법은 스마트스토어 상세 페이지에서 확인하세요.</p><div class="acts">${p.links
    .map(([label, url]) => `<a class="btn btn-p btn-sm" href="${url}" target="_blank" rel="noopener">${label}</a>`)
    .join('')}</div></div></aside>`;
}

function card(p, cls = '') {
  return `<a class="card${cls}" href="/blog/${p.slug}/" data-cat="${p.group}">
${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" />` : ''}
<div class="in"><div class="meta"><span class="cat">${GROUPS[p.group]}</span>${fmtDate(p.date)}</div>
<h2>${esc(p.title)}</h2><p>${esc(p.description)}</p></div></a>`;
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
  const chips = `<div class="chips"><button class="on" data-c="">전체<em>${posts.length}</em></button>${Object.entries(GROUPS)
    .map(([k, v]) => `<button data-c="${k}">${v}<em>${count(k)}</em></button>`)
    .join('')}</div>
<script>(function(){function show(c){document.querySelectorAll('.chips button').forEach(function(x){x.classList.toggle('on',x.dataset.c===c)});document.querySelectorAll('.card').forEach(function(el){el.style.display=!c||el.dataset.cat===c?'':'none'})}
document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){history.replaceState(null,'',b.dataset.c?'#'+b.dataset.c:location.pathname);show(b.dataset.c)}});
function fromHash(){var c=decodeURIComponent(location.hash.slice(1));if(c!=='coating'&&c!=='living')c='';show(c);if(c)document.getElementById('posts').scrollIntoView()}
window.addEventListener('hashchange',fromHash);fromHash()})()</script>`;
  const [first, ...rest] = posts;
  const list = posts.length
    ? `${card(first, ' feature')}<div class="grid">${rest.map((p) => card(p)).join('\n')}</div>`
    : '<div class="empty">아직 올라온 글이 없습니다.</div>';

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
<section class="sec"><div class="wrap"><h2 class="sec-h">다루는 제품</h2><p class="sec-p">글은 두 가지 제품을 중심으로 씁니다.</p>
<div class="products">${productCard('coating', count('coating'))}${productCard('living', count('living'))}</div></div></section>
<section class="sec posts" id="posts"><div class="wrap"><h2 class="sec-h">최신 글</h2><p class="sec-p">새 글이 올라오면 최신순으로 정리됩니다.</p>${chips}${list}</div></section>`,
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
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      layout({
        title: `${p.title} | 나눔랩 코팅`,
        description: p.description,
        canonical: p.canonical,
        image: p.image,
        on: 'post',
        noindex: p.pending,
        body: `<div class="wrap"><article><div class="meta"><a class="cat" href="/#${p.group}">${GROUPS[p.group]}</a>${fmtDate(p.date)}</div>
<h1>${esc(p.title)}</h1>${p.image ? `<img class="hero-img" src="${esc(p.image)}" alt="" />` : ''}
<div class="body">${p.html}</div>${related(p.group)}${where(p.links)}<a class="back" href="/#${p.group}">← ${GROUPS[p.group]} 글 목록</a></article></div>`,
      }),
    );
  }

  fs.writeFileSync(
    path.join(blogDir, 'posts.json'),
    JSON.stringify(posts.map(({ html, canonical, ...rest }) => rest)),
  );

  // sitemap: public/sitemap.xml 에 주소를 더한다 (원본이 다른 곳인 글·발행 전 글은 뺀다)
  const smPath = path.join(DIST, 'sitemap.xml');
  if (fs.existsSync(smPath)) {
    const urls = [`${SITE}/about/`, ...posts.filter((p) => !p.pending && p.canonical.startsWith(SITE)).map((p) => `${SITE}/blog/${p.slug}/`)];
    const add = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
    const sm = fs.readFileSync(smPath, 'utf8').replace('</urlset>', `${add}\n</urlset>`);
    fs.writeFileSync(smPath, sm);
  }
  console.log(`블로그: 글 ${posts.length}편 생성 (코팅제 ${count('coating')} · 리빙코팅제 ${count('living')})`);
}

main();
