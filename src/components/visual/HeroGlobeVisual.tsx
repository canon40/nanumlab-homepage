import { Globe2, Radio, Wifi } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { AIGlobeCanvas } from "../ui/AIGlobeCanvas";

const nodes = [
  { label: "LLM", pos: "top-[12%] left-[8%]" },
  { label: "MyData", pos: "top-[20%] right-[4%]" },
  { label: "OCR", pos: "bottom-[28%] left-[2%]" },
  { label: "Agent", pos: "bottom-[18%] right-[6%]" },
];

export function HeroGlobeVisual() {
  const { t } = useLocale();
  const g = t.home.hero.globe;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg" aria-label={g.ariaLabel}>
      <div className="ai-glow-orb absolute inset-0 rounded-full bg-electric-blue-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 shadow-[0_0_60px_rgba(37,99,235,0.2)] backdrop-blur-sm">
        <AIGlobeCanvas variant="hero" className="absolute inset-0" />

        {nodes.map((node) => (
          <div
            key={node.label}
            className={`ai-float absolute ${node.pos} rounded-lg border border-electric-blue-400/30 bg-slate-900/80 px-2.5 py-1.5 shadow-lg backdrop-blur-sm`}
          >
            <p className="text-[10px] font-bold text-electric-blue-300">{node.label}</p>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-cyan-400" />
            <p className="text-xs font-bold text-white">{g.eyebrow}</p>
            <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-emerald-400">
              <Radio className="h-3 w-3 animate-pulse" />
              Live
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-5 text-slate-400">{g.caption}</p>
        </div>
      </div>

      <div className="ai-float-delayed absolute -right-1 top-1/3 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-slate-900/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
        <Wifi className="h-3 w-3 text-cyan-400" />
        <span className="text-[10px] font-bold text-cyan-300">Global AX</span>
      </div>
    </div>
  );
}
