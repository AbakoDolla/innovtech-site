import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthResult = { error?: string; message?: string };
type SupabaseAuthValue = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const SupabaseAuthContext = createContext<SupabaseAuthValue | null>(null);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const resolveAdmin = useCallback(async (user: User | null) => {
    if (!user) { setIsAdmin(false); return; }
    const { data } = await supabase.from("innovtech_admins").select("user_id").eq("user_id", user.id).maybeSingle();
    setIsAdmin(Boolean(data));
  }, []);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return;
      setSession(data.session);
      await resolveAdmin(data.session?.user ?? null);
      if (alive) setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, next) => {
      setSession(next);
      await resolveAdmin(next?.user ?? null);
      setLoading(false);
    });
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, [resolveAdmin]);

  const value = useMemo<SupabaseAuthValue>(() => ({
    user: session?.user ?? null,
    loading,
    isAdmin,
    async signIn(email, password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: error.message } : { message: "Connexion réussie." };
    },
    async signUp(email, password) {
      if (email.trim().toLowerCase() !== "evansabah2006@gmail.com") return { error: "La création initiale est réservée à l’adresse e-mail propriétaire InnovTech." };
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      if (error) return { error: error.message };
      return { message: data.session ? "Compte créé et connecté." : "Compte créé. Vérifiez votre e-mail puis connectez-vous." };
    },
    async signOut() { await supabase.auth.signOut(); },
  }), [isAdmin, loading, session]);

  return <SupabaseAuthContext.Provider value={value}>{children}</SupabaseAuthContext.Provider>;
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (!context) throw new Error("useSupabaseAuth must be used inside SupabaseAuthProvider");
  return context;
}
