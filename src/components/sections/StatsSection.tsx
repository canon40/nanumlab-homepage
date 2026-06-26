import { companyStats } from "../../data/stats";

interface StatsSectionProps {
  variant?: "hero" | "default";
}

export function StatsSection({ variant = "default" }: StatsSectionProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-md"
          : "border-y border-slate-200 bg-slate-50"
      }
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
        {companyStats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center sm:py-12">
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isHero ? "text-slate-400" : "text-slate-500"}`}>
              {stat.label}
            </p>
            <p className={`mt-3 font-black tracking-tight ${isHero ? "text-white" : "text-slate-950"}`}>
              <span className="text-5xl md:text-6xl">{stat.value}</span>
              <span className="ml-1 text-3xl text-blue-500 md:text-4xl">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
