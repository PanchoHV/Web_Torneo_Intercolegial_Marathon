import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

import {
  buildCsv,
  corsHeaders,
  getSupabaseAdminClient,
  jsonResponse,
  requireInternalUser,
  sanitizeFileSegment,
} from "../_shared/admin.ts";

const sourceColumns = [
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
  "tournament_categories",
  "status",
  "onboarding_status",
  "internal_priority",
  "assigned_to",
  "last_contact_at",
  "source",
  "email_to_applicant_sent",
  "email_to_executive_sent",
];

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
  "categoria_1",
  "categoria_2",
  "categoria_3",
  "categoria_4",
  "categoria_5",
  "status",
  "onboarding_status",
  "internal_priority",
  "assigned_to",
  "last_contact_at",
  "source",
  "email_to_applicant_sent",
  "email_to_executive_sent",
];

type ExportFilterQuery<TSelf> = {
  or(filters: string): TSelf;
  in(column: string, values: string[]): TSelf;
  overlaps(column: string, values: string[]): TSelf;
  eq(column: string, value: string): TSelf;
  gte(column: string, value: string): TSelf;
  lt(column: string, value: string): TSelf;
};

function normalizeCategories(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);

        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item ?? "").trim()).filter(Boolean);
        }
      } catch {
        // Fall through to comma-separated parsing.
      }
    }

    return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }

  const single = String(value ?? "").trim();
  return single ? [single] : [];
}

function mapExportRow(row: Record<string, unknown>) {
  const categories = normalizeCategories(row.tournament_categories);

  return {
    ...row,
    categoria_1: categories[0] ?? "",
    categoria_2: categories[1] ?? "",
    categoria_3: categories[2] ?? "",
    categoria_4: categories[3] ?? "",
    categoria_5: categories[4] ?? "",
  };
}

function buildXlsx(columns: string[], rows: Record<string, unknown>[]) {
  const worksheet = XLSX.utils.aoa_to_sheet([
    columns,
    ...rows.map((row) => columns.map((column) => row[column] ?? "")),
  ]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
  return XLSX.write(workbook, { bookType: "xlsx", type: "array" });
}

function applyFilters<TQuery extends ExportFilterQuery<TQuery>>(
  query: TQuery,
  filters: Record<string, unknown>
) {
  const search = String(filters.search ?? "").trim();
  const cities = normalizeStringArray(filters.cities ?? filters.city);
  const categories = normalizeStringArray(filters.categories ?? filters.category);
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

  if (cities.length > 0) {
    query = query.in("city", cities);
  }

  if (categories.length > 0) {
    query = query.overlaps("tournament_categories", categories);
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

    if (format !== "csv" && format !== "xlsx") {
      return jsonResponse({ error: "Only csv and xlsx exports are currently supported." }, 400);
    }

    const admin = getSupabaseAdminClient();
    let query = admin.from("school_registrations").select(sourceColumns.join(",")).order("created_at", {
      ascending: false,
    });
    query = applyFilters(query, filters);

    const { data, error } = await query;

    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }

    const rows = (data ?? []).map((row: Record<string, unknown>) => mapExportRow(row));
    const baseFileName = sanitizeFileSegment(
      `registrations_${new Date().toISOString().replace(/[:.]/g, "-")}`
    );
    const fileName = `${baseFileName}.${format}`;
    const bodyContent = format === "csv" ? buildCsv(exportColumns, rows) : buildXlsx(exportColumns, rows);
    const contentType =
      format === "csv"
        ? "text/csv; charset=utf-8"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

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

    return new Response(bodyContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
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
