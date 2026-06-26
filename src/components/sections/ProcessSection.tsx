import { useLocale } from "../../i18n/context";
import { processImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function ProcessSection() {
  const { t } = useLocale();
  const p = t.home.process;

  return (
    <section id="process" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="section-container relative">
        <SectionHeader eyebrow={p.eyebrow} title={p.title} description={p.description} dark align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {p.steps.map((step) => (
            <article
              key={step.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                <SolutionImage src={processImages[step.id] ?? processImages.analyze} alt={step.title} />
                <span className="absolute left-3 top-3 rounded-full border border-electric-blue-400/40 bg-slate-950/80 px-3 py-1 font-mono text-xs font-bold text-electric-blue-300">
                  {step.step}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-base font-medium leading-7 text-slate-300">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
