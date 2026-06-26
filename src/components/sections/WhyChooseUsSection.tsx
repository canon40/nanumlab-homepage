import { useLocale } from "../../i18n/context";
import { whyChooseImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function WhyChooseUsSection() {
  const { t } = useLocale();
  const w = t.home.whyChooseUs;

  return (
    <section id="why-choose-us" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow={w.eyebrow} title={w.title} description={w.headline} dark align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {w.pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-electric-blue-400/40"
            >
              <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                <SolutionImage
                  src={whyChooseImages[pillar.id] ?? whyChooseImages["ai-ml"]}
                  alt={pillar.title}
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-white">{pillar.title}</h3>
                <p className="mt-2 text-base font-medium leading-7 text-slate-300">{pillar.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
