// 퍼마코트 브랜드 사이트(D:\@code\homepage, github canon40/HOMEPAGE)를 nanumlab.store/permacoat/ 로 싣는다.
// 2026-11-09 사용자: "홈페이지에서 D:\@code\homepage 홈페이지를 연동하게 해줘".
// 원본은 그쪽 저장소에서 고치고, 바뀌면 이 스크립트를 다시 돌려 public/permacoat/ 를 갱신한 뒤 커밋·푸시한다.
//   node scripts/sync-brand.mjs            (원본 경로: 환경변수 BRAND_SRC, 기본 ../homepage)
// 화면에서 쓰는 파일만 옮긴다 (안 쓰는 41MB car_titan_detail.html, 영상·템플릿 폴더는 뺀다).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.resolve(process.env.BRAND_SRC || path.join(ROOT, '..', 'homepage'));
const OUT = path.join(ROOT, 'public', 'permacoat');
const ITEMS = ['index.html', 'permacoat_car_series.html', 'permacoat_bike_series.html', 'css', 'js', 'images', 'docs/manuals'];

// 브랜드 사이트 위쪽에 블로그로 돌아가는 줄을 넣는다 (원본 파일은 건드리지 않음)
const BAR = `<div style="background:#16161a;color:#eee;font:600 14px/1.4 'Noto Sans KR',system-ui,sans-serif;padding:8px 16px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;position:relative;z-index:9999">
<a href="/" style="color:#fff;text-decoration:none">← 나눔랩 코팅 블로그</a>
<a href="https://smartstore.naver.com/nanumlab" target="_blank" rel="noopener" style="color:#ff8a3d;text-decoration:none">스마트스토어</a></div>`;

if (!fs.existsSync(path.join(SRC, 'index.html'))) {
  console.error(`브랜드 사이트 원본이 없습니다: ${SRC}`);
  process.exit(1);
}
fs.rmSync(OUT, { recursive: true, force: true });
for (const item of ITEMS) {
  const from = path.join(SRC, item);
  if (!fs.existsSync(from)) {
    console.warn(`  없음(건너뜀): ${item}`);
    continue;
  }
  fs.cpSync(from, path.join(OUT, item), { recursive: true });
}
for (const page of ['index.html', 'permacoat_car_series.html', 'permacoat_bike_series.html']) {
  const f = path.join(OUT, page);
  if (!fs.existsSync(f)) continue;
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('나눔랩 코팅 블로그')) h = h.replace(/<body([^>]*)>/i, `<body$1>\n${BAR}`);
  if (!/rel="canonical"/.test(h)) {
    const url = `https://nanumlab.store/permacoat/${page === 'index.html' ? '' : page}`;
    h = h.replace(/<\/head>/i, `<link rel="canonical" href="${url}" />\n</head>`);
  }
  fs.writeFileSync(f, h);
}
const size = (d) => fs.readdirSync(d, { recursive: true }).reduce((n, f) => {
  const p = path.join(d, String(f));
  return n + (fs.statSync(p).isFile() ? fs.statSync(p).size : 0);
}, 0);
console.log(`브랜드 사이트 → public/permacoat/ (${(size(OUT) / 1048576).toFixed(1)}MB)`);
