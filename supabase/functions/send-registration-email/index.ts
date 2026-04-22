// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
    const RESEND_EXECUTIVE_EMAIL = Deno.env.get("RESEND_EXECUTIVE_EMAIL");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("Falta RESEND_API_KEY");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Faltan credenciales de Supabase en la función");
    }

    const body = await req.json();

    const {
      registrationId,
      school_name,
      school_address,
      contact_name,
      applicant_role,
      school_type,
      contact_id_number,
      contact_email,
      contact_phone,
      city,
    } = body;

    if (!registrationId) {
      throw new Error("Falta registrationId");
    }

    if (!contact_email) {
      throw new Error("Falta contact_email");
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (!RESEND_EXECUTIVE_EMAIL) {
      throw new Error("Falta RESEND_EXECUTIVE_EMAIL");
    }

    const from = RESEND_FROM_EMAIL;
    const executiveEmail = RESEND_EXECUTIVE_EMAIL;

    const participantResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [contact_email],
        subject: "Hemos recibido la inscripción de tu colegio",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Inscripción recibida</h2>
            <p>Hola <strong>${contact_name}</strong>,</p>
            <p>Hemos recibido correctamente la inscripción de <strong>${school_name}</strong>.</p>
            <p>Un ejecutivo del Torneo Intercolegial Marathon se pondrá en contacto contigo pronto para continuar con el proceso.</p>
            <hr />
            <p><strong>Resumen de la inscripción:</strong></p>
            <ul>
              <li>Colegio: ${school_name}</li>
              <li>Ciudad: ${city}</li>
              <li>Encargado: ${contact_name}</li>
              <li>Cargo: ${applicant_role}</li>
              <li>Correo: ${contact_email}</li>
              <li>Celular: ${contact_phone}</li>
            </ul>
          </div>
        `,
      }),
    });

    const participantData = await participantResponse.json();

    if (!participantResponse.ok) {
      throw new Error(
        `Error enviando correo al participante: ${JSON.stringify(participantData)}`
      );
    }

    const executiveResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [executiveEmail],
        subject: "Nueva inscripción recibida – Torneo Intercolegial Marathon",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Nueva inscripción recibida</h2>
            <ul>
              <li><strong>Colegio:</strong> ${school_name}</li>
              <li><strong>Dirección:</strong> ${school_address}</li>
              <li><strong>Ciudad:</strong> ${city}</li>
              <li><strong>Encargado:</strong> ${contact_name}</li>
              <li><strong>Cargo:</strong> ${applicant_role}</li>
              <li><strong>Tipo de colegio:</strong> ${school_type}</li>
              <li><strong>Cédula:</strong> ${contact_id_number}</li>
              <li><strong>Correo:</strong> ${contact_email}</li>
              <li><strong>Celular:</strong> ${contact_phone}</li>
            </ul>
          </div>
        `,
      }),
    });

    const executiveData = await executiveResponse.json();

    if (!executiveResponse.ok) {
      throw new Error(
        `Error enviando correo al ejecutivo: ${JSON.stringify(executiveData)}`
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("school_registrations")
      .update({
        email_to_applicant_sent: true,
        email_to_executive_sent: true,
      })
      .eq("id", registrationId);

    if (updateError) {
      throw new Error(`Error actualizando flags en Supabase: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        participantEmailId: participantData.id ?? null,
        executiveEmailId: executiveData.id ?? null,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});