export type PlaybackTarget = {
  paused: boolean;
  play: () => Promise<void>;
  pause: () => void;
};

export async function toggleVideoPlayback(video: PlaybackTarget | null): Promise<"played" | "paused" | "missing"> {
  if (!video) return "missing";
  if (video.paused) {
    await video.play();
    return "played";
  }
  video.pause();
  return "paused";
}
