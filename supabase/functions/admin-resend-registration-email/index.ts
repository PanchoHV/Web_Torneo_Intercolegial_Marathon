// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { buildApplicantConfirmationEmail } from "../create-registration/applicantConfirmationEmail.ts";
import { corsHeaders, jsonResponse, requireInternalUser } from "../_shared/admin.ts";

const DEFAULT_EXECUTIVE_EMAIL = "copaintercolegial@fundacionmarathon.com";

type ResendEmailResult = {
  id?: string;
  [key: string]: unknown;
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
      Authorization: `Bearer ${params.apiKey}`,
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
    const { admin, profile } = await requireInternalUser(req, ["admin", "onboarding"]);
    const body = await req.json();
    const registrationId = String(body.registrationId ?? "").trim();

    if (!registrationId) {
      return jsonResponse({ error: "registrationId is required." }, 400);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "Torneo Nacional Intercolegial <info@torneo.fundacionmarathon.org.ec>";
    const executiveEmail = Deno.env.get("RESEND_EXECUTIVE_EMAIL") ?? DEFAULT_EXECUTIVE_EMAIL;

    if (!resendApiKey) {
      return jsonResponse({ error: "Missing RESEND_API_KEY." }, 500);
    }

    const { data: registration, error: registrationError } = await admin
      .from("school_registrations")
      .select(
        "id, created_at, school_name, school_address, contact_name, applicant_role, applicant_role_other, school_type, contact_id_number, contact_email, contact_phone, city, tournament_categories"
      )
      .eq("id", registrationId)
      .single();

    if (registrationError || !registration) {
      return jsonResponse({ error: registrationError?.message ?? "Registration not found." }, 404);
    }

    const applicantRole =
      registration.applicant_role === "Otros" && registration.applicant_role_other
        ? registration.applicant_role_other
        : registration.applicant_role;

    const replyTo = executiveEmail;

    const { subject, html } = buildApplicantConfirmationEmail({
      schoolName: registration.school_name,
      contactName: registration.contact_name,
      contactEmail: registration.contact_email,
      contactPhone: registration.contact_phone,
      applicantRole,
      tournamentCategories: Array.isArray(registration.tournament_categories)
        ? registration.tournament_categories
        : [],
      createdAt: registration.created_at,
      registrationCode: `TM-2026-${String(registration.id).slice(0, 8).toUpperCase()}`,
      whatsappNumber: "+593989655352",
    });

    const participantResult = await sendResendEmail({
      apiKey: resendApiKey,
      from: resendFrom,
      to: [registration.contact_email],
      replyTo,
      subject,
      html,
    });

    const executiveResult = await sendResendEmail({
      apiKey: resendApiKey,
      from: resendFrom,
      to: [executiveEmail],
      replyTo,
      subject: "Reenvío de inscripción recibida",
      html: `
        <h3>Reenvío de inscripción</h3>
        <p>Acción ejecutada por: ${escapeHtml(profile.email)}</p>
        <ul>
          <li>Colegio: ${escapeHtml(registration.school_name)}</li>
          <li>Dirección: ${escapeHtml(registration.school_address)}</li>
          <li>Ciudad: ${escapeHtml(registration.city)}</li>
          <li>Encargado: ${escapeHtml(registration.contact_name)}</li>
          <li>Cargo: ${escapeHtml(registration.applicant_role)}</li>
          <li>Tipo de colegio: ${escapeHtml(registration.school_type)}</li>
          <li>Categorías: ${escapeHtml(
            Array.isArray(registration.tournament_categories) && registration.tournament_categories.length > 0
              ? registration.tournament_categories.join(", ")
              : "No especificadas"
          )}</li>
          <li>Cédula: ${escapeHtml(registration.contact_id_number)}</li>
          <li>Email: ${escapeHtml(registration.contact_email)}</li>
          <li>Teléfono: ${escapeHtml(registration.contact_phone)}</li>
        </ul>
      `,
    });

    await admin
      .from("school_registrations")
      .update({
        email_to_applicant_sent: true,
        email_to_executive_sent: true,
        participant_email_id: participantResult?.id ?? null,
        executive_email_id: executiveResult?.id ?? null,
      })
      .eq("id", registration.id);

    await admin.from("onboarding_notes").insert({
      registration_id: registration.id,
      author_user_id: profile.id,
      author_email: profile.email,
      note: "Se reenviaron los correos de confirmación al participante y al ejecutivo.",
    });

    return jsonResponse({
      success: true,
      participantEmailId: participantResult?.id ?? null,
      executiveEmailId: executiveResult?.id ?? null,
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      500
    );
  }
});
