import { createClient } from "@supabase/supabase-js";

const url = "https://hhwmzjxqphdshyietbbi.supabase.co";
const publishableKey = "sb_publishable_-VO-CEB_MFbJIRJFgzIxBw_M_Ai6rd-";

export const supabase = createClient(url, publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
