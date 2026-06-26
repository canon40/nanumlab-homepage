import { useLocale } from "../../i18n/context";
import { SectionHeader } from "../ui/SectionHeader";

export function RoadmapSection() {
  const { t } = useLocale();
  const r = t.home.roadmap;

  return (
    <section id="roadmap" className="section-light scroll-mt-[72px]">
      <div className="section-container">
        <SectionHeader eyebrow="Roadmap" title={r.title} />
        <div className="grid gap-5 md:grid-cols-3">
          {r.phases.map((phase, i) => (
            <article key={phase.phase} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-electric-blue-600">{phase.phase}</div>
              <h3 className="mt-2 text-lg font-black text-gov-blue-950">{phase.label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{phase.body}</p>
              {i < r.phases.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-electric-blue-300 md:block" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
