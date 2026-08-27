import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isPromotionActive, type CatalogCategory } from "@/lib/adminCommerce";
import type { SupabaseCatalogRow } from "@/lib/supabaseCatalog";
import { Eye, EyeOff, Pencil, Plus, Search } from "lucide-react";

type Props = {
  products: SupabaseCatalogRow[];
  categories: CatalogCategory[];
  search: string;
  status: "all" | "published" | "draft" | "hidden";
  availability: "all" | "available" | "on_request" | "unavailable";
  promotion: "all" | "active" | "inactive";
  onSearch: (value: string) => void;
  onStatus: (value: Props["status"]) => void;
  onAvailability: (value: Props["availability"]) => void;
  onPromotion: (value: Props["promotion"]) => void;
  canManage: boolean;
  onNew: () => void;
  onEdit: (product: SupabaseCatalogRow) => void;
  onToggle: (product: SupabaseCatalogRow) => void;
};

export function CommerceProductsPanel({ products, categories, search, status, availability, promotion, onSearch, onStatus, onAvailability, onPromotion, canManage, onNew, onEdit, onToggle }: Props) {
  const categoryName = (slug: string) => categories.find((category) => category.slug === slug)?.name_fr || slug;
  return <section className="mt-8"><div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between"><div><p className="eyebrow">Catalogue</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-.04em] text-[#081A3C]">Produits, stock et promotions</h2></div>{canManage && <Button onClick={onNew}><Plus className="mr-2 h-4 w-4" />Ajouter un produit</Button>}</div><div className="mt-5 grid gap-3 rounded-2xl border border-blue-100 bg-white p-3 shadow-sm lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><Input className="pl-9" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Rechercher un produit, une catégorie ou une URL…" /></label><SelectFilter label="Statut" value={status} onChange={onStatus} options={[["all", "Tous les statuts"], ["published", "En ligne"], ["draft", "Brouillons"], ["hidden", "Masqués"]]} /><SelectFilter label="Disponibilité" value={availability} onChange={onAvailability} options={[["all", "Toutes disponibilités"], ["available", "Disponible"], ["on_request", "Sur commande"], ["unavailable", "Indisponible"]]} /><SelectFilter label="Promotion" value={promotion} onChange={onPromotion} options={[["all", "Toutes promotions"], ["active", "En promotion"], ["inactive", "Sans promotion"]]} /></div><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_32px_rgba(20,68,145,.08)]"><img src={item.image_url} alt="" className="aspect-[16/10] w-full bg-slate-100 object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-blue-700">{item.status === "published" ? "En ligne" : item.status === "draft" ? "Brouillon" : "Masqué"} · {categoryName(item.category)}</p><h3 className="mt-1 font-display text-xl font-bold text-[#081A3C]">{item.name_fr}</h3></div><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{item.price_label}</span></div>{isPromotionActive(item) && <p className="mt-3 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-800">Promo : {item.promotion_price_label}</p>}<p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.description_fr}</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500"><span className="rounded-lg bg-slate-100 px-2 py-1">{item.availability_status === "available" ? "Disponible" : item.availability_status === "on_request" ? "Sur commande" : "Indisponible"}</span>{item.stock_quantity !== null && item.stock_quantity !== undefined && <span className="rounded-lg bg-slate-100 px-2 py-1">Stock : {item.stock_quantity}</span>}</div>{canManage && <div className="mt-5 grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => onEdit(item)}><Pencil className="mr-2 h-4 w-4" />Modifier</Button><Button variant="outline" onClick={() => onToggle(item)}>{item.status === "published" ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}{item.status === "published" ? "Masquer" : "Publier"}</Button></div>}</div></article>)}{products.length === 0 && <div className="rounded-3xl border border-dashed border-blue-200 bg-white p-8 text-center text-sm text-slate-600 sm:col-span-2 xl:col-span-3">Aucun produit ne correspond à ces filtres.</div>}</div></section>;
}
function SelectFilter<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (value: T) => void; options: Array<[T, string]> }) { return <label className="grid gap-1 text-xs font-bold text-slate-500"><span className="sr-only">{label}</span><select aria-label={`Filtrer les produits par ${label.toLowerCase()}`} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700" value={value} onChange={(event) => onChange(event.target.value as T)}>{options.map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}</select></label>; }
