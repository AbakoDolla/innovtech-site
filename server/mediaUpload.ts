/** InnovTech storage reminder: accept only safe image/video files, keep file bytes in S3, and persist metadata separately. */
import { TRPCError } from "@trpc/server";

export const MAX_MEDIA_BYTES = 20 * 1024 * 1024;
export const ALLOWED_MEDIA_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4", "video/webm"],
} as const;

export function validateMediaUpload(input: { mediaType: "image" | "video"; contentType: string; base64: string }) {
  if (!ALLOWED_MEDIA_TYPES[input.mediaType].includes(input.contentType as never)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Unsupported media format" });
  }

  const buffer = Buffer.from(input.base64, "base64");
  if (buffer.length === 0 || buffer.length > MAX_MEDIA_BYTES) {
    throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "Media file must be between 1 byte and 20 MB" });
  }

  return buffer;
}

export function safeMediaFilename(filename: string) {
  const safe = filename.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return safe || "media-file";
}
