// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders, jsonResponse, requireInternalUser } from "../_shared/admin.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const { admin, profile } = await requireInternalUser(req, ["admin", "onboarding", "viewer"]);
    const body = await req.json();

    const password = String(body.password ?? "").trim();

    if (password.length < 8) {
      return jsonResponse({ error: "La contraseña debe tener al menos 8 caracteres." }, 400);
    }

    const { data: targetUser, error: targetUserError } = await admin
      .from("admin_users")
      .select("id, email, is_active")
      .eq("id", profile.id)
      .single();

    if (targetUserError || !targetUser) {
      return jsonResponse({ error: targetUserError?.message ?? "User not found." }, 404);
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(profile.id, {
      password,
    });

    if (updateError) {
      return jsonResponse({ error: updateError.message }, 400);
    }

    return jsonResponse({
      success: true,
      user: {
        id: targetUser.id,
        email: targetUser.email,
      },
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      401
    );
  }
});
