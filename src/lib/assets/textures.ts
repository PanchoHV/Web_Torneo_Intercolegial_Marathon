/**
 * Texturas y grafismos decorativos de la Copa (R2).
 *
 * Fuente única de verdad: no hardcodear estas URLs en las secciones.
 * Todos son elementos de ambientación — se usan como fondo o adorno y
 * siempre van con `aria-hidden`, nunca como contenido informativo.
 */

const R2 = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev';

/** El nombre del archivo original contiene espacios; hay que codificarlos. */
const file = (name: string) => `${R2}/${encodeURIComponent(name)}`;

export const textures = {
  /** Papel base para superficies PAPER. */
  paperBackground: file('optimized-paper-background.webp'),
  /** Borde de papel rasgado, para transiciones entre materiales. */
  paperEdge: file('optimized-paper-edge.webp'),

  /** Pizarra táctica: recorrido completo de X y O. */
  tacticalRoute: file('optimized-tactical-xo-route.webp'),
  /** Pizarra táctica: agrupación X-O-X. */
  tacticalXox: file('optimized-tactical-xox.webp'),
  /** Marca táctica individual. */
  tacticalX: file('optimized-tactical-x.webp'),
  tacticalO: file('optimized-tactical-o.webp'),

  /** Flecha semicircular (trazo rojo). */
  arrowCurve: file('optimized-arrow-curve-blue.webp'),
  /** Flecha semicircular azul. */
  arrowCurveBlue: file('optimized-flecha.webp'),
  /** Flecha de guía entrecortada, para conectar pasos de un flujo. */
  arrowDashed: file('optimized-flecha entre cortada.webp'),
  /** Chevrons rojos de avance. */
  chevronsRed: file('optimized-chevrons-red.webp'),

  /** Brochazo rojo doble. */
  brushRed: file('optimized-brush-red-double.webp'),
  /** Signo de más pintado a brocha. */
  brushPlus: file('optimized-brush-plus.webp'),

  /** Sello circular oficial de la Copa. */
  copaStamp: file('optimized-copa-stamp.webp'),
} as const;

export type TextureName = keyof typeof textures;
