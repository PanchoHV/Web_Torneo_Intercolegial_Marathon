// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendResendEmail(params: {
  apiKey: string;
  from: string;
  to: string[];
  subject: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend error ${response.status}: ${body}`);
  }
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

    // Best-effort email delivery: never block successful registration writes.
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
    const executiveEmail = Deno.env.get("RESEND_EXECUTIVE_EMAIL");

    if (resendApiKey) {
      try {
        await sendResendEmail({
          apiKey: resendApiKey,
          from: resendFrom,
          to: [payload.contact_email],
          subject: "Hemos recibido tu inscripción",
          html: `
            <h2>Inscripción recibida</h2>
            <p>Hola ${payload.contact_name},</p>
            <p>Hemos recibido la inscripción de <strong>${payload.school_name}</strong>.</p>
            <p>Un ejecutivo se pondrá en contacto contigo pronto.</p>
          `,
        });

        if (executiveEmail) {
          await sendResendEmail({
            apiKey: resendApiKey,
            from: resendFrom,
            to: [executiveEmail],
            subject: "Nueva inscripción recibida",
            html: `
              <h3>Nueva inscripción</h3>
              <ul>
                <li>Colegio: ${payload.school_name}</li>
                <li>Ciudad: ${payload.city}</li>
                <li>Encargado: ${payload.contact_name}</li>
                <li>Cargo: ${payload.applicant_role}</li>
                <li>Email: ${payload.contact_email}</li>
                <li>Teléfono: ${payload.contact_phone}</li>
              </ul>
            `,
          });
        }
      } catch (mailError) {
        console.error("Resend delivery failure", mailError);
      }
    }

    return new Response(
      JSON.stringify({ id: data.id, created_at: data.created_at }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
