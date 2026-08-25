/** InnovTech design reminder: clear premium commerce, blue/cyan circuit accents, WhatsApp is the human conversion path. */
export type Lang = "fr" | "en";

/** Add the recipient's international WhatsApp number here when it is available, digits only. */
export const WHATSAPP_NUMBER = "";

export const productCatalog = [
  {
    id: "accessoires",
    family: "accessories",
    icon: "Cable",
    imageSrc: "/media/products/iphone-15-pro.jpg",
    price: { fr: "À partir de 15 000 FCFA", en: "From 15,000 CFA francs" },
    badge: { fr: "Essentiel", en: "Essential" },
    name: { fr: "iPhone 15 Pro", en: "iPhone 15 Pro" },
    description: {
      fr: "Chargeurs, câbles, batteries et indispensables du quotidien.",
      en: "Chargers, cables, batteries and day-to-day essentials.",
    },
  },
  {
    id: "gadgets",
    family: "connected",
    icon: "Radio",
    imageSrc: "/media/products/wireless-headphones.jpg",
    price: { fr: "À partir de 35 000 FCFA", en: "From 35,000 CFA francs" },
    badge: { fr: "Populaire", en: "Popular" },
    name: { fr: "Écouteurs sans fil", en: "Wireless headphones" },
    description: {
      fr: "Objets intelligents pour rester connecté simplement.",
      en: "Smart objects that keep you effortlessly connected.",
    },
  },
  {
    id: "informatique",
    family: "computing",
    icon: "Laptop",
    imageSrc: "/media/products/lenovo-laptop.jpg",
    price: { fr: "À partir de 280 000 FCFA", en: "From 280,000 CFA francs" },
    badge: { fr: "Productivité", en: "Productivity" },
    name: { fr: "Lenovo IdeaPad 5", en: "Lenovo IdeaPad 5" },
    description: {
      fr: "Ordinateurs, périphériques et matériel adapté à vos besoins.",
      en: "Computers, peripherals and equipment matched to your needs.",
    },
  },
  {
    id: "audio",
    family: "connected",
    icon: "Headphones",
    imageSrc: "/media/products/camera-4k.jpg",
    price: { fr: "À partir de 25 000 FCFA", en: "From 25,000 CFA francs" },
    badge: { fr: "Nouveau", en: "New" },
    name: { fr: "Caméra hybride 4K", en: "4K mirrorless camera" },
    description: {
      fr: "Écouteurs, casques et outils pratiques pour bouger librement.",
      en: "Earbuds, headphones and practical tools for moving freely.",
    },
  },
  {
    id: "energie",
    family: "accessories",
    icon: "BatteryCharging",
    imageSrc: "/media/products/powerbank.jpg",
    price: { fr: "À partir de 20 000 FCFA", en: "From 20,000 CFA francs" },
    badge: { fr: "Pratique", en: "Practical" },
    name: { fr: "Powerbank 20 000 mAh", en: "20,000 mAh power bank" },
    description: {
      fr: "Solutions de recharge fiables pour vos appareils essentiels.",
      en: "Reliable charging solutions for your essential devices.",
    },
  },
  {
    id: "bureau",
    family: "computing",
    icon: "MonitorSmartphone",
    imageSrc: "/media/products/smartwatch.jpg",
    price: { fr: "À partir de 45 000 FCFA", en: "From 45,000 CFA francs" },
    badge: { fr: "Connecté", en: "Connected" },
    name: { fr: "Smartwatch Active", en: "Active smartwatch" },
    description: {
      fr: "Les accessoires qui rendent votre bureau plus fluide.",
      en: "Accessories that make your workspace more seamless.",
    },
  },
] as const;

const productImages = [
  "/media/products/iphone-15-pro.jpg",
  "/media/products/wireless-headphones.jpg",
  "/media/products/lenovo-laptop.jpg",
  "/media/products/camera-4k.jpg",
  "/media/products/powerbank.jpg",
  "/media/products/smartwatch.jpg",
  "/media/products/computer-desk.jpg",
  "/media/products/desktop-computer.jpg",
  "/media/products/earbuds.jpg",
  "/media/products/gaming-console.jpg",
  "/media/products/gaming-laptop.jpg",
  "/media/products/keyboard.jpg",
  "/media/products/laptop-workspace.jpg",
  "/media/products/mouse.jpg",
  "/media/products/office-laptop.jpg",
  "/media/products/phone-dark.jpg",
  "/media/products/smart-home.jpg",
  "/media/products/tablet.jpg",
];

const additionalProducts = [
  ["accessories", "Chargeur USB-C 65W", "65W USB-C charger"],
  ["accessories", "Câble tressé USB-C", "Braided USB-C cable"],
  ["accessories", "Coque antichoc premium", "Premium shockproof case"],
  ["accessories", "Support téléphone bureau", "Desktop phone stand"],
  ["accessories", "Hub USB-C 7-en-1", "7-in-1 USB-C hub"],
  ["accessories", "Clavier compact sans fil", "Compact wireless keyboard"],
  ["accessories", "Souris ergonomique", "Ergonomic mouse"],
  ["accessories", "Webcam Full HD", "Full HD webcam"],
  ["accessories", "Adaptateur secteur universel", "Universal power adapter"],
  ["accessories", "Sacoche ordinateur 15 pouces", "15-inch laptop sleeve"],
  ["accessories", "Verre trempé iPhone", "iPhone tempered glass"],
  ["accessories", "Mini trépied flexible", "Flexible mini tripod"],
  ["accessories", "Microphone USB", "USB microphone"],
  ["accessories", "Lecteur de cartes SD", "SD card reader"],
  ["accessories", "Lampe LED de bureau", "LED desk lamp"],
  ["accessories", "Pochette câbles", "Cable organiser pouch"],
  ["accessories", "Chargeur voiture rapide", "Fast car charger"],
  ["accessories", "Station de recharge", "Charging station"],
  ["connected", "Enceinte Bluetooth", "Bluetooth speaker"],
  ["connected", "Caméra de sécurité Wi-Fi", "Wi-Fi security camera"],
  ["connected", "Sonnette vidéo connectée", "Smart video doorbell"],
  ["connected", "Ampoule intelligente", "Smart light bulb"],
  ["connected", "Prise connectée", "Smart plug"],
  ["connected", "Tracker Bluetooth", "Bluetooth tracker"],
  ["connected", "Casque gaming sans fil", "Wireless gaming headset"],
  ["connected", "Manette Bluetooth", "Bluetooth controller"],
  ["connected", "Lunettes audio", "Audio glasses"],
  ["connected", "Micro cravate sans fil", "Wireless lapel mic"],
  ["connected", "Projecteur portable", "Portable projector"],
  ["connected", "Clavier mécanique RGB", "RGB mechanical keyboard"],
  ["connected", "Souris gaming RGB", "RGB gaming mouse"],
  ["connected", "Bracelet fitness", "Fitness tracker"],
  ["connected", "Mini drone caméra", "Camera mini drone"],
  ["connected", "Routeur 4G portable", "Portable 4G router"],
  ["connected", "Écran connecté", "Smart display"],
  ["connected", "Balance intelligente", "Smart scale"],
  ["connected", "Lampe d’ambiance RGB", "RGB mood lamp"],
  ["computing", "MacBook Air M2", "MacBook Air M2"],
  ["computing", "Dell Inspiron 15", "Dell Inspiron 15"],
  ["computing", "HP Pavilion 14", "HP Pavilion 14"],
  ["computing", "Acer Aspire 5", "Acer Aspire 5"],
  ["computing", "Écran 27 pouces 4K", "27-inch 4K monitor"],
  ["computing", "Écran portable USB-C", "Portable USB-C monitor"],
  ["computing", "SSD externe 1 To", "1TB external SSD"],
  ["computing", "Disque dur externe 2 To", "2TB external hard drive"],
  ["computing", "Imprimante multifonction", "All-in-one printer"],
  ["computing", "Tablette graphique", "Drawing tablet"],
  ["computing", "Mini PC bureautique", "Office mini PC"],
  ["computing", "Station d’accueil", "USB-C docking station"],
  ["computing", "Onduleur compact", "Compact UPS"],
  ["computing", "Routeur Wi-Fi 6", "Wi-Fi 6 router"],
  ["computing", "Mémoire RAM 16 Go", "16GB RAM memory"],
  ["computing", "Carte graphique RTX", "RTX graphics card"],
  ["computing", "Fauteuil gaming", "Gaming chair"],
  ["computing", "Bureau électrique", "Electric standing desk"],
] as const;

const productExtras = additionalProducts.map(([family, fr, en], index) => ({
  id: `${family}-${index + 2}`,
  family,
  icon: family === "computing" ? "Laptop" : family === "connected" ? "Radio" : "Cable",
  imageSrc: productImages[index % productImages.length],
  price: { fr: "Prix sur demande", en: "Price on request" },
  badge: { fr: index % 3 === 0 ? "Nouveau" : "Disponible", en: index % 3 === 0 ? "New" : "Available" },
  name: { fr, en },
  description: { fr: "Un équipement sélectionné pour vous accompagner au quotidien.", en: "A selected device to support your everyday needs." },
}));

export const fullProductCatalog = [...productCatalog, ...productExtras];

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
