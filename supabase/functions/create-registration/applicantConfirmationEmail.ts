const mailingAssetsBaseUrl =
  "https://cdn.jsdelivr.net/gh/PanchoHV/Web_Torneo_Intercolegial_Marathon@5e77cd2/public/images/mailing";
const logoUrl = `${mailingAssetsBaseUrl}/logo.png`;
const whatsappIconUrl = `${mailingAssetsBaseUrl}/whatsapp.png`;
const facebookIconUrl = `${mailingAssetsBaseUrl}/facebook.png`;
const instagramIconUrl = `${mailingAssetsBaseUrl}/instagram.png`;
const tiktokIconUrl = `${mailingAssetsBaseUrl}/tiktok.png`;
const facebookUrl = "https://www.facebook.com/p/Copa-Nacional-Intercolegial-Marathon-61575560775997/";
const instagramUrl = "https://www.instagram.com/copamarathonec/";
const tiktokUrl = "https://www.tiktok.com/@copamarathonec";
const flickrUrl = "https://www.flickr.com/photos/203541641@N03/albums/";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatRegistrationDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("es-EC", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Guayaquil",
    })
      .format(new Date(dateString))
      .replace(",", " ·");
  } catch {
    return dateString;
  }
}

function buildWhatsAppLink(phone: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(
    "Hola, deseo realizar una consulta sobre la inscripción de mi institución al Torneo Nacional Intercolegial."
  )}`;
}

function buildDetailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0; border-bottom:1px solid #e4edf8;">
        <div style="font-size:12px; line-height:16px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#6b7c95;">${escapeHtml(label)}</div>
        <div style="padding-top:4px; font-size:16px; line-height:23px; font-weight:700; color:#073b8c; word-break:break-word;">${value}</div>
      </td>
    </tr>
  `;
}

function buildCategoryBadges(categories: string[]) {
  if (categories.length === 0) {
    return `
      <tr>
        <td style="padding:0 6px 8px 0;">
          <span style="display:inline-block; border-radius:999px; background:#eef4fb; color:#5d6f86; font-size:13px; line-height:17px; font-weight:800; padding:8px 12px;">
            No especificadas
          </span>
        </td>
      </tr>
    `;
  }

  return categories
    .map(
      (category) => `
        <tr>
          <td style="padding:0 6px 8px 0;">
            <span style="display:inline-block; border-radius:999px; background:#eaf2ff; border:1px solid #c9dcf8; color:#073b8c; font-size:13px; line-height:17px; font-weight:900; padding:8px 12px;">
              ${escapeHtml(category)}
            </span>
          </td>
        </tr>
      `
    )
    .join("");
}

export function buildApplicantConfirmationEmail(params: {
  schoolName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  applicantRole: string;
  tournamentCategories?: string[];
  createdAt?: string;
  registrationCode?: string;
  whatsappNumber: string;
}) {
  const schoolName = escapeHtml(params.schoolName);
  const contactName = escapeHtml(params.contactName);
  const contactEmail = escapeHtml(params.contactEmail);
  const contactPhone = escapeHtml(params.contactPhone);
  const applicantRole = escapeHtml(params.applicantRole);
  const tournamentCategories = Array.isArray(params.tournamentCategories)
    ? params.tournamentCategories.filter(Boolean)
    : [];
  const createdAt = escapeHtml(formatRegistrationDate(params.createdAt));
  const registrationCode = escapeHtml(params.registrationCode || "TM-2026-00001");
  const whatsappNumber = escapeHtml(params.whatsappNumber);
  const whatsappUrl = escapeHtml(buildWhatsAppLink(params.whatsappNumber));

  const subject =
    "Confirmación de recepción de inscripción | Torneo Nacional Intercolegial";

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${subject}</title>
    <style>
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      table { border-collapse: collapse !important; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
      @media screen and (max-width: 680px) {
        .container { width: 100% !important; max-width: 100% !important; }
        .outer-pad { padding: 12px !important; }
        .section-pad { padding: 22px 18px !important; }
        .hero-title { font-size: 28px !important; line-height: 32px !important; }
        .hero-copy { font-size: 15px !important; line-height: 22px !important; }
        .two-col, .two-col td { display: block !important; width: 100% !important; }
        .mobile-gap { padding-top: 14px !important; }
        .button-link { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
        .social-footer-table { margin: 0 auto !important; }
        .social-footer-label { display: block !important; padding: 0 0 10px 0 !important; text-align: center !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#eef3f8; font-family:Arial, Helvetica, sans-serif; color:#18243d;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      Hemos recibido correctamente la inscripción de ${schoolName}. Categorías registradas: ${
        tournamentCategories.length > 0
          ? escapeHtml(tournamentCategories.join(", "))
          : "No especificadas"
      }.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eef3f8;">
      <tr>
        <td align="center" class="outer-pad" style="padding:28px 14px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" class="container" style="width:640px; max-width:640px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 18px 48px rgba(6,42,79,0.12);">
            <tr>
              <td style="background:#ffffff; border-bottom:5px solid #ed1c24; padding:22px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle" style="width:84px;">
                      <img src="${logoUrl}" alt="Copa Nacional Intercolegial" width="72" style="display:block; width:72px; max-width:72px; height:auto;" />
                    </td>
                    <td valign="middle">
                      <div style="font-size:12px; line-height:16px; font-weight:900; letter-spacing:1.4px; color:#073b8c; text-transform:uppercase;">
                        Torneo Nacional
                      </div>
                      <div style="font-size:22px; line-height:26px; font-weight:900; color:#ed1c24; text-transform:uppercase;">
                        Intercolegial
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="section-pad" style="background:#062a4f; padding:36px 34px;">
                <div style="display:inline-block; border-radius:999px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.22); color:#ffffff; font-size:12px; line-height:16px; font-weight:900; letter-spacing:1px; text-transform:uppercase; padding:8px 12px;">
                  Inscripción recibida
                </div>
                <h1 class="hero-title" style="margin:18px 0 0 0; color:#ffffff; font-size:36px; line-height:40px; font-weight:900; text-transform:uppercase;">
                  Hemos recibido su registro
                </h1>
                <p class="hero-copy" style="margin:16px 0 0 0; color:#d9e8fb; font-size:17px; line-height:26px; font-weight:700;">
                  Gracias por registrar a su institución en el Torneo Nacional Intercolegial. Su solicitud ingresó al proceso de validación y nuestro equipo se pondrá en contacto para continuar.
                </p>
              </td>
            </tr>

            <tr>
              <td class="section-pad" style="padding:30px 34px 8px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7fbff; border:1px solid #d6e4f5; border-radius:14px;">
                  <tr>
                    <td style="padding:22px 22px 18px 22px;">
                      <div style="font-size:13px; line-height:17px; font-weight:900; letter-spacing:1px; color:#ed1c24; text-transform:uppercase;">
                        Categorías seleccionadas
                      </div>
                      <div style="padding-top:12px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          ${buildCategoryBadges(tournamentCategories)}
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="section-pad" style="padding:18px 34px 8px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="two-col">
                  <tr>
                    <td valign="top" style="width:50%; padding-right:10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border:1px solid #dfe9f5; border-radius:14px;">
                        <tr>
                          <td style="padding:20px;">
                            <div style="font-size:18px; line-height:23px; color:#073b8c; font-weight:900; text-transform:uppercase;">
                              Resumen
                            </div>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:10px;">
                              ${buildDetailRow("Institución", schoolName)}
                              ${buildDetailRow("Responsable", contactName)}
                              ${buildDetailRow("Cargo", applicantRole)}
                              ${buildDetailRow("Correo", contactEmail)}
                              ${buildDetailRow("Teléfono", contactPhone)}
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" class="mobile-gap" style="width:50%; padding-left:10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border:1px solid #dfe9f5; border-radius:14px;">
                        <tr>
                          <td style="padding:20px;">
                            <div style="font-size:18px; line-height:23px; color:#073b8c; font-weight:900; text-transform:uppercase;">
                              Próximos pasos
                            </div>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:14px;">
                              <tr>
                                <td valign="top" style="width:34px; padding-bottom:16px;">
                                  <div style="width:26px; height:26px; line-height:26px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:13px; font-weight:900;">1</div>
                                </td>
                                <td style="padding-bottom:16px; color:#34425a; font-size:15px; line-height:22px;">
                                  Revisaremos los datos enviados y las categorías solicitadas.
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="width:34px; padding-bottom:16px;">
                                  <div style="width:26px; height:26px; line-height:26px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:13px; font-weight:900;">2</div>
                                </td>
                                <td style="padding-bottom:16px; color:#34425a; font-size:15px; line-height:22px;">
                                  Validaremos la información institucional y disponibilidad por categoría.
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="width:34px;">
                                  <div style="width:26px; height:26px; line-height:26px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:13px; font-weight:900;">3</div>
                                </td>
                                <td style="color:#34425a; font-size:15px; line-height:22px;">
                                  Un ejecutivo se comunicará para continuar con el proceso.
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

            <tr>
              <td class="section-pad" style="padding:18px 34px 8px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eaf2ff; border:1px solid #c8dbf5; border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <div style="font-size:12px; line-height:16px; font-weight:900; letter-spacing:1px; color:#6b7c95; text-transform:uppercase;">
                        Código de inscripción
                      </div>
                      <div style="padding-top:8px; font-size:20px; line-height:26px; color:#073b8c; font-weight:900; word-break:break-word;">
                        ${registrationCode}
                      </div>
                      <div style="padding-top:8px; font-size:14px; line-height:21px; color:#53657b;">
                        Fecha de recepción: ${createdAt}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="section-pad" style="padding:18px 34px 34px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7fbff; border:1px solid #d6e4f5; border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td valign="top" style="width:54px;">
                            <img src="${whatsappIconUrl}" alt="" width="42" style="display:block; width:42px; height:auto;" />
                          </td>
                          <td valign="top">
                            <div style="font-size:17px; line-height:22px; color:#073b8c; font-weight:900;">
                              ¿Necesita actualizar información?
                            </div>
                            <div style="padding-top:6px; font-size:15px; line-height:22px; color:#34425a;">
                              Escríbanos al WhatsApp oficial ${whatsappNumber} si algún dato requiere corrección.
                            </div>
                            <div style="padding-top:14px;">
                              <a href="${whatsappUrl}" target="_blank" class="button-link" style="display:inline-block; background:#12b84f; color:#ffffff; text-decoration:none; font-size:15px; line-height:18px; font-weight:900; border-radius:999px; padding:13px 20px;">
                                Escribir por WhatsApp
                              </a>
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
              <td style="background:#004195; padding:22px 24px; text-align:center;">
                <div style="font-size:14px; line-height:20px; color:#ffffff; font-weight:800;">
                  Torneo Nacional Intercolegial 2026
                </div>
                <div style="padding-top:6px; font-size:13px; line-height:20px; color:#bfd6f6;">
                  La recepción de esta inscripción inicia el proceso de evaluación institucional y no representa aún la aceptación definitiva al torneo.
                </div>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="social-footer-table" style="margin:18px auto 0 auto;">
                  <tr>
                    <td class="social-footer-label" style="font-size:12px; line-height:16px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:1.2px; padding-right:14px;">
                      Síguenos
                    </td>
                    <td style="padding-left:8px;">
                      <a href="${facebookUrl}" target="_blank">
                        <img src="${facebookIconUrl}" alt="Facebook" width="34" style="display:block; width:34px; max-width:34px; height:auto; border:0;" />
                      </a>
                    </td>
                    <td style="padding-left:10px;">
                      <a href="${instagramUrl}" target="_blank">
                        <img src="${instagramIconUrl}" alt="Instagram" width="34" style="display:block; width:34px; max-width:34px; height:auto; border:0;" />
                      </a>
                    </td>
                    <td style="padding-left:10px;">
                      <a href="${tiktokUrl}" target="_blank">
                        <img src="${tiktokIconUrl}" alt="TikTok" width="34" style="display:block; width:34px; max-width:34px; height:auto; border:0;" />
                      </a>
                    </td>
                    <td style="padding-left:12px;">
                      <a href="${flickrUrl}" target="_blank" style="display:inline-block; color:#ffffff; font-size:12px; line-height:16px; font-weight:900; text-decoration:none; text-transform:uppercase; letter-spacing:0.8px;">
                        Flickr
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 24px 22px 24px; background:#f3f6fb; color:#8b94a8; font-size:13px; line-height:20px; text-align:center;">
                Torneo Nacional Intercolegial es una iniciativa de <strong>Fundación Marathon.</strong><br />
                © 2026 Todos los derechos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}
