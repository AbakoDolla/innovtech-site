import { fullProductCatalog } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import { toCatalogProduct, type SupabaseCatalogRow } from "@/lib/supabaseCatalog";
import type { CatalogCategory } from "@/lib/adminCommerce";
import { useEffect, useState } from "react";

export function catalogWithFallback(rows?: SupabaseCatalogRow[]) { return rows?.length ? rows.map(toCatalogProduct) : fullProductCatalog; }

export function useManagedCatalog() {
  const [rows, setRows] = useState<SupabaseCatalogRow[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase.from("innovtech_catalog_products").select("*").eq("status", "published").order("sort_order").then(({ data }) => {
      if (active) { setRows((data || []) as SupabaseCatalogRow[]); setIsLoading(false); }
    });
    return () => { active = false; };
  }, []);
  return { catalog: catalogWithFallback(rows), isLoading };
}

const fallbackCategories: CatalogCategory[] = [
  ["security", "Sécurité", "Security"], ["tracking", "GPS", "GPS tracking"], ["drones", "Drones", "Drones"], ["agriculture", "Robotique agricole", "Agricultural robotics"], ["computing", "Informatique", "Computing"], ["wearables", "Lunettes", "Wearables"], ["home", "Maison", "Home"],
].map(([slug, name_fr, name_en], sort_order) => ({ id: slug, slug, name_fr, name_en, sort_order, active: true }));

export function useManagedCategories() {
  const [categories, setCategories] = useState<CatalogCategory[]>(fallbackCategories);
  useEffect(() => {
    let active = true;
    supabase.from("innovtech_catalog_categories").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      if (active && data?.length) setCategories(data as CatalogCategory[]);
    });
    return () => { active = false; };
  }, []);
  return categories;
}
