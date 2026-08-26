import { describe, expect, it } from "vitest";
import { catalogWithFallback, toCatalogProduct } from "./managedCatalog";

const persisted = { slug: "produit-test", family: "security", icon: "Fingerprint", nameFr: "Produit test", nameEn: "Test product", descriptionFr: "Description française suffisamment longue.", descriptionEn: "English description long enough.", badgeFr: "Nouveau", badgeEn: "New", priceFr: "10 000 FCFA", priceEn: "10,000 XAF", imageUrl: "/media/test.jpg", searchTermsFr: '["test","serrure"]', searchTermsEn: '["test","lock"]', availabilityNoteFr: "Disponible sur demande", availabilityNoteEn: "Available on request" };

describe("managed catalogue", () => {
  it("maps a persisted product to the public product contract", () => {
    expect(toCatalogProduct(persisted)).toMatchObject({ id: "produit-test", imageSrc: "/media/test.jpg", price: { fr: "10 000 FCFA" }, searchTerms: { en: ["test", "lock"] } });
  });

  it("keeps the existing catalogue available until administration is initialized", () => {
    expect(catalogWithFallback([]).length).toBeGreaterThan(0);
  });
});
