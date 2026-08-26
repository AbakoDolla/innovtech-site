/** InnovTech design reminder: the footer is a calm trust-building landing area, never a dense afterthought. */
import { Link } from "wouter";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Share2 } from "lucide-react";
import type { Lang } from "@/lib/site";
import { SOCIAL_PROFILES, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = lang === "fr";
  const links = [
    [t ? "Boutique" : "Shop", "/boutique"],
    [t ? "Services" : "Services", "/services"],
    [t ? "À propos" : "About", "/a-propos"],
    [t ? "Contact" : "Contact", "/contact"],
  ];
  const profiles = [
    { label: "Facebook", href: SOCIAL_PROFILES.facebook, icon: Facebook },
    { label: "Instagram", href: SOCIAL_PROFILES.instagram, icon: Instagram },
    { label: "LinkedIn", href: SOCIAL_PROFILES.linkedin, icon: Linkedin },
  ].filter((profile) => Boolean(profile.href));

  return (
    <footer className="mt-8 overflow-hidden bg-[#071A36] text-white">
      <div className="relative container py-12 sm:py-16">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="relative grid gap-7 lg:grid-cols-[1.35fr_0.7fr_0.9fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/20 bg-white/5"><img src="/media/branding/innovtech-symbol.png" alt="" className="h-9 w-9 object-contain" /></span>
              <span className="font-display text-2xl font-bold tracking-[-0.05em] text-white">Innov<span className="text-cyan-300">Tech</span></span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-blue-100/80">
              {t ? "Des articles high-tech et des solutions digitales pensés pour vous aider à avancer, à votre rythme." : "High-tech products and digital solutions designed to help you move forward, at your own pace."}
            </p>
            <a href={whatsappUrl(t ? "Bonjour InnovTech, je souhaite vous contacter." : "Hello InnovTech, I would like to contact you.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2.5 text-sm font-extrabold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-cyan-300/15 hover:text-white">
              <WhatsAppIcon className="h-4 w-4" /> {t ? "Écrire sur WhatsApp" : "Message on WhatsApp"} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{t ? "Explorer" : "Explore"}</p>
            <ul className="mt-4 grid gap-3">
              {links.map(([label, href], index) => <li key={href}><Link href={href} className="group flex items-center justify-between text-sm font-bold text-blue-100/80 transition hover:text-white"><span>{label}</span><span className="text-cyan-300/60 transition group-hover:translate-x-1 group-hover:text-cyan-200">0{index + 1}</span></Link></li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{t ? "Réseaux" : "Social"}</p>
            <p className="mt-4 text-sm leading-6 text-blue-100/80">{t ? "Partagez un article depuis sa fiche, ou retrouvez bientôt les publications InnovTech ici." : "Share a product from its page, or find InnovTech posts here soon."}</p>
            {profiles.length > 0 ? <div className="mt-5 flex gap-3">{profiles.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-blue-100 transition hover:border-cyan-300 hover:text-cyan-300"><Icon className="h-4 w-4" /></a>)}</div> : <Link href="/boutique" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-300 transition hover:text-white"><Share2 className="h-4 w-4" />{t ? "Partager un produit" : "Share a product"}<ArrowUpRight className="h-4 w-4" /></Link>}
          </div>
        </div>
        <div className="relative mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-blue-100/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} InnovTech. {t ? "Tous droits réservés." : "All rights reserved."}</span>
          <span>{t ? "Innover · Connecter · Réussir" : "Innovate · Connect · Succeed"}</span>
        </div>
      </div>
    </footer>
  );
}
