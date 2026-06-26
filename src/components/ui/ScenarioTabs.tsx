import { ArrowRight, Building2, Smartphone } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { scenarioImages } from "../../data/sectionImages";
import { cn } from "../../lib/utils";
import { Link } from "../../router";
import { SolutionImage } from "../visual/SolutionImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export function PartnerBanner() {
  const { t } = useLocale();
  const sc = t.home.scenarios;

  return (
    <section className="border-y border-gov-blue-200 bg-gov-blue-900 text-white">
      <div className="section-container py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gov-blue-300">{t.partner.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-snug md:text-3xl">{t.partner.headline}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gov-blue-100 md:text-base">{t.partner.body}</p>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gov-blue-100">
          {t.partner.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

interface ScenarioTabsProps {
  before: string;
  after: string;
  resident: string;
  variant?: "light" | "dark";
  className?: string;
}

function ScenarioVisual({ src, alt, label, labelClass, text, textClass }: {
  src: string;
  alt: string;
  label: string;
  labelClass: string;
  text: string;
  textClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="aspect-[20/7] bg-gov-blue-950">
        <SolutionImage src={src} alt={alt} />
      </div>
      <div className="p-3">
        <p className={labelClass}>{label}</p>
        <p className={cn("mt-1.5 text-sm font-medium leading-6", textClass)}>{text}</p>
      </div>
    </div>
  );
}

export function ScenarioTabs({ before, after, resident, variant = "light", className }: ScenarioTabsProps) {
  const { t } = useLocale();
  const sc = t.home.scenarios;
  const isDark = variant === "dark";

  return (
    <Tabs defaultValue="official" className={className}>
      <TabsList variant={variant} className={isDark ? "border-white/10 bg-white/5" : undefined}>
        <TabsTrigger value="official" variant={variant}>
          <Building2 className="mr-1.5 hidden h-3.5 w-3.5 sm:inline" />
          {sc.tabOfficial}
        </TabsTrigger>
        <TabsTrigger value="resident" variant={variant}>
          <Smartphone className="mr-1.5 hidden h-3.5 w-3.5 sm:inline" />
          {sc.tabResident}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="official">
        <div className="grid gap-3 sm:grid-cols-2">
          <ScenarioVisual
            src={scenarioImages.before}
            alt={sc.before}
            label={sc.before}
            labelClass={cn("text-[11px] font-bold uppercase tracking-wider", isDark ? "text-red-300" : "text-red-600")}
            text={before}
            textClass={isDark ? "text-slate-300" : "text-slate-700"}
          />
          <ScenarioVisual
            src={scenarioImages.after}
            alt={sc.after}
            label={sc.after}
            labelClass={cn("text-[11px] font-bold uppercase tracking-wider", isDark ? "text-emerald-300" : "text-emerald-700")}
            text={after}
            textClass={isDark ? "text-slate-300" : "text-slate-700"}
          />
        </div>
      </TabsContent>

      <TabsContent value="resident">
        <ScenarioVisual
          src={scenarioImages.resident}
          alt={sc.residentStory}
          label={sc.residentStory}
          labelClass={cn("text-[11px] font-bold uppercase tracking-wider", isDark ? "text-electric-blue-300" : "text-gov-blue-600")}
          text={`"${resident}"`}
          textClass={cn("italic", isDark ? "text-slate-200" : "text-slate-700")}
        />
      </TabsContent>
    </Tabs>
  );
}

interface BeforeAfterRowProps {
  before: string;
  after: string;
  variant?: "light" | "dark";
}

export function BeforeAfterRow({ before, after, variant = "light" }: BeforeAfterRowProps) {
  const { t } = useLocale();
  const sc = t.home.scenarios;
  const isDark = variant === "dark";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <ScenarioVisual
        src={scenarioImages.before}
        alt={sc.before}
        label={sc.before}
        labelClass={cn("text-[11px] font-bold uppercase", isDark ? "text-red-300" : "text-red-600")}
        text={before}
        textClass={isDark ? "text-slate-300" : "text-slate-700"}
      />
      <ScenarioVisual
        src={scenarioImages.after}
        alt={sc.after}
        label={sc.after}
        labelClass={cn("text-[11px] font-bold uppercase", isDark ? "text-emerald-300" : "text-emerald-700")}
        text={after}
        textClass={isDark ? "text-slate-300" : "text-slate-700"}
      />
    </div>
  );
}
