import { useState } from "react";
import { solutionCatalog } from "../../data/solutionCatalog";
import { useLocale } from "../../i18n/context";
import { Link } from "../../router";
import { SolutionImage } from "../visual/SolutionImage";

const groupPreviewImages: Record<string, string[]> = {
  solutions: solutionCatalog.map((s) => s.image),
  technology: ["/images/solutions/nanum-ax.svg", "/images/solutions/smart-ticket.svg"],
  about: ["/images/solutions/smart-ticket.svg", "/images/solutions/geo.svg"],
};

interface NavMegaMenuProps {
  groupKey: "solutions" | "technology" | "about";
  path: string;
  onClose?: () => void;
  mobile?: boolean;
}

export function NavMegaMenu({ groupKey, path, onClose, mobile = false }: NavMegaMenuProps) {
  const { t } = useLocale();
  const items = t.navDropdown[groupKey];
  const images = groupPreviewImages[groupKey];
  const [activeIndex, setActiveIndex] = useState(0);

  const catalog = groupKey === "solutions" ? solutionCatalog[activeIndex] : null;
  const previewImage = images[activeIndex] ?? images[0];
  const previewTitle = catalog?.productName ?? items[activeIndex]?.label;
  const previewDesc =
    catalog?.productCategory ??
    ("desc" in items[activeIndex] ? items[activeIndex].desc : items[activeIndex]?.label);

  const linkPath = catalog ? `${catalog.path}${catalog.hash}` : path;

  if (mobile) {
    return (
      <>
        {items.map((item, index) => {
          const cat = groupKey === "solutions" ? solutionCatalog[index] : null;
          const to = cat ? `${cat.path}${cat.hash}` : path;
          return (
            <Link
              key={item.label}
              to={to}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600"
              onClick={onClose}
            >
              <SolutionImage src={images[index] ?? images[0]} alt={item.label} size="thumb" className="ring-1 ring-slate-200" />
              {item.label}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
      <div className="w-[280px] shrink-0 border-r border-slate-100">
        {items.map((item, index) => {
          const cat = groupKey === "solutions" ? solutionCatalog[index] : null;
          const to = cat ? `${cat.path}${cat.hash}` : path;
          return (
            <Link
              key={item.label}
              to={to}
              className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 last:border-0 transition hover:bg-gov-blue-50 ${
                activeIndex === index ? "bg-gov-blue-50" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={onClose}
            >
              <SolutionImage
                src={images[index] ?? images[0]}
                alt={item.label}
                size="thumb"
                className="shrink-0 ring-1 ring-slate-200"
              />
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-gov-blue-950">{item.label}</span>
                {"desc" in item && item.desc && (
                  <span className="mt-0.5 block truncate text-xs text-slate-500">{item.desc}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="hidden w-[300px] shrink-0 bg-gov-blue-950 p-4 sm:block">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="aspect-[4/3]">
            <SolutionImage src={previewImage} alt={previewTitle ?? ""} size="hero" />
          </div>
        </div>
        <p className="mt-3 text-sm font-bold text-white">{previewTitle}</p>
        <p className="mt-1 text-xs text-gov-blue-200">{previewDesc}</p>
        <Link
          to={linkPath}
          className="mt-3 inline-block text-xs font-semibold text-gov-blue-300 hover:text-white"
          onClick={onClose}
        >
          {t.scenarios.expandHint} →
        </Link>
      </div>
    </div>
  );
}
