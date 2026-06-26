import { useLocale } from "../../i18n/context";
import { futureTechImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function FutureTechSection() {
  const { t } = useLocale();
  const f = t.home.futureTech;

  return (
    <section id="future-tech" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow="Future Technology" title={f.subtitle} dark />
        <div className="grid gap-6 md:grid-cols-2">
          {f.items.map((item) => {
            const imageSrc = futureTechImages[item.id] ?? "/images/solutions/geo.svg";
            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-electric-blue-400/40"
              >
                <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                  <SolutionImage src={imageSrc} alt={`${item.title} illustration`} className="group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-300">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
