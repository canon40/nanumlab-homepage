import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { appRoutes } from "../../config/routes";
import { useLocale } from "../../i18n/context";
import { Link, useRouter } from "../../router";
import { Button } from "../ui/button";

function LangSwitch() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-sm font-bold">
      <button
        type="button"
        onClick={() => setLocale("ko")}
        className={`rounded-md px-2.5 py-1 transition ${locale === "ko" ? "bg-white text-gov-blue-950 shadow-sm" : "text-slate-700"}`}
      >
        KR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-md px-2.5 py-1 transition ${locale === "en" ? "bg-white text-gov-blue-950 shadow-sm" : "text-slate-700"}`}
      >
        EN
      </button>
    </div>
  );
}

export function Header() {
  const { path } = useRouter();
  const { t } = useLocale();
  const nav = t.home.nav;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const linkClass = (to: string) =>
    `rounded-lg px-3.5 py-2.5 text-[15px] font-bold transition ${
      path === to ? "bg-gov-blue-50 text-gov-blue-950" : "text-slate-800 hover:bg-gov-blue-50 hover:text-gov-blue-950"
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[72px] lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gov-blue-900 text-sm font-black text-white">
            N
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-black tracking-tight text-gov-blue-950">{t.brand.name}</div>
            <div className="text-xs font-semibold text-slate-700">{t.brand.tagline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {appRoutes.map((item) => (
            <Link key={item.path} to={item.path} className={linkClass(item.path)}>
              {nav[item.labelKey]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <Link to="/contact" className="hidden sm:block">
            <Button size="default" className="bg-gov-blue-800 text-[15px] font-bold hover:bg-gov-blue-700">
              {nav.contact}
            </Button>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {appRoutes.map((item) => (
              <Link key={item.path} to={item.path} className={`${linkClass(item.path)} px-4 py-3`}>
                {nav[item.labelKey]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
