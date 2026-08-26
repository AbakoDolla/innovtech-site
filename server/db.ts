import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { CatalogProductRecord, InsertCatalogProduct, InsertMediaAsset, InsertUser, catalogProducts, mediaAssets, siteSettings, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listMediaAssets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function createMediaAsset(asset: InsertMediaAsset) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while saving media metadata");
  await db.insert(mediaAssets).values(asset);
  const [created] = await db.select().from(mediaAssets).where(eq(mediaAssets.storageKey, asset.storageKey)).limit(1);
  if (!created) throw new Error("Media metadata was not saved");
  return created;
}

export async function listPublishedCatalogProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(catalogProducts).where(eq(catalogProducts.status, "published")).orderBy(asc(catalogProducts.sortOrder), asc(catalogProducts.id));
}

export async function listAdminCatalogProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(catalogProducts).orderBy(asc(catalogProducts.sortOrder), asc(catalogProducts.id));
}

export async function createCatalogProduct(product: InsertCatalogProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while creating product");
  await db.insert(catalogProducts).values(product);
  const [created] = await db.select().from(catalogProducts).where(eq(catalogProducts.slug, product.slug)).limit(1);
  if (!created) throw new Error("Product was not created");
  return created;
}

export async function updateCatalogProduct(id: number, product: Partial<InsertCatalogProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while updating product");
  await db.update(catalogProducts).set(product).where(eq(catalogProducts.id, id));
  const [updated] = await db.select().from(catalogProducts).where(eq(catalogProducts.id, id)).limit(1);
  if (!updated) throw new Error("Product was not found");
  return updated;
}

export async function deleteCatalogProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while deleting product");
  await db.delete(catalogProducts).where(eq(catalogProducts.id, id));
}

export async function replaceCatalogProducts(products: InsertCatalogProduct[]) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while initializing catalogue");
  for (const product of products) {
    await db.insert(catalogProducts).values(product).onDuplicateKeyUpdate({ set: product });
  }
  return listAdminCatalogProducts();
}

export async function listSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteSettings).orderBy(asc(siteSettings.settingKey));
}

export async function upsertSiteSetting(settingKey: string, settingValue: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable while saving settings");
  await db.insert(siteSettings).values({ settingKey, settingValue }).onDuplicateKeyUpdate({ set: { settingValue } });
  const [saved] = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, settingKey)).limit(1);
  if (!saved) throw new Error("Setting was not saved");
  return saved;
}
