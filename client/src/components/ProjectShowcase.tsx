import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Lang } from "@/lib/site";
import { portfolioProjects } from "@/lib/site";

export function ProjectShowcase({ lang }: { lang: Lang }) {
  const t = lang === "fr";
  return (
    <section id="realisations" className="container py-14 sm:py-20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl"><p className="eyebrow">{t ? "Réalisations web" : "Web projects"}</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C] sm:text-4xl">{t ? "Des plateformes conçues pour des besoins concrets." : "Platforms designed for real needs."}</h2><p className="mt-4 text-sm leading-6 text-slate-600">{t ? "Une sélection de projets web conçus autour de la présence en ligne, de la vente, de la confiance et des services." : "A selection of web projects built around online presence, sales, trust and services."}</p></div>
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700"><ArrowUpRight className="h-4 w-4" />{t ? "Liens directs vers les projets" : "Direct links to projects"}</span>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {portfolioProjects.map((project, index) => <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className={`project-card group relative overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_16px_34px_rgba(20,68,145,0.07)] transition focus:outline-none focus:ring-4 focus:ring-blue-200 ${index % 2 === 1 ? "md:translate-y-8" : ""}`}>
          <div className="aspect-[16/9] overflow-hidden bg-slate-100"><img src={project.imageSrc} alt={project.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /></div>
          <div className="relative p-6"><span className="text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-600">{project.category[lang]}</span><h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">{project.title[lang]}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{project.description[lang]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">{t ? "Voir le projet" : "View project"}<ExternalLink className="h-4 w-4" /></span></div>
        </a>)}
      </div>
    </section>
  );
}
