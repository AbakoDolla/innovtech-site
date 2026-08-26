import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { Boxes, FilePenLine, Globe2, ImagePlus, LayoutDashboard, Loader2, LockKeyhole, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

const links = [
  { icon: LayoutDashboard, label: "Vue d’ensemble", href: "/admin" },
  { icon: Boxes, label: "Catalogue & prix", href: "/admin/catalogue" },
  { icon: FilePenLine, label: "Disponibilités", href: "/admin/disponibilites" },
  { icon: FilePenLine, label: "Contenus & SEO", href: "/admin/contenus" },
  { icon: ImagePlus, label: "Médias", href: "/admin/media" },
  { icon: Globe2, label: "Voir le site", href: "/" },
];

function LoginScreen() {
  const { user, isAdmin, loading, signIn, signUp, signOut } = useSupabaseAuth();
  const [email, setEmail] = useState("evansabah2006@gmail.com");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#F3F8FF]"><Loader2 className="h-8 w-8 animate-spin text-blue-700" /></div>;
  if (user && !isAdmin) return <div className="grid min-h-screen place-items-center bg-[#F3F8FF] p-6"><article className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm"><LockKeyhole className="mx-auto h-8 w-8 text-amber-600" /><h1 className="mt-5 font-display text-2xl font-bold text-[#081A3C]">Accès réservé</h1><p className="mt-3 text-sm leading-6 text-slate-600">Ce compte n’a pas le rôle administrateur InnovTech. Utilisez l’adresse propriétaire ou changez de compte.</p><Button className="mt-6" variant="outline" onClick={() => void signOut()}>Changer de compte</Button></article></div>;
  if (user) return null;
  const submit = async (mode: "signin" | "signup") => { if (password.length < 8) { toast.error("Utilisez au moins 8 caractères."); return; } setPending(true); const result = mode === "signin" ? await signIn(email, password) : await signUp(email, password); setPending(false); if (result.error) toast.error(result.error); else toast.success(result.message || "Opération terminée."); };
  return <div className="grid min-h-screen place-items-center bg-[#F3F8FF] p-6"><article className="w-full max-w-md rounded-[2rem] border border-blue-100 bg-white p-8 shadow-[0_20px_50px_rgba(20,68,145,0.12)]"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white"><LockKeyhole className="h-5 w-5" /></div><p className="mt-6 text-xs font-extrabold uppercase tracking-[0.15em] text-blue-700">InnovTech · administration</p><h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-[#081A3C]">Accédez à votre tableau de bord</h1><p className="mt-3 text-sm leading-6 text-slate-600">Connexion sécurisée par Supabase. La création initiale est limitée au propriétaire de la plateforme.</p><div className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-bold text-slate-700">E-mail<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="grid gap-2 text-sm font-bold text-slate-700">Mot de passe<Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><Button className="bg-blue-700 hover:bg-blue-800" disabled={pending} onClick={() => void submit("signin")}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Se connecter</Button><Button variant="outline" disabled={pending} onClick={() => void submit("signup")}>Créer mon accès administrateur</Button></div></article></div>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, signOut } = useSupabaseAuth();
  const [location] = useLocation();
  if (!user || !isAdmin) return <LoginScreen />;
  return <div className="min-h-screen bg-[#F7FAFF] text-[#081A3C] lg:grid lg:grid-cols-[270px_1fr]"><aside className="border-b border-blue-100 bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r"><div className="flex items-center justify-between gap-3"><Link href="/admin" className="font-display text-xl font-bold text-blue-700">InnovTech <span className="text-[#081A3C]">Admin</span></Link><Button variant="ghost" size="icon" onClick={() => void signOut()} aria-label="Se déconnecter"><LogOut className="h-4 w-4" /></Button></div><p className="mt-2 truncate text-xs font-bold text-slate-500">{user.email}</p><nav className="mt-7 grid gap-1">{links.map((item) => <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${location === item.href ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}><item.icon className="h-4 w-4" />{item.label}</Link>)}</nav></aside><main className="min-w-0 p-4 sm:p-7">{children}</main></div>;
}
