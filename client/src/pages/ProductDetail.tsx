/** InnovTech product page: public gallery, clear product information and WhatsApp ordering. */
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Facebook, Link2, MessageCircle, Minus, Plus, Share2, ShieldCheck, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { Lang, ProductFamily } from "@/lib/site";
import { isPromotionActive } from "@/lib/adminCommerce";
import { productOrderMessage } from "@/lib/site";
import { useManagedCatalog } from "@/lib/managedCatalog";
import { useManagedSettings } from "@/lib/managedSettings";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const familyLabel: Record<ProductFamily, Record<Lang, string>> = {
  security: { fr: "Sécurité connectée", en: "Connected security" }, tracking: { fr: "Géolocalisation", en: "Tracking" }, drones: { fr: "Drones", en: "Drones" }, agriculture: { fr: "Robotique agricole", en: "Agricultural robotics" }, computing: { fr: "Informatique", en: "Computing" }, wearables: { fr: "Wearables", en: "Wearables" }, home: { fr: "Maison", en: "Home" },
};
function familyText(family: string, lang: Lang) { return familyLabel[family as ProductFamily]?.[lang] || family; }

export default function ProductDetail({ lang, productId }: { lang: Lang; productId: string }) {
  const { catalog } = useManagedCatalog();
  const { commercial } = useManagedSettings();
  const product = catalog.find((item) => item.id === productId) || catalog[0];
  const t = lang === "fr";
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const images = useMemo(() => Array.from(new Set([product.imageSrc, ...(product.media?.images || [])].filter(Boolean))), [product]);
  const videos = product.media?.videos || [];
  const promotionActive = product.promotion && isPromotionActive({ promotion_enabled: true, promotion_price_label: product.promotion.price.fr, promotion_starts_at: product.promotion.startsAt, promotion_ends_at: product.promotion.endsAt });
  const displayPrice = promotionActive && product.promotion ? product.promotion.price[lang] : product.price[lang];
  const outOfStock = product.stockQuantity === 0;
  const maxQuantity = product.stockQuantity && product.stockQuantity > 0 ? product.stockQuantity : undefined;
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const shareText = t ? `Découvrir ${product.name.fr} chez InnovTech.` : `Discover ${product.name.en} from InnovTech.`;
  const orderTemplate = t ? commercial.orderMessageFr : commercial.orderMessageEn;
  const configuredOrderMessage = `${orderTemplate.replace(t ? "{produit}" : "{product}", product.name[lang])}\n${t ? `Quantité souhaitée : ${quantity}.` : `Requested quantity: ${quantity}.`}`;

  const shareProduct = async () => {
    if (navigator.share) { await navigator.share({ title: product.name[lang], text: shareText, url: shareUrl }); return; }
    await navigator.clipboard?.writeText(shareUrl);
    setShareState("copied");
    window.setTimeout(() => setShareState("idle"), 2200);
  };
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return <main className="container py-8 sm:py-16">
    <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"><ArrowLeft className="h-4 w-4" />{t ? "Retour à la boutique" : "Back to shop"}</Link>
    <div className="detail-spread relative mt-6 overflow-hidden rounded-[2.25rem] bg-[#F7FAFF] p-4 dark:bg-[#0e2340] sm:mt-7 sm:p-8">
      <div className="circuit-lines pointer-events-none absolute inset-0 opacity-45" />
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
        <section className="relative overflow-hidden rounded-[1.7rem] bg-[#EAF4FF] p-3 shadow-[0_22px_46px_rgba(18,103,243,0.12)] dark:bg-[#102d4f] sm:rounded-[2rem] sm:p-5" aria-label={t ? "Médias du produit" : "Product media"}>
          <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-cyan-200/40 blur-2xl" />
          <img src={images[activeImage] || product.imageSrc} alt={product.name[lang]} fetchPriority="high" decoding="async" className="relative aspect-square w-full rounded-[1.3rem] bg-white object-cover dark:bg-[#08172c] sm:rounded-[1.45rem]" />
          {(images.length > 1 || videos.length > 0) && <div className="relative mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((url, index) => <button key={url} type="button" onClick={() => setActiveImage(index)} className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition ${activeImage === index ? "border-blue-600" : "border-transparent"}`} aria-label={`${t ? "Afficher la photo" : "Show image"} ${index + 1}`}><img src={url} alt="" className="h-full w-full object-cover" /></button>)}
            {videos.map((url) => <video key={url} className="h-14 w-14 shrink-0 rounded-xl bg-slate-950 object-cover" controls preload="metadata" aria-label={t ? "Vidéo produit" : "Product video"}><source src={url} /></video>)}
          </div>}
        </section>
        <section>
          <p className="eyebrow">{familyText(product.family, lang)}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.055em] text-[#081A3C] dark:text-white sm:text-5xl">{product.name[lang]}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">{promotionActive && <><p className="font-display text-xl font-bold text-slate-400 line-through dark:text-slate-400">{product.price[lang]}</p><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-300/20 dark:text-amber-200">{t ? "Promotion" : "Offer"}</span></>}<p className="font-display text-xl font-bold text-blue-700 dark:text-blue-300">{displayPrice}</p></div>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">{product.description[lang]}</p>
          <div className="mt-7 grid gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
            {[t ? "Photo réelle du produit ou de sa catégorie" : "Real photo of the product or its category", outOfStock ? (t ? "Actuellement indisponible" : "Currently unavailable") : product.stockQuantity != null ? (t ? `Stock indicatif : ${product.stockQuantity}` : `Indicative stock: ${product.stockQuantity}`) : product.availability?.[lang] || (t ? "Disponibilité à confirmer avec notre équipe" : "Availability to confirm with our team."), t ? "Finalisation simple sur WhatsApp" : "Simple completion on WhatsApp"].map((line) => <div key={line} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-500" />{line}</div>)}
          </div>
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_12px_26px_rgba(18,103,243,0.08)] dark:border-blue-300/20 dark:bg-[#0b1b33]">
            <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-extrabold text-[#081A3C] dark:text-white">{t ? "Quantité souhaitée" : "Requested quantity"}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{t ? "Préparez votre demande avant WhatsApp." : "Prepare your request before WhatsApp."}</p></div><div className="inline-flex items-center rounded-xl border border-blue-100 bg-[#F7FAFF] p-1 dark:border-blue-300/20 dark:bg-[#102747]" aria-label={t ? "Choisir la quantité" : "Choose quantity"}><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} className="grid h-9 w-9 place-items-center rounded-lg text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:text-slate-300 dark:text-blue-300 dark:hover:bg-blue-400/15" aria-label={t ? "Réduire la quantité" : "Decrease quantity"}><Minus className="h-4 w-4" /></button><span className="w-9 text-center text-sm font-extrabold text-[#081A3C] dark:text-white" aria-live="polite">{quantity}</span><button type="button" onClick={() => setQuantity((value) => value + 1)} className="grid h-9 w-9 place-items-center rounded-lg text-blue-700 transition hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-400/15" aria-label={t ? "Augmenter la quantité" : "Increase quantity"}><Plus className="h-4 w-4" /></button></div></div>
            <div className="mt-4">{outOfStock ? <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">{t ? "Ce produit est momentanément indisponible. Écrivez-nous pour une alternative." : "This product is currently unavailable. Message us for an alternative."}</p> : <WhatsAppButton lang={lang} number={commercial.whatsappNumber} message={configuredOrderMessage || productOrderMessage(product.name[lang], quantity, lang)} />}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={shareProduct} className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3.5 py-2.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50 dark:border-blue-300/20 dark:bg-[#0b1b33] dark:text-blue-300 dark:hover:bg-blue-400/10"><Share2 className="h-4 w-4" />{shareState === "copied" ? (t ? "Lien copié" : "Link copied") : (t ? "Partager" : "Share")}</button><a href={facebookHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3.5 py-2.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50 dark:border-blue-300/20 dark:bg-[#0b1b33] dark:text-blue-300 dark:hover:bg-blue-400/10"><Facebook className="h-4 w-4" />Facebook</a><span className="inline-flex items-center gap-1.5 px-2 text-xs leading-5 text-slate-500 dark:text-slate-300"><Link2 className="h-3.5 w-3.5" />{t ? "Lien direct de l’article" : "Direct product link"}</span></div>
          <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-slate-500 dark:text-slate-300"><MessageCircle className="h-4 w-4 text-[#1FAF62]" />{t ? "Votre message inclura le produit et la quantité sélectionnée." : "Your message includes the selected product and quantity."}</p>
        </section>
      </div>
    </div>
    <section className="mt-12 grid gap-4 border-t border-slate-100 pt-10 dark:border-blue-300/15 sm:mt-16 sm:grid-cols-3">{[{ icon: ShieldCheck, fr: "Conseil", en: "Guidance", textFr: "Nous répondons à vos questions avant votre choix.", textEn: "We answer your questions before you choose." }, { icon: ShoppingBag, fr: "Disponibilité", en: "Availability", textFr: "Nous confirmons avec vous la disponibilité de l’article.", textEn: "We confirm the item availability with you." }, { icon: MessageCircle, fr: "Commande", en: "Order", textFr: "Votre demande est préparée simplement sur WhatsApp.", textEn: "Your request is prepared simply on WhatsApp." }].map(({ icon: Icon, fr, en, textFr, textEn }) => <div key={fr} className="proof-card rounded-2xl bg-[#F7FAFF] p-5 dark:bg-[#0d1f3a]"><Icon className="h-5 w-5 text-blue-700 dark:text-blue-300" /><h2 className="mt-4 font-display text-lg font-bold text-[#081A3C] dark:text-white">{t ? fr : en}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{t ? textFr : textEn}</p></div>)}</section>
  </main>;
}
