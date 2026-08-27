import { describe, expect, it } from "vitest";
import { cleanMediaFilename, getProductMediaType } from "./supabaseMedia";

describe("supabaseMedia helpers", () => {
  it("identifies the accepted product media types", () => {
    expect(getProductMediaType("image/webp")).toBe("image");
    expect(getProductMediaType("video/mp4")).toBe("video");
    expect(getProductMediaType("application/pdf")).toBeNull();
  });

  it("creates safe and predictable media filenames", () => {
    expect(cleanMediaFilename("Drone Agricole 2026!.WEBP")).toBe("drone-agricole-2026.webp");
    expect(cleanMediaFilename("   ")).toBe("media");
  });
});
