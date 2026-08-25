/** InnovTech design reminder: WhatsApp actions use the sole green accent and always explain the next human step. */
import { MessageCircle } from "lucide-react";
import type { Lang } from "@/lib/site";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton({ lang, message, compact = false }: { lang: Lang; message: string; compact?: boolean }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#1FAF62] font-extrabold text-white shadow-[0_12px_28px_rgba(31,175,98,0.24)] transition hover:-translate-y-0.5 hover:bg-[#168b4c] active:scale-[0.97] ${compact ? "px-4 py-2.5 text-sm" : "px-5 py-3 text-sm"}`}
    >
      <MessageCircle className="h-4 w-4" />
      {lang === "fr" ? "Commander via WhatsApp" : "Order on WhatsApp"}
    </a>
  );
}
