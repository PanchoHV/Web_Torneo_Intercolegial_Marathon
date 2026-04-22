import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabasePublishableKey);

console.log("VITE_SUPABASE_URL:", supabaseUrl);
console.log("VITE_SUPABASE_PUBLISHABLE_KEY:", supabasePublishableKey);
console.log("isSupabaseConfigured:", isSupabaseConfigured);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;