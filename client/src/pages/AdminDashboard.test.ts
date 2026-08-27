import { describe, expect, it } from "vitest";
import { productUsesMedia, seedPayload } from "./AdminDashboard";

describe("seedPayload", () => {
  it("prépare le catalogue existant pour un import Supabase bilingue", () => {
    const first = seedPayload()[0];
    expect(first).toMatchObject({ status: "published", availability_status: "on_request" });
    expect(first.price_label_en).toBeTruthy();
  });

  it("repère un média déjà associé pour empêcher sa suppression définitive", () => {
    const product = { image_url: "https://example.test/main.jpg", gallery_urls: ["https://example.test/gallery.jpg"], video_urls: ["https://example.test/video.mp4"] };
    expect(productUsesMedia(product, "https://example.test/main.jpg")).toBe(true);
    expect(productUsesMedia(product, "https://example.test/gallery.jpg")).toBe(true);
    expect(productUsesMedia(product, "https://example.test/video.mp4")).toBe(true);
    expect(productUsesMedia(product, "https://example.test/other.jpg")).toBe(false);
  });
});
