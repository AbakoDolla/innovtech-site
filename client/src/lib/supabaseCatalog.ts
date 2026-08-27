import type { CatalogProduct, ProductFamily, ProductIcon } from "@/lib/site";

export type SupabaseCatalogRow = {
  id: string; slug: string; name_fr: string; name_en: string; category: string; icon: string;
  description_fr: string; description_en: string; price_label: string; price_label_en: string | null;
  image_url: string; status: "draft" | "published" | "hidden"; availability_status: string;
  availability_note_fr: string; availability_note_en: string; badge_fr: string; badge_en: string;
  search_terms_fr: unknown; search_terms_en: unknown; gallery_urls: unknown; video_urls: unknown; sort_order: number;
  stock_quantity?: number | null; promotion_enabled?: boolean; promotion_price_label?: string; promotion_price_label_en?: string;
  promotion_starts_at?: string | null; promotion_ends_at?: string | null;
};

function terms(value: unknown) { return Array.isArray(value) ? value.filter((term): term is string => typeof term === "string") : []; }
function mediaUrls(value: unknown) { return Array.isArray(value) ? value.filter((url): url is string => typeof url === "string" && /^https?:\/\//.test(url)) : []; }

export function toCatalogProduct(row: SupabaseCatalogRow): CatalogProduct {
  return {
    id: row.slug,
    family: row.category as ProductFamily,
    icon: row.icon as ProductIcon,
    imageSrc: row.image_url,
    media: { images: Array.from(new Set([row.image_url, ...mediaUrls(row.gallery_urls)].filter(Boolean))), videos: mediaUrls(row.video_urls) },
    price: { fr: row.price_label, en: row.price_label_en || row.price_label },
    badge: { fr: row.badge_fr, en: row.badge_en },
    name: { fr: row.name_fr, en: row.name_en },
    description: { fr: row.description_fr, en: row.description_en },
    searchTerms: { fr: terms(row.search_terms_fr), en: terms(row.search_terms_en) },
    availability: { fr: row.availability_note_fr || "Disponibilité à confirmer avec notre équipe.", en: row.availability_note_en || "Availability to confirm with our team." },
    stockQuantity: row.stock_quantity ?? null,
    promotion: row.promotion_enabled && row.promotion_price_label ? {
      price: { fr: row.promotion_price_label, en: row.promotion_price_label_en || row.promotion_price_label },
      startsAt: row.promotion_starts_at,
      endsAt: row.promotion_ends_at,
    } : undefined,
  };
}
