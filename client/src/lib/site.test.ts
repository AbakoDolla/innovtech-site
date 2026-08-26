import { describe, expect, it } from "vitest";
import { fullProductCatalog, portfolioProjects, productOrderMessage, whatsappUrl } from "./site";

describe("InnovTech product catalogue", () => {
  it("maps every curated product to a stored image and a valid category", () => {
      expect(fullProductCatalog.length).toBe(11);
    fullProductCatalog.forEach(product => {
      expect(product.imageSrc).toMatch(/^\/media\/.+\.(jpg|jpeg|png|webp)$/);
      expect(["security", "tracking", "drones", "agriculture", "computing", "wearables", "home"]).toContain(product.family);
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

  it("keeps every showcased project linked, illustrated and bilingual", () => {
    expect(portfolioProjects.length).toBeGreaterThanOrEqual(4);
    portfolioProjects.forEach(project => {
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.imageSrc).toMatch(/^\/media\/projects\/.+\.webp$/);
      expect(project.title.fr.trim()).not.toHaveLength(0);
      expect(project.title.en.trim()).not.toHaveLength(0);
    });
  });

  it("prepares a quantity-specific WhatsApp order message", () => {
    expect(productOrderMessage("Casque sans fil", 3, "fr")).toContain("Quantité souhaitée : 3");
    expect(productOrderMessage("Wireless headphones", 2, "en")).toContain("Requested quantity: 2");
    expect(productOrderMessage("Article", 0, "fr")).toContain("Quantité souhaitée : 1");
  });

  it("routes WhatsApp actions to the configured InnovTech Business number", () => {
    expect(whatsappUrl("Bonjour InnovTech")).toBe("https://wa.me/237650795480?text=Bonjour%20InnovTech");
  });
});
