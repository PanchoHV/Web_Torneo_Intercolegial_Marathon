/**
 * Destinos externos oficiales del sitio.
 *
 * Fuente única de verdad: no hardcodear estas URLs en las secciones.
 */

/**
 * Fan App oficial de la Copa. Es un producto externo (PWA en pelotea.com),
 * así que se enlaza siempre con <a> + target/rel, nunca con el router.
 */
export const FAN_APP_URL =
  'https://copa-nacional-intercolegial-marathon-2026.pelotea.com/';

/**
 * Reglamento General de Competencias 2026 (PDF, 17 páginas).
 *
 * Se sirve desde `public/`, así que es mismo origen y el atributo `download`
 * guarda el archivo en vez de abrir el visor. Si el documento se actualiza,
 * basta con reemplazar el archivo: la ruta no cambia.
 */
export const REGLAMENTO_PDF = {
  href: '/documentos/reglamento-copa-marathon-2026.pdf',
  filename: 'Reglamento-Copa-Marathon-2026.pdf',
} as const;

/** Atributos para descargar el reglamento desde cualquier CTA. */
export const REGLAMENTO_LINK_PROPS = {
  href: REGLAMENTO_PDF.href,
  download: REGLAMENTO_PDF.filename,
  target: '_blank',
  rel: 'noopener',
} as const;

/** Atributos obligatorios para cualquier enlace saliente. */
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
