/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders, jsonResponse, requireInternalUser } from "../_shared/admin.ts";

const allowedOnboardingStatuses = new Set([
  "new",
  "in_review",
  "qualified",
  "contacted",
  "pending_docs",
  "approved",
  "rejected",
]);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const { admin } = await requireInternalUser(req, ["admin", "onboarding"]);
    const body = await req.json();

    const registrationId = String(body.registrationId ?? "").trim();

    if (!registrationId) {
      return jsonResponse({ error: "registrationId is required." }, 400);
    }

    const patch: Record<string, unknown> = {};

    if ("onboardingStatus" in body) {
      const onboardingStatus = body.onboardingStatus === null ? null : String(body.onboardingStatus).trim();

      if (!onboardingStatus || !allowedOnboardingStatuses.has(onboardingStatus)) {
        return jsonResponse({ error: "Invalid onboardingStatus." }, 400);
      }

      patch.onboarding_status = onboardingStatus;
    }

    if ("assignedTo" in body) {
      const assignedTo = body.assignedTo ? String(body.assignedTo).trim() : null;

      if (assignedTo) {
        const { data: assignee, error: assigneeError } = await admin
          .from("admin_users")
          .select("id")
          .eq("id", assignedTo)
          .eq("is_active", true)
          .maybeSingle();

        if (assigneeError) {
          return jsonResponse({ error: assigneeError.message }, 400);
        }

        if (!assignee) {
          return jsonResponse({ error: "Assigned user is invalid." }, 400);
        }
      }

      patch.assigned_to = assignedTo;
    }

    if ("internalPriority" in body) {
      const internalPriority = body.internalPriority ? String(body.internalPriority).trim() : null;
      patch.internal_priority = internalPriority || null;
    }

    if ("lastContactAt" in body) {
      const lastContactAt = body.lastContactAt ? String(body.lastContactAt).trim() : null;

      if (lastContactAt) {
        const parsed = new Date(lastContactAt);
        if (Number.isNaN(parsed.getTime())) {
          return jsonResponse({ error: "Invalid lastContactAt value." }, 400);
        }
        patch.last_contact_at = parsed.toISOString();
      } else {
        patch.last_contact_at = null;
      }
    }

    if (Object.keys(patch).length === 0) {
      return jsonResponse({ error: "No valid fields to update." }, 400);
    }

    const { data, error } = await admin
      .from("school_registrations")
      .update(patch)
      .eq("id", registrationId)
      .select("id, onboarding_status, assigned_to, internal_priority, last_contact_at, updated_at")
      .single();

    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }

    return jsonResponse({ registration: data });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      401
    );
  }
});
