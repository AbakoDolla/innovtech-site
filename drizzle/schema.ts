import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** Media metadata only. File bytes are stored in S3 through server/storage.ts. */
export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  mediaType: mysqlEnum("mediaType", ["image", "video"]).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
  storageUrl: varchar("storageUrl", { length: 512 }).notNull(),
  contentType: varchar("contentType", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** Catalogue piloté par l’administration. Les produits masqués ne sont jamais retournés au site public. */
export const catalogProducts = mysqlTable("catalog_products", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  family: varchar("family", { length: 48 }).notNull(),
  icon: varchar("icon", { length: 48 }).notNull(),
  status: mysqlEnum("status", ["published", "hidden"]).default("published").notNull(),
  availabilityStatus: mysqlEnum("availabilityStatus", ["available", "on_request", "unavailable"]).default("on_request").notNull(),
  availabilityNoteFr: varchar("availabilityNoteFr", { length: 240 }).default("").notNull(),
  availabilityNoteEn: varchar("availabilityNoteEn", { length: 240 }).default("").notNull(),
  nameFr: varchar("nameFr", { length: 200 }).notNull(),
  nameEn: varchar("nameEn", { length: 200 }).notNull(),
  descriptionFr: text("descriptionFr").notNull(),
  descriptionEn: text("descriptionEn").notNull(),
  badgeFr: varchar("badgeFr", { length: 120 }).notNull(),
  badgeEn: varchar("badgeEn", { length: 120 }).notNull(),
  priceFr: varchar("priceFr", { length: 120 }).notNull(),
  priceEn: varchar("priceEn", { length: 120 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 1024 }).notNull(),
  searchTermsFr: text("searchTermsFr").notNull(),
  searchTermsEn: text("searchTermsEn").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Paramètres éditoriaux non sensibles pilotés depuis l’administration. */
export const siteSettings = mysqlTable("site_settings", {
  settingKey: varchar("settingKey", { length: 120 }).primaryKey(),
  settingValue: text("settingValue").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;
export type CatalogProductRecord = typeof catalogProducts.$inferSelect;
export type InsertCatalogProduct = typeof catalogProducts.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;

// TODO: Add your tables here
