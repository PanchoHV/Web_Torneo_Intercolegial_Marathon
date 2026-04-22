const logoUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Logos%20%282%29.webp";
const tiktokIconUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-3.webp";
const instagramIconUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-2.webp";
const facebookIconUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-1.webp";
const heroMailingUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Hero%20Mailing.webp";
const summaryIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Resúmen de Inscripción.webp"
);
const nextStepsIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Proximos Pasos.webp"
);
const institutionIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Institución.webp"
);
const responsibleIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Responsable.webp"
);
const emailIconUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Mail.webp";
const phoneIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Teléfono.webp"
);
const dateIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Fecha de Registro.webp"
);
const codeIconUrl = encodeURI(
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Código de Inscripción.webp"
);
const whatsappIconUrl =
  "https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-WP_ICon.webp";

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

export function buildApplicantConfirmationEmail(params: {
  schoolName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  applicantRole: string;
  createdAt?: string;
  registrationCode?: string;
  whatsappNumber: string;
}) {
  const schoolName = escapeHtml(params.schoolName);
  const contactName = escapeHtml(params.contactName);
  const contactEmail = escapeHtml(params.contactEmail);
  const contactPhone = escapeHtml(params.contactPhone);
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
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style>
      @media only screen and (max-width: 720px) {
        .container {
          width: 100% !important;
        }
        .mobile-padding {
          padding-left: 22px !important;
          padding-right: 22px !important;
        }
        .mobile-stack,
        .mobile-stack td {
          display: block !important;
          width: 100% !important;
        }
        .mobile-center {
          text-align: center !important;
        }
        .mobile-hide {
          display: none !important;
        }
        .hero-copy {
          padding: 38px 28px 120px 28px !important;
        }
        .hero-title {
          font-size: 38px !important;
          line-height: 42px !important;
        }
        .summary-card {
          margin-top: -92px !important;
        }
        .summary-column {
          border-right: 0 !important;
          border-bottom: 1px solid #dbe5f1 !important;
        }
        .social-cell {
          padding-top: 24px !important;
          text-align: left !important;
        }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f3f6fb; font-family:Arial, Helvetica, sans-serif; color:#18243d;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      Hemos recibido correctamente la inscripción de su institución.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6fb;">
      <tr>
        <td align="center">
          <table role="presentation" width="1180" cellspacing="0" cellpadding="0" border="0" class="container" style="width:1180px; max-width:1180px; background:#ffffff;">
            <tr>
              <td style="background:#f7f8fb; padding:18px 54px; font-size:14px; line-height:18px; color:#1d2740;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left">Hemos recibido correctamente la inscripción de su institución.</td>
                    <td align="right" class="mobile-hide">
                      <a href="https://torneo.fundacionmarathon.org.ec/" target="_blank" style="color:#1d2740; text-decoration:underline;">Ver en el navegador</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 54px 28px 54px; background:#ffffff; border-bottom:5px solid #ed1c24;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr class="mobile-stack">
                    <td valign="middle" style="width:58%;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td valign="middle" style="padding-right:24px;">
                            <img
                              src="${logoUrl}"
                              alt="Copa Nacional Intercolegial"
                              width="132"
                              style="display:block; width:132px; max-width:132px; height:auto; border:0;"
                            />
                          </td>
                          <td valign="middle">
                            <div style="font-size:26px; line-height:30px; font-weight:900; color:#082b75; text-transform:uppercase; letter-spacing:2px; text-align:center;">
                              Torneo Nacional
                            </div>
                            <div style="font-size:30px; line-height:34px; font-weight:900; color:#ed1c24; text-transform:uppercase; letter-spacing:1px; text-align:center;">
                              Intercolegial
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="middle" align="right" class="social-cell" style="width:42%;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="right">
                        <tr>
                          <td style="font-size:15px; line-height:22px; color:#111b3a; font-weight:700; text-transform:uppercase; letter-spacing:2px; padding-right:22px;">
                            Síguenos
                          </td>
                          <td style="padding-left:10px;">
                            <a href="https://www.facebook.com/profile.php?id=61575560775997" target="_blank">
                              <img src="${facebookIconUrl}" alt="Facebook" width="48" style="display:block; width:48px; height:auto; border:0;" />
                            </a>
                          </td>
                          <td style="padding-left:14px;">
                            <a href="https://www.instagram.com/copamarathonec" target="_blank">
                              <img src="${instagramIconUrl}" alt="Instagram" width="48" style="display:block; width:48px; height:auto; border:0;" />
                            </a>
                          </td>
                          <td style="padding-left:14px;">
                            <a href="https://www.tiktok.com/@copamarathonec" target="_blank">
                              <img src="${tiktokIconUrl}" alt="TikTok" width="48" style="display:block; width:48px; height:auto; border:0;" />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                background="${heroMailingUrl}"
                style="background-color:#061f4e; background-image:url('${heroMailingUrl}'); background-position:center top; background-repeat:no-repeat; background-size:100% auto;"
              >
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="hero-copy" style="padding:48px 74px 170px 74px;">
                      <table role="presentation" width="448" cellspacing="0" cellpadding="0" border="0" style="width:448px; max-width:100%;">
                        <tr>
                          <td style="padding-bottom:24px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td align="center" style="width:70px; height:70px; border:4px solid #079cff; border-radius:50%; color:#ffffff; font-size:38px; line-height:70px; font-weight:800;">
                                  ✓
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td class="hero-title" style="font-size:44px; line-height:48px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:0; padding-bottom:22px;">
                            ¡Inscripción<br />
                            <span style="color:#1098ff;">recibida!</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="width:110px; height:6px; line-height:6px; background:#f2272d; border-radius:12px; font-size:0;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="padding-top:24px; font-size:18px; line-height:27px; color:#ffffff; font-weight:700;">
                            Confirmamos la correcta recepción de la inscripción de su institución en el Torneo Nacional Intercolegial.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top:18px; font-size:18px; line-height:27px; color:#ffffff; font-weight:700;">
                            Su registro ha ingresado al proceso de validación institucional y en los próximos días un ejecutivo se pondrá en contacto con ustedes.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:#ffffff; padding:0 54px 0 54px;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="summary-card" style="margin-top:-132px; position:relative;">
                  <tr>
                    <td style="background:#ffffff; border-radius:10px; box-shadow:0 10px 24px rgba(9,37,80,0.14);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr class="mobile-stack">
                          <td valign="top" class="summary-column" style="width:57%; padding:36px 34px; border-right:1px solid #dbe5f1;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td valign="top" style="width:72px;">
                                  <img src="${summaryIconUrl}" alt="" width="56" style="display:block; width:56px; height:auto; border:0;" />
                                </td>
                                <td valign="top">
                                  <div style="font-size:21px; line-height:25px; color:#0b3f91; font-weight:900; text-transform:uppercase; letter-spacing:0.8px;">Resumen de su inscripción</div>
                                  <div style="font-size:16px; line-height:24px; color:#0d3476; padding-top:4px;">Por favor verifique que los datos sean correctos</div>
                                </td>
                              </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px; font-size:16px; line-height:22px;">
                              <tr>
                                <td style="width:34px; padding:8px 0;"><img src="${institutionIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="width:178px; padding:8px 0; color:#18243d; font-weight:800;">Institución:</td>
                                <td style="padding:8px 0; color:#073b8c;">${schoolName}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;"><img src="${responsibleIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="padding:8px 0; color:#18243d; font-weight:800;">Responsable:</td>
                                <td style="padding:8px 0; color:#073b8c;">${contactName}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;"><img src="${emailIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="padding:8px 0; color:#18243d; font-weight:800;">Correo registrado:</td>
                                <td style="padding:8px 0; color:#073b8c;">${contactEmail}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;"><img src="${phoneIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="padding:8px 0; color:#18243d; font-weight:800;">Teléfono registrado:</td>
                                <td style="padding:8px 0; color:#073b8c;">${contactPhone}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;"><img src="${dateIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="padding:8px 0; color:#18243d; font-weight:800;">Fecha de registro:</td>
                                <td style="padding:8px 0; color:#073b8c;">${createdAt}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;"><img src="${codeIconUrl}" alt="" width="18" style="display:block; width:18px; height:auto; border:0;" /></td>
                                <td style="padding:8px 0; color:#18243d; font-weight:800;">Código de inscripción:</td>
                                <td style="padding:8px 0;">
                                  <span style="display:inline-block; background:#dbe9ff; border-radius:4px; color:#073b8c; font-size:18px; line-height:22px; font-weight:900; padding:8px 12px;">${registrationCode}</span>
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td valign="top" style="width:43%; padding:36px 34px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td valign="top" style="width:72px;">
                                  <img src="${nextStepsIconUrl}" alt="" width="56" style="display:block; width:56px; height:auto; border:0;" />
                                </td>
                                <td valign="middle">
                                  <div style="font-size:21px; line-height:25px; color:#0b3f91; font-weight:900; text-transform:uppercase; letter-spacing:0.8px;">Próximos pasos</div>
                                </td>
                              </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                              <tr>
                                <td valign="top" style="width:42px; padding-bottom:20px;">
                                  <div style="width:28px; height:28px; line-height:28px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:14px; font-weight:900;">1</div>
                                </td>
                                <td valign="top" style="padding-bottom:20px;">
                                  <div style="font-size:17px; line-height:22px; color:#18243d; font-weight:900;">Verificación de la información</div>
                                  <div style="font-size:15px; line-height:22px; color:#3c4962;">Nuestro equipo revisará los datos enviados.</div>
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="width:42px; padding-bottom:20px;">
                                  <div style="width:28px; height:28px; line-height:28px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:14px; font-weight:900;">2</div>
                                </td>
                                <td valign="top" style="padding-bottom:20px;">
                                  <div style="font-size:17px; line-height:22px; color:#18243d; font-weight:900;">Validación institucional</div>
                                  <div style="font-size:15px; line-height:22px; color:#3c4962;">Evaluaremos los criterios de participación.</div>
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="width:42px;">
                                  <div style="width:28px; height:28px; line-height:28px; border-radius:50%; background:#004899; color:#ffffff; text-align:center; font-size:14px; font-weight:900;">3</div>
                                </td>
                                <td valign="top">
                                  <div style="font-size:17px; line-height:22px; color:#18243d; font-weight:900;">Comunicación de siguientes etapas</div>
                                  <div style="font-size:15px; line-height:22px; color:#3c4962;">Un ejecutivo se contactará para continuar el proceso.</div>
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
              <td style="padding:24px 54px 0 54px; background:#ffffff;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7fbff; border:1px solid #8bbaf1; border-radius:10px;">
                  <tr class="mobile-stack">
                    <td valign="middle" style="width:15%; padding:28px 0 28px 28px;" class="mobile-center">
                      <img src="${whatsappIconUrl}" alt="" width="78" style="display:block; width:78px; height:auto; border:0;" />
                    </td>
                    <td valign="middle" style="width:47%; padding:28px 24px 28px 0;">
                      <div style="font-size:17px; line-height:22px; color:#0b3f91; font-weight:900; text-transform:uppercase; letter-spacing:0.6px;">¿Necesita actualizar información?</div>
                      <div style="font-size:15px; line-height:22px; color:#34425a; padding-top:10px;">
                        Si alguno de los datos registrados no es correcto o requiere más información, por favor comuníquese con nuestro equipo a través de WhatsApp.
                      </div>
                    </td>
                    <td valign="middle" style="width:38%; padding:28px 30px; border-left:1px solid #dce6f3;">
                      <div style="font-size:14px; line-height:18px; color:#0b3f91; font-weight:900; text-transform:uppercase; letter-spacing:1px;">WhatsApp oficial</div>
                      <div style="font-size:27px; line-height:33px; color:#0c2a5b; font-weight:900; padding-top:4px;">${whatsappNumber}</div>
                      <div style="padding-top:14px;">
                        <a href="${whatsappUrl}" target="_blank" style="display:inline-block; background:#12b84f; color:#ffffff; text-decoration:none; font-size:15px; line-height:18px; font-weight:900; border-radius:999px; padding:12px 24px;">Escribir por WhatsApp</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 54px 0 54px; background:#ffffff;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb; border-radius:10px;">
                  <tr>
                    <td valign="middle" style="width:70px; padding:24px 0 24px 28px;">
                      <div style="width:42px; height:42px; line-height:42px; border-radius:50%; background:#39a3ff; color:#ffffff; text-align:center; font-size:23px; font-weight:900;">i</div>
                    </td>
                    <td style="padding:24px 28px 24px 0; font-size:16px; line-height:23px; color:#2d374d;">
                      <strong style="color:#102b5c;">Importante:</strong>
                      La recepción de esta inscripción constituye el inicio del proceso de evaluación institucional y no representa aún la aceptación definitiva al torneo.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 54px 28px 54px; background:#ffffff;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#004195; border-radius:10px;">
                  <tr class="mobile-stack">
                    <td valign="middle" style="width:100px; padding:24px 0 24px 28px;" class="mobile-center">
                      <div style="width:64px; height:64px; line-height:64px; border-radius:50%; border:2px solid #1d82df; color:#ffffff; text-align:center; font-size:35px;">♜</div>
                    </td>
                    <td valign="middle" style="width:58%; padding:24px 26px; font-size:20px; line-height:30px; color:#ffffff; font-weight:900;">
                      Agradecemos su interés en ser parte del<br class="mobile-hide" />
                      Torneo Nacional Intercolegial 2026.
                    </td>
                    <td valign="middle" align="center" style="width:32%; padding:24px 28px; border-left:1px solid rgba(255,255,255,0.2);">
                      <a href="https://torneo.fundacionmarathon.org.ec/" target="_blank" style="display:inline-block; background:#f52e30; color:#ffffff; text-decoration:none; font-size:16px; line-height:20px; font-weight:900; border-radius:4px; padding:17px 28px;">Conoce más del torneo&nbsp;›</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:#004195; padding:26px 54px;" class="mobile-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr class="mobile-stack">
                    <td valign="middle" style="width:52%; padding-right:38px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td valign="middle" style="padding-right:16px;">
                            <img
                              src="${logoUrl}"
                              alt="Copa Nacional Intercolegial"
                              width="96"
                              style="display:block; width:96px; max-width:96px; height:auto; border:0;"
                            />
                          </td>
                          <td valign="middle">
                            <div style="font-size:15px; line-height:19px; font-weight:900; color:#ffffff; text-transform:uppercase; letter-spacing:1px; text-align:center;">Torneo Nacional</div>
                            <div style="font-size:23px; line-height:27px; font-weight:900; color:#ff3d38; text-transform:uppercase; text-align:center;">Intercolegial</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" style="width:48%; padding-left:42px; border-left:1px solid rgba(255,255,255,0.22); color:#ffffff; font-size:15px; line-height:25px;">
                      <div style="font-size:17px; line-height:22px; color:#37a9ff; font-weight:900; padding-bottom:8px;">Enlaces rápidos</div>
                      <a href="https://torneo.fundacionmarathon.org.ec/" target="_blank" style="color:#ffffff; text-decoration:none;">Página oficial del torneo</a><br />
                      <a href="https://torneo.fundacionmarathon.org.ec/" target="_blank" style="color:#ffffff; text-decoration:none;">Bases y reglamento</a><br />
                      <a href="${whatsappUrl}" target="_blank" style="color:#ffffff; text-decoration:none;">Contacto</a><br />
                      <a href="https://torneo.fundacionmarathon.org.ec/" target="_blank" style="color:#ffffff; text-decoration:none;">Preguntas frecuentes</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 54px 24px 54px; background:#f3f6fb; color:#8b94a8; font-size:15px; line-height:23px; text-align:center;" class="mobile-padding">
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
