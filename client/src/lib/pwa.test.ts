import { describe, expect, it } from "vitest";
import { isStandalonePwa, shouldUseAdminManifest } from "./pwa";

describe("PWA InnovTech", () => {
  it("identifie correctement le mode d’application installée", () => {
    expect(isStandalonePwa(true)).toBe(true);
    expect(isStandalonePwa(false, true)).toBe(true);
    expect(isStandalonePwa(false, false)).toBe(false);
  });

  it("sélectionne le manifeste d’administration uniquement pour les routes protégées", () => {
    expect(shouldUseAdminManifest("/admin/catalogue")).toBe(true);
    expect(shouldUseAdminManifest("/boutique")).toBe(false);
  });
});
