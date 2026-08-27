import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { fullProductCatalog, type ProductFamily } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import type { SupabaseCatalogRow } from "@/lib/supabaseCatalog";
import { listProductMedia, type SupabaseMediaAsset, uploadProductMedia } from "@/lib/supabaseMedia";
import { Check, Eye, EyeOff, Film, ImagePlus, Loader2, Pencil, Plus, Save, Upload, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Draft = Omit<SupabaseCatalogRow, "id">;
const blank: Draft = {
  slug: "", name_fr: "", name_en: "", category: "security", icon: "Fingerprint", description_fr: "", description_en: "",
  price_label: "Prix à définir", price_label_en: "Price to be set", image_url: "", gallery_urls: [], video_urls: [], status: "draft",
  availability_status: "on_request", availability_note_fr: "Disponibilité à confirmer avec notre équipe.", availability_note_en: "Availability to confirm with our team.",
  badge_fr: "", badge_en: "", search_terms_fr: [], search_terms_en: [], sort_order: 0,
};
const categories: Array<[ProductFamily, string]> = [["security", "Sécurité"], ["tracking", "GPS"], ["drones", "Drones"], ["agriculture", "Robotique agricole"], ["computing", "Informatique"], ["wearables", "Lunettes"], ["home", "Maison"]];

export function seedPayload() {
  return fullProductCatalog.map((product, index) => ({
    slug: product.id, name_fr: product.name.fr, name_en: product.name.en, category: product.family, icon: product.icon,
    description_fr: product.description.fr, description_en: product.description.en, price_label: product.price.fr, price_label_en: product.price.en,
    image_url: product.imageSrc, gallery_urls: [], video_urls: [], status: "published", availability_status: "on_request",
    availability_note_fr: "Disponibilité à confirmer avec notre équipe.", availability_note_en: "Availability to confirm with our team.",
    badge_fr: product.badge.fr, badge_en: product.badge.en, search_terms_fr: product.searchTerms.fr, search_terms_en: product.searchTerms.en, sort_order: index,
  }));
}
function asStrings(value: unknown) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }
function toTerms(value: string) { return value.split(",").map((part) => part.trim()).filter(Boolean); }

export default function AdminDashboard() {
  const { user } = useSupabaseAuth();
  const [products, setProducts] = useState<SupabaseCatalogRow[]>([]);
  const [assets, setAssets] = useState<SupabaseMediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("new") === "1") {
      setDraft({ ...blank, sort_order: products.length });
      setEditing("new");
    }
  }, [products.length]);

  const load = useCallback(async () => {
    setLoading(true);
    const [catalogue, media] = await Promise.all([
      supabase.from("innovtech_catalog_products").select("*").order("sort_order"),
      listProductMedia().catch((error: unknown) => { toast.error(error instanceof Error ? error.message : "Impossible de charger les médias."); return []; }),
    ]);
    if (catalogue.error) toast.error(catalogue.error.message);
    setProducts((catalogue.data || []) as SupabaseCatalogRow[]);
    setAssets(media);
    setLoading(false);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const stats = useMemo(() => ({ published: products.filter((item) => item.status === "published").length, drafts: products.filter((item) => item.status !== "published").length }), [products]);
  const edit = (item?: SupabaseCatalogRow) => {
    if (item) { const { id: _id, ...next } = item; setDraft({ ...next, gallery_urls: asStrings(next.gallery_urls), video_urls: asStrings(next.video_urls) }); setEditing(item.id); }
    else { setDraft({ ...blank, sort_order: products.length }); setEditing("new"); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  async function saveProduct() {
    if (!draft.slug.trim() || !draft.name_fr.trim() || !draft.name_en.trim()) { toast.error("Le nom français, le nom anglais et l’URL produit sont requis."); return; }
    if (!draft.image_url.trim()) { toast.error("Ajoutez une image principale au produit."); return; }
    setPending(true);
    const payload = { ...draft, slug: draft.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""), gallery_urls: asStrings(draft.gallery_urls), video_urls: asStrings(draft.video_urls) };
    const request = editing === "new" ? supabase.from("innovtech_catalog_products").insert(payload) : supabase.from("innovtech_catalog_products").update(payload).eq("id", editing as string);
    const { error } = await request;
    setPending(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing === "new" ? "Produit ajouté au catalogue." : "Produit mis à jour.");
    setEditing(null); setDraft(blank); await load();
  }
  async function toggleVisibility(item: SupabaseCatalogRow) {
    const status = item.status === "published" ? "hidden" : "published";
    const { error } = await supabase.from("innovtech_catalog_products").update({ status }).eq("id", item.id);
    if (error) toast.error(error.message); else { toast.success(status === "published" ? "Produit publié." : "Produit masqué."); await load(); }
  }
  async function upload(file: File) {
    if (!user) throw new Error("Votre session administrateur est requise.");
    setUploading(true);
    try { const asset = await uploadProductMedia(file, draft.name_fr || file.name, user.id); setAssets((current) => [asset, ...current]); toast.success("Média ajouté. Sélectionnez-le pour le produit."); return asset; }
    finally { setUploading(false); }
  }

  return <DashboardLayout><section className="mx-auto max-w-7xl pb-12"><header className="overflow-hidden rounded-[2rem] bg-[#081A3C] p-6 text-white shadow-[0_24px_70px_rgba(8,26,60,.22)] sm:p-10"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">InnovTech Commerce</p><div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="font-display text-3xl font-bold tracking-[-0.055em] sm:text-5xl">Vos produits, simplement.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/80">Ajoutez et modifiez les produits, leurs descriptions bilingues, prix, photos, vidéos et visibilité. Les mises à jour publiées apparaissent dans la boutique.</p></div><Button size="lg" className="bg-[#1FAF62] text-white hover:bg-[#168b4c]" onClick={() => edit()}><Plus className="mr-2 h-4 w-4" />Nouveau produit</Button></div></header>
  <div className="mt-5 grid gap-3 sm:grid-cols-3"><Stat value={products.length} label="Produits" /><Stat value={stats.published} label="En ligne" /><Stat value={stats.drafts} label="Brouillons / masqués" /></div>
  {editing && <ProductEditor draft={draft} set={set} assets={assets} pending={pending} uploading={uploading} onCancel={() => { setEditing(null); setDraft(blank); }} onSave={() => void saveProduct()} onUpload={upload} />}
  <section className="mt-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Catalogue</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">Modifier un produit</h2></div><p className="text-sm font-semibold text-slate-500">Touchez « Modifier » pour changer textes, prix ou médias.</p></div>{loading ? <div className="grid min-h-48 place-items-center"><Loader2 className="h-7 w-7 animate-spin text-blue-700" /></div> : <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_32px_rgba(20,68,145,.08)]"><img src={item.image_url} alt="" className="aspect-[16/10] w-full bg-slate-100 object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-blue-700">{item.status === "published" ? "En ligne" : item.status === "draft" ? "Brouillon" : "Masqué"}</p><h3 className="mt-1 font-display text-xl font-bold text-[#081A3C]">{item.name_fr}</h3></div><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{item.price_label}</span></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.description_fr}</p><div className="mt-5 grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => edit(item)}><Pencil className="mr-2 h-4 w-4" />Modifier</Button><Button variant="outline" onClick={() => void toggleVisibility(item)}>{item.status === "published" ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}{item.status === "published" ? "Masquer" : "Publier"}</Button></div></div></article>)}</div>}</section></section></DashboardLayout>;
}

function Stat({ value, label }: { value: number; label: string }) { return <article className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm"><p className="text-2xl font-extrabold text-[#081A3C]">{value}</p><p className="text-xs font-bold uppercase tracking-[.1em] text-slate-500">{label}</p></article>; }
function ProductEditor({ draft, set, assets, pending, uploading, onCancel, onSave, onUpload }: { draft: Draft; set: <K extends keyof Draft>(key: K, value: Draft[K]) => void; assets: SupabaseMediaAsset[]; pending: boolean; uploading: boolean; onCancel: () => void; onSave: () => void; onUpload: (file: File) => Promise<SupabaseMediaAsset>; }) {
  const images = asStrings(draft.gallery_urls); const videos = asStrings(draft.video_urls);
  const addAsset = (asset: SupabaseMediaAsset) => { if (asset.media_type === "image") set("gallery_urls", Array.from(new Set([...images, asset.public_url]))); else set("video_urls", Array.from(new Set([...videos, asset.public_url]))); };
  const removeAsset = (url: string, kind: "gallery_urls" | "video_urls") => set(kind, asStrings(draft[kind]).filter((item) => item !== url));
  const chooseFile = async (file?: File) => { if (!file) return; try { const asset = await onUpload(file); addAsset(asset); if (asset.media_type === "image" && !draft.image_url) set("image_url", asset.public_url); } catch (error) { toast.error(error instanceof Error ? error.message : "L’envoi a échoué."); } };
  return <section className="mt-8 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-[0_18px_45px_rgba(20,68,145,.1)] sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Éditeur e-commerce</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-.05em] text-[#081A3C]">{draft.slug ? "Modifier le produit" : "Ajouter un produit"}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Remplissez les informations, puis ajoutez les photos ou vidéos du produit.</p></div><Button variant="ghost" onClick={onCancel}>Fermer</Button></div><div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><div className="grid gap-4 sm:grid-cols-2"><Field label="Nom français *" value={draft.name_fr} onChange={(value) => set("name_fr", value)} placeholder="Ex. Casque Bluetooth" /><Field label="Nom anglais *" value={draft.name_en} onChange={(value) => set("name_en", value)} placeholder="Ex. Bluetooth headset" /><Field label="URL du produit *" value={draft.slug} onChange={(value) => set("slug", value)} placeholder="casque-bluetooth" /><label className="grid gap-2 text-sm font-bold text-slate-700">Catégorie<select className="h-11 rounded-xl border border-slate-200 bg-white px-3" value={draft.category} onChange={(event) => set("category", event.target.value as ProductFamily)}>{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><Field label="Prix français" value={draft.price_label} onChange={(value) => set("price_label", value)} placeholder="Ex. 25 000 FCFA" /><Field label="Prix anglais" value={draft.price_label_en || ""} onChange={(value) => set("price_label_en", value)} placeholder="Ex. 25,000 XAF" /><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">Description française *<Textarea rows={4} value={draft.description_fr} onChange={(event) => set("description_fr", event.target.value)} placeholder="Décrivez clairement le produit…" /></label><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">Description anglaise *<Textarea rows={4} value={draft.description_en} onChange={(event) => set("description_en", event.target.value)} placeholder="Describe the product clearly…" /></label><label className="grid gap-2 text-sm font-bold text-slate-700">Visibilité<select className="h-11 rounded-xl border border-slate-200 bg-white px-3" value={draft.status} onChange={(event) => set("status", event.target.value as Draft["status"])}><option value="published">Publié — visible dans la boutique</option><option value="draft">Brouillon — privé</option><option value="hidden">Masqué — privé</option></select></label><Field label="Mots-clés de recherche FR" value={asStrings(draft.search_terms_fr).join(", ")} onChange={(value) => set("search_terms_fr", toTerms(value))} placeholder="casque, audio, bluetooth" /></div><MediaPanel title="Photos du produit" kind="image" urls={images} primaryUrl={draft.image_url} assets={assets} uploading={uploading} onChooseFile={chooseFile} onAdd={addAsset} onRemove={(url) => removeAsset(url, "gallery_urls")} onPrimary={(url) => set("image_url", url)} /><MediaPanel title="Vidéos du produit" kind="video" urls={videos} assets={assets} uploading={uploading} onChooseFile={chooseFile} onAdd={addAsset} onRemove={(url) => removeAsset(url, "video_urls")} /></div><div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button variant="outline" onClick={onCancel}>Annuler</Button><Button className="bg-blue-700 px-7 hover:bg-blue-800" disabled={pending} onClick={onSave}>{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Enregistrer le produit</Button></div></section>;
}
function MediaPanel({ title, kind, urls, primaryUrl, assets, uploading, onChooseFile, onAdd, onRemove, onPrimary }: { title: string; kind: "image" | "video"; urls: string[]; primaryUrl?: string; assets: SupabaseMediaAsset[]; uploading: boolean; onChooseFile: (file?: File) => void; onAdd: (asset: SupabaseMediaAsset) => void; onRemove: (url: string) => void; onPrimary?: (url: string) => void; }) { const Icon = kind === "image" ? ImagePlus : Film; const available = assets.filter((asset) => asset.media_type === kind && !urls.includes(asset.public_url)); return <div className="rounded-2xl bg-[#F4F8FF] p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-extrabold text-[#081A3C]">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">Ajoutez un fichier ou choisissez dans vos médias.</p></div><Icon className="h-5 w-5 text-blue-700" /></div><label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"><Upload className="h-4 w-4" />{uploading ? "Envoi en cours…" : `Ajouter une ${kind === "image" ? "photo" : "vidéo"}`}<input className="sr-only" type="file" accept={kind === "image" ? "image/jpeg,image/png,image/webp" : "video/mp4,video/webm"} disabled={uploading} onChange={(event) => { onChooseFile(event.target.files?.[0]); event.currentTarget.value = ""; }} /></label>{urls.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3">{urls.map((url) => <article key={url} className="group relative overflow-hidden rounded-xl bg-slate-900">{kind === "image" ? <img src={url} alt="Média du produit" className="aspect-square w-full object-cover" /> : <video src={url} className="aspect-square w-full object-cover" controls preload="metadata" />}<button type="button" className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-slate-950/75 text-white" onClick={() => onRemove(url)} aria-label="Retirer ce média"><X className="h-4 w-4" /></button>{kind === "image" && <Button type="button" size="sm" className="absolute bottom-2 left-2 h-8 bg-white text-xs text-[#081A3C] hover:bg-white" onClick={() => onPrimary?.(url)}>{primaryUrl === url ? <><Check className="mr-1 h-3.5 w-3.5" />Principale</> : "Définir principale"}</Button>}</article>)}</div>}{available.length > 0 && <div className="mt-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-slate-500">Déjà envoyés</p><div className="mt-2 flex gap-2 overflow-x-auto pb-1">{available.map((asset) => <button type="button" key={asset.id} onClick={() => onAdd(asset)} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 border-transparent bg-white ring-offset-2 hover:border-blue-500 focus:border-blue-600">{kind === "image" ? <img src={asset.public_url} alt={asset.title} className="h-full w-full object-cover" /> : <Film className="m-auto h-5 w-5 text-blue-700" />}<span className="sr-only">Ajouter {asset.title}</span></button>)}</div></div>}</div>; }
function Field({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) { return <label className="grid gap-2 text-sm font-bold text-slate-700">{label}<Input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>; }
