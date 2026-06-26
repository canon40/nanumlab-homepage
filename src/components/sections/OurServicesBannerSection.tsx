import { ArrowRight } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { useRouter } from "../../router";
import { Button } from "../ui/button";

export function OurServicesBannerSection() {
  const { t } = useLocale();
  const { navigate } = useRouter();
  const o = t.home.ourServices;

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-gov-blue-950 via-slate-950 to-gov-blue-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="section-container relative text-center">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-electric-blue-300">{o.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black tracking-tight md:text-3xl">{o.title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-8 text-slate-300 md:text-lg">{o.description}</p>
        <Button
          size="lg"
          className="mt-8 bg-electric-blue-600 font-bold hover:bg-electric-blue-500"
          onClick={() => navigate("/solutions")}
        >
          {o.cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
