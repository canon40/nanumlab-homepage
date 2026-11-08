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
.empty{color:var(--muted);padding:4rem 0;text-align:center}
article{max-width:44rem;margin:0 auto}article h1{font-size:2rem;line-height:1.35;font-weight:800;margin:.5rem 0 1rem}
article .hero{width:100%;border-radius:.75rem;margin:1.5rem 0;display:block}
.body{font-size:1.05rem}.body h2{font-size:1.4rem;margin:2.5rem 0 .75rem}.body h3{font-size:1.15rem;margin:2rem 0 .5rem}
.body img{max-width:100%;border-radius:.5rem}.body a{color:var(--accent);text-decoration:underline}.body blockquote{margin:1.5rem 0;padding:.5rem 1rem;border-left:3px solid var(--accent);background:#eef2ff;color:#334155}
.back{display:inline-block;margin-top:3rem;color:var(--accent);font-weight:700}
footer{border-top:1px solid var(--line);color:var(--muted);font-size:.8rem;text-align:center;padding:2rem 1rem}
@media(max-width:640px){h1.page{font-size:1.75rem}article h1{font-size:1.6rem}.bar nav a{margin-left:1rem}}
`;

function layout({ title, description, canonical, image, body, on }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${esc(canonical)}" />
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
<header><div class="bar"><a class="brand" href="/">주식회사 나눔랩</a><nav><a href="/">홈</a><a href="/blog/" class="${on ? 'on' : ''}">블로그</a></nav></div></header>
<main>${body}</main>
<footer>&copy; ${new Date().getFullYear()} NANUM LAB Co., Ltd.</footer>
</body>
</html>`;
}

function card(p) {
  return `<a class="card" href="/blog/${p.slug}/" data-cat="${esc(p.category)}">
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
  const chips = cats.length > 1
    ? `<div class="chips"><button class="on" data-c="">전체</button>${cats.map((c) => `<button data-c="${esc(c)}">${esc(CATEGORIES[c] || c)}</button>`).join('')}</div>
<script>document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){var c=b.dataset.c;document.querySelectorAll('.chips button').forEach(function(x){x.classList.toggle('on',x===b)});document.querySelectorAll('.card').forEach(function(el){el.style.display=!c||el.dataset.cat===c?'':'none'})}})</script>`
    : '';
  const list = posts.length ? `<div class="grid">${posts.map(card).join('\n')}</div>` : '<div class="empty">아직 올라온 글이 없습니다.</div>';
  fs.writeFileSync(
    path.join(blogDir, 'index.html'),
    layout({
      title: '블로그 | 주식회사 나눔랩',
      description: '생활·바이크·자동차 표면 관리 정보를 정리한 나눔랩 블로그',
      canonical: `${SITE}/blog/`,
      on: 'list',
      body: `<h1 class="page">블로그</h1><p class="lead">새 글이 올라오면 최신순으로 정리됩니다.</p>${chips}${list}`,
    }),
  );

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
        body: `<article><div class="meta">${p.category ? `<span class="cat">${esc(CATEGORIES[p.category] || p.category)}</span>` : ''}${fmtDate(p.date)}</div>
<h1>${esc(p.title)}</h1>${p.image ? `<img class="hero" src="${esc(p.image)}" alt="" />` : ''}
<div class="body">${p.html}</div><a class="back" href="/blog/">← 목록으로</a></article>`,
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
    const urls = [`${SITE}/blog/`, ...posts.filter((p) => p.canonical.startsWith(SITE)).map((p) => `${SITE}/blog/${p.slug}/`)];
    const add = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
    const sm = fs.readFileSync(smPath, 'utf8').replace('</urlset>', `${add}\n</urlset>`);
    fs.writeFileSync(smPath, sm);
  }
  console.log(`블로그: 글 ${posts.length}편 생성`);
}

main();
