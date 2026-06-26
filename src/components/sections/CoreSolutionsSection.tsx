import { useLocale } from "../../i18n/context";
import { solutionCardImages } from "../../data/sectionImages";
import { ScenarioTabs } from "../ui/ScenarioTabs";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

const scenarioFallback = {
  before: "도입 전 수기·분산 처리로 현장 부담이 큼.",
  after: "도입 후 자동화·통합 처리로 업무 부담이 크게 줄어듦.",
  resident: "주민이 더 쉽고 빠르게 서비스를 이용할 수 있었음.",
};

export function CoreSolutionsSection() {
  const { t } = useLocale();
  const s = t.home.solutions;

  return (
    <section id="solutions" className="relative scroll-mt-[72px] overflow-hidden bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow="Core Solutions" title={s.subtitle} dark />
        <div className="grid gap-6 lg:grid-cols-2">
          {s.items.map((item) => {
            const imageSrc = solutionCardImages[item.id] ?? "/images/solutions/smart-ticket.svg";
            return (
              <article
                key={item.id}
                id={item.id}
                className="group scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                  <SolutionImage
                    src={imageSrc}
                    alt={`${item.title} illustration`}
                    className="transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-300">{item.flow}</p>
                  <div className="mt-5">
                    <ScenarioTabs
                      variant="dark"
                      before={scenarioFallback.before}
                      after={scenarioFallback.after}
                      resident={scenarioFallback.resident}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
