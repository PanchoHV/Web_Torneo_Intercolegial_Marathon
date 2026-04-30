// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { buildApplicantConfirmationEmail } from "./applicantConfirmationEmail.ts";

const DEFAULT_EXECUTIVE_EMAIL = "copaintercolegial@fundacionmarathon.com";

type RegistrationPayload = {
  school_name: string;
  school_address: string;
  contact_name: string;
  applicant_role: "Rector" | "Entrenador" | "Docente" | "Otros";
  applicant_role_other: string | null;
  school_type: "Privado" | "Fiscal" | "Fiscomisional" | "Publico" | "Público";
  contact_id_number: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  tournament_categories?: string[];
  status:
    | "new"
    | "pending_regional_review"
    | "regional_window_pending"
    | "documentation_requested"
    | "qualified"
    | "contacted"
    | "won"
    | "lost";
  source: string;
  website?: string;
  turnstile_token?: string;
};

type RegionalScheduleInfo = {
  region: "Costa" | "Sierra" | "Amazonía";
  inscriptionStart: string;
  matchStart: string;
  calendarMessage: string;
};

type ResendEmailResult = {
  id?: string;
  [key: string]: unknown;
};

type SupabaseMutationError = {
  code?: string;
  message?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MINUTES = Number(
  Deno.env.get("REGISTRATION_RATE_LIMIT_WINDOW_MINUTES") ?? "10"
);
const RATE_LIMIT_MAX_ATTEMPTS = Number(
  Deno.env.get("REGISTRATION_RATE_LIMIT_MAX_ATTEMPTS") ?? "5"
);

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getRegionalSchedule(city: string): RegionalScheduleInfo {
  const schedules: Record<string, RegionalScheduleInfo> = {
    "Guayaquil (Guayas)": {
      region: "Costa",
      inscriptionStart: "4 de mayo de 2026",
      matchStart: "27 de julio de 2026",
      calendarMessage: "Tu sede forma parte del primer bloque de activación de la Región Costa.",
    },
    Manta: {
      region: "Costa",
      inscriptionStart: "4 de mayo de 2026",
      matchStart: "14 de septiembre de 2026",
      calendarMessage:
        "Tu sede forma parte del bloque Costa con activación deportiva programada para septiembre.",
    },
    Portoviejo: {
      region: "Costa",
      inscriptionStart: "4 de mayo de 2026",
      matchStart: "14 de septiembre de 2026",
      calendarMessage:
        "Tu sede forma parte del bloque Costa con activación deportiva programada para septiembre.",
    },
    Esmeraldas: {
      region: "Costa",
      inscriptionStart: "4 de mayo de 2026",
      matchStart: "27 de julio de 2026",
      calendarMessage: "Tu sede forma parte del primer bloque de activación de la Región Costa.",
    },
    Machala: {
      region: "Costa",
      inscriptionStart: "4 de mayo de 2026",
      matchStart: "27 de julio de 2026",
      calendarMessage: "Tu sede forma parte del primer bloque de activación de la Región Costa.",
    },
    "Quito (Pichincha)": {
      region: "Sierra",
      inscriptionStart: "7 de septiembre de 2026",
      matchStart: "12 de octubre de 2026",
      calendarMessage: "Tu sede se activará según el calendario escolar de Sierra.",
    },
    Ibarra: {
      region: "Sierra",
      inscriptionStart: "7 de septiembre de 2026",
      matchStart: "19 de octubre de 2026",
      calendarMessage: "Tu sede se activará según el calendario escolar de Sierra.",
    },
    Ambato: {
      region: "Sierra",
      inscriptionStart: "7 de septiembre de 2026",
      matchStart: "19 de octubre de 2026",
      calendarMessage: "Tu sede se activará según el calendario escolar de Sierra.",
    },
    Cuenca: {
      region: "Sierra",
      inscriptionStart: "7 de septiembre de 2026",
      matchStart: "12 de octubre de 2026",
      calendarMessage: "Tu sede se activará según el calendario escolar de Sierra.",
    },
    Tena: {
      region: "Amazonía",
      inscriptionStart: "7 de septiembre de 2026",
      matchStart: "19 de octubre de 2026",
      calendarMessage:
        "Tu sede forma parte del bloque Amazonía y se activará según su calendario correspondiente.",
    },
  };

  return schedules[city] ?? {
    region: "Costa",
    inscriptionStart: "Por confirmar",
    matchStart: "Por confirmar",
    calendarMessage: "La organización confirmará el calendario correspondiente a tu sede.",
  };
}

function getSchoolTypeCostMessage(schoolType: string) {
  if (schoolType === "Privado") {
    return "Para instituciones privadas, la preinscripción tiene un valor de USD 170 por categoría inscrita, más IVA. El equipo organizador confirmará los pasos correspondientes una vez revisada la información.";
  }

  return "Los colegios fiscales y fiscomisionales no pagan costo de preinscripción. La participación estará sujeta a revisión de requisitos, cupos disponibles y calendario oficial de la sede.";
}

function isMissingColumnError(error: SupabaseMutationError) {
  const message = error.message ?? "";
  return (
    error.code === "PGRST204" ||
    /could not find .* column/i.test(message) ||
    /(column|schema cache).*does not exist/i.test(message)
  );
}

function getClientIp(req: Request) {
  const forwardedFor =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip");

  if (!forwardedFor) {
    return "unknown";
  }

  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function getUserAgent(req: Request) {
  return req.headers.get("user-agent") ?? "unknown";
}

async function logRegistrationAttempt(params: {
  admin: ReturnType<typeof createClient>;
  ipAddress: string;
  userAgent: string;
  status: string;
  reason?: string | null;
}) {
  const { error } = await params.admin.from("registration_request_audit").insert({
    ip_address: params.ipAddress,
    user_agent: params.userAgent,
    status: params.status,
    reason: params.reason ?? null,
  });

  if (error) {
    console.error("Registration audit insert failed", error);
  }
}

async function isRateLimited(params: {
  admin: ReturnType<typeof createClient>;
  ipAddress: string;
}) {
  if (!params.ipAddress || params.ipAddress === "unknown") {
    return false;
  }

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60_000).toISOString();
  const { count, error } = await params.admin
    .from("registration_request_audit")
    .select("id", { head: true, count: "exact" })
    .eq("ip_address", params.ipAddress)
    .gte("created_at", windowStart);

  if (error) {
    console.error("Rate limit lookup failed", error);
    return false;
  }

  return (count ?? 0) >= RATE_LIMIT_MAX_ATTEMPTS;
}

async function validateTurnstile(params: {
  token: string;
  ipAddress: string;
}) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");

  if (!secret) {
    return { success: true, skipped: true, errors: [] as string[] };
  }

  if (!params.token) {
    return { success: false, skipped: false, errors: ["missing-input-response"] };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", params.token);

  if (params.ipAddress && params.ipAddress !== "unknown") {
    formData.append("remoteip", params.ipAddress);
  }

  formData.append("idempotency_key", crypto.randomUUID());

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json().catch(() => null);
  const errorCodes = Array.isArray(result?.["error-codes"])
    ? result["error-codes"].map((item: unknown) => String(item))
    : [];
  const action = result?.action ? String(result.action) : null;
  const hostname = result?.hostname ? String(result.hostname).toLowerCase() : null;
  const success =
    response.ok &&
    Boolean(result?.success) &&
    action === "registration_submit";

  if (success) {
    return { success: true, skipped: false, errors: [] as string[] };
  }

  if (!response.ok && errorCodes.length === 0) {
    errorCodes.push("siteverify-request-failed");
  }

  if (action !== "registration_submit") {
    errorCodes.push("invalid-action");
  }

  return {
    success: false,
    skipped: false,
    errors: hostname
      ? [...new Set([...errorCodes, `hostname:${hostname}`])]
      : [...new Set(errorCodes)],
  };
}

async function sendResendEmail(params: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<ResendEmailResult> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: params.to,
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Resend error ${response.status}: ${JSON.stringify(result)}`);
  }

  return result;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase environment variables in Edge Function." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = (await req.json()) as RegistrationPayload;
    const ipAddress = getClientIp(req);
    const userAgent = getUserAgent(req);

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    if (await isRateLimited({ admin, ipAddress })) {
      await logRegistrationAttempt({
        admin,
        ipAddress,
        userAgent,
        status: "blocked_rate_limit",
        reason: `Exceeded ${RATE_LIMIT_MAX_ATTEMPTS} attempts in ${RATE_LIMIT_WINDOW_MINUTES} minutes.`,
      });

      return jsonResponse(
        {
          error:
            "Has realizado varios intentos en poco tiempo. Espera unos minutos antes de volver a intentar.",
        },
        429
      );
    }

    if (String(payload.website ?? "").trim().length > 0) {
      await logRegistrationAttempt({
        admin,
        ipAddress,
        userAgent,
        status: "blocked_honeypot",
        reason: "Hidden honeypot field was filled.",
      });

      return jsonResponse(
        { error: "No pudimos verificar el envío. Revisa el formulario e intenta nuevamente." },
        400
      );
    }

    const turnstileCheck = await validateTurnstile({
      token: String(payload.turnstile_token ?? "").trim(),
      ipAddress,
    });

    if (!turnstileCheck.success) {
      await logRegistrationAttempt({
        admin,
        ipAddress,
        userAgent,
        status: "blocked_turnstile",
        reason: turnstileCheck.errors.join(", ") || "Turnstile validation failed.",
      });

      return jsonResponse(
        {
          error:
            "No pudimos validar la verificación de seguridad. Intenta nuevamente antes de enviar.",
        },
        400
      );
    }

    const schedule = getRegionalSchedule(payload.city);
    const schoolTypeCostMessage = getSchoolTypeCostMessage(payload.school_type);

    const registrationInsert = {
      school_name: payload.school_name,
      school_address: payload.school_address,
      contact_name: payload.contact_name,
      applicant_role: payload.applicant_role,
      applicant_role_other: payload.applicant_role_other,
      school_type: payload.school_type,
      contact_id_number: payload.contact_id_number,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone,
      city: payload.city,
      tournament_categories: Array.isArray(payload.tournament_categories)
        ? payload.tournament_categories
        : [],
      status: "pending_regional_review",
      source: payload.source,
      region: schedule.region,
      inscription_start_label: schedule.inscriptionStart,
      match_start_label: schedule.matchStart,
      calendar_message: schedule.calendarMessage,
      pre_registration_status: "pending_regional_review",
    };

    let data: { id: string; created_at: string };
    let error: SupabaseMutationError | null = null;

    const firstInsert = await admin
      .from("school_registrations")
      .insert(registrationInsert)
      .select("id, created_at")
      .single();

    data = firstInsert.data;
    error = firstInsert.error;

    if (error && isMissingColumnError(error)) {
      const fallbackInsert = { ...registrationInsert };
      delete fallbackInsert.tournament_categories;
      delete fallbackInsert.region;
      delete fallbackInsert.inscription_start_label;
      delete fallbackInsert.match_start_label;
      delete fallbackInsert.calendar_message;
      delete fallbackInsert.pre_registration_status;
      const fallbackInsertResult = await admin
        .from("school_registrations")
        .insert(fallbackInsert)
        .select("id, created_at")
        .single();

      data = fallbackInsertResult.data;
      error = fallbackInsertResult.error;
    }

    if (error) {
      await logRegistrationAttempt({
        admin,
        ipAddress,
        userAgent,
        status: "blocked_validation_error",
        reason: error.message,
      });

      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await logRegistrationAttempt({
      admin,
      ipAddress,
      userAgent,
      status: "allowed",
      reason: turnstileCheck.skipped ? "Turnstile skipped because secret is not configured." : null,
    });

    // Best-effort email delivery with auditable flags.
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "Torneo Nacional Intercolegial <info@torneo.fundacionmarathon.org.ec>";
    const executiveEmail = Deno.env.get("RESEND_EXECUTIVE_EMAIL") ?? DEFAULT_EXECUTIVE_EMAIL;

    let applicantSent = false;
    let executiveSent = false;
    let participantEmailId: string | null = null;
    let executiveEmailId: string | null = null;
    let applicantEmailError: string | null = null;
    let executiveEmailError: string | null = null;
    const emailAuditWarnings: string[] = [];

    if (!resendApiKey) {
      emailAuditWarnings.push("Missing RESEND_API_KEY; emails were not attempted.");
    }

    if (!Deno.env.get("RESEND_FROM_EMAIL")) {
      emailAuditWarnings.push("Missing RESEND_FROM_EMAIL; fallback sender was used.");
    }

    if (!Deno.env.get("RESEND_EXECUTIVE_EMAIL")) {
      emailAuditWarnings.push("Missing RESEND_EXECUTIVE_EMAIL; fallback executive email was used.");
    }

    const replyTo = executiveEmail;

    if (resendApiKey) {
      try {
        const applicantRole =
          payload.applicant_role === "Otros" && payload.applicant_role_other
            ? payload.applicant_role_other
            : payload.applicant_role;
        const { subject, html } = buildApplicantConfirmationEmail({
          schoolName: payload.school_name,
          contactName: payload.contact_name,
          contactEmail: payload.contact_email,
          contactPhone: payload.contact_phone,
          applicantRole,
          tournamentCategories: Array.isArray(payload.tournament_categories)
            ? payload.tournament_categories
            : [],
          createdAt: data.created_at,
          registrationCode: `TM-2026-${String(data.id).slice(0, 8).toUpperCase()}`,
          whatsappNumber: "+593989655352",
          city: payload.city,
          region: schedule.region,
          inscriptionStart: schedule.inscriptionStart,
          matchStart: schedule.matchStart,
          calendarMessage: schedule.calendarMessage,
          schoolType: payload.school_type,
          schoolTypeCostMessage,
        });
        const participantResult = await sendResendEmail({
          apiKey: resendApiKey,
          from: resendFrom,
          to: [payload.contact_email],
          replyTo,
          subject,
          html,
        });
        applicantSent = true;
        participantEmailId = participantResult?.id ?? null;
      } catch (mailError) {
        applicantEmailError = mailError instanceof Error ? mailError.message : "Unknown participant email error";
        console.error("Resend participant delivery failure", mailError);
      }

      if (executiveEmail) {
        try {
          const executiveResult = await sendResendEmail({
            apiKey: resendApiKey,
            from: resendFrom,
            to: [executiveEmail],
            replyTo,
            subject: "Nueva inscripción recibida",
            html: `
              <h3>Nueva inscripción</h3>
              <ul>
                <li>Colegio: ${escapeHtml(payload.school_name)}</li>
                <li>Dirección: ${escapeHtml(payload.school_address)}</li>
                <li>Ciudad: ${escapeHtml(payload.city)}</li>
                <li>Encargado: ${escapeHtml(payload.contact_name)}</li>
                <li>Cargo: ${escapeHtml(payload.applicant_role)}</li>
                <li>Tipo de colegio: ${escapeHtml(payload.school_type)}</li>
                <li>Región: ${escapeHtml(schedule.region)}</li>
                <li>Inicio de inscripciones: ${escapeHtml(schedule.inscriptionStart)}</li>
                <li>Inicio estimado de partidos: ${escapeHtml(schedule.matchStart)}</li>
                <li>Estado interno: pending_regional_review</li>
                <li>Categorías: ${escapeHtml(
                  Array.isArray(payload.tournament_categories) && payload.tournament_categories.length > 0
                    ? payload.tournament_categories.join(", ")
                    : "No especificadas"
                )}</li>
                <li>Cédula: ${escapeHtml(payload.contact_id_number)}</li>
                <li>Email: ${escapeHtml(payload.contact_email)}</li>
                <li>Teléfono: ${escapeHtml(payload.contact_phone)}</li>
              </ul>
            `,
          });
          executiveSent = true;
          executiveEmailId = executiveResult?.id ?? null;
        } catch (mailError) {
          executiveEmailError = mailError instanceof Error ? mailError.message : "Unknown executive email error";
          console.error("Resend executive delivery failure", mailError);
        }
      }
    }

    const flagsUpdate = {
      email_to_applicant_sent: applicantSent,
      email_to_executive_sent: executiveSent,
    };

    const extendedAuditUpdate: Record<string, unknown> = {
      ...flagsUpdate,
    };

    if (participantEmailId) {
      extendedAuditUpdate.participant_email_id = participantEmailId;
    }

    if (executiveEmailId) {
      extendedAuditUpdate.executive_email_id = executiveEmailId;
    }

    if (emailAuditWarnings.length > 0) {
      extendedAuditUpdate.email_audit_warnings = emailAuditWarnings;
    }

    if (applicantEmailError) {
      extendedAuditUpdate.applicant_email_error = applicantEmailError;
    }

    if (executiveEmailError) {
      extendedAuditUpdate.executive_email_error = executiveEmailError;
    }

    let auditUpdateError: string | null = null;

    const { error: firstUpdateError } = await admin
      .from("school_registrations")
      .update(extendedAuditUpdate)
      .eq("id", data.id);

    if (firstUpdateError) {
      if (isMissingColumnError(firstUpdateError)) {
        const { error: fallbackUpdateError } = await admin
          .from("school_registrations")
          .update(flagsUpdate)
          .eq("id", data.id);

        if (fallbackUpdateError) {
          auditUpdateError = fallbackUpdateError.message;
          console.error("Audit flags update failed", fallbackUpdateError);
        }
      } else {
        auditUpdateError = firstUpdateError.message;
        console.error("Audit update failed", firstUpdateError);
      }
    }

    return new Response(
      JSON.stringify({
        id: data.id,
        created_at: data.created_at,
        email_to_applicant_sent: applicantSent,
        email_to_executive_sent: executiveSent,
        participant_email_id: participantEmailId,
        executive_email_id: executiveEmailId,
        email_audit_warnings: emailAuditWarnings,
        applicant_email_error: applicantEmailError,
        executive_email_error: executiveEmailError,
        audit_update_error: auditUpdateError,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      500
    );
  }
});
