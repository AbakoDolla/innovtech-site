/** InnovTech design reminder: even the empty state remains calm, clear and returns visitors toward an action. */
import { Link } from "wouter";

export default function NotFound() {
  return <main className="container grid min-h-[60vh] place-items-center py-20 text-center"><div><p className="eyebrow">404</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.055em] text-[#081A3C]">Page introuvable</h1><p className="mt-4 text-slate-600">La page demandée n’est pas disponible.</p><Link href="/" className="mt-7 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white">Retour à l’accueil</Link></div></main>;
}
