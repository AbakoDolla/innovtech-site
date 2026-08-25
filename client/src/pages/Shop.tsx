/** InnovTech design reminder: product discovery uses gallery cards, generous white space, and a clear WhatsApp handoff. */
import { Link, useSearch } from "wouter";
import { BatteryCharging, Cable, ChevronRight, Headphones, Laptop, MonitorSmartphone, Radio, Search, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { Lang } from "@/lib/site";
import { orderMessage, productCatalog } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mediaCatalog } from "@/content/mediaCatalog";

const icons = { Cable, Radio, Laptop, Headphones, BatteryCharging, MonitorSmartphone };

export default function Shop({ lang }: { lang: Lang }) {
  const search = useSearch();
  const startingCategory = new URLSearchParams(search).get("cat") || "all";
  const [category, setCategory] = useState(startingCategory);
  const t = lang === "fr";
  const filters = [
    ["all", t ? "Tout voir" : "All products"],
    ["accessories", t ? "Accessoires" : "Accessories"],
    ["connected", t ? "Connectés" : "Connected"],
    ["computing", t ? "Informatique" : "Computing"],
  ];
  const products = useMemo(() => productCatalog.filter((product) => category === "all" || product.family === category), [category]);
  const gallery = mediaCatalog.productGallery;
  const featuredVideo = mediaCatalog.productVideos[0];

  return (
    <main>
      <section className="relative overflow-hidden bg-[#F4F8FF] py-14 sm:py-20">
        <div className="hero-orb right-[7%] top-[-80px]" />
        <div className="container relative max-w-5xl">
          <p className="eyebrow">{t ? "Boutique" : "Shop"}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-0.055em] text-[#081A3C] sm:text-6xl">{t ? "Des technologies choisies pour vous accompagner." : "Technology selected to support you."}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{t ? "Parcourez nos familles de produits et dites-nous ce dont vous avez besoin. Nous finalisons avec vous directement sur WhatsApp." : "Browse our product families and tell us what you need. We finalise together directly on WhatsApp."}</p>
        </div>
      </section>
      <section className="container py-10 sm:py-14">
        <div className="relative flex flex-col gap-4 border-b border-slate-100 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map(([value, label]) => <button type="button" key={value} onClick={() => setCategory(value)} className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${category === value ? "bg-blue-700 text-white shadow-[0_8px_18px_rgba(18,103,243,0.2)]" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>{label}</button>)}
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"><Search className="h-4 w-4" /> {products.length} {t ? "catégories affichées" : "categories shown"}</span>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {gallery.filter((item) => category === "all" || item.family === category).map((item, index) => {
            const product = products.find((entry) => entry.family === item.family) || productCatalog.find((entry) => entry.family === item.family)!;
            const Icon = icons[product.icon];
            return <Link href={`/boutique/${product.id}`} key={item.id} className={`group relative overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-[0_16px_38px_rgba(20,68,145,0.09)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(20,68,145,0.16)] ${index === 1 ? "lg:translate-y-8" : ""}`}>
              <div className="relative overflow-hidden bg-[#ECF5FF] p-2.5"><img src={item.imageSrc} alt={product.name[lang]} className="aspect-[4/3] w-full rounded-[1.35rem] object-cover transition duration-500 group-hover:scale-[1.035]" /><span className="absolute left-6 top-6 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-blue-700 shadow-sm"><Icon className="h-5 w-5" /></span></div>
              <div className="relative p-6"><div className="circuit-lines absolute inset-0 opacity-35" /><p className="relative text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-600">{item.label[lang]}</p><h2 className="relative mt-2 font-display text-2xl font-bold tracking-[-0.035em] text-[#081A3C]">{product.name[lang]}</h2><p className="relative mt-3 text-sm leading-6 text-slate-600">{product.description[lang]}</p><span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-700">{t ? "Voir la catégorie" : "View category"}<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
            </Link>;
          })}
        </div>
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_14px_34px_rgba(20,68,145,0.06)] sm:p-8">
          <div className="circuit-lines absolute inset-0 opacity-40" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="eyebrow">{t ? "Autres univers" : "Other collections"}</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">{t ? "Explorez aussi selon votre besoin." : "Also explore by your need."}</h2></div><div className="flex flex-wrap gap-2">{productCatalog.slice(3).map((product) => <Link key={product.id} href={`/boutique/${product.id}`} className="rounded-xl border border-blue-100 bg-white/85 px-3.5 py-2 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">{product.name[lang]}</Link>)}</div></div>
        </div>
        <section className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#081A3C] p-5 text-white shadow-[0_22px_48px_rgba(8,26,60,0.18)] sm:p-8">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="relative mx-auto max-w-[290px] overflow-hidden rounded-[1.7rem] border border-white/20 bg-slate-900 p-1.5 shadow-2xl">
              <video controls playsInline preload="metadata" className="aspect-[9/16] w-full rounded-[1.3rem] object-cover" aria-label={featuredVideo.title[lang]}>
                <source src={featuredVideo.videoSrc} type="video/mp4" />
                {t ? "Votre navigateur ne peut pas lire cette vidéo." : "Your browser cannot play this video."}
              </video>
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-blue-700">{t ? "Vidéo réelle" : "Real video"}</span>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{t ? "Démonstration produit" : "Product demonstration"}</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">{featuredVideo.title[lang]}</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/80">{featuredVideo.description[lang]}</p>
              <p className="mt-4 text-sm font-extrabold text-cyan-300">{featuredVideo.price[lang]}</p>
              <div className="mt-7"><WhatsAppButton lang={lang} message={orderMessage(featuredVideo.orderName[lang], lang)} /></div>
            </div>
          </div>
        </section>
      </section>
      <section className="container pb-4"><div className="grid gap-6 overflow-hidden rounded-[2rem] bg-[#EAF4FF] p-6 sm:p-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><img src="/manus-storage/innovtech-accessories-collection_be834898.png" alt={t ? "Accessoires InnovTech" : "InnovTech accessories"} className="aspect-[3/2] w-full rounded-2xl object-cover shadow-lg" /><div><p className="eyebrow">{t ? "Commande accompagnée" : "Supported order"}</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C]">{t ? "Vous cherchez un produit précis ?" : "Looking for a specific product?"}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">{t ? "Écrivez-nous le modèle, la référence ou simplement ce dont vous avez besoin. Nous vous orienterons vers une solution adaptée." : "Send us the model, reference, or simply what you need. We will guide you toward a suitable option."}</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(18,103,243,0.2)] transition hover:bg-blue-800"><ShoppingBag className="h-4 w-4" />{t ? "Nous écrire" : "Message us"}</Link></div></div></section>
    </main>
  );
}
