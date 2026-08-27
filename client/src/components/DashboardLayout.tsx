import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { can, roleLabels, type CollaboratorRole } from "@/lib/adminCommerce";
import { isStandalonePwa, shouldUseAdminManifest } from "@/lib/pwa";
import { Boxes, ClipboardList, Download, Globe2, LayoutDashboard, Loader2, LockKeyhole, LogOut, Settings2, ShieldCheck, Sparkles, Tags, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

function linksForRole(role: CollaboratorRole | null) {
  const links = [{ icon: LayoutDashboard, label: "Vue d’ensemble", href: "/admin" }, { icon: Boxes, label: "Produits", href: "/admin?section=products" }];
  if (can(role, "requests_read")) links.push({ icon: ClipboardList, label: "Demandes", href: "/admin?section=requests" });
  if (can(role, "categories_manage")) links.push({ icon: Tags, label: "Catégories", href: "/admin?section=categories" });
  if (can(role, "collaborators_manage")) links.push({ icon: UsersRound, label: "Équipe", href: "/admin?section=team" });
  if (can(role, "settings_manage")) links.push({ icon: Settings2, label: "Réglages", href: "/admin?section=settings" });
  links.push({ icon: Globe2, label: "Voir le site", href: "/" });
  return links;
}

type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function useAdminPwa() {
  const [prompt, setPrompt] = useState<DeferredInstallPrompt | null>(null);
  const [installed, setInstalled] = useState(() => isStandalonePwa(window.matchMedia("(display-mode: standalone)").matches, Boolean((navigator as Navigator & { standalone?: boolean }).standalone)));

  useEffect(() => {
    const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    const originalManifest = manifest?.getAttribute("href");
    if (manifest && shouldUseAdminManifest(window.location.pathname)) manifest.href = "/admin.webmanifest";
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as DeferredInstallPrompt); };
    const onInstalled = () => { setInstalled(true); setPrompt(null); toast.success("InnovTech Admin est prêt sur cet appareil."); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      if (manifest && originalManifest) manifest.href = originalManifest;
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) {
      toast.message("Utilisez le menu du navigateur puis « Installer l’application ».");
      return;
    }
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "dismissed") toast.message("Installation annulée. Vous pourrez la relancer à tout moment.");
    setPrompt(null);
  };

  return { installed, install, canInstall: Boolean(prompt) };
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
    <span className={`grid ${compact ? "h-9 w-9" : "h-12 w-12"} shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20`}>
      <img src="/media/branding/innovtech-symbol.png" alt="Logo InnovTech" className="h-full w-full rounded-2xl object-contain" />
    </span>
    <span className="grid leading-none">
      <strong className={`${compact ? "text-base" : "text-lg"} font-display font-bold tracking-[-0.04em] text-white`}>InnovTech</strong>
      <small className="mt-1 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-cyan-200">Administration</small>
    </span>
  </div>;
}

function LoginScreen() {
  const { user, isAdmin, loading, signIn, signUp, signOut } = useSupabaseAuth();
  const { installed, install, canInstall } = useAdminPwa();
  const [email, setEmail] = useState("evansabah2006@gmail.com");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (loading) return <div className="admin-login-shell grid min-h-screen place-items-center"><Loader2 className="h-8 w-8 animate-spin text-cyan-200" /></div>;
  if (user && !isAdmin) return <div className="admin-login-shell grid min-h-screen place-items-center p-5"><article className="admin-login-card max-w-md p-7 text-center sm:p-9"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600"><LockKeyhole className="h-6 w-6" /></div><h1 className="mt-5 font-display text-2xl font-bold text-[#081A3C]">Accès réservé</h1><p className="mt-3 text-sm leading-6 text-slate-600">Ce compte n’a pas le rôle administrateur InnovTech. Utilisez l’adresse propriétaire ou changez de compte.</p><Button className="mt-6" variant="outline" onClick={() => void signOut()}>Changer de compte</Button></article></div>;
  if (user) return null;

  const submit = async (mode: "signin" | "signup") => {
    if (password.length < 8) {
      const error = "Le mot de passe doit contenir au moins 8 caractères.";
      setStatusMessage(error);
      toast.error(error);
      return;
    }
    setPending(true);
    setStatusMessage(mode === "signin" ? "Connexion en cours…" : "Création du compte en cours…");
    const result = mode === "signin" ? await signIn(email, password) : await signUp(email, password);
    setPending(false);
    setStatusMessage(result.error || result.message || "Opération terminée.");
    if (result.error) toast.error(result.error); else toast.success(result.message || "Opération terminée.");
  };

  return <div className="admin-login-shell relative isolate grid min-h-screen overflow-hidden px-4 py-7 sm:px-6">
    <div className="admin-login-orb admin-login-orb--one" />
    <div className="admin-login-orb admin-login-orb--two" />
    <div className="relative mx-auto grid w-full max-w-5xl items-stretch overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_32px_100px_rgba(4,18,49,.34)] backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
      <section className="admin-login-intro hidden p-9 text-white lg:flex lg:flex-col">
        <BrandMark />
        <div className="my-auto pt-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Espace propriétaire</p>
          <h1 className="mt-4 max-w-md font-display text-5xl font-bold leading-[.98] tracking-[-0.065em]">Pilotez InnovTech avec clarté.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/80">Prix, visibilité, disponibilités et contenus : votre activité garde le contrôle, depuis le navigateur ou l’application installée.</p>
          <div className="mt-9 grid gap-3 text-sm font-bold text-blue-50"><p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-cyan-300" />Accès protégé par Supabase et RLS</p><p className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-cyan-300" />Conçu pour téléphone, tablette et ordinateur</p></div>
        </div>
        <p className="text-xs font-bold text-blue-100/60">InnovTech · Innover · Connecter · Réussir</p>
      </section>
      <section className="admin-login-card p-6 sm:p-9">
        <div className="flex items-center justify-between gap-3 lg:hidden"><BrandMark compact /><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-blue-700">Admin</span></div>
        <div className="mt-8 lg:mt-0"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-blue-700">Connexion sécurisée</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.055em] text-[#081A3C]">Bienvenue.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Connectez-vous pour gérer la plateforme InnovTech de façon sécurisée.</p></div>
        <form className="mt-7 grid gap-4" aria-describedby="admin-login-status" onSubmit={(event) => { event.preventDefault(); void submit("signin"); }}>
          <label className="grid gap-2 text-sm font-bold text-slate-700">E-mail<Input type="email" autoComplete="email" autoFocus required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Mot de passe<Input type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <Button type="submit" className="h-12 bg-blue-700 shadow-[0_12px_24px_rgba(18,103,243,.22)] hover:bg-blue-800" aria-busy={pending} disabled={pending}>{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LockKeyhole className="mr-2 h-4 w-4" />}Se connecter</Button>
          <Button type="button" variant="outline" className="h-11" disabled={pending} onClick={() => void submit("signup")}>Créer mon accès administrateur</Button>
        </form>
        <p id="admin-login-status" className="sr-only" aria-live="polite">{statusMessage}</p>
        <div className="mt-6 border-t border-slate-100 pt-5"><Button type="button" variant="ghost" className="w-full justify-between text-slate-600 hover:bg-blue-50 hover:text-blue-700" onClick={() => void install()}><span className="flex items-center gap-2"><Download className="h-4 w-4" />{installed ? "Application InnovTech installée" : "Installer InnovTech Admin"}</span><span className="text-xs font-bold text-slate-400">{canInstall ? "Disponible" : "Guide"}</span></Button><p className="mt-2 text-center text-xs leading-5 text-slate-500">Sur téléphone, utilisez aussi le menu du navigateur puis « Installer l’application ».</p></div>
      </section>
    </div>
  </div>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, role, signOut } = useSupabaseAuth();
  const { installed, install, canInstall } = useAdminPwa();
  const [location] = useLocation();
  if (!user || !isAdmin) return <LoginScreen />;

  return <div className="min-h-screen bg-[#F7FAFF] text-[#081A3C] lg:grid lg:grid-cols-[272px_1fr]">
    <aside className="border-b border-blue-100 bg-white p-4 sm:p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#081A3C] p-3"><Link href="/admin"><BrandMark compact /></Link><Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white" onClick={() => void signOut()} aria-label="Se déconnecter"><LogOut className="h-4 w-4" /></Button></div>
      <div className="mt-3 flex items-center justify-between gap-2 px-1"><p className="min-w-0 truncate text-xs font-bold text-slate-500">{user.email}</p>{role && <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-[.08em] text-blue-700">{roleLabels[role]}</span>}</div>
      <nav className="mt-5 flex gap-1 overflow-x-auto pb-1 lg:grid lg:overflow-visible">{linksForRole(role).map((item) => <Link key={item.href} href={item.href} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${location === item.href || (item.href === "/admin" && location === "/admin") ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}><item.icon className="h-4 w-4" />{item.label}</Link>)}</nav>
      <Button type="button" variant="outline" className="mt-5 hidden w-full justify-between lg:flex" onClick={() => void install()}><span className="flex items-center gap-2"><Download className="h-4 w-4 text-blue-700" />{installed ? "Application installée" : "Installer l’application"}</span><span className="text-[0.65rem] font-extrabold text-slate-400">{canInstall ? "PWA" : "Guide"}</span></Button>
    </aside>
    <main className="min-w-0 p-4 sm:p-7">{children}</main>
  </div>;
}
