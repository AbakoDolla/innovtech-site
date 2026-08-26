import { fullProductCatalog, type Lang } from "./site";

export const SITE_ORIGIN = "https://innovtech-site.vercel.app";

export type SeoPage = {
  title: string;
  description: string;
  canonicalPath: string;
  type: "website" | "product";
};

const pageCopy = {
  home: {
    fr: { title: "InnovTech Cameroun | High-tech, GPS, drones & solutions digitales", description: "InnovTech accompagne vos projets au Cameroun : serrures connectées, GPS, drones, informatique, sites web et applications. Échangez avec notre équipe sur WhatsApp." },
    en: { title: "InnovTech Cameroon | High-tech, GPS, drones & digital solutions", description: "InnovTech supports projects in Cameroon with smart locks, GPS trackers, drones, computing equipment, websites and web or mobile applications. Talk with our team on WhatsApp." },
  },
  shop: {
    fr: { title: "Boutique high-tech spécialisée | InnovTech Cameroun", description: "Découvrez les serrures biométriques, traceurs GPS, drones agricoles, mini-tracteur robotique, informatique et équipements maison InnovTech." },
    en: { title: "Specialized high-tech shop | InnovTech Cameroon", description: "Explore biometric locks, GPS trackers, agricultural drones, robotic mini tractors, computing equipment and home technology with InnovTech." },
  },
  services: {
    fr: { title: "Création de sites web et applications | InnovTech Cameroun", description: "InnovTech conçoit des sites web, applications web et expériences mobiles claires, rapides et adaptées à votre activité." },
    en: { title: "Website and application development | InnovTech Cameroon", description: "InnovTech designs clear, fast websites, web applications and mobile experiences tailored to your activity." },
  },
  about: {
    fr: { title: "À propos d’InnovTech | Technologie et accompagnement", description: "Découvrez InnovTech, une équipe qui relie équipements high-tech et solutions digitales pour des projets concrets au Cameroun." },
    en: { title: "About InnovTech | Technology and human support", description: "Discover InnovTech, a team connecting high-tech equipment and digital solutions for concrete projects in Cameroon." },
  },
  contact: {
    fr: { title: "Contact et devis WhatsApp | InnovTech Cameroun", description: "Contactez InnovTech pour un équipement, une disponibilité, un devis de site web ou une application. Notre équipe vous répond sur WhatsApp." },
    en: { title: "Contact and WhatsApp quotes | InnovTech Cameroon", description: "Contact InnovTech for equipment availability, website quotes or application projects. Our team replies on WhatsApp." },
  },
} as const;

export function getSeoPage(path: string, lang: Lang): SeoPage {
  const productId = path.match(/^\/boutique\/([^/]+)$/)?.[1];
  const product = productId ? fullProductCatalog.find((item) => item.id === productId) : undefined;
  if (product) {
    return {
      title: lang === "fr" ? `${product.name.fr} | InnovTech Cameroun` : `${product.name.en} | InnovTech Cameroon`,
      description: product.description[lang],
      canonicalPath: `/boutique/${product.id}`,
      type: "product",
    };
  }

  const key = path === "/boutique" ? "shop" : path === "/services" ? "services" : path === "/a-propos" ? "about" : path === "/contact" ? "contact" : "home";
  return { ...pageCopy[key][lang], canonicalPath: path === "/" ? "/" : path, type: "website" };
}

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path === "/" ? "" : path}`;
}
