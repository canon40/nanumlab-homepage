import { Activity, BrainCircuit, Cpu, Mic, Scan } from "lucide-react";
import { useLocale } from "../../i18n/context";

const metrics = [
  { label: "OCR", value: "98.7%", icon: Scan },
  { label: "STT", value: "Live", icon: Mic },
  { label: "LLM", value: "RAG", icon: BrainCircuit },
  { label: "Load", value: "12%", icon: Cpu },
];

export function AIDashboardVisual() {
  const { t } = useLocale();
  const d = t.home.hero.dashboard;

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="ai-glow-orb absolute -inset-4 rounded-3xl bg-cyan-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_0_60px_rgba(34,211,238,0.2)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-mono text-[10px] text-cyan-300">{d.title}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
            <Activity className="h-3 w-3 animate-pulse" />
            {d.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-electric-blue-300">
                <m.icon className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase">{m.label}</span>
              </div>
              <p className="mt-2 text-xl font-black text-white">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-4 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">{d.pipeline}</p>
          <div className="flex items-center gap-2">
            {["Input", "AI", "MyData", "Result"].map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-lg border border-electric-blue-500/30 bg-electric-blue-500/10 px-2 py-2 text-center text-[9px] font-semibold text-electric-blue-200">
                  {step}
                </div>
                {i < 3 && <span className="text-slate-600">→</span>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">{d.caption}</p>
        </div>
      </div>
    </div>
  );
}
