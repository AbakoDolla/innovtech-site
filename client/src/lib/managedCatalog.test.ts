import { describe, expect, it } from "vitest";
import { catalogWithFallback } from "./managedCatalog";
import { toCatalogProduct, type SupabaseCatalogRow } from "./supabaseCatalog";

const persisted: SupabaseCatalogRow = { id: "catalog-row", slug: "produit-test", category: "security", icon: "Fingerprint", name_fr: "Produit test", name_en: "Test product", description_fr: "Description française suffisamment longue.", description_en: "English description long enough.", badge_fr: "Nouveau", badge_en: "New", price_label: "10 000 FCFA", price_label_en: "10,000 XAF", image_url: "/media/test.jpg", search_terms_fr: ["test", "serrure"], search_terms_en: ["test", "lock"], availability_note_fr: "Disponible sur demande", availability_note_en: "Available on request", availability_status: "available", status: "published", sort_order: 0 };

describe("managed catalogue", () => {
  it("maps a persisted product to the public product contract", () => {
    expect(toCatalogProduct(persisted)).toMatchObject({ id: "produit-test", imageSrc: "/media/test.jpg", price: { fr: "10 000 FCFA" }, searchTerms: { en: ["test", "lock"] } });
  });

  it("keeps the existing catalogue available until administration is initialized", () => {
    expect(catalogWithFallback([]).length).toBeGreaterThan(0);
  });
});
