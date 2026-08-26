/** InnovTech design reminder: clear premium commerce, blue/cyan circuit accents, WhatsApp is the human conversion path. */
export type Lang = "fr" | "en";
export type ProductFamily = "security" | "tracking" | "drones" | "agriculture" | "computing" | "wearables" | "home";
export type ProductIcon = "Fingerprint" | "MapPinned" | "Plane" | "Tractor" | "Laptop" | "Monitor" | "Glasses" | "WashingMachine";

export type CatalogProduct = {
  id: string;
  family: ProductFamily;
  icon: ProductIcon;
  imageSrc: string;
  price: Record<Lang, string>;
  badge: Record<Lang, string>;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  searchTerms: Record<Lang, string[]>;
  availability?: Record<Lang, string>;
};

export type PortfolioProject = {
  id: string;
  url: string;
  imageSrc: string;
  category: Record<Lang, string>;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
};

/** InnovTech WhatsApp Business recipient, international digits only. */
export const WHATSAPP_NUMBER = "237650795480";

/** Add the public profile URLs once the InnovTech Facebook and Instagram pages are ready. */
export const SOCIAL_PROFILES = {
  facebook: "",
  instagram: "",
  linkedin: "",
} as const;

const localMediaAliases: Record<string, string> = {
  "innovtech-logo-cropped.png": "/media/branding/innovtech-logo.png",
  "innovtech-symbol.png": "/media/branding/innovtech-symbol.png",
  "innovtech-accessories-collection.png": "/media/products/powerbank-usbc-pexels.jpeg",
  "powerbank.jpg": "/media/products/powerbank-usbc-pexels.jpeg",
};

export function localMediaSrc(source: string) {
  const fileName = source.split("/").pop()?.replace(/_[a-f0-9]{8,}(?=\.)/i, "") || source;
  if (localMediaAliases[fileName]) return localMediaAliases[fileName];
  return source.startsWith("/manus-storage/") ? `/media/products/${fileName}` : source;
}

/**
 * ZONE DE SAISIE DES PRIX : remplacez la valeur de chaque article ci-dessous.
 * Exemple : biometricLock: { fr: "35 000 FCFA", en: "35,000 XAF" }.
 * Les fiches et la Boutique se mettront à jour automatiquement.
 */
export const PRODUCT_PRICES = {
  biometricLock: { fr: "Prix à définir", en: "Price to be set" },
  faceLock: { fr: "Prix à définir", en: "Price to be set" },
  vehicleTracker: { fr: "Prix à définir", en: "Price to be set" },
  tractorTracker: { fr: "Prix à définir", en: "Price to be set" },
  agricultureDrone: { fr: "Prix à définir", en: "Price to be set" },
  cameraDrone: { fr: "Prix à définir", en: "Price to be set" },
  roboticMiniTractor: { fr: "Prix à définir", en: "Price to be set" },
  laptop: { fr: "Prix à définir", en: "Price to be set" },
  desktop: { fr: "Prix à définir", en: "Price to be set" },
  smartGlasses: { fr: "Prix à définir", en: "Price to be set" },
  washingMachine: { fr: "Prix à définir", en: "Price to be set" },
} as const;

/** Product labels remain descriptive until InnovTech confirms exact brands and models. */
const specializedProductCatalog: CatalogProduct[] = [
  { id: "serrure-biometrique", family: "security", icon: "Fingerprint", imageSrc: "/media/products/fingerprint-smart-lock.jpg", price: PRODUCT_PRICES.biometricLock, badge: { fr: "Empreinte", en: "Fingerprint" }, name: { fr: "Serrure biométrique à empreinte", en: "Fingerprint biometric lock" }, description: { fr: "Une serrure connectée avec accès par empreinte, code et clé de secours selon la configuration disponible.", en: "A connected lock with fingerprint, passcode and backup-key access depending on the available configuration." }, searchTerms: { fr: ["serrure", "biométrique", "empreinte", "porte", "sécurité"], en: ["lock", "biometric", "fingerprint", "door", "security"] } },
  { id: "serrure-reconnaissance-faciale", family: "security", icon: "Fingerprint", imageSrc: "/media/products/face-recognition-lock.jpg", price: PRODUCT_PRICES.faceLock, badge: { fr: "Reconnaissance faciale", en: "Face recognition" }, name: { fr: "Serrure connectée à reconnaissance faciale", en: "Face-recognition smart lock" }, description: { fr: "Une solution de contrôle d’accès connectée avec module de reconnaissance faciale, selon le modèle disponible.", en: "A connected access-control solution with face-recognition module, depending on the available model." }, searchTerms: { fr: ["serrure", "visage", "faciale", "reconnaissance", "porte"], en: ["lock", "face", "facial", "recognition", "door"] } },
  { id: "traceur-gps-vehicule-moto", family: "tracking", icon: "MapPinned", imageSrc: "/media/products/vehicle-moto-gps-tracker.jpg", price: PRODUCT_PRICES.vehicleTracker, badge: { fr: "Véhicule & moto", en: "Vehicle & motorcycle" }, name: { fr: "Traceur GPS véhicule et moto", en: "Vehicle and motorcycle GPS tracker" }, description: { fr: "Un traceur compact à choisir avec l’équipe selon l’installation, la couverture réseau et l’usage prévu.", en: "A compact tracker to select with the team based on installation, network coverage and intended use." }, searchTerms: { fr: ["gps", "voiture", "moto", "traceur", "véhicule"], en: ["gps", "car", "motorcycle", "tracker", "vehicle"] } },
  { id: "traceur-gps-tracteur", family: "tracking", icon: "MapPinned", imageSrc: "/media/products/tractor-gps-tracker.webp", price: PRODUCT_PRICES.tractorTracker, badge: { fr: "Agriculture", en: "Agriculture" }, name: { fr: "Traceur GPS pour tracteur", en: "Tractor GPS tracker" }, description: { fr: "Un équipement de suivi destiné aux engins agricoles, à confirmer selon le type de tracteur et la zone d’utilisation.", en: "A tracking device for agricultural machinery, to confirm based on tractor type and area of use." }, searchTerms: { fr: ["gps", "tracteur", "agriculture", "suivi", "engins"], en: ["gps", "tractor", "agriculture", "tracking", "machinery"] } },
  { id: "drone-agricole", family: "drones", icon: "Plane", imageSrc: "/media/products/agricultural-drone.webp", price: PRODUCT_PRICES.agricultureDrone, badge: { fr: "Agriculture", en: "Agriculture" }, name: { fr: "Drone agricole", en: "Agricultural drone" }, description: { fr: "Un drone dédié aux usages agricoles ; les capacités et accessoires sont définis selon votre besoin concret.", en: "A drone dedicated to agricultural uses; capabilities and accessories are defined for your specific need." }, searchTerms: { fr: ["drone", "agricole", "agriculture", "champ", "pulvérisation"], en: ["drone", "agricultural", "agriculture", "field", "spraying"] } },
  { id: "drone-camera-pliable", family: "drones", icon: "Plane", imageSrc: "/media/products/foldable-camera-drone.jpg", price: PRODUCT_PRICES.cameraDrone, badge: { fr: "Prise de vue", en: "Imaging" }, name: { fr: "Drone polyvalent à caméra", en: "Multipurpose camera drone" }, description: { fr: "Un drone compact pour les prises de vue et les usages de loisir ou de repérage, selon le modèle disponible.", en: "A compact drone for imaging and recreational or scouting uses, depending on the available model." }, searchTerms: { fr: ["drone", "camera", "caméra", "pliable", "photo", "vidéo"], en: ["drone", "camera", "foldable", "photo", "video"] } },
  { id: "mini-tracteur-robotique", family: "agriculture", icon: "Tractor", imageSrc: "/media/products/robotic-mini-tractor.webp", price: PRODUCT_PRICES.roboticMiniTractor, badge: { fr: "Robotique agricole", en: "Agricultural robotics" }, name: { fr: "Mini-tracteur robotique agricole", en: "Robotic agricultural mini tractor" }, description: { fr: "Un engin autonome compact pour accompagner certains travaux agricoles, à définir selon la surface et les tâches visées.", en: "A compact autonomous machine for selected agricultural tasks, to define based on area and intended work." }, searchTerms: { fr: ["tracteur", "robot", "robotique", "agriculture", "autonome"], en: ["tractor", "robot", "robotic", "agriculture", "autonomous"] } },
  { id: "laptop-professionnel", family: "computing", icon: "Laptop", imageSrc: "/media/products/office-laptop.jpg", price: PRODUCT_PRICES.laptop, badge: { fr: "Laptop", en: "Laptop" }, name: { fr: "Laptop professionnel", en: "Professional laptop" }, description: { fr: "Un ordinateur portable à sélectionner selon la bureautique, les études, la création ou les besoins professionnels.", en: "A laptop to select for office work, studies, creation or professional needs." }, searchTerms: { fr: ["laptop", "ordinateur", "portable", "bureautique", "travail"], en: ["laptop", "computer", "notebook", "office", "work"] } },
  { id: "desktop-professionnel", family: "computing", icon: "Monitor", imageSrc: "/media/products/desktop-computer.jpg", price: PRODUCT_PRICES.desktop, badge: { fr: "Desktop", en: "Desktop" }, name: { fr: "Desktop professionnel", en: "Professional desktop" }, description: { fr: "Un poste fixe à configurer pour le travail, les études ou les usages nécessitant un espace de bureau complet.", en: "A desktop setup to configure for work, studies or uses needing a complete workstation." }, searchTerms: { fr: ["desktop", "ordinateur", "bureau", "pc", "poste"], en: ["desktop", "computer", "office", "pc", "workstation"] } },
  { id: "lunettes-intelligentes", family: "wearables", icon: "Glasses", imageSrc: "/media/products/smart-glasses.webp", price: PRODUCT_PRICES.smartGlasses, badge: { fr: "Wearable", en: "Wearable" }, name: { fr: "Lunettes intelligentes", en: "Smart glasses" }, description: { fr: "Des lunettes connectées à choisir selon l’usage recherché : affichage, caméra ou expérience mains libres.", en: "Connected glasses to select by intended use: display, camera or hands-free experience." }, searchTerms: { fr: ["lunettes", "intelligentes", "smart glasses", "connectées", "wearable"], en: ["glasses", "smart glasses", "connected", "wearable"] } },
  { id: "machine-a-laver", family: "home", icon: "WashingMachine", imageSrc: "/media/products/washing-machine.jpg", price: PRODUCT_PRICES.washingMachine, badge: { fr: "Maison", en: "Home" }, name: { fr: "Machine à laver", en: "Washing machine" }, description: { fr: "Une machine à laver à choisir avec notre équipe selon la capacité, le type de chargement et votre installation.", en: "A washing machine to select with our team based on capacity, loading type and your installation." }, searchTerms: { fr: ["machine", "laver", "linge", "maison", "électroménager"], en: ["washing", "machine", "laundry", "home", "appliance"] } },
];

export const fullProductCatalog = specializedProductCatalog;
export const productCatalog = fullProductCatalog.slice(0, 6);

export const serviceCatalog = [
  { id: "site-web", icon: "PanelsTopLeft", title: { fr: "Création de sites web", en: "Website creation" }, description: { fr: "Des sites vitrines modernes, rapides et pensés pour inspirer confiance.", en: "Modern, fast showcase websites built to inspire confidence." }, detail: { fr: "Conseil, conception, interface responsive et mise en ligne : votre présence digitale prend une forme claire et utile.", en: "Consulting, design, responsive interface and launch: your digital presence takes a clear, useful form." } },
  { id: "app-web", icon: "Globe2", title: { fr: "Applications web", en: "Web applications" }, description: { fr: "Des outils sur mesure pour simplifier vos opérations et vos échanges.", en: "Custom tools that simplify your operations and communication." }, detail: { fr: "Nous transformons votre besoin en une application web organisée, accessible et adaptée à vos usages.", en: "We turn your need into an organised, accessible web application tailored to the way you work." } },
  { id: "app-mobile", icon: "Smartphone", title: { fr: "Applications mobiles", en: "Mobile applications" }, description: { fr: "Des expériences mobiles intuitives, conçues pour être utilisées partout.", en: "Intuitive mobile experiences made to be used everywhere." }, detail: { fr: "Du parcours utilisateur à l’interface finale, chaque écran sert votre objectif et vos utilisateurs.", en: "From user journey to final interface, every screen serves your goal and your users." } },
] as const;

export const portfolioProjects: PortfolioProject[] = [
  { id: "portfolio-evans", url: "https://portfolio-evans-abah.vercel.app", imageSrc: "/media/projects/portfolio-evans.webp", category: { fr: "Portfolio & cybersécurité", en: "Portfolio & cybersecurity" }, title: { fr: "Portfolio Evans Abah", en: "Evans Abah portfolio" }, description: { fr: "Un portfolio bilingue pour présenter des compétences en développement full-stack et cybersécurité.", en: "A bilingual portfolio showcasing full-stack development and cybersecurity expertise." } },
  { id: "boo", url: "https://boowebapp.vercel.app", imageSrc: "/media/projects/boo-commerce.webp", category: { fr: "E-commerce & WhatsApp", en: "E-commerce & WhatsApp" }, title: { fr: "BOO — Jus de Baobab", en: "BOO — Baobab juice" }, description: { fr: "Une boutique artisanale avec catalogue, panier et passage fluide de la commande à WhatsApp.", en: "An artisanal storefront with catalogue, cart and a smooth handoff to WhatsApp ordering." } },
  { id: "verifio", url: "https://verifiowebapp.vercel.app", imageSrc: "/media/projects/verifio-commerce.webp", category: { fr: "Commerce social", en: "Social commerce" }, title: { fr: "Verifio", en: "Verifio" }, description: { fr: "Un concept de tiers de confiance pour vérifier des vendeurs et sécuriser le commerce social.", en: "A trusted-third-party concept for verifying sellers and securing social commerce." } },
  { id: "star-life", url: "https://star-live-co.vercel.app", imageSrc: "/media/projects/star-life-services.webp", category: { fr: "Site corporate", en: "Corporate website" }, title: { fr: "Star-Life & Company", en: "Star-Life & Company" }, description: { fr: "Un site de présentation multiservices avec offres, formulaires de demande et contact direct.", en: "A multi-service showcase with offers, request forms and direct contact." } },
];

export function whatsappUrl(message: string) {
  const recipient = WHATSAPP_NUMBER.trim();
  return `https://wa.me/${recipient ? recipient : ""}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(item: string, lang: Lang) {
  return lang === "fr" ? `Bonjour InnovTech, je souhaite avoir plus d’informations ou commander : ${item}.` : `Hello InnovTech, I would like more information about or to order: ${item}.`;
}

export function productOrderMessage(item: string, quantity: number, lang: Lang) {
  const requestedQuantity = Math.max(1, Math.floor(quantity) || 1);
  return lang === "fr"
    ? `Bonjour InnovTech, je souhaite commander : ${item}. Quantité souhaitée : ${requestedQuantity}. Merci de confirmer la disponibilité et le prix.`
    : `Hello InnovTech, I would like to order: ${item}. Requested quantity: ${requestedQuantity}. Please confirm availability and price.`;
}

export function quoteMessage(service: string, lang: Lang) {
  return lang === "fr" ? `Bonjour InnovTech, je souhaite demander un devis pour : ${service}.` : `Hello InnovTech, I would like to request a quote for: ${service}.`;
}
