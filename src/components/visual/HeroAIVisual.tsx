import { Activity, BrainCircuit, Database, Sparkles } from "lucide-react";
import { useLocale } from "../../i18n/context";

const pipelineNodes = [
  { icon: Sparkles, label: "LLM", color: "text-electric-blue-400" },
  { icon: Database, label: "MyData", color: "text-cyan-400" },
  { icon: BrainCircuit, label: "Agent", color: "text-violet-400" },
];

export function HeroAIVisual() {
  const { t } = useLocale();
  const term = t.home.hero.terminal;

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="ai-glow-orb absolute -right-8 top-8 h-48 w-48 rounded-full bg-electric-blue-500/30 blur-3xl" aria-hidden="true" />
      <div className="ai-glow-orb absolute -left-4 bottom-12 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_0_60px_rgba(37,99,235,0.25)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-[10px] text-slate-500">{term.filename}</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
            <Activity className="h-3 w-3 animate-pulse" />
            {term.status}
          </span>
        </div>

        <div className="space-y-1.5 p-5 font-mono text-xs leading-6 text-slate-300">
          <p className="text-electric-blue-400">{term.comment}</p>
          <p>
            <span className="text-cyan-400">import</span> {"{ MyDataEngine, LLMAgent }"}{" "}
            <span className="text-cyan-400">from</span> <span className="text-amber-300">&apos;@nanumlab/ai&apos;</span>;
          </p>
          <p>
            <span className="text-cyan-400">const</span> pipeline = <span className="text-cyan-400">await</span>{" "}
            <span className="text-violet-300">runAIPipeline</span>({"{"}
          </p>
          <p className="pl-4">
            input: <span className="text-amber-300">&quot;감면 자격 확인&quot;</span>,
          </p>
          <p className="pl-4">
            mydata: <span className="text-emerald-400">true</span>,
          </p>
          <p className="pl-4">
            onPremise: <span className="text-emerald-400">true</span>,
          </p>
          <p>{"});"}</p>
          <p className="text-emerald-400">
            → eligibility: <span className="text-white">verified</span>
            <span className="ai-cursor ml-0.5 inline-block h-3.5 w-1.5 bg-electric-blue-400" />
          </p>
        </div>

        <div className="border-t border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {pipelineNodes.map((node, i) => (
              <div key={node.label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <node.icon className={`h-4 w-4 ${node.color}`} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{node.label}</span>
                </div>
                {i < pipelineNodes.length - 1 && (
                  <div className="ai-flow-line mb-4 h-px flex-1 bg-gradient-to-r from-electric-blue-500/60 to-cyan-400/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ai-float absolute -right-2 top-1/4 rounded-lg border border-electric-blue-400/30 bg-slate-900/90 px-3 py-2 shadow-lg backdrop-blur-sm">
        <p className="text-[10px] font-bold text-electric-blue-300">OCR</p>
        <p className="text-xs font-black text-white">98.7%</p>
      </div>
      <div className="ai-float-delayed absolute -left-2 bottom-1/4 rounded-lg border border-cyan-400/30 bg-slate-900/90 px-3 py-2 shadow-lg backdrop-blur-sm">
        <p className="text-[10px] font-bold text-cyan-300">STT</p>
        <p className="text-xs font-black text-white">Live</p>
      </div>
    </div>
  );
}
