import { ArrowRight, Sparkles } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { useRouter } from "../../router";
import { AIVideoBackground } from "../ui/AIVideoBackground";
import { Button } from "../ui/button";
import { HeroAnalysisHUD } from "../visual/HeroAnalysisHUD";
import { AIStatsStrip } from "./AIStatsStrip";

export function HeroSection() {
  const { t } = useLocale();
  const { navigate } = useRouter();
  const h = t.home.hero;

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <AIVideoBackground />
      <HeroAnalysisHUD />
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="section-container relative z-10 flex min-h-[calc(100vh-72px)] items-center py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric-blue-500/40 bg-electric-blue-500/15 px-4 py-2">
            <Sparkles className="h-4 w-4 animate-pulse text-electric-blue-300" />
            <p className="text-sm font-bold tracking-wide text-electric-blue-200">{h.eyebrow}</p>
          </div>

          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-[3.25rem]">
            <span className="bg-gradient-to-r from-white via-white to-electric-blue-200 bg-clip-text text-transparent">
              {h.headline}
            </span>
          </h1>

          <p className="mt-6 text-lg font-medium leading-8 text-slate-200 md:text-xl md:leading-9">{h.subcopy}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {h.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-bold text-electric-blue-200 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-electric-blue-600 text-base font-bold shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:bg-electric-blue-500"
              onClick={() => navigate("/solutions")}
            >
              {h.ctaSolutions} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-base font-bold text-white hover:bg-white/15"
              onClick={() => navigate("/contact")}
            >
              {h.ctaContact}
            </Button>
          </div>
        </div>
      </div>

      <AIStatsStrip />
    </section>
  );
}
