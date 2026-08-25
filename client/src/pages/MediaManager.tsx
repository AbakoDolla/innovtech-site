/** InnovTech design reminder: the media manager is an internal, calm and secure workspace for maintaining the public gallery. */
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Copy, ImagePlus, Loader2, ShieldCheck, Upload, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || "");
      resolve(value.includes(",") ? value.split(",")[1] : value);
    };
    reader.onerror = () => reject(new Error("Unable to read the selected file"));
    reader.readAsDataURL(file);
  });
}

export default function MediaManager() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const mediaQuery = trpc.media.list.useQuery();
  const upload = trpc.media.upload.useMutation({
    onSuccess: async () => {
      await utils.media.list.invalidate();
    },
  });
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isAdmin = user?.role === "admin";

  async function handleUpload() {
    if (!file || !title.trim()) {
      toast.error("Ajoutez un titre et sélectionnez un fichier.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("Le fichier doit être inférieur ou égal à 20 Mo.");
      return;
    }
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      toast.error("Choisissez une image JPG, PNG, WEBP ou une vidéo MP4/WEBM.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      await upload.mutateAsync({
        title: title.trim(),
        filename: file.name,
        mediaType: isVideo ? "video" : "image",
        contentType: file.type,
        base64,
      });
      setTitle("");
      setFile(null);
      toast.success("Média enregistré dans le stockage InnovTech.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "L’envoi du média a échoué.");
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copiée. Ajoutez-la ensuite dans mediaCatalog.ts.");
  }

  return <DashboardLayout><section className="mx-auto max-w-5xl pb-10"><div className="rounded-[2rem] bg-[#081A3C] p-7 text-white sm:p-10"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Administration InnovTech</p><h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Bibliothèque média</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/80">Importez les photos et vidéos de vos produits. Les fichiers sont stockés de façon sécurisée ; copiez ensuite leur URL pour les ajouter à <code className="rounded bg-white/10 px-1.5 py-0.5">mediaCatalog.ts</code>.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-cyan-200"><ShieldCheck className="h-4 w-4" /> Accès administrateur</span></div></div>

    {loading ? <div className="grid min-h-64 place-items-center"><Loader2 className="h-7 w-7 animate-spin text-blue-700" /></div> : !user ? <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center"><h2 className="font-display text-2xl font-bold text-[#081A3C]">Connexion requise</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Connectez-vous avec le compte propriétaire InnovTech pour gérer les médias du site.</p><Button onClick={() => startLogin()} className="mt-6 bg-blue-700 hover:bg-blue-800">Se connecter</Button></div> : !isAdmin ? <div className="mt-8 rounded-3xl border border-amber-100 bg-amber-50 p-8 text-center"><h2 className="font-display text-2xl font-bold text-[#081A3C]">Accès réservé</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Votre compte est connecté, mais il ne dispose pas du rôle administrateur requis pour déposer des médias.</p></div> : <><section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_14px_34px_rgba(20,68,145,0.07)] sm:p-8"><p className="eyebrow">Nouveau média</p><h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">Ajouter une image ou une vidéo</h2><div className="mt-6 grid gap-4"><label className="grid gap-2 text-sm font-bold text-slate-700">Titre du média<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex. Casque Bluetooth noir" /></label><label className="grid gap-2 text-sm font-bold text-slate-700">Fichier<Input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>{file && <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} Mo</p>}<Button onClick={handleUpload} disabled={upload.isPending} className="mt-2 bg-[#1FAF62] hover:bg-[#168b4c]">{upload.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}Ajouter au stockage</Button></div></div><div className="rounded-3xl bg-[#F4F8FF] p-6 sm:p-8"><p className="eyebrow">Bon à savoir</p><h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">Un stockage adapté aux médias</h2><div className="mt-6 grid gap-4 text-sm leading-6 text-slate-600"><p className="flex gap-3"><ImagePlus className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />Images acceptées : JPG, PNG et WEBP.</p><p className="flex gap-3"><Video className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />Vidéos acceptées : MP4 et WEBM.</p><p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />Taille maximale : 20 Mo par fichier.</p></div></div></section><section className="mt-8"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Fichiers stockés</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#081A3C]">Votre bibliothèque</h2></div><span className="text-sm font-bold text-slate-500">{mediaQuery.data?.length || 0} média(s)</span></div>{mediaQuery.isLoading ? <div className="mt-6 grid min-h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-blue-700" /></div> : <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{mediaQuery.data?.map((asset) => <article key={asset.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">{asset.mediaType === "video" ? <Video className="h-5 w-5" /> : <ImagePlus className="h-5 w-5" />}</span><div className="min-w-0"><h3 className="truncate text-sm font-extrabold text-[#081A3C]">{asset.title}</h3><p className="text-xs font-bold text-slate-500">{asset.mediaType === "video" ? "Vidéo" : "Image"}</p></div></div><button type="button" onClick={() => copyUrl(asset.storageUrl)} className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-blue-700 hover:text-blue-900"><Copy className="h-3.5 w-3.5" />Copier l’URL</button></article>)}</div>}</section></>}</section></DashboardLayout>;
}
