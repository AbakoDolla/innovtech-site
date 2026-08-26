import { describe, expect, it } from "vitest";
import { toCatalogProduct, type SupabaseCatalogRow } from "./supabaseCatalog";

describe("catalogue Supabase", () => {
  it("convertit les libellés bilingues vers le contrat public", () => {
    const row: SupabaseCatalogRow = { id: "id", slug: "test", name_fr: "Test", name_en: "Test EN", category: "connected", icon: "Watch", description_fr: "Description", description_en: "Description EN", price_label: "10 FCFA", price_label_en: "10 XAF", image_url: "/media/test.jpg", status: "published", availability_status: "available", availability_note_fr: "", availability_note_en: "", badge_fr: "Nouveau", badge_en: "New", search_terms_fr: ["objet"], search_terms_en: ["device"], sort_order: 0 };
    expect(toCatalogProduct(row)).toMatchObject({ id: "test", price: { fr: "10 FCFA", en: "10 XAF" }, searchTerms: { en: ["device"] } });
  });
});
