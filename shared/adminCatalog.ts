import { z } from "zod";

export const productFamilies = ["security", "tracking", "drones", "agriculture", "computing", "wearables", "home"] as const;
export const productIcons = ["Fingerprint", "MapPinned", "Plane", "Tractor", "Laptop", "Monitor", "Glasses", "WashingMachine"] as const;

export const managedProductInput = z.object({
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9-]+$/, "Utilisez uniquement minuscules, chiffres et tirets."),
  family: z.enum(productFamilies),
  icon: z.enum(productIcons),
  status: z.enum(["published", "hidden"]).default("published"),
  availabilityStatus: z.enum(["available", "on_request", "unavailable"]).default("on_request"),
  availabilityNoteFr: z.string().trim().max(240).default(""),
  availabilityNoteEn: z.string().trim().max(240).default(""),
  nameFr: z.string().trim().min(2).max(200),
  nameEn: z.string().trim().min(2).max(200),
  descriptionFr: z.string().trim().min(10).max(1500),
  descriptionEn: z.string().trim().min(10).max(1500),
  badgeFr: z.string().trim().min(2).max(120),
  badgeEn: z.string().trim().min(2).max(120),
  priceFr: z.string().trim().min(2).max(120),
  priceEn: z.string().trim().min(2).max(120),
  imageUrl: z.string().trim().min(1).max(1024),
  searchTermsFr: z.array(z.string().trim().min(1).max(60)).max(20),
  searchTermsEn: z.array(z.string().trim().min(1).max(60)).max(20),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

export type ManagedProductInput = z.infer<typeof managedProductInput>;

export const adminSettingInput = z.object({
  settingKey: z.string().trim().min(2).max(120).regex(/^[a-z0-9.-]+$/),
  settingValue: z.string().trim().max(4000),
});
