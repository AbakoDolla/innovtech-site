/** InnovTech design reminder: bright premium technology gallery with a clear path from discovery to WhatsApp conversation. */
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Code2, Headphones, Layers3, ShieldCheck, ShoppingBag, Smartphone, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/site";
import { orderMessage, quoteMessage } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { mediaCatalog } from "@/content/mediaCatalog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

const highlights = [
  { icon: ShoppingBag, fr: "Des choix pratiques", en: "Practical choices" },
  { icon: ShieldCheck, fr: "Un accompagnement clair", en: "Clear guidance" },
  { icon: Headphones, fr: "Un échange humain", en: "Human support" },
];

export default function Home({ lang }: { lang: Lang }) {
  const t = lang === "fr";
  const [categoryCarousel, setCategoryCarousel] = useState<CarouselApi>();

  useEffect(() => {
    if (!categoryCarousel) return;
    const timer = window.setInterval(() => categoryCarousel.scrollNext(), 4200);
    return () => window.clearInterval(timer);
  }, [categoryCarousel]);

  return (
    <main>
      <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16" onMouseMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--mx", `${(event.clientX - bounds.left - bounds.width / 2) / 28}px`); event.currentTarget.style.setProperty("--my", `${(event.clientY - bounds.top - bounds.height / 2) / 38}px`); }} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--mx", "0px"); event.currentTarget.style.setProperty("--my", "0px"); }}>
        <div className="hero-orb left-[42%] top-6" />
        <div className="container relative grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-4">
          <div className="max-w-2xl">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3.5 py-2 text-xs font-extrabold tracking-wide text-blue-800">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
              {t ? "TECHNOLOGIE & SOLUTIONS DIGITALES" : "TECHNOLOGY & DIGITAL SOLUTIONS"}
            </div>
            <h1 className="reveal mt-6 max-w-xl font-display text-[2.65rem] font-bold leading-[0.98] tracking-[-0.055em] text-[#081A3C] sm:text-6xl lg:text-[4.5rem]">
              {t ? <>Tout votre univers <span className="text-blue-600">technologique</span>, au même endroit.</> : <>Your complete <span className="text-blue-600">technology</span> world, all in one place.</>}
            </h1>
            <p className="reveal mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {t ? "Découvrez des articles high-tech, des accessoires électroniques et des solutions web & mobile conçus pour simplifier votre quotidien et faire progresser vos projets." : "Discover high-tech products, electronic accessories and web & mobile solutions made to simplify your day and move your projects forward."}
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/boutique" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(18,103,243,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[0.97]">
                <ShoppingBag className="h-4 w-4" /> {t ? "Explorer les produits" : "Explore products"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3.5 text-sm font-extrabold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 active:scale-[0.97]">
                <Code2 className="h-4 w-4" /> {t ? "Demander un devis" : "Request a quote"}
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map(({ icon: Icon, fr, en }) => <div key={fr} className="flex items-center gap-2 text-xs font-bold text-slate-600"><span className="grid h-6 w-6 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon className="h-3.5 w-3.5" /></span>{t ? fr : en}</div>)}
            </div>
          </div>
          <div className="reveal hero-depth relative px-2 pb-8 sm:px-5">
            <div className="hero-grid absolute -inset-8 opacity-70" />
            <div className="hero-ring absolute -right-7 -top-8 h-32 w-32 rounded-full border border-cyan-300/60 sm:-right-3 sm:-top-5" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-2 shadow-[0_30px_70px_rgba(16,72,165,0.16)] backdrop-blur sm:p-3">
              <div className="relative overflow-hidden rounded-[1.55rem] bg-[#081A3C] [transform:perspective(1200px)_rotateY(-3deg)_rotateX(2deg)] transition duration-500 hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]">
                <img src={mediaCatalog.hero.imageSrc} alt={mediaCatalog.hero.alt[lang]} className="aspect-[3/2] w-full object-cover opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#081A3C]/35 via-transparent to-cyan-300/20" />
                <div className="absolute left-5 top-5 rounded-xl border border-white/30 bg-[#081A3C]/70 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur">{t ? "Sélection du moment" : "Trending selection"}</div>
              </div>
            </div>
            <div className="absolute -right-1 top-8 hidden rounded-2xl border border-cyan-100 bg-white px-4 py-3 shadow-xl sm:block sm:-right-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">{t ? "Nouveautés" : "New arrivals"}</p>
              <p className="mt-1 font-display text-lg font-bold text-[#081A3C]">{t ? "Tech utile." : "Useful tech."}</p>
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg sm:-left-8">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-100 text-[#1FAF62]"><WhatsAppIcon className="h-5 w-5" /></span>
              <span className="text-xs font-bold leading-4 text-slate-600">{t ? <>Une question ?<br /><b className="text-slate-900">Échangez avec nous.</b></> : <>A question?<br /><b className="text-slate-900">Let’s talk.</b></>}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F4F8FF] py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">{t ? "À découvrir" : "Discover"}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C] sm:text-4xl">{t ? "Choisissez ce qui vous connecte." : "Choose what keeps you connected."}</h2>
            </div>
            <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition hover:gap-3">{t ? "Voir toute la boutique" : "View the whole shop"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <Carousel opts={{ align: "start", loop: true }} setApi={setCategoryCarousel} className="mt-9">
            <CarouselContent className="-ml-5">
            {[
              { label: t ? "Accessoires électroniques" : "Electronic accessories", description: t ? "Les essentiels qui accompagnent vos appareils au quotidien." : "Everyday essentials for your devices.", icon: ShoppingBag, href: "/boutique?cat=accessories" },
              { label: t ? "Gadgets connectés" : "Connected gadgets", description: t ? "Des objets pratiques pour explorer de nouvelles possibilités." : "Practical objects for exploring new possibilities.", icon: Layers3, href: "/boutique?cat=connected" },
              { label: t ? "Équipement informatique" : "Computer equipment", description: t ? "Du matériel utile pour apprendre, créer et travailler." : "Useful equipment to learn, create and work.", icon: Smartphone, href: "/boutique?cat=computing" },
            ].map(({ label, description, icon: Icon, href }, index) => (
              <CarouselItem key={label} className="basis-[88%] pl-5 sm:basis-1/2 md:basis-1/3">
              <Link href={href} className="group relative block h-full overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-[0_16px_35px_rgba(13,62,143,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(13,62,143,0.15)]">
                <div className={`absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] ${index === 1 ? "bg-cyan-50" : "bg-blue-50"}`} />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-lg"><Icon className="h-5 w-5" /></span>
                <h3 className="relative mt-8 font-display text-xl font-bold tracking-[-0.03em] text-[#081A3C]">{label}</h3>
                <p className="relative mt-2 text-sm leading-6 text-slate-600">{description}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">{t ? "Découvrir" : "Discover"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 border-blue-200 bg-white text-blue-700 shadow-md hover:bg-blue-50" />
            <CarouselNext className="-right-3 border-blue-200 bg-white text-blue-700 shadow-md hover:bg-blue-50" />
          </Carousel>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{t ? "Dans la boutique" : "Inside the shop"}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C] sm:text-4xl">{t ? "Des produits à voir sous tous les angles." : "Products worth seeing from every angle."}</h2>
          </div>
          <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition hover:gap-3">{t ? "Parcourir le catalogue" : "Browse the catalogue"} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {mediaCatalog.productGallery.map((item, index) => (
            <Link key={item.id} href={`/boutique?cat=${item.family}`} className="media-card group relative overflow-hidden rounded-[1.65rem] bg-[#081A3C] shadow-[0_18px_40px_rgba(13,62,143,0.14)]">
              <img src={item.imageSrc} alt={item.label[lang]} className="aspect-[4/3] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081A3C]/90 via-[#081A3C]/35 to-transparent p-5 pt-16">
                <span className="text-xs font-extrabold uppercase tracking-[0.13em] text-cyan-200">0{index + 1}</span>
                <h3 className="mt-1 font-display text-xl font-bold text-white">{item.label[lang]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#EAF4FF] p-3 shadow-[0_24px_50px_rgba(15,79,175,0.12)]">
              <img src="/media/innovtech-digital-solutions.png" alt={t ? "Solutions digitales InnovTech" : "InnovTech digital solutions"} className="aspect-[3/2] w-full rounded-[1.55rem] object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">{t ? "Solutions numériques" : "Digital solutions"}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C] sm:text-4xl">{t ? "Besoin d’un site ou d’une application ?" : "Need a website or an application?"}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">{t ? "InnovTech conçoit des expériences web et mobiles utiles, rapides à comprendre et prêtes à servir votre activité." : "InnovTech designs useful web and mobile experiences that are easy to understand and ready to serve your business."}</p>
            <div className="mt-7 grid gap-3">
              {[t ? "Site vitrine ou portail d’activité" : "Showcase website or business portal", t ? "Application web sur mesure" : "Custom web application", t ? "Expérience mobile intuitive" : "Intuitive mobile experience"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-500" /> {item}</div>)}
            </div>
            <div className="mt-8"><WhatsAppButton lang={lang} quote message={quoteMessage(t ? "un projet digital" : "a digital project", lang)} /></div>
          </div>
        </div>
      </section>

      <section className="container pb-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#081A3C] px-6 py-9 text-white sm:px-10 sm:py-12">
          <div className="absolute -right-8 -top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">WhatsApp</p><h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">{t ? "Un clic, puis une conversation claire." : "One click, then a clear conversation."}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/80">{t ? "Choisissez un article ou une solution. Votre message est préparé pour que nous puissions vous répondre avec les bonnes informations." : "Choose a product or solution. Your message is prepared so we can answer with the right information."}</p></div>
            <WhatsAppButton lang={lang} message={orderMessage(t ? "une demande d’information" : "an information request", lang)} />
          </div>
        </div>
      </section>
    </main>
  );
}
