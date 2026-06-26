import { useLocale } from "../../i18n/context";

export function CompanyStatsSection() {
  const { t } = useLocale();
  const stats = t.home.companyStats;

  return (
    <section className="border-y border-white/10 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-950 px-6 py-8 text-center">
            <p className="text-3xl font-black tracking-tight text-electric-blue-400 md:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
