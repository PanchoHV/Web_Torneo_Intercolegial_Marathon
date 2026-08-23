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

/** Atributos obligatorios para cualquier enlace saliente. */
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
