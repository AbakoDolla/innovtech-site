import { supabase } from "@/lib/supabase";

export const INNOVTECH_MEDIA_BUCKET = "innovtech-media";
export const MAX_PRODUCT_MEDIA_BYTES = 20 * 1024 * 1024;

export type ProductMediaType = "image" | "video";

export type SupabaseMediaAsset = {
  id: string;
  title: string;
  media_type: ProductMediaType;
  storage_path: string;
  content_type: string;
  public_url: string;
  created_by: string | null;
  created_at: string;
};

export function getProductMediaType(contentType: string): ProductMediaType | null {
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  return null;
}

export function cleanMediaFilename(filename: string) {
  const extension = filename.toLowerCase().match(/\.(jpg|jpeg|png|webp|mp4|webm)$/)?.[0] || "";
  const stem = filename
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "media";
  return `${stem}${extension}`;
}

export async function listProductMedia() {
  const { data, error } = await supabase
    .from("innovtech_media_assets")
    .select("id, title, media_type, storage_path, content_type, public_url, created_by, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as SupabaseMediaAsset[];
}

export async function uploadProductMedia(file: File, title: string, userId: string) {
  const mediaType = getProductMediaType(file.type);
  if (!mediaType) throw new Error("Choisissez une image JPG, PNG, WEBP ou une vidéo MP4/WEBM.");
  if (file.size > MAX_PRODUCT_MEDIA_BYTES) throw new Error("Le fichier doit peser 20 Mo maximum.");

  const storagePath = `products/${crypto.randomUUID()}-${cleanMediaFilename(file.name)}`;
  const { error: uploadError } = await supabase.storage
    .from(INNOVTECH_MEDIA_BUCKET)
    .upload(storagePath, file, { cacheControl: "31536000", contentType: file.type, upsert: false });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from(INNOVTECH_MEDIA_BUCKET).getPublicUrl(storagePath);
  const { data, error } = await supabase
    .from("innovtech_media_assets")
    .insert({ title: title.trim(), media_type: mediaType, storage_path: storagePath, content_type: file.type, public_url: publicData.publicUrl, created_by: userId })
    .select("id, title, media_type, storage_path, content_type, public_url, created_by, created_at")
    .single();
  if (error) {
    await supabase.storage.from(INNOVTECH_MEDIA_BUCKET).remove([storagePath]);
    throw error;
  }
  return data as SupabaseMediaAsset;
}

export async function removeProductMedia(asset: Pick<SupabaseMediaAsset, "id" | "storage_path">) {
  const { error: deleteRowError } = await supabase.from("innovtech_media_assets").delete().eq("id", asset.id);
  if (deleteRowError) throw deleteRowError;
  const { error: deleteFileError } = await supabase.storage.from(INNOVTECH_MEDIA_BUCKET).remove([asset.storage_path]);
  if (deleteFileError) throw deleteFileError;
}
