/** InnovTech design reminder: clear premium commerce, blue/cyan circuit accents, WhatsApp is the human conversion path. */
export type Lang = "fr" | "en";

/** Add the recipient's international WhatsApp number here when it is available, digits only. */
export const WHATSAPP_NUMBER = "";

export const productCatalog = [
  {
    id: "accessoires",
    family: "accessories",
    icon: "Cable",
    name: { fr: "Accessoires électroniques", en: "Electronic accessories" },
    description: {
      fr: "Chargeurs, câbles, batteries et indispensables du quotidien.",
      en: "Chargers, cables, batteries and day-to-day essentials.",
    },
  },
  {
    id: "gadgets",
    family: "connected",
    icon: "Radio",
    name: { fr: "Gadgets connectés", en: "Connected gadgets" },
    description: {
      fr: "Objets intelligents pour rester connecté simplement.",
      en: "Smart objects that keep you effortlessly connected.",
    },
  },
  {
    id: "informatique",
    family: "computing",
    icon: "Laptop",
    name: { fr: "Équipement informatique", en: "Computer equipment" },
    description: {
      fr: "Ordinateurs, périphériques et matériel adapté à vos besoins.",
      en: "Computers, peripherals and equipment matched to your needs.",
    },
  },
  {
    id: "audio",
    family: "connected",
    icon: "Headphones",
    name: { fr: "Audio & mobilité", en: "Audio & mobility" },
    description: {
      fr: "Écouteurs, casques et outils pratiques pour bouger librement.",
      en: "Earbuds, headphones and practical tools for moving freely.",
    },
  },
  {
    id: "energie",
    family: "accessories",
    icon: "BatteryCharging",
    name: { fr: "Énergie & recharge", en: "Power & charging" },
    description: {
      fr: "Solutions de recharge fiables pour vos appareils essentiels.",
      en: "Reliable charging solutions for your essential devices.",
    },
  },
  {
    id: "bureau",
    family: "computing",
    icon: "MonitorSmartphone",
    name: { fr: "Espace de travail", en: "Workspace" },
    description: {
      fr: "Les accessoires qui rendent votre bureau plus fluide.",
      en: "Accessories that make your workspace more seamless.",
    },
  },
] as const;

export const serviceCatalog = [
  {
    id: "site-web",
    icon: "PanelsTopLeft",
    title: { fr: "Création de sites web", en: "Website creation" },
    description: {
      fr: "Des sites vitrines modernes, rapides et pensés pour inspirer confiance.",
      en: "Modern, fast showcase websites built to inspire confidence.",
    },
    detail: {
      fr: "Conseil, conception, interface responsive et mise en ligne : votre présence digitale prend une forme claire et utile.",
      en: "Consulting, design, responsive interface and launch: your digital presence takes a clear, useful form.",
    },
  },
  {
    id: "app-web",
    icon: "Globe2",
    title: { fr: "Applications web", en: "Web applications" },
    description: {
      fr: "Des outils sur mesure pour simplifier vos opérations et vos échanges.",
      en: "Custom tools that simplify your operations and communication.",
    },
    detail: {
      fr: "Nous transformons votre besoin en une application web organisée, accessible et adaptée à vos usages.",
      en: "We turn your need into an organised, accessible web application tailored to the way you work.",
    },
  },
  {
    id: "app-mobile",
    icon: "Smartphone",
    title: { fr: "Applications mobiles", en: "Mobile applications" },
    description: {
      fr: "Des expériences mobiles intuitives, conçues pour être utilisées partout.",
      en: "Intuitive mobile experiences made to be used everywhere.",
    },
    detail: {
      fr: "Du parcours utilisateur à l’interface finale, chaque écran sert votre objectif et vos utilisateurs.",
      en: "From user journey to final interface, every screen serves your goal and your users.",
    },
  },
] as const;

export function whatsappUrl(message: string) {
  const recipient = WHATSAPP_NUMBER.trim();
  return `https://wa.me/${recipient ? recipient : ""}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(item: string, lang: Lang) {
  return lang === "fr"
    ? `Bonjour InnovTech, je souhaite avoir plus d’informations ou commander : ${item}.`
    : `Hello InnovTech, I would like more information about or to order: ${item}.`;
}

export function quoteMessage(service: string, lang: Lang) {
  return lang === "fr"
    ? `Bonjour InnovTech, je souhaite demander un devis pour : ${service}.`
    : `Hello InnovTech, I would like to request a quote for: ${service}.`;
}
