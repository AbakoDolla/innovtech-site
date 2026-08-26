import { describe, expect, it } from "vitest";
import { managedProductInput } from "@shared/adminCatalog";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const validProduct = {
  slug: "produit-test",
  family: "security" as const,
  icon: "Fingerprint" as const,
  status: "published" as const,
  nameFr: "Produit de test",
  nameEn: "Test product",
  descriptionFr: "Une description française suffisamment précise.",
  descriptionEn: "An English description detailed enough.",
  badgeFr: "Test",
  badgeEn: "Test",
  priceFr: "10 000 FCFA",
  priceEn: "10,000 XAF",
  imageUrl: "/media/test.jpg",
  searchTermsFr: ["test"],
  searchTermsEn: ["test"],
  sortOrder: 0,
};

function regularUserContext(): TrpcContext {
  return {
    user: { id: 2, openId: "regular-user", name: "User", email: "user@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("catalogue administré", () => {
  it("accepts a complete product payload", () => {
    expect(managedProductInput.parse(validProduct).slug).toBe("produit-test");
  });

  it("rejects unsafe product slugs", () => {
    expect(() => managedProductInput.parse({ ...validProduct, slug: "Produit test !" })).toThrow();
  });

  it("refuses the administrative list to a regular user", async () => {
    const caller = appRouter.createCaller(regularUserContext());
    await expect(caller.catalog.adminList()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
