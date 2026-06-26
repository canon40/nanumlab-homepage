import { ArrowRight } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { SectionHeader } from "../ui/SectionHeader";
import { Separator } from "../ui/separator";

export function PlatformArchitectureSection() {
  const { t } = useLocale();
  const a = t.home.architecture;

  return (
    <section id="architecture" className="relative scroll-mt-[72px] bg-gov-blue-950 text-white">
      <div className="ai-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="section-container relative">
        <SectionHeader eyebrow="Platform Architecture" title={a.title} dark />
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex min-w-[640px] flex-wrap items-center justify-center gap-2 md:gap-3">
            {a.flow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-electric-blue-400/30 bg-gov-blue-900 px-3 py-2 text-center text-xs font-semibold text-white sm:text-sm">
                  {step}
                </span>
                {i < a.flow.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-electric-blue-400" />}
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-8 bg-white/10" />
        <p className="mx-auto max-w-4xl text-center text-sm leading-8 text-slate-300 md:text-base">{a.footer}</p>
      </div>
    </section>
  );
}
