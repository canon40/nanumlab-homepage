import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = { living: '리빙', bike: '바이크', car: '자동차' };

// 빌드 때 만들어지는 /blog/posts.json(최신순)을 읽어 최근 글 3편을 보여 준다. 글이 없으면 숨긴다.
export default function LatestPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blog/posts.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => setPosts(Array.isArray(list) ? list.slice(0, 3) : []))
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex items-end justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">최신 글</h2>
          <a href="/blog/" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            전체 보기 <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <a
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {p.image && <img src={p.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover bg-slate-100" />}
              <div className="p-5">
                <div className="text-xs text-slate-500">
                  {p.category && <span className="mr-2 font-bold text-indigo-600">{CATEGORIES[p.category] || p.category}</span>}
                  {String(p.date).slice(0, 10)}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold leading-snug text-slate-950 group-hover:text-indigo-700">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
