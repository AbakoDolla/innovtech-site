import { describe, expect, it } from "vitest";
import { parseCookieConsent } from "./CookieConsentContext";

describe("parseCookieConsent", () => {
  it("accepts a complete consent record and rejects incomplete or invalid records", () => {
    expect(parseCookieConsent('{"preferences":true,"analytics":false,"marketing":false,"updatedAt":"2026-08-26"}')).toMatchObject({ preferences: true, analytics: false, marketing: false });
    expect(parseCookieConsent('{"preferences":true}')).toBeNull();
    expect(parseCookieConsent("not-json")).toBeNull();
  });
});
