import type { CatalogProduct, ProductFamily, ProductIcon } from "@/lib/site";

export type SupabaseCatalogRow = {
  id: string; slug: string; name_fr: string; name_en: string; category: string; icon: string;
  description_fr: string; description_en: string; price_label: string; price_label_en: string | null;
  image_url: string; status: "draft" | "published" | "hidden"; availability_status: string;
  availability_note_fr: string; availability_note_en: string; badge_fr: string; badge_en: string;
  search_terms_fr: unknown; search_terms_en: unknown; sort_order: number;
};

function terms(value: unknown) { return Array.isArray(value) ? value.filter((term): term is string => typeof term === "string") : []; }

export function toCatalogProduct(row: SupabaseCatalogRow): CatalogProduct {
  return {
    id: row.slug,
    family: row.category as ProductFamily,
    icon: row.icon as ProductIcon,
    imageSrc: row.image_url,
    price: { fr: row.price_label, en: row.price_label_en || row.price_label },
    badge: { fr: row.badge_fr, en: row.badge_en },
    name: { fr: row.name_fr, en: row.name_en },
    description: { fr: row.description_fr, en: row.description_en },
    searchTerms: { fr: terms(row.search_terms_fr), en: terms(row.search_terms_en) },
  };
}
