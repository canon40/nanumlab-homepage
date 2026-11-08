// 블로그 정적 페이지 생성 — `vite build` 다음에 실행된다.
// content/posts/*.md (글쓰기 프로그램이 넣는 글) → dist/blog/index.html, dist/blog/<slug>/index.html,
// dist/blog/posts.json (홈 화면 '최신 글'용), dist/sitemap.xml 에 글 주소 추가.
// 글 목록은 날짜 최신순으로 정렬한다. 검색 로봇이 바로 읽도록 자바스크립트 없이 HTML 로 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'content', 'posts');
const DIST = path.join(ROOT, 'dist');
// 발행처 링크 (글쓰기 프로그램이 머리말 links 에 넣는다). SNS 는 게시물 주소가 없어 계정 페이지로 간다.
const CHANNELS = [
  ['naver', '네이버 블로그'],
  ['tistory', '티스토리'],
  ['blogger', '블로거'],
  ['instagram', '인스타그램'],
  ['facebook', '페이스북'],
  ['threads', '스레드'],
];
const SITE = 'https://nanumlab.store';
const CATEGORIES = { living: '리빙', bike: '바이크', car: '자동차' };

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
:root{--bg:#f8fafc;--fg:#0f172a;--muted:#64748b;--line:#e2e8f0;--accent:#4f46e5;--card:#fff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:"Pretendard Variable",Pretendard,"Noto Sans KR",system-ui,-apple-system,sans-serif;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.bar{max-width:72rem;margin:0 auto;padding:0 1rem;height:4rem;display:flex;align-items:center;justify-content:space-between}
.brand{font-weight:800;font-size:1.15rem}.bar nav a{margin-left:1.5rem;font-size:.9rem;color:var(--muted)}.bar nav a:hover,.bar nav a.on{color:var(--accent)}
main{max-width:72rem;margin:0 auto;padding:3rem 1rem 5rem}
h1.page{font-size:2.25rem;font-weight:800;margin:0 0 .5rem}.lead{color:var(--muted);margin:0 0 2rem}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}.chips button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:.4rem 1rem;font:inherit;font-size:.9rem;cursor:pointer;color:var(--muted)}
.chips button.on{background:var(--accent);border-color:var(--accent);color:#fff}
.grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:.75rem;overflow:hidden;box-shadow:0 1px 2px rgba(15,23,42,.05);transition:box-shadow .2s;display:flex;flex-direction:column}
.card:hover{box-shadow:0 8px 24px rgba(15,23,42,.08)}.card img{width:100%;aspect-ratio:16/10;object-fit:cover;background:#eef2f7;display:block}
.card .in{padding:1.1rem 1.2rem 1.3rem}.meta{font-size:.8rem;color:var(--muted)}.cat{color:var(--accent);font-weight:700;margin-right:.5rem}
.card h2{font-size:1.1rem;line-height:1.45;margin:.35rem 0 .5rem}.card p{margin:0;color:var(--muted);font-size:.9rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.feature{display:grid;grid-template-columns:1.2fr 1fr;margin-bottom:2rem}.feature img{aspect-ratio:auto;height:100%;min-height:16rem}.feature .in{padding:2rem;display:flex;flex-direction:column;justify-content:center}.feature h2{font-size:1.6rem}.feature p{-webkit-line-clamp:4;font-size:1rem}
.hero-intro{padding:1rem 0 1rem}
@media(max-width:768px){.feature{grid-template-columns:1fr}.feature img{min-height:0;aspect-ratio:16/10}.feature .in{padding:1.2rem}.feature h2{font-size:1.3rem}}
.empty{color:var(--muted);padding:4rem 0;text-align:center}
article{max-width:44rem;margin:0 auto}article h1{font-size:2rem;line-height:1.35;font-weight:800;margin:.5rem 0 1rem}
article .hero{width:100%;border-radius:.75rem;margin:1.5rem 0;display:block}
.body{font-size:1.05rem}.body h2{font-size:1.4rem;margin:2.5rem 0 .75rem}.body h3{font-size:1.15rem;margin:2rem 0 .5rem}
.body img{max-width:100%;border-radius:.5rem}.body a{color:var(--accent);text-decoration:underline}.body blockquote{margin:1.5rem 0;padding:.5rem 1rem;border-left:3px solid var(--accent);background:#eef2ff;color:#334155}
.back{display:inline-block;margin-top:3rem;color:var(--accent);font-weight:700}
.where{margin-top:3rem;padding:1.25rem 1.4rem;border:1px solid var(--line);border-radius:.75rem;background:#fff}
.where h3{margin:0 0 .75rem;font-size:1rem}.where div{display:flex;flex-wrap:wrap;gap:.5rem}
.where a{border:1px solid var(--line);border-radius:999px;padding:.4rem 1rem;font-size:.9rem;font-weight:600;color:var(--fg)}.where a:hover{border-color:var(--accent);color:var(--accent)}
.where small{display:block;margin-top:.6rem;color:var(--muted);font-size:.78rem}
footer{border-top:1px solid var(--line);color:var(--muted);font-size:.8rem;text-align:center;padding:2rem 1rem}
@media(max-width:640px){h1.page{font-size:1.75rem}article h1{font-size:1.6rem}.bar nav a{margin-left:1rem}}
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
<header><div class="bar"><a class="brand" href="/">나눔랩 블로그</a><nav>${Object.entries(CATEGORIES).map(([k, v]) => `<a href="/#${k}">${v}</a>`).join('')}</nav></div></header>
<main>${body}</main>
<footer>&copy; ${new Date().getFullYear()} NANUM LAB Co., Ltd. · <a href="/about/">회사 소개</a></footer>
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

function card(p, cls = '') {
  return `<a class="card${cls}" href="/blog/${p.slug}/" data-cat="${esc(p.category)}">
${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" />` : ''}
<div class="in"><div class="meta">${p.category ? `<span class="cat">${esc(CATEGORIES[p.category] || p.category)}</span>` : ''}${fmtDate(p.date)}</div>
<h2>${esc(p.title)}</h2><p>${esc(p.description)}</p></div></a>`;
}

function main() {
  if (!fs.existsSync(DIST)) throw new Error('dist 가 없습니다. vite build 를 먼저 하세요.');
  const files = fs.existsSync(POSTS) ? fs.readdirSync(POSTS).filter((f) => f.endsWith('.md')) : [];
  const posts = files
    .map((f) => parse(path.join(POSTS, f)))
    .filter(Boolean)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.slug.localeCompare(b.slug));

  const blogDir = path.join(DIST, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  // 분류 버튼: 주소 #living 등으로도 열린다 (상단 메뉴 링크). 첫 글은 크게(feature) 보여 준다.
  const chips = `<div class="chips"><button class="on" data-c="">전체</button>${cats.map((c) => `<button data-c="${esc(c)}">${esc(CATEGORIES[c] || c)}</button>`).join('')}</div>
<script>(function(){function show(c){document.querySelectorAll('.chips button').forEach(function(x){x.classList.toggle('on',x.dataset.c===c)});document.querySelectorAll('.card').forEach(function(el){el.style.display=!c||el.dataset.cat===c?'':'none'})}
document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){history.replaceState(null,'',b.dataset.c?'#'+b.dataset.c:location.pathname);show(b.dataset.c)}});
function fromHash(){show(decodeURIComponent(location.hash.slice(1)))}window.addEventListener('hashchange',fromHash);fromHash()})()</script>`;
  const [first, ...rest] = posts;
  const list = posts.length
    ? `${card(first, ' feature')}<div class="grid">${rest.map((p) => card(p)).join('\n')}</div>`
    : '<div class="empty">아직 올라온 글이 없습니다.</div>';
  const home = layout({
    title: '나눔랩 블로그 | 생활·자동차·바이크 관리 정보',
    description: '욕실·주방 물때, 자동차·바이크 세차와 코팅 관리 정보를 최신순으로 정리한 나눔랩 블로그',
    canonical: `${SITE}/`,
    on: 'list',
    body: `<div class="hero-intro"><h1 class="page">나눔랩 블로그</h1><p class="lead">생활 공간과 자동차·바이크 표면 관리 정보를 모았습니다. 새 글이 올라오면 최신순으로 정리됩니다.</p></div>${chips}${list}`,
  });
  fs.writeFileSync(path.join(blogDir, 'index.html'), home);

  // 사이트 첫 화면 = 블로그. 기존 회사 소개(React) 화면은 /about/ 으로 옮긴다.
  const rootIndex = path.join(DIST, 'index.html');
  const aboutDir = path.join(DIST, 'about');
  fs.mkdirSync(aboutDir, { recursive: true });
  const about = fs.readFileSync(rootIndex, 'utf8')
    .replaceAll(`href="${SITE}/"`, `href="${SITE}/about/"`)
    .replaceAll(`content="${SITE}/"`, `content="${SITE}/about/"`);
  fs.writeFileSync(path.join(aboutDir, 'index.html'), about);
  fs.writeFileSync(rootIndex, home);

  for (const p of posts) {
    const dir = path.join(blogDir, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      layout({
        title: `${p.title} | 나눔랩 블로그`,
        description: p.description,
        canonical: p.canonical,
        image: p.image,
        on: 'post',
        noindex: p.pending,
        body: `<article><div class="meta">${p.category ? `<span class="cat">${esc(CATEGORIES[p.category] || p.category)}</span>` : ''}${fmtDate(p.date)}</div>
<h1>${esc(p.title)}</h1>${p.image ? `<img class="hero" src="${esc(p.image)}" alt="" />` : ''}
<div class="body">${p.html}</div>${where(p.links)}<a class="back" href="/">← 목록으로</a></article>`,
      }),
    );
  }

  fs.writeFileSync(
    path.join(blogDir, 'posts.json'),
    JSON.stringify(posts.map(({ html, canonical, ...rest }) => rest)),
  );

  // sitemap: public/sitemap.xml 에 블로그 주소를 더한다
  const smPath = path.join(DIST, 'sitemap.xml');
  if (fs.existsSync(smPath)) {
    const urls = [`${SITE}/about/`, ...posts.filter((p) => !p.pending && p.canonical.startsWith(SITE)).map((p) => `${SITE}/blog/${p.slug}/`)];
    const add = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
    const sm = fs.readFileSync(smPath, 'utf8').replace('</urlset>', `${add}\n</urlset>`);
    fs.writeFileSync(smPath, sm);
  }
  console.log(`블로그: 글 ${posts.length}편 생성`);
}

main();
