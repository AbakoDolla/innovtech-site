import { describe, expect, it } from "vitest";
import { can, csvCell, isPromotionActive, readJsonSetting, toCsv } from "./adminCommerce";

describe("rôles et commerce InnovTech", () => {
  it("applique des permissions minimales par rôle", () => {
    expect(can("owner", "collaborators_manage")).toBe(true);
    expect(can("catalog_manager", "catalog_manage")).toBe(true);
    expect(can("catalog_manager", "requests_read")).toBe(false);
    expect(can("sales", "requests_manage")).toBe(true);
    expect(can("viewer", "catalog_manage")).toBe(false);
  });

  it("active une promotion uniquement dans sa période et avec un prix", () => {
    const product = { promotion_enabled: true, promotion_price_label: "35 000 FCFA", promotion_starts_at: "2026-08-01T00:00:00Z", promotion_ends_at: "2026-08-31T23:59:59Z" };
    expect(isPromotionActive(product, new Date("2026-08-20T12:00:00Z"))).toBe(true);
    expect(isPromotionActive(product, new Date("2026-09-01T00:00:00Z"))).toBe(false);
    expect(isPromotionActive({ promotion_enabled: true, promotion_price_label: "30 000 FCFA" }, new Date("2026-08-20T12:00:00Z"))).toBe(true);
    expect(isPromotionActive({ ...product, promotion_price_label: "" }, new Date("2026-08-20T12:00:00Z"))).toBe(false);
  });

  it("lit les réglages JSON de façon sûre et exporte un CSV compatible", () => {
    expect(readJsonSetting('{"whatsappNumber":"237600000000"}', { whatsappNumber: "default", label: "base" })).toEqual({ whatsappNumber: "237600000000", label: "base" });
    expect(readJsonSetting("not-json", { enabled: true })).toEqual({ enabled: true });
    expect(csvCell('He said "hello"')).toBe('"He said ""hello"""');
    expect(toCsv(["Nom", "Notes"], [["Awa", "Bonjour, client"]])).toContain('"Bonjour, client"');
  });
});
