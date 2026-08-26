import { trpc } from "@/lib/trpc";
import { fullProductCatalog, type CatalogProduct, type ProductFamily, type ProductIcon } from "@/lib/site";

type PersistedProduct = {
  slug: string; family: string; icon: string; nameFr: string; nameEn: string; descriptionFr: string; descriptionEn: string; badgeFr: string; badgeEn: string; priceFr: string; priceEn: string; imageUrl: string; searchTermsFr: string; searchTermsEn: string; availabilityNoteFr: string; availabilityNoteEn: string;
};

function parseTerms(raw: string) {
  try { const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : []; } catch { return []; }
}

export function toCatalogProduct(product: PersistedProduct): CatalogProduct {
  return {
    id: product.slug,
    family: product.family as ProductFamily,
    icon: product.icon as ProductIcon,
    imageSrc: product.imageUrl,
    price: { fr: product.priceFr, en: product.priceEn },
    badge: { fr: product.badgeFr, en: product.badgeEn },
    name: { fr: product.nameFr, en: product.nameEn },
    description: { fr: product.descriptionFr, en: product.descriptionEn },
    searchTerms: { fr: parseTerms(product.searchTermsFr), en: parseTerms(product.searchTermsEn) },
    availability: { fr: product.availabilityNoteFr || "Disponibilité à confirmer avec notre équipe.", en: product.availabilityNoteEn || "Availability to confirm with our team." },
  };
}

export function catalogWithFallback(products: PersistedProduct[] | undefined) {
  return products?.length ? products.map(toCatalogProduct) : fullProductCatalog;
}

export function useManagedCatalog() {
  const query = trpc.catalog.list.useQuery();
  return { ...query, catalog: catalogWithFallback(query.data as PersistedProduct[] | undefined) };
}
