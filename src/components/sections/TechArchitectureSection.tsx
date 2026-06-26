import { Building2, Smartphone } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SolutionImage } from "../visual/SolutionImage";

const techImages = ["/images/solutions/smart-ticket.svg", "/images/solutions/nanum-ax.svg", "/images/solutions/ocr.svg"];

export function TechArchitectureSection() {
  const { t } = useLocale();

  return (
    <section className="section-light">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gov-blue-600">{t.technology.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-gov-blue-950 md:text-4xl">{t.technology.title}</h2>
          <p className="mt-4 text-slate-600">{t.technology.description}</p>
        </div>

        <div className="space-y-5">
          {t.technology.items.map((item, i) => (
            <article key={item.category} className="tech-card overflow-hidden p-0">
              <div className="grid lg:grid-cols-[220px_1fr]">
                <div className="relative hidden min-h-[180px] overflow-hidden bg-gov-blue-950 lg:block">
                  <SolutionImage src={techImages[i] ?? techImages[0]} alt={item.choice} size="hero" />
                  <div className="absolute inset-0 bg-gov-blue-950/20" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gov-blue-600">{item.category}</p>
                  <h3 className="mt-1 text-xl font-black text-gov-blue-950">{item.choice}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.rationale}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.items.map((tag) => (
                      <span key={tag} className="rounded-md border border-gov-blue-100 bg-gov-blue-50 px-3 py-1 text-xs font-medium text-gov-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Tabs defaultValue="official" className="mt-5">
                    <TabsList>
                      <TabsTrigger value="official">
                        <Building2 className="mr-1.5 hidden h-3.5 w-3.5 sm:inline" />
                        {t.technology.tabOfficial}
                      </TabsTrigger>
                      <TabsTrigger value="resident">
                        <Smartphone className="mr-1.5 hidden h-3.5 w-3.5 sm:inline" />
                        {t.technology.tabResident}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="official">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm leading-7 text-slate-700">{item.officialBenefit}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="resident">
                      <div className="rounded-lg border border-gov-blue-100 bg-gov-blue-50 p-4">
                        <p className="text-sm leading-7 text-slate-700">{item.residentBenefit}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
