import { useLocale } from "../../i18n/context";

export function AIStatsStrip() {
  const { t } = useLocale();
  const stats = t.home.hero.stats;

  return (
    <div className="border-y border-white/10 bg-slate-950/50 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-950/80 px-6 py-5 text-center">
            <p className="text-2xl font-black tracking-tight text-electric-blue-400 md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
