import { describe, expect, it } from "vitest";
import { mediaCatalog } from "./mediaCatalog";

describe("mediaCatalog product video", () => {
  it("uses a public release URL instead of an unavailable application fallback", () => {
    const video = mediaCatalog.productVideos[0];
    expect(video.videoSrc).toMatch(/^https:\/\//);
    expect(video.videoSrc).toContain("/releases/download/");
    expect(video.videoSrc).toMatch(/\.mp4$/);
  });
});
