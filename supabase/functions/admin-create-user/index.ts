/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders, jsonResponse, requireInternalUser } from "../_shared/admin.ts";

const allowedRoles = new Set(["admin", "onboarding", "viewer"]);
const DEFAULT_LOGIN_URL = "https://torneo.fundacionmarathon.org.ec/admin/login";
const DEFAULT_SUPPORT_EMAIL = "copaintercolegial@fundacionmarathon.com";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getRoleLabel(role: string) {
  switch (role) {
    case "admin":
      return "Admin";
    case "onboarding":
      return "Onboarding";
    case "viewer":
      return "Viewer";
    default:
      return role;
  }
}

function buildInvitationEmail({
  fullName,
  email,
  password,
  role,
  loginUrl,
}: {
  fullName: string | null;
  email: string;
  password: string;
  role: string;
  loginUrl: string;
}) {
  const safeName = escapeHtml(fullName || "Equipo Torneo Marathon");
  const safeEmail = escapeHtml(email);
  const safePassword = escapeHtml(password);
  const safeRole = escapeHtml(getRoleLabel(role));
  const safeLoginUrl = escapeHtml(loginUrl);

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>Invitación al módulo privado</title>
        <style>
          body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
          @media screen and (max-width: 640px) {
            .wrapper {
              width: 100% !important;
            }
            .mobile-padding {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
            .hero-block {
              padding: 28px 20px 24px !important;
            }
            .content-block {
              padding: 24px 20px 28px !important;
            }
            .eyebrow {
              font-size: 11px !important;
              line-height: 16px !important;
              letter-spacing: 1.4px !important;
            }
            .hero-title {
              font-size: 28px !important;
              line-height: 32px !important;
            }
            .hero-copy {
              font-size: 15px !important;
              line-height: 24px !important;
            }
            .stack-column,
            .stack-column td {
              display: block !important;
              width: 100% !important;
            }
            .credential-cell {
              padding: 0 0 12px 0 !important;
            }
            .credential-card {
              padding: 16px 16px 14px !important;
            }
            .credential-value {
              font-size: 15px !important;
              line-height: 22px !important;
            }
            .button-link {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
              text-align: center !important;
            }
            .footer-copy {
              font-size: 13px !important;
              line-height: 20px !important;
            }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background:#eef4fb; font-family:Arial, Helvetica, sans-serif; color:#1d2740;">
        <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
          Ya tienes acceso al CRM del Torneo Intercolegial Marathon.
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eef4fb;">
          <tr>
            <td align="center" style="padding:18px 12px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="wrapper" style="width:100%; max-width:640px;">
                <tr>
                  <td class="mobile-padding" style="padding:0 16px 14px; font-size:12px; line-height:18px; color:#6b7d97; text-align:center;">
                    Invitación CRM para el equipo interno del torneo
                  </td>
                </tr>

                <tr>
                  <td style="border-radius:28px; overflow:hidden; background:#ffffff; box-shadow:0 24px 60px rgba(6,42,79,0.12);">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td class="hero-block mobile-padding" style="padding:40px 36px 30px; background:#062a4f; background-image:linear-gradient(135deg,#062a4f 0%,#0050a4 100%);">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td class="eyebrow" style="padding:8px 14px; border-radius:999px; background:rgba(255,255,255,0.12); color:#ffffff; font-size:12px; line-height:16px; font-weight:700; letter-spacing:1.8px; text-transform:uppercase;">
                                      Equipo interno
                                    </td>
                                  </tr>
                                </table>
                                <div class="hero-title" style="margin-top:18px; font-size:34px; line-height:38px; font-weight:900; color:#ffffff; text-transform:uppercase;">
                                  Bienvenido al panel privado del torneo
                                </div>
                                <div class="hero-copy" style="margin-top:14px; font-size:16px; line-height:26px; color:rgba(255,255,255,0.86);">
                                  Te han invitado a formar parte del equipo del Torneo Intercolegial Marathon. Ya tienes una cuenta activa y lista para ingresar.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td class="content-block mobile-padding" style="padding:32px 36px 36px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="font-size:16px; line-height:26px; color:#1d2740;">
                                Hola <strong>${safeName}</strong>,
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top:12px; font-size:16px; line-height:26px; color:#44546c;">
                                Te compartimos tus credenciales temporales. Accede a la Plataforma, ingresa tus credenciales luego asegura tu cuenta cambiando el password desde <strong>Mi acceso</strong>.
                              </td>
                            </tr>

                            <tr>
                              <td style="padding-top:24px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                  <tr class="stack-column">
                                    <td width="50%" valign="top" class="credential-cell" style="padding:0 6px 12px 0;">
                                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="credential-card" style="border:1px solid #d8e3f0; border-radius:20px; background:#f8fbff;">
                                        <tr>
                                          <td style="padding:18px 18px 14px;">
                                            <div style="font-size:11px; line-height:16px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#6880a0;">
                                              Usuario
                                            </div>
                                            <div class="credential-value" style="margin-top:8px; font-size:16px; line-height:24px; font-weight:700; color:#0050a4; word-break:break-word;">
                                              ${safeEmail}
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td width="50%" valign="top" class="credential-cell" style="padding:0 0 12px 6px;">
                                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="credential-card" style="border:1px solid #d8e3f0; border-radius:20px; background:#f8fbff;">
                                        <tr>
                                          <td style="padding:18px 18px 14px;">
                                            <div style="font-size:11px; line-height:16px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#6880a0;">
                                              Contraseña temporal
                                            </div>
                                            <div class="credential-value" style="margin-top:8px; font-size:16px; line-height:24px; font-weight:700; color:#1d2740; word-break:break-word;">
                                              ${safePassword}
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" style="padding-top:0;">
                                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #d8e3f0; border-radius:20px; background:#ffffff;">
                                        <tr>
                                          <td style="padding:16px 18px;">
                                            <div style="font-size:11px; line-height:16px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#6880a0;">
                                              Rol asignado
                                            </div>
                                            <div class="credential-value" style="margin-top:8px; font-size:16px; line-height:24px; font-weight:700; color:#1d2740;">
                                              ${safeRole}
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td style="padding-top:20px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius:20px; background:#fff4f4;">
                                  <tr>
                                    <td style="padding:18px 18px 16px;">
                                      <div style="font-size:12px; line-height:16px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#d33b46;">
                                        Importante
                                      </div>
                                      <div style="padding-top:8px; font-size:15px; line-height:24px; color:#7d2331;">
                                        Por seguridad, cambia esta contraseña apenas ingreses. La opción estará disponible dentro del panel en <strong>Mi acceso</strong>.
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td style="padding-top:24px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                    <td align="left">
                                      <a href="${safeLoginUrl}" class="button-link" style="display:inline-block; padding:16px 28px; border-radius:999px; background:#f52e30; color:#ffffff; text-decoration:none; font-size:16px; line-height:20px; font-weight:800;">
                                        Ingresar al panel
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td class="footer-copy" style="padding-top:24px; font-size:14px; line-height:22px; color:#6a7a92;">
                                Si no esperabas esta invitación o necesitas ayuda con tu acceso, responde a este correo y el equipo lo revisará contigo.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

async function sendInvitationEmail({
  email,
  fullName,
  password,
  role,
}: {
  email: string;
  fullName: string | null;
  password: string;
  role: string;
}) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail =
    Deno.env.get("RESEND_FROM_EMAIL") ??
    "Torneo Intercolegial Marathon <info@torneo.fundacionmarathon.org.ec>";
  const replyToEmail =
    Deno.env.get("RESEND_REPLY_TO_EMAIL") ??
    Deno.env.get("RESEND_EXECUTIVE_EMAIL") ??
    DEFAULT_SUPPORT_EMAIL;

  if (!resendApiKey) {
    throw new Error("Falta RESEND_API_KEY; no se intentó enviar la invitación.");
  }

  if (!Deno.env.get("RESEND_FROM_EMAIL")) {
    console.warn("RESEND_FROM_EMAIL is not configured; using fallback sender.");
  }

  const loginUrl = `${Deno.env.get("PUBLIC_SITE_URL") ?? "https://torneo.fundacionmarathon.org.ec"}/admin/login`
    .replace(/([^:]\/)\/+/g, "$1");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      reply_to: replyToEmail,
      subject: "Te han invitado al módulo privado del Torneo Marathon",
      html: buildInvitationEmail({
        fullName,
        email,
        password,
        role,
        loginUrl: loginUrl || DEFAULT_LOGIN_URL,
      }),
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const providerMessage = payload?.message || payload?.error || JSON.stringify(payload);
    throw new Error(
      providerMessage
        ? `Resend no aceptó el correo de invitación: ${providerMessage}`
        : "Resend no aceptó el correo de invitación."
    );
  }

  return payload;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const { admin } = await requireInternalUser(req, ["admin"]);
    const body = await req.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "").trim();
    const fullName = body.fullName ? String(body.fullName).trim() : null;
    const role = String(body.role ?? "").trim();

    if (!email || !email.includes("@")) {
      return jsonResponse({ error: "A valid email is required." }, 400);
    }

    if (password.length < 8) {
      return jsonResponse({ error: "Password must be at least 8 characters long." }, 400);
    }

    if (!allowedRoles.has(role)) {
      return jsonResponse({ error: "Invalid role." }, 400);
    }

    const { data: existingUserList, error: listError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      return jsonResponse({ error: listError.message }, 400);
    }

    const existingUser = existingUserList.users.find(
      (user) => user.email?.toLowerCase() === email
    );

    let authUserId = existingUser?.id ?? null;
    let reactivated = false;
    let inviteEmailSent = false;
    let inviteEmailError = null;

    if (existingUser) {
      const { error: updateAuthError } = await admin.auth.admin.updateUserById(existingUser.id, {
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      });

      if (updateAuthError) {
        return jsonResponse({ error: updateAuthError.message }, 400);
      }
    } else {
      const { data: createdUser, error: createAuthError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      });

      if (createAuthError || !createdUser.user?.id) {
        return jsonResponse({ error: createAuthError?.message ?? "Could not create user." }, 400);
      }

      authUserId = createdUser.user.id;
    }

    if (!authUserId) {
      return jsonResponse({ error: "Could not resolve auth user id." }, 500);
    }

    const { data: existingProfile } = await admin
      .from("admin_users")
      .select("id, is_active")
      .eq("id", authUserId)
      .maybeSingle();

    reactivated = Boolean(existingProfile && existingProfile.is_active === false);

    const { error: profileError } = await admin.from("admin_users").upsert(
      {
        id: authUserId,
        email,
        full_name: fullName,
        role,
        is_active: true,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      return jsonResponse({ error: profileError.message }, 400);
    }

    try {
      await sendInvitationEmail({
        email,
        fullName,
        password,
        role,
      });
      inviteEmailSent = true;
    } catch (inviteError) {
      inviteEmailError =
        inviteError instanceof Error ? inviteError.message : "No se pudo enviar el correo de invitación.";
    }

    return jsonResponse({
      user: {
        id: authUserId,
        email,
        full_name: fullName,
        role,
        is_active: true,
      },
      created: !existingUser,
      reactivated,
      inviteEmailSent,
      inviteEmailError,
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      401
    );
  }
});
