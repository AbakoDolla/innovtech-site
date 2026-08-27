export type CollaboratorRole = "owner" | "catalog_manager" | "sales" | "viewer";
export type AdminPermission =
  | "dashboard_read"
  | "catalog_read"
  | "catalog_manage"
  | "media_manage"
  | "categories_manage"
  | "promotions_manage"
  | "requests_read"
  | "requests_manage"
  | "settings_manage"
  | "collaborators_manage"
  | "export_manage";

export const roleLabels: Record<CollaboratorRole, string> = {
  owner: "Propriétaire",
  catalog_manager: "Gestionnaire catalogue",
  sales: "Commercial",
  viewer: "Lecteur",
};

const permissions: Record<CollaboratorRole, readonly AdminPermission[]> = {
  owner: ["dashboard_read", "catalog_read", "catalog_manage", "media_manage", "categories_manage", "promotions_manage", "requests_read", "requests_manage", "settings_manage", "collaborators_manage", "export_manage"],
  catalog_manager: ["dashboard_read", "catalog_read", "catalog_manage", "media_manage", "categories_manage", "promotions_manage"],
  sales: ["dashboard_read", "catalog_read", "requests_read", "requests_manage"],
  viewer: ["dashboard_read", "catalog_read"],
};

export function can(role: CollaboratorRole | null | undefined, permission: AdminPermission) {
  return Boolean(role && permissions[role].includes(permission));
}

export type Collaborator = {
  user_id: string;
  email: string;
  role: CollaboratorRole;
  active: boolean;
  display_name: string;
  invited_by: string | null;
  invited_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CustomerRequest = {
  id: string;
  request_type: "order" | "quote" | "appointment" | "question";
  status: "new" | "contacted" | "in_discussion" | "confirmed" | "fulfilled" | "cancelled";
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  source: "whatsapp" | "website" | "manual";
  internal_notes: string;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  sort_order: number;
  active: boolean;
};

export type CommercialSettings = {
  whatsappNumber: string;
  orderMessageFr: string;
  orderMessageEn: string;
  responseTimeFr: string;
  responseTimeEn: string;
  deliveryInfoFr: string;
  deliveryInfoEn: string;
};

export type HeroSettings = {
  eyebrowFr: string;
  eyebrowEn: string;
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
  primaryCtaFr: string;
  primaryCtaEn: string;
  primaryHref: string;
  imageUrl: string;
};

export const defaultCommercialSettings: CommercialSettings = {
  whatsappNumber: "237650795480",
  orderMessageFr: "Bonjour InnovTech, je souhaite avoir plus d’informations ou commander : {produit}.",
  orderMessageEn: "Hello InnovTech, I would like more information about or to order: {product}.",
  responseTimeFr: "Nous vous répondons rapidement sur WhatsApp.",
  responseTimeEn: "We reply quickly on WhatsApp.",
  deliveryInfoFr: "Disponibilité et livraison à confirmer avec notre équipe.",
  deliveryInfoEn: "Availability and delivery are confirmed with our team.",
};

export const defaultHeroSettings: HeroSettings = {
  eyebrowFr: "BIENVENUE · TROUVEZ VOTRE POINT DE DÉPART",
  eyebrowEn: "WELCOME · FIND YOUR STARTING POINT",
  titleFr: "Vous savez ce que vous cherchez. Nous vous y guidons.",
  titleEn: "You know your goal. We guide you there.",
  bodyFr: "Choisissez votre parcours : équipez-vous, lancez un projet digital ou échangez directement avec l’équipe. Chaque chemin vous conduit à la bonne prochaine étape.",
  bodyEn: "Choose your path: equip yourself, launch a digital project or talk to our team. Each path leads to the right next step.",
  primaryCtaFr: "Je cherche un équipement",
  primaryCtaEn: "I need equipment",
  primaryHref: "/boutique",
  imageUrl: "",
};

export function readJsonSetting<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" ? { ...fallback, ...(parsed as Partial<T>) } : fallback;
  } catch {
    return fallback;
  }
}

export function isPromotionActive(product: { promotion_enabled?: boolean; promotion_price_label?: string; promotion_starts_at?: string | null; promotion_ends_at?: string | null }, now = new Date()) {
  if (!product.promotion_enabled || !product.promotion_price_label?.trim()) return false;
  const currentTime = now.getTime();
  const startsAt = product.promotion_starts_at ? Date.parse(product.promotion_starts_at) : null;
  const endsAt = product.promotion_ends_at ? Date.parse(product.promotion_ends_at) : null;
  return (startsAt === null || (Number.isFinite(startsAt) && startsAt <= currentTime)) && (endsAt === null || (Number.isFinite(endsAt) && currentTime <= endsAt));
}

export function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function toCsv(headers: string[], rows: unknown[][]) {
  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}
