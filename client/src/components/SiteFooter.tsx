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
    <footer className="mt-20 overflow-hidden bg-[#081A3C] text-white">
      <div className="relative container py-14 sm:py-18">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/media/branding/innovtech-symbol.png" alt="" className="h-12 w-12 object-contain" />
              <span className="font-display text-2xl font-bold tracking-[-0.05em] text-white">Innov<span className="text-cyan-300">Tech</span></span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100/80">
              {t ? "Des articles high-tech et des solutions digitales pensés pour vous aider à avancer, à votre rythme." : "High-tech products and digital solutions designed to help you move forward, at your own pace."}
            </p>
            <a href={whatsappUrl(t ? "Bonjour InnovTech, je souhaite vous contacter." : "Hello InnovTech, I would like to contact you.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-300 transition hover:text-white">
              <WhatsAppIcon className="h-4 w-4" /> {t ? "Écrire sur WhatsApp" : "Message on WhatsApp"} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{t ? "Explorer" : "Explore"}</p>
            <ul className="mt-4 grid gap-3">
              {links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm font-medium text-blue-100/80 transition hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
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
