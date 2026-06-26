import { Lock, FileCheck, Heart } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { Badge } from "../ui/badge";
import { SectionHeader } from "../ui/SectionHeader";

const icons = [Lock, FileCheck, Heart];

export function NanumEdgeSection() {
  const { t } = useLocale();
  const e = t.home.edge;

  return (
    <section id="edge" className="relative scroll-mt-[72px] bg-gov-blue-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader title={e.title} dark />
        <blockquote className="mx-auto mb-12 max-w-3xl border-l-4 border-electric-blue-500 pl-6 text-base italic text-gov-blue-100 md:text-lg">
          {e.quote}
        </blockquote>
        <div className="grid gap-6 lg:grid-cols-3">
          {e.items.map((item, i) => {
            const Icon = icons[i] ?? Lock;
            return (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge className="border-electric-blue-400/30 bg-electric-blue-500/20 text-electric-blue-200">{item.badge}</Badge>
                </div>
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
