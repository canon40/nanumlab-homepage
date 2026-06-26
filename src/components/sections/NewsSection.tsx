import { ArrowRight } from "lucide-react";
import { newsItems } from "../../data/news";
import { useLocale } from "../../i18n/context";
import { Link } from "../../router";
import { Button } from "../ui/button";

interface NewsSectionProps {
  limit?: number;
  showAll?: boolean;
}

export function NewsSection({ limit, showAll = false }: NewsSectionProps) {
  const { t } = useLocale();
  const items = showAll ? newsItems : newsItems.slice(0, limit ?? newsItems.length);

  return (
    <section className="section-light border-t border-slate-200">
      <div className="section-container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-gov-blue-600">{t.news.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gov-blue-950 md:text-4xl">{t.news.title}</h2>
            <p className="mt-3 max-w-xl text-slate-600">{t.news.description}</p>
          </div>
          {!showAll && (
            <Link to="/news">
              <Button variant="outline" className="shrink-0 border-gov-blue-200 text-gov-blue-900">
                {t.news.readMore} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article key={item.title} className={`news-card group ${index === 0 && !showAll ? "md:col-span-2" : ""}`}>
              <div className="flex items-center gap-3">
                {item.isNew && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gov-blue-800 text-[10px] font-black text-white">
                    N
                  </span>
                )}
                <time className="text-sm text-slate-500">{item.date}</time>
              </div>
              <h3 className={`mt-3 font-bold text-gov-blue-950 group-hover:text-gov-blue-700 ${index === 0 && !showAll ? "text-xl" : "text-base"}`}>
                {item.title}
              </h3>
              <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-semibold text-gov-blue-700 hover:text-gov-blue-900">
                {t.news.viewMore} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
