import { Activity, BrainCircuit, Database, Mic, Scan } from "lucide-react";

const metrics = [
  { icon: Scan, label: "OCR", value: "98.7%", pos: "top-[14%] right-[10%] lg:right-[14%]", delay: "" },
  { icon: Mic, label: "STT", value: "Live", pos: "top-[32%] right-[30%] lg:right-[34%]", delay: "ai-float-delayed" },
  { icon: BrainCircuit, label: "LLM", value: "RAG", pos: "bottom-[38%] right-[8%] lg:right-[12%]", delay: "ai-float" },
  { icon: Database, label: "MyData", value: "0.5s", pos: "bottom-[22%] right-[28%] lg:right-[32%]", delay: "ai-float-delayed" },
];

/** 분석 사이트 스타일 — 배경 위에 떠 있는 실시간 지표 (박스 UI 없음) */
export function HeroAnalysisHUD() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden="true">
      <div className="absolute right-[6%] top-1/2 h-[min(72vw,520px)] w-[min(72vw,520px)] -translate-y-1/2 rounded-full bg-electric-blue-500/10 blur-3xl" />

      {metrics.map((m) => (
        <div
          key={m.label}
          className={`absolute ${m.pos} ${m.delay} flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/50 px-4 py-2 shadow-[0_0_24px_rgba(37,99,235,0.2)] backdrop-blur-md`}
        >
          <m.icon className="h-4 w-4 text-electric-blue-400" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{m.label}</p>
            <p className="text-sm font-black text-white">{m.value}</p>
          </div>
        </div>
      ))}

      <div className="absolute right-[18%] top-[48%] flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 backdrop-blur-sm">
        <Activity className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
        <span className="font-mono text-[11px] font-bold text-emerald-300">AI Pipeline Active</span>
      </div>
    </div>
  );
}
