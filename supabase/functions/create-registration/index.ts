// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { buildApplicantConfirmationEmail } from "./applicantConfirmationEmail.ts";

type RegistrationPayload = {
  school_name: string;
  school_address: string;
  contact_name: string;
  applicant_role: "Rector" | "Entrenador" | "Docente" | "Otros";
  applicant_role_other: string | null;
  school_type: "Privado" | "Publico" | "Público";
  contact_id_number: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  status: "new" | "qualified" | "contacted" | "won" | "lost";
  source: string;
};

type ResendEmailResult = {
  id?: string;
  [key: string]: unknown;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await admin
      .from("school_registrations")
      .insert(payload)
      .select("id, created_at")
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Best-effort email delivery with auditable flags.
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "Torneo Nacional Intercolegial <info@torneo.fundacionmarathon.org.ec>";
    const executiveEmail = Deno.env.get("RESEND_EXECUTIVE_EMAIL");

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

    if (!executiveEmail) {
      emailAuditWarnings.push("Missing RESEND_EXECUTIVE_EMAIL; executive email was not attempted.");
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
          createdAt: data.created_at,
          registrationCode: `TM-2026-${String(data.id).slice(0, 8).toUpperCase()}`,
          whatsappNumber: "+593995307806",
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
      if (/(column|schema cache).*does not exist/i.test(firstUpdateError.message)) {
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
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
