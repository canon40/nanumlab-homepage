import { useLocale } from "../../i18n/context";
import { corporateServiceImages } from "../../data/sectionImages";
import { SectionHeader } from "../ui/SectionHeader";
import { SolutionImage } from "../visual/SolutionImage";

export function CorporateServicesSection() {
  const { t } = useLocale();
  const s = t.home.corporateServices;

  return (
    <section id="corporate-services" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="section-container relative">
        <SectionHeader eyebrow={s.eyebrow} title={s.title} description={s.description} dark align="center" />
        <div className="grid gap-5 sm:grid-cols-2">
          {s.items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-electric-blue-400/40"
            >
              <div className="aspect-[20/9] overflow-hidden border-b border-white/10 bg-gov-blue-950">
                <SolutionImage
                  src={corporateServiceImages[item.id] ?? corporateServiceImages["ai-ml"]}
                  alt={item.title}
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2 text-base font-medium leading-7 text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
