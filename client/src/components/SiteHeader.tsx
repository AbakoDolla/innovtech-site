/** InnovTech design reminder: a bright editorial header with tangible commerce actions and an accessible language switch. */
import { Link, useLocation } from "wouter";
import { Languages, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { theme, toggleTheme } = useTheme();
  const t = lang === "fr";
  const dark = theme === "dark";

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-blue-100/80 bg-white/90 backdrop-blur-xl">
      <div className="container flex h-[74px] items-center justify-between gap-3 sm:h-[80px] sm:gap-4">
        <Link href="/" className="group flex min-w-0 items-center" aria-label="InnovTech, accueil">
          <img
            src="/media/branding/innovtech-logo.png"
            alt="InnovTech"
            decoding="async"
            fetchPriority="high"
            className="h-16 w-[6.5rem] object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-[4.1rem] sm:w-auto"
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
          <button type="button" onClick={toggleTheme} aria-label={dark ? (t ? "Passer au thème clair" : "Switch to light theme") : (t ? "Passer au thème sombre" : "Switch to dark theme")} aria-pressed={dark} className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.97]">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
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

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button type="button" onClick={toggleTheme} aria-label={dark ? (t ? "Passer au thème clair" : "Switch to light theme") : (t ? "Passer au thème sombre" : "Switch to dark theme")} aria-pressed={dark} className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-700 transition hover:bg-blue-50 active:scale-[0.97]">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-blue-100 px-2 text-xs font-extrabold text-blue-700 transition hover:bg-blue-50 active:scale-[0.97]"
            onClick={() => onLanguageChange(lang === "fr" ? "en" : "fr")}
            aria-label={t ? "Passer à l’anglais" : "Switch to French"}
          >
            <Languages className="h-4 w-4" /><span>{lang.toUpperCase()}</span>
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-700 px-3 text-xs font-extrabold text-white transition hover:bg-blue-800 active:scale-[0.97]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={t ? "Ouvrir le menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}<span>{t ? "Menu" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="site-mobile-menu border-t border-blue-100 bg-white px-4 py-5 shadow-2xl lg:hidden">
          <nav className="mx-auto grid max-w-xl gap-2" aria-label={t ? "Navigation mobile" : "Mobile navigation"}>
            {navigation[lang].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-4 text-base font-bold ${location === href ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}
              >
                {label}
              </Link>
            ))}
            <Link href="/boutique" className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 py-4 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(18,103,243,0.22)]">
              <ShoppingBag className="h-4 w-4" />{t ? "Découvrir la boutique" : "Explore the shop"}
            </Link>
            <div className="mt-1 flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-700">{t ? "Langue" : "Language"}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => onLanguageChange("fr")} className={`rounded-lg px-3 py-1.5 text-xs font-extrabold ${lang === "fr" ? "bg-blue-700 text-white" : "bg-white text-slate-500"}`}>FR</button>
                <button type="button" onClick={() => onLanguageChange("en")} className={`rounded-lg px-3 py-1.5 text-xs font-extrabold ${lang === "en" ? "bg-blue-700 text-white" : "bg-white text-slate-500"}`}>EN</button>
              </div>
            </div>
            <button type="button" onClick={toggleTheme} className="theme-menu-row flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <span>{t ? "Apparence" : "Appearance"}</span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-extrabold text-blue-700 shadow-sm">{dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}{dark ? (t ? "Clair" : "Light") : (t ? "Sombre" : "Dark")}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
