import { useLocale } from "../../i18n/context";
import { techStackImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SolutionImage } from "../visual/SolutionImage";

export function TechStackSection() {
  const { t } = useLocale();
  const tech = t.home.technology;

  return (
    <section id="technology" className="relative scroll-mt-[72px] overflow-hidden bg-slate-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow="Technology Stack" title={tech.subtitle} dark />
        <Tabs defaultValue={tech.tabs[0]?.id}>
          <TabsList variant="dark" className="mb-6 grid h-auto w-full grid-cols-2 gap-1 lg:grid-cols-4">
            {tech.tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} variant="dark" className="px-2 py-2.5 text-xs sm:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tech.tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                  <SolutionImage
                    src={techStackImages[tab.id] ?? "/images/tech/ai.svg"}
                    alt={`${tab.label} illustration`}
                  />
                </div>
                <div className="p-6">
                  <p className="text-base font-medium leading-8 text-slate-200">{tab.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tab.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-electric-blue-400/30 bg-electric-blue-500/10 px-3 py-1 font-mono text-xs font-bold text-electric-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
