import { useEffect, useState } from "react";
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import type { Lang } from "@/lib/site";

export function CookieConsentBanner({ lang }: { lang: Lang }) {
  const t = lang === "fr";
  const { consent, preferencesOpen, saveConsent, closePreferences } = useCookieConsent();
  const [preferences, setPreferences] = useState(consent?.preferences ?? false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  useEffect(() => {
    if (!preferencesOpen) return;
    setPreferences(consent?.preferences ?? false);
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
  }, [consent, preferencesOpen]);

  if (!preferencesOpen) return null;
  const rejectAll = () => saveConsent({ preferences: false, analytics: false, marketing: false });
  const acceptAll = () => saveConsent({ preferences: true, analytics: true, marketing: true });

  return <div className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:p-5" role="dialog" aria-modal="true" aria-label={t ? "Préférences cookies" : "Cookie preferences"}>
    <div className="mx-auto max-w-3xl rounded-[1.7rem] border border-blue-200 bg-white p-5 shadow-[0_22px_60px_rgba(5,20,48,0.28)] dark:border-blue-300/20 dark:bg-[#0c1d37] sm:p-6">
      <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-400/15 dark:text-cyan-200"><Cookie className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-xl font-bold text-[#081A3C] dark:text-white">{t ? "Vos préférences de confidentialité" : "Your privacy preferences"}</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{t ? "InnovTech utilise le stockage nécessaire à vos préférences et n’active actuellement ni publicité personnalisée ni mesure d’audience optionnelle." : "InnovTech uses the storage needed for your preferences and currently enables neither personalised advertising nor optional analytics."}</p></div>{consent && <button type="button" onClick={closePreferences} aria-label={t ? "Fermer" : "Close"} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"><X className="h-4 w-4" /></button>}</div>
        <div className="mt-4 grid gap-2 rounded-2xl bg-[#F6F9FF] p-3 dark:bg-[#102747]"><label className="flex items-center justify-between gap-4 text-sm font-bold text-[#081A3C] dark:text-white"><span>{t ? "Préférences d’affichage (langue et thème)" : "Display preferences (language and theme)"}</span><input type="checkbox" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} className="h-4 w-4 accent-blue-700" /></label><label className="flex items-center justify-between gap-4 text-sm font-bold text-slate-700 dark:text-slate-200"><span>{t ? "Mesure d’audience (non active actuellement)" : "Analytics (currently inactive)"}</span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="h-4 w-4 accent-blue-700" /></label><label className="flex items-center justify-between gap-4 text-sm font-bold text-slate-700 dark:text-slate-200"><span>{t ? "Marketing personnalisé (non actif actuellement)" : "Personalised marketing (currently inactive)"}</span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="h-4 w-4 accent-blue-700" /></label></div>
        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-300">{t ? <>Consultez notre <Link href="/cookies" className="font-bold text-blue-700 underline dark:text-cyan-200">politique cookies</Link> et notre <Link href="/confidentialite" className="font-bold text-blue-700 underline dark:text-cyan-200">politique de confidentialité</Link>. Vous pourrez modifier ce choix à tout moment depuis le pied de page.</> : <>See our <Link href="/cookies" className="font-bold text-blue-700 underline dark:text-cyan-200">cookie policy</Link> and <Link href="/confidentialite" className="font-bold text-blue-700 underline dark:text-cyan-200">privacy policy</Link>. You can change this choice at any time from the footer.</>}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={rejectAll} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10">{t ? "Tout refuser" : "Reject all"}</button><button type="button" onClick={() => saveConsent({ preferences, analytics, marketing })} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-extrabold text-blue-700 transition hover:bg-blue-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100">{t ? "Enregistrer mes choix" : "Save my choices"}<Settings2 className="h-4 w-4" /></button><button type="button" onClick={acceptAll} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-extrabold text-white transition hover:bg-blue-800">{t ? "Tout accepter" : "Accept all"}<ShieldCheck className="h-4 w-4" /></button></div>
      </div></div>
    </div>
  </div>;
}
