import { createClient } from "npm:@supabase/supabase-js@2";

const allowedRoles = ["catalog_manager", "sales", "viewer"] as const;
type CollaboratorRole = (typeof allowedRoles)[number];

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && (origin === "https://innovtech-site.vercel.app" || /^https:\/\/innovtech-site(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin))
    ? origin
    : "https://innovtech-site.vercel.app";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
    "Content-Type": "application/json",
  };
}

function json(body: Record<string, unknown>, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

function getKey(name: "SUPABASE_PUBLISHABLE_KEYS" | "SUPABASE_SECRET_KEYS", legacy: "SUPABASE_ANON_KEY" | "SUPABASE_SERVICE_ROLE_KEY") {
  const raw = Deno.env.get(name);
  if (raw) {
    try {
      const keys = JSON.parse(raw) as Record<string, string>;
      if (keys.default) return keys.default;
    } catch {
      // The legacy variables below keep the function compatible with existing projects.
    }
  }
  return Deno.env.get(legacy) ?? "";
}

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin");
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, origin);

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Session requise." }, 401, origin);

  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const publishableKey = getKey("SUPABASE_PUBLISHABLE_KEYS", "SUPABASE_ANON_KEY");
  const secretKey = getKey("SUPABASE_SECRET_KEYS", "SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !publishableKey || !secretKey) return json({ error: "Configuration serveur indisponible." }, 500, origin);

  const caller = createClient(url, publishableKey, { global: { headers: { Authorization: authorization } } });
  const { data: userData, error: userError } = await caller.auth.getUser();
  if (userError || !userData.user) return json({ error: "Session invalide." }, 401, origin);

  const { data: membership, error: membershipError } = await caller
    .from("innovtech_admins")
    .select("role, active")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (membershipError || membership?.role !== "owner" || membership.active !== true) {
    return json({ error: "Seul le propriétaire peut inviter un collaborateur." }, 403, origin);
  }

  let input: { email?: unknown; displayName?: unknown; role?: unknown };
  try {
    input = await request.json();
  } catch {
    return json({ error: "Données d’invitation invalides." }, 400, origin);
  }
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const displayName = typeof input.displayName === "string" ? input.displayName.trim().slice(0, 120) : "";
  const role = typeof input.role === "string" ? input.role : "";
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Saisissez une adresse e-mail valide." }, 400, origin);
  if (!allowedRoles.includes(role as CollaboratorRole)) return json({ error: "Rôle de collaborateur invalide." }, 400, origin);
  if (email === (userData.user.email ?? "").toLowerCase()) return json({ error: "Le propriétaire ne peut pas s’inviter lui-même." }, 400, origin);

  const admin = createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: existingMembership, error: existingMembershipError } = await admin
    .from("innovtech_admins")
    .select("user_id")
    .eq("email", email)
    .maybeSingle();
  if (existingMembershipError) return json({ error: "Impossible de vérifier le collaborateur." }, 500, origin);
  if (existingMembership) return json({ error: "Cette adresse possède déjà un accès InnovTech." }, 409, origin);

  const { data: invitation, error: invitationError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { innovtech_collaborator: true, display_name: displayName },
    redirectTo: "https://innovtech-site.vercel.app/admin",
  });
  if (invitationError || !invitation.user) {
    return json({ error: invitationError?.message ?? "Impossible d’envoyer l’invitation." }, 400, origin);
  }

  const { error: roleError } = await admin.from("innovtech_admins").insert({
    user_id: invitation.user.id,
    email,
    display_name: displayName,
    role,
    active: true,
    invited_by: userData.user.id,
    invited_at: new Date().toISOString(),
  });
  if (roleError) {
    await admin.auth.admin.deleteUser(invitation.user.id);
    return json({ error: "L’invitation a été annulée car le rôle n’a pas pu être attribué." }, 500, origin);
  }

  return json({ message: "Invitation envoyée. Le collaborateur choisira son mot de passe depuis son e-mail." }, 201, origin);
});
