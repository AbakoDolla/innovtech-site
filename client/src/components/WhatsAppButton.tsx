/** InnovTech design reminder: WhatsApp actions use the sole green accent and always explain the next human step. */
import type { Lang } from "@/lib/site";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppButton({ lang, message, compact = false, quote = false }: { lang: Lang; message: string; compact?: boolean; quote?: boolean }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={lang === "fr" ? (quote ? "Demander un devis sur WhatsApp" : "Commander via WhatsApp") : (quote ? "Request a quote on WhatsApp" : "Order on WhatsApp")}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#1FAF62] font-extrabold text-white shadow-[0_12px_28px_rgba(31,175,98,0.24)] transition hover:-translate-y-0.5 hover:bg-[#168b4c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FAF62] focus-visible:ring-offset-2 active:scale-[0.97] ${compact ? "px-4 py-2.5 text-sm" : "px-5 py-3 text-sm"}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {lang === "fr" ? (quote ? "Demander un devis" : "Commander via WhatsApp") : (quote ? "Request a quote" : "Order on WhatsApp")}
    </a>
  );
}
