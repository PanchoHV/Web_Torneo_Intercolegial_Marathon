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

    if (!registrationId) {
      return jsonResponse({ error: "registrationId is required." }, 400);
    }

    const now = new Date().toISOString();

    const { data: registration, error: registrationError } = await admin
      .from("school_registrations")
      .select("id, onboarding_status")
      .eq("id", registrationId)
      .single();

    if (registrationError || !registration) {
      return jsonResponse({ error: registrationError?.message ?? "Registration not found." }, 404);
    }

    const nextStatus =
      registration.onboarding_status === "approved" || registration.onboarding_status === "rejected"
        ? registration.onboarding_status
        : "contacted";

    const { data, error } = await admin
      .from("school_registrations")
      .update({
        last_contact_at: now,
        onboarding_status: nextStatus,
      })
      .eq("id", registrationId)
      .select("id, onboarding_status, last_contact_at, updated_at")
      .single();

    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }

    await admin.from("onboarding_notes").insert({
      registration_id: registrationId,
      author_user_id: profile.id,
      author_email: profile.email,
      note: `Contacto realizado y registrado el ${now}.`,
    });

    return jsonResponse({ registration: data });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      500
    );
  }
});
