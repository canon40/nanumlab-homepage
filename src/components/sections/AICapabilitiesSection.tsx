import { useLocale } from "../../i18n/context";
import { aiCapabilityImages } from "../../data/aiCapabilityImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function AICapabilitiesSection() {
  const { t } = useLocale();
  const ai = t.home.aiCapabilities;

  return (
    <section id="ai-capabilities" className="relative scroll-mt-[72px] overflow-hidden bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow={ai.eyebrow} title={ai.title} description={ai.description} dark align="center" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ai.items.map((item, i) => {
            const imageSrc = aiCapabilityImages[i] ?? aiCapabilityImages[0];
            return (
              <article
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-electric-blue-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              >
                <div className="relative aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                  <SolutionImage
                    src={imageSrc}
                    alt={`${item.title} 일러스트`}
                    className="transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 rounded-full border border-electric-blue-400/30 bg-slate-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-electric-blue-300 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-base font-medium leading-7 text-slate-300">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
