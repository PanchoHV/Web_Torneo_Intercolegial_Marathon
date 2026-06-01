/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    const { admin, profile } = await requireInternalUser(req, ["admin", "onboarding"]);
    const body = await req.json();

    const registrationId = String(body.registrationId ?? "").trim();
    const note = String(body.note ?? "").trim();

    if (!registrationId) {
      return jsonResponse({ error: "registrationId is required." }, 400);
    }

    if (note.length < 3) {
      return jsonResponse({ error: "Note must be at least 3 characters long." }, 400);
    }

    const { data, error } = await admin
      .from("onboarding_notes")
      .insert({
        registration_id: registrationId,
        author_user_id: profile.id,
        author_email: profile.email,
        note,
      })
      .select("id, registration_id, author_user_id, author_email, note, created_at")
      .single();

    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }

    return jsonResponse({ note: data });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      401
    );
  }
});
