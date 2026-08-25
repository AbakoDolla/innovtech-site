import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import type { Lang } from "@/lib/site";
import { whatsappUrl } from "@/lib/site";

export function AppointmentPlanner({ lang }: { lang: Lang }) {
  const t = lang === "fr";
  const [name, setName] = useState("");
  const [service, setService] = useState("site-web");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");

  const services = t
    ? [{ value: "site-web", label: "Création de site web" }, { value: "app-web", label: "Application web" }, { value: "app-mobile", label: "Application mobile" }, { value: "conseil", label: "Conseil / autre demande" }]
    : [{ value: "site-web", label: "Website creation" }, { value: "app-web", label: "Web application" }, { value: "app-mobile", label: "Mobile application" }, { value: "conseil", label: "Consulting / another request" }];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedService = services.find((item) => item.value === service)?.label || service;
    const dateLabel = date || (t ? "à convenir" : "to be arranged");
    const message = t
      ? `Bonjour InnovTech, je souhaite demander un rendez-vous.\n\nNom : ${name || "Non renseigné"}\nService : ${selectedService}\nDate souhaitée : ${dateLabel}\nHeure souhaitée : ${time}.\n\nMerci de me confirmer vos disponibilités.`
      : `Hello InnovTech, I would like to request an appointment.\n\nName: ${name || "Not provided"}\nService: ${selectedService}\nPreferred date: ${dateLabel}\nPreferred time: ${time}.\n\nPlease confirm your availability.`;
    window.location.href = whatsappUrl(message);
  };

  return (
    <section id="rendez-vous" className="container py-14 sm:py-20">
      <div className="motion-card relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-[#F4F8FF] p-6 shadow-[0_18px_42px_rgba(20,68,145,0.08)] sm:p-10">
        <div className="circuit-lines absolute inset-0 opacity-35" />
        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">{t ? "Rendez-vous" : "Appointments"}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-[#081A3C] sm:text-4xl">{t ? "Un rendez-vous en quelques secondes." : "Book an appointment in a few seconds."}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{t ? "Choisissez votre besoin et un créneau. WhatsApp s’ouvre avec votre demande déjà structurée : l’équipe InnovTech confirme ensuite la disponibilité." : "Choose your need and a time slot. WhatsApp opens with a structured request, then InnovTech confirms availability."}</p>
            <div className="mt-7 grid gap-4">
              {[
                { icon: CalendarDays, fr: "Choisissez un créneau", en: "Choose a time slot" },
                { icon: MessageCircle, fr: "Envoyez la demande sur WhatsApp", en: "Send the request on WhatsApp" },
                { icon: CheckCircle2, fr: "Recevez une confirmation humaine", en: "Receive a human confirmation" },
              ].map(({ icon: Icon, fr, en }) => <div key={fr} className="flex items-center gap-3 text-sm font-bold text-[#081A3C]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><Icon className="h-4 w-4" /></span>{t ? fr : en}</div>)}
            </div>
            <p className="mt-7 rounded-2xl border border-blue-100 bg-white/80 p-4 text-xs leading-5 text-slate-600">{t ? "Fonctionne gratuitement avec WhatsApp Business : utilisez les réponses rapides et les libellés pour confirmer et suivre les rendez-vous." : "Works for free with WhatsApp Business: use quick replies and labels to confirm and follow up on appointments."}</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-[1.6rem] border border-white bg-white/90 p-5 shadow-[0_14px_28px_rgba(20,68,145,0.07)] sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-[#081A3C] sm:col-span-2">{t ? "Votre nom" : "Your name"}<input value={name} onChange={(event) => setName(event.target.value)} placeholder={t ? "Ex. Chantal" : "E.g. Chantal"} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="grid gap-2 text-sm font-bold text-[#081A3C] sm:col-span-2">{t ? "Votre besoin" : "Your need"}<select value={service} onChange={(event) => setService(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">{services.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold text-[#081A3C]">{t ? "Date souhaitée" : "Preferred date"}<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="grid gap-2 text-sm font-bold text-[#081A3C]">{t ? "Heure souhaitée" : "Preferred time"}<span className="relative"><Clock3 className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-blue-600" /><input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></span></label>
            </div>
            <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-extrabold text-[#05230f] shadow-[0_12px_22px_rgba(37,211,102,0.2)] transition hover:-translate-y-0.5 hover:bg-[#32e279] focus:outline-none focus:ring-4 focus:ring-green-200"><MessageCircle className="h-4 w-4" />{t ? "Demander ce rendez-vous" : "Request this appointment"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
