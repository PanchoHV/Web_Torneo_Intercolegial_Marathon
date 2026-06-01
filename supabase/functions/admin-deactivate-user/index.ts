/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders, jsonResponse, requireInternalUser } from "../_shared/admin.ts";

const protectedEmail = "copaintercolegial@fundacionmarathon.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const { admin, profile } = await requireInternalUser(req, ["admin"]);
    const body = await req.json();
    const userId = String(body.userId ?? "").trim();

    if (!userId) {
      return jsonResponse({ error: "userId is required." }, 400);
    }

    if (userId === profile.id) {
      return jsonResponse({ error: "No puedes ocultar tu propio usuario." }, 400);
    }

    const { data: targetUser, error: targetUserError } = await admin
      .from("admin_users")
      .select("id, email, full_name, role, is_active")
      .eq("id", userId)
      .single();

    if (targetUserError || !targetUser) {
      return jsonResponse({ error: targetUserError?.message ?? "User not found." }, 404);
    }

    if (String(targetUser.email).toLowerCase() === protectedEmail) {
      return jsonResponse({ error: "El superadmin no puede ser ocultado." }, 403);
    }

    const { error: updateError } = await admin
      .from("admin_users")
      .update({ is_active: false })
      .eq("id", userId);

    if (updateError) {
      return jsonResponse({ error: updateError.message }, 400);
    }

    return jsonResponse({
      success: true,
      hiddenUser: {
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
