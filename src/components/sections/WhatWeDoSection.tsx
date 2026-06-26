import { useLocale } from "../../i18n/context";
import { whatWeDoImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function WhatWeDoSection() {
  const { t } = useLocale();
  const w = t.home.whatWeDo;

  return (
    <section id="what-we-do" className="relative scroll-mt-[72px] overflow-hidden bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow={w.eyebrow} title={w.subtitle} align="left" dark />
        <div className="grid gap-5 md:grid-cols-3">
          {w.cards.map((card, i) => {
            const imageSrc = whatWeDoImages[i] ?? whatWeDoImages[0];
            return (
              <article
                key={card.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-electric-blue-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              >
                <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                  <SolutionImage
                    src={imageSrc}
                    alt={`${card.title} illustration`}
                    className="transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-white">{card.title}</h3>
                  <p className="mt-2 text-base font-medium leading-7 text-slate-300">{card.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
