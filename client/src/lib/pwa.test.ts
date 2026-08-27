import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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

  it("versionne la coque PWA afin de remplacer le cache d’administration précédent", () => {
    const serviceWorker = readFileSync(resolve(process.cwd(), "client/public/service-worker.js"), "utf8");
    expect(serviceWorker).toContain('const CACHE_NAME = "innovtech-shell-v2"');
  });
});
