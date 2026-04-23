// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Expose-Headers": "Content-Disposition, X-Export-Audit-Id",
};

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

export function getSupabaseAdminClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export async function requireInternalUser(req: Request, allowedRoles?: string[]) {
  const authHeader = req.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "").trim();

  if (!accessToken) {
    throw new Error("Missing access token.");
  }

  const admin = getSupabaseAdminClient();
  const {
    data: { user },
    error: authError,
  } = await admin.auth.getUser(accessToken);

  if (authError || !user) {
    throw new Error("Invalid or expired session.");
  }

  const { data: profile, error: profileError } = await admin
    .from("admin_users")
    .select("id, email, full_name, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile || !profile.is_active) {
    throw new Error("User is not authorized for the admin module.");
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    throw new Error("Insufficient permissions for this action.");
  }

  return {
    admin,
    user,
    profile,
  };
}

export function escapeCsvValue(value: unknown) {
  const normalized = String(value ?? "");
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

export function buildCsv(columns: string[], rows: Record<string, unknown>[]) {
  const header = columns.join(",");
  const lines = rows.map((row) => columns.map((column) => escapeCsvValue(row[column])).join(","));
  return [header, ...lines].join("\n");
}

export function sanitizeFileSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "_");
}
