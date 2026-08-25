import { describe, expect, it } from "vitest";
import { MAX_MEDIA_BYTES, safeMediaFilename, validateMediaUpload } from "./mediaUpload";

describe("media upload validation", () => {
  it("accepts a small valid PNG payload", () => {
    const result = validateMediaUpload({ mediaType: "image", contentType: "image/png", base64: Buffer.from("image").toString("base64") });
    expect(result.toString()).toBe("image");
  });

  it("rejects a format that does not match the selected media type", () => {
    expect(() => validateMediaUpload({ mediaType: "image", contentType: "video/mp4", base64: "YQ==" })).toThrow("Unsupported media format");
  });

  it("creates safe storage filenames", () => {
    expect(safeMediaFilename("Ma vidéo serrure !.MP4")).toBe("ma-vid-o-serrure-.mp4");
  });

  it("keeps the configured media size cap", () => {
    expect(MAX_MEDIA_BYTES).toBe(20 * 1024 * 1024);
  });
});
