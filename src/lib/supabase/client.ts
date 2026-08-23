import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabasePublishableKey);

if (import.meta.env.DEV && !isSupabaseConfigured) {
  console.warn(
    "Supabase no configurado: faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;