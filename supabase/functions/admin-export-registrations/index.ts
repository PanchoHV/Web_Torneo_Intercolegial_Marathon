// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import {
  buildCsv,
  corsHeaders,
  getSupabaseAdminClient,
  jsonResponse,
  requireInternalUser,
  sanitizeFileSegment,
} from "../_shared/admin.ts";

const exportColumns = [
  "created_at",
  "school_name",
  "school_address",
  "contact_name",
  "applicant_role",
  "applicant_role_other",
  "school_type",
  "contact_id_number",
  "contact_email",
  "contact_phone",
  "city",
  "status",
  "onboarding_status",
  "internal_priority",
  "assigned_to",
  "last_contact_at",
  "source",
  "email_to_applicant_sent",
  "email_to_executive_sent",
];

function applyFilters(query: any, filters: Record<string, unknown>) {
  const search = String(filters.search ?? "").trim();
  const city = String(filters.city ?? "").trim();
  const schoolType = String(filters.schoolType ?? "").trim();
  const onboardingStatus = String(filters.onboardingStatus ?? "").trim();
  const dateFrom = String(filters.dateFrom ?? "").trim();
  const dateTo = String(filters.dateTo ?? "").trim();

  if (search) {
    const safeSearch = search.replace(/[%(),]/g, " ").trim();
    query = query.or(
      `school_name.ilike.%${safeSearch}%,contact_name.ilike.%${safeSearch}%,contact_email.ilike.%${safeSearch}%`
    );
  }

  if (city) {
    query = query.eq("city", city);
  }

  if (schoolType) {
    query = query.eq("school_type", schoolType);
  }

  if (onboardingStatus) {
    query = query.eq("onboarding_status", onboardingStatus);
  }

  if (dateFrom) {
    query = query.gte("created_at", `${dateFrom}T00:00:00.000Z`);
  }

  if (dateTo) {
    const nextDate = new Date(`${dateTo}T00:00:00.000Z`);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    query = query.lt("created_at", nextDate.toISOString());
  }

  return query;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const { profile } = await requireInternalUser(req, ["admin", "onboarding"]);
    const exportAllowedForOnboarding =
      String(Deno.env.get("ADMIN_ALLOW_ONBOARDING_EXPORTS") ?? "false").toLowerCase() === "true";

    if (profile.role === "onboarding" && !exportAllowedForOnboarding) {
      return jsonResponse({ error: "Export is disabled for onboarding users." }, 403);
    }

    const body = await req.json();
    const filters = typeof body.filters === "object" && body.filters ? body.filters : {};
    const format = String(body.format ?? "csv").trim().toLowerCase();
    const purpose = body.purpose ? String(body.purpose).trim() : null;

    if (format !== "csv") {
      return jsonResponse({ error: "Only csv export is currently supported." }, 400);
    }

    const admin = getSupabaseAdminClient();
    let query = admin.from("school_registrations").select(exportColumns.join(",")).order("created_at", {
      ascending: false,
    });
    query = applyFilters(query, filters);

    const { data, error } = await query;

    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }

    const rows = data ?? [];
    const csv = buildCsv(exportColumns, rows);
    const fileName = sanitizeFileSegment(
      `registrations_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`
    );

    const { data: auditRecord, error: auditError } = await admin
      .from("registration_exports_audit")
      .insert({
        requested_by_user_id: profile.id,
        requested_by_email: profile.email,
        role: profile.role,
        format,
        filters_json: filters,
        rows_count: rows.length,
        file_name: fileName,
        purpose,
      })
      .select("id")
      .single();

    if (auditError) {
      return jsonResponse({ error: auditError.message }, 500);
    }

    return new Response(csv, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "X-Export-Audit-Id": auditRecord.id,
      },
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      401
    );
  }
});
