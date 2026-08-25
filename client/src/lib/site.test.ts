import { describe, expect, it } from "vitest";
import { fullProductCatalog } from "./site";

describe("InnovTech product catalogue", () => {
  it("maps every curated product to a stored image and a valid category", () => {
    expect(fullProductCatalog.length).toBeGreaterThanOrEqual(12);
    fullProductCatalog.forEach(product => {
      expect(product.imageSrc).toMatch(/^\/media\/.+\.(jpg|jpeg|png|webp)$/);
      expect(["accessories", "connected", "computing"]).toContain(product.family);
      expect(product.name.fr.trim()).not.toHaveLength(0);
      expect(product.name.en.trim()).not.toHaveLength(0);
    });
  });

  it("gives every product searchable keywords in both languages", () => {
    fullProductCatalog.forEach(product => {
      expect(product.searchTerms.fr.length).toBeGreaterThan(0);
      expect(product.searchTerms.en.length).toBeGreaterThan(0);
    });
  });
});
