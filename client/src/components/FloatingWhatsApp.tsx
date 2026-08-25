/** InnovTech design reminder: WhatsApp is the human conversion path; the floating entry remains clear, warm and unobtrusive. */
import { MessageCircle } from "lucide-react";
import type { Lang } from "@/lib/site";
import { orderMessage, whatsappUrl } from "@/lib/site";

export function FloatingWhatsApp({ lang }: { lang: Lang }) {
  const label = lang === "fr" ? "Écrire sur WhatsApp" : "Chat on WhatsApp";
  const message = orderMessage(lang === "fr" ? "une information" : "information", lang);

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-2xl bg-[#1FAF62] p-3.5 text-white shadow-[0_16px_34px_rgba(31,175,98,0.34)] transition duration-200 hover:-translate-y-1 hover:bg-[#168b4c] hover:shadow-[0_20px_40px_rgba(31,175,98,0.38)] active:scale-[0.97] sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-extrabold opacity-0 transition-all duration-200 group-hover:max-w-[160px] group-hover:pr-1 group-hover:opacity-100 focus-within:max-w-[160px] focus-within:pr-1 focus-within:opacity-100 sm:group-hover:max-w-[160px]" aria-hidden="true">
        {label}
      </span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
