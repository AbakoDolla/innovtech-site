import { describe, expect, it, vi } from "vitest";
import { toggleVideoPlayback } from "./videoPlayback";

describe("toggleVideoPlayback", () => {
  it("starts playback when the video is paused", async () => {
    const play = vi.fn().mockResolvedValue(undefined);
    const pause = vi.fn();
    await expect(toggleVideoPlayback({ paused: true, play, pause })).resolves.toBe("played");
    expect(play).toHaveBeenCalledOnce();
    expect(pause).not.toHaveBeenCalled();
  });

  it("pauses playback when the video is already playing", async () => {
    const play = vi.fn().mockResolvedValue(undefined);
    const pause = vi.fn();
    await expect(toggleVideoPlayback({ paused: false, play, pause })).resolves.toBe("paused");
    expect(pause).toHaveBeenCalledOnce();
  });

  it("surfaces a browser playback failure so the interface can display its retry state", async () => {
    const play = vi.fn().mockRejectedValue(new Error("Playback blocked"));
    await expect(toggleVideoPlayback({ paused: true, play, pause: vi.fn() })).rejects.toThrow("Playback blocked");
  });
});
