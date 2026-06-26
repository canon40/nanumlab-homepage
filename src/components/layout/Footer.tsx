import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { appRoutes } from "../../config/routes";
import { useLocale } from "../../i18n/context";
import { Link } from "../../router";

function SocialIcon({ children, label, href }: { children: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { t } = useLocale();
  const f = t.home.footer;
  const nav = t.home.nav;

  return (
    <footer className="bg-gradient-to-br from-[#7b6cf0] via-[#6c5ce7] to-[#5a4bd1] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-semibold tracking-tight lowercase">
              nanumlab
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/85">{f.desc}</p>
            <div className="mt-6 flex gap-3">
              <SocialIcon label="Facebook" href="https://facebook.com">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="X (Twitter)" href="https://twitter.com">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://linkedin.com">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold">{f.quickLinks}</h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {appRoutes.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-white/80 transition hover:text-white">
                  {nav[item.labelKey]}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-base font-bold">{f.support}</h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              <a href="#privacy" className="text-sm text-white/80 transition hover:text-white">
                {f.links.privacy}
              </a>
              <a href="#terms" className="text-sm text-white/80 transition hover:text-white">
                {f.links.terms}
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-base font-bold">{f.quickContact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
                <span className="leading-6">{f.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
                <a href={`mailto:${f.email}`} className="transition hover:text-white">
                  {f.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
                <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="transition hover:text-white">
                  {f.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {f.copyright.replace(/^©\s*/, "")}
        </div>
      </div>
    </footer>
  );
}
