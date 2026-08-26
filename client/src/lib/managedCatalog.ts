import { fullProductCatalog } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import { toCatalogProduct, type SupabaseCatalogRow } from "@/lib/supabaseCatalog";
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
