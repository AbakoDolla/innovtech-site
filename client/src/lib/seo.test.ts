import { describe, expect, it } from "vitest";
import { absoluteUrl, getSeoPage } from "./seo";

describe("getSeoPage", () => {
  it("returns a localized product page with its canonical route", () => {
    const seo = getSeoPage("/boutique/mini-tracteur-robotique", "fr");
    expect(seo.title).toContain("Mini-tracteur robotique agricole");
    expect(seo.canonicalPath).toBe("/boutique/mini-tracteur-robotique");
    expect(seo.type).toBe("product");
  });

  it("returns a dedicated English service page", () => {
    const seo = getSeoPage("/services", "en");
    expect(seo.title).toContain("Website and application");
    expect(seo.canonicalPath).toBe("/services");
  });

  it("builds absolute canonical URLs without a trailing slash on the origin", () => {
    expect(absoluteUrl("/")).toBe("https://innovtech-site.vercel.app");
    expect(absoluteUrl("/contact")).toBe("https://innovtech-site.vercel.app/contact");
  });
});
