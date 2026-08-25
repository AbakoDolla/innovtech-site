/** InnovTech design reminder: a bright editorial header with tangible commerce actions and an accessible language switch. */
import { Link, useLocation } from "wouter";
import { Languages, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { Lang } from "@/lib/site";

type SiteHeaderProps = {
  lang: Lang;
  onLanguageChange: (language: Lang) => void;
};

const navigation = {
  fr: [
    ["Accueil", "/"],
    ["Boutique", "/boutique"],
    ["Services", "/services"],
    ["À propos", "/a-propos"],
    ["Contact", "/contact"],
  ],
  en: [
    ["Home", "/"],
    ["Shop", "/boutique"],
    ["Services", "/services"],
    ["About", "/a-propos"],
    ["Contact", "/contact"],
  ],
} as const;

export function SiteHeader({ lang, onLanguageChange }: SiteHeaderProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const t = lang === "fr";

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/90 backdrop-blur-xl">
      <div className="container flex h-[80px] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2" aria-label="InnovTech, accueil">
          <img
            src="/media/innovtech-logo-cropped.png"
            alt="InnovTech"
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t ? "Navigation principale" : "Main navigation"}>
          {navigation[lang].map(([label, href]) => {
            const active = location === href || (href !== "/" && location.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-2 text-sm font-bold transition-colors ${active ? "text-blue-700" : "text-slate-700 hover:text-blue-700"}`}
              >
                {label}
                {active && <span className="absolute inset-x-0 -bottom-[18px] h-0.5 rounded-full bg-blue-600" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex rounded-xl border border-blue-100 bg-blue-50/70 p-1" aria-label={t ? "Choisir la langue" : "Choose language"}>
            <button
              type="button"
              onClick={() => onLanguageChange("fr")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-extrabold transition ${lang === "fr" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-blue-700"}`}
              aria-pressed={lang === "fr"}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-extrabold transition ${lang === "en" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-blue-700"}`}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <Link href="/boutique" className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(18,103,243,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[0.97]">
            <ShoppingBag className="h-4 w-4" />
            {t ? "Commander" : "Order"}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 text-blue-700 transition hover:bg-blue-50 active:scale-[0.97]"
            onClick={() => onLanguageChange(lang === "fr" ? "en" : "fr")}
            aria-label={t ? "Passer à l’anglais" : "Switch to French"}
          >
            <Languages className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white transition hover:bg-blue-800 active:scale-[0.97]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={t ? "Ouvrir le menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-blue-100 bg-white px-4 py-4 shadow-xl lg:hidden">
          <nav className="mx-auto grid max-w-xl gap-1" aria-label={t ? "Navigation mobile" : "Mobile navigation"}>
            {navigation[lang].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${location === href ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-700">{t ? "Langue" : "Language"}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => onLanguageChange("fr")} className={`rounded-lg px-3 py-1.5 text-xs font-extrabold ${lang === "fr" ? "bg-blue-700 text-white" : "bg-white text-slate-500"}`}>FR</button>
                <button type="button" onClick={() => onLanguageChange("en")} className={`rounded-lg px-3 py-1.5 text-xs font-extrabold ${lang === "en" ? "bg-blue-700 text-white" : "bg-white text-slate-500"}`}>EN</button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
