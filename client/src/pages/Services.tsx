/** InnovTech design reminder: services combine editorial calm with fast, lightweight vector illustrations. */
import { Check, Globe2, PanelsTopLeft, Smartphone } from "lucide-react";
import type { Lang } from "@/lib/site";
import { quoteMessage, serviceCatalog } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ServiceVisual } from "@/components/ServiceVisual";
import { ProjectShowcase } from "@/components/ProjectShowcase";

const icons = { PanelsTopLeft, Globe2, Smartphone };

export default function Services({ lang }: { lang: Lang }) {
  const t = lang === "fr";

  return (
      <main className="services-page">
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#F4F8FF_0%,#FFFFFF_60%,#EAFBFF_100%)] py-14 sm:py-24">
        <div className="hero-orb left-[-5%] top-[-110px]" />
        <div className="circuit-lines absolute inset-0 opacity-55" />
        <div className="container relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div><p className="eyebrow">{t ? "Services numériques" : "Digital services"}</p><h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.06em] text-[#081A3C] sm:text-6xl">{t ? <>Une expérience digitale, <span className="text-blue-600">à votre mesure.</span></> : <>A digital experience, <span className="text-blue-600">made for you.</span></>}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{t ? "Du premier échange à l’interface finale, nous concevons des solutions compréhensibles, belles et pensées pour vos objectifs." : "From the first conversation to the final interface, we design clear, polished solutions built around your goals."}</p><div className="mt-7"><WhatsAppButton lang={lang} compact quote message={quoteMessage(t ? "un projet digital" : "a digital project", lang)} /></div></div>
          <div className="grid gap-3 rounded-[1.8rem] border border-white bg-white/75 p-4 shadow-[0_20px_48px_rgba(18,103,243,0.10)] backdrop-blur sm:grid-cols-3 sm:p-5">{[{ n: "01", fr: "Brief clair", en: "Clear brief" }, { n: "02", fr: "Design utile", en: "Useful design" }, { n: "03", fr: "Livraison", en: "Delivery" }].map(({ n, fr, en }) => <div key={n} className="rounded-2xl bg-[#F4F8FF] p-4"><span className="font-display text-2xl font-bold tracking-[-0.05em] text-cyan-600">{n}</span><p className="mt-5 text-sm font-extrabold text-[#081A3C]">{t ? fr : en}</p></div>)}</div>
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="grid gap-6">
          {serviceCatalog.map((service, index) => {
            const Icon = icons[service.icon];
            const visualOnLeft = index === 1;
            return (
              <article key={service.id} className="service-card group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_38px_rgba(20,68,145,0.07)] sm:p-8">
                <div className="circuit-lines pointer-events-none absolute inset-0 opacity-35" />
                <div className={`relative grid gap-8 lg:grid-cols-2 lg:items-center ${visualOnLeft ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  <div>
                    <span className="service-icon-cube grid h-13 w-13 place-items-center rounded-2xl bg-blue-700 text-white shadow-[0_12px_25px_rgba(18,103,243,0.22)]"><Icon className="h-6 w-6" /></span>
                    <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.15em] text-cyan-600">0{index + 1} · {t ? "Solutions digitales" : "Digital solutions"}</p>
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-[#081A3C]">{service.title[lang]}</h2>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">{service.description[lang]}</p>
                    <p className="mt-6 max-w-xl border-t border-blue-100 pt-5 text-sm leading-6 text-slate-600">{service.detail[lang]}</p>
                    <div className="mt-7"><WhatsAppButton lang={lang} compact message={quoteMessage(service.title[lang], lang)} /></div>
                  </div>
                  <ServiceVisual kind={service.id} lang={lang} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="defer-render container pb-4">
        <div className="grid gap-8 rounded-[2rem] bg-[#F4F8FF] px-6 py-8 sm:px-10 sm:py-11 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div><p className="eyebrow">{t ? "Une méthode claire" : "A clear method"}</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C]">{t ? "Votre projet avance étape par étape." : "Your project moves forward step by step."}</h2></div>
          <div className="grid gap-3 sm:grid-cols-3">{[{ n: "01", fr: "Échange", en: "Conversation" }, { n: "02", fr: "Conception", en: "Design" }, { n: "03", fr: "Livraison", en: "Delivery" }].map(({ n, fr, en }) => <div key={n} className="service-step rounded-2xl bg-white p-4 shadow-sm"><span className="font-display text-2xl font-bold text-cyan-500">{n}</span><p className="mt-5 flex items-center gap-2 text-sm font-extrabold text-[#081A3C]"><Check className="h-4 w-4 text-blue-700" />{t ? fr : en}</p></div>)}</div>
        </div>
      </section>
      <ProjectShowcase lang={lang} />
    </main>
  );
}
