/**
 * Capa de CONTENIDO de la página /sedes.
 *
 * Frontera CMS: los componentes de `src/sections/sedes/` no hardcodean copy
 * ni cifras. Todo lo editorial vive aquí y en `@/lib/constants/venues`.
 * Cuando exista el mini CMS, este archivo se reemplaza por un loader con la
 * misma forma — el layout no debe cambiar.
 *
 * Fuente de sedes/fechas/categorías: VENUES (dato operativo real).
 * Este archivo solo añade lo editorial que todavía NO está verificado.
 */

import { textures } from '@/lib/assets/textures';
import { FAN_APP_URL } from '@/lib/constants/links';
import type { Venue } from '@/lib/constants/venues';

/** Extensión editorial de una sede. Ninguna de estas claves existe aún en VENUES. */
export type FeaturedVenueContent = {
  eyebrow: string;
  description: string;
  /** Placeholder hasta que exista el arte definitivo de la sede. */
  venueImage?: string;
  isMainVenue?: boolean;
  /** Cifras del registro entregado por la organización. */
  stats: Array<{ label: string; value: string }>;
  /** PENDIENTE: escenarios sin confirmar por sede. */
  mainLocations: string[];
  /** PENDIENTE: dirección de la sede sin confirmar. */
  address?: string;
};

export type FeaturedVenue = Venue & FeaturedVenueContent;

/**
 * Assets oficiales del Hero de Sedes (R2).
 *
 * `background` es la composición completa del hero — papel a la izquierda,
 * rasgado irregular y escena volcán/estadio — pero SIN acentos gráficos:
 * el brochazo rojo y el gesto táctico se montan como capas propias para
 * poder darles profundidad independiente.
 *
 * `tactical` y `redBrush` son PNG/WebP con alpha: son la única fuente de
 * esos dos gestos, no se reconstruyen en CSS.
 */
const R2_BASE = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/';

export const SEDES_HERO_ASSETS = {
  background: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Fondo sedes 2.webp'
  ),
  tactical: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-elemento táctico.webp'
  ),
  redBrush: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-linea roja.webp'
  ),
} as const;

/**
 * Overlays de marca de las franjas Navy (/sedes).
 *
 * Son marcas de agua editoriales: van SIEMPRE por debajo del contenido, con
 * `pointer-events: none`, y su opacidad se mantiene baja para no competir con
 * títulos, métricas ni controles. Los assets salen del registro compartido
 * `textures`; el táctico principal es el mismo del Hero.
 */
export const SEDES_BRAND_OVERLAYS = {
  tacticalMain: SEDES_HERO_ASSETS.tactical,
  tacticalXox: textures.tacticalXox,
  arrowDashed: textures.arrowDashed,
  chevronsRed: textures.chevronsRed,
} as const;

/** Sede que se muestra destacada cuando el usuario todavía no elige ninguna. */
export const DEFAULT_FEATURED_VENUE_ID = 'pichincha-quito';

/**
 * Contenido editorial por sede, indexado por `Venue['id']`. Solo Quito tiene
 * ficha redactada; el resto cae al fallback para no inventar información.
 */
export const FEATURED_VENUE_CONTENT: Record<string, FeaturedVenueContent> = {
  'guayas-guayaquil': {
    eyebrow: 'Sede principal',
    description:
      'Guayaquil es la sede de mayor volumen de la Región Costa y abre el calendario nacional de la Copa.',
    isMainVenue: true,
    venueImage: `${R2_BASE}optimized-Guayas.webp`,
    stats: [
      { label: 'Escenarios', value: '2' },
      { label: 'Colegios', value: '150' },
      { label: 'Atletas', value: '3.300' },
      { label: 'Partidos', value: '350' },
    ],
    mainLocations: ['Samanes'],
    address: 'Av. Francisco de Orellana y la Av. Paseo del Parque',
  },

  'eloro-machala': {
    eyebrow: 'Sede principal',
    description:
      'Machala concentra la actividad de El Oro dentro del primer bloque competitivo de la Costa.',
    isMainVenue: true,
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '35' },
      { label: 'Atletas', value: '750' },
      { label: 'Partidos', value: '150' },
    ],
    mainLocations: ['Adeproro'],
    address: 'Kilómetro 15 de la vía a Balosa, en la ciudad de Machala',
  },

  esmeraldas: {
    eyebrow: 'Sede principal',
    description:
      'Esmeraldas suma uno de los bloques más amplios de colegios de la Región Costa.',
    isMainVenue: true,
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '65' },
      { label: 'Atletas', value: '1.400' },
      { label: 'Partidos', value: '250' },
    ],
    mainLocations: ['Parque La Forestal'],
    address:
      'Sector de La Propicia 1, cerca del río Teaone y de la zona sur de la ciudad de Esmeraldas',
  },

  'manabi-manta': {
    eyebrow: 'Sede principal',
    description:
      'Manta abre el segundo bloque de la Costa junto a Portoviejo dentro del calendario de Manabí.',
    isMainVenue: true,
    venueImage: `${R2_BASE}optimized-Manta.webp`,
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '35' },
      { label: 'Atletas', value: '750' },
      { label: 'Partidos', value: '150' },
    ],
    mainLocations: ['Construcsport'],
    address:
      'Av. María Auxiliadora (frente a Tramaco y diagonal a la Clínica San Gregorio), en la ciudad de Manta',
  },

  'manabi-portoviejo': {
    eyebrow: 'Sede principal',
    description:
      'Portoviejo completa el bloque de Manabí con el mayor número de colegios de la provincia.',
    isMainVenue: true,
    venueImage: `${R2_BASE}optimized-Portoviejo.webp`,
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '45' },
      { label: 'Atletas', value: '950' },
      { label: 'Partidos', value: '180' },
    ],
    mainLocations: ['Skatepark «La Rotonda»'],
    address: 'Parque la Rotonda, Portoviejo',
  },

  'pichincha-quito': {
    eyebrow: 'Sede regional',
    description:
      'Quito articula el bloque de la Sierra. La ficha operativa de la sede sigue en actualización.',
    venueImage: `${R2_BASE}optimized-La%20floresta.webp`,
    stats: [
      { label: 'Escenarios', value: '3' },
      { label: 'Colegios', value: '—' },
      { label: 'Atletas', value: '—' },
      { label: 'Partidos', value: '—' },
    ],
    // El registro informa 3 escenarios pero solo entrega 2 nombres.
    mainLocations: ['La Vicentina', 'La Floresta'],
  },

  'azuay-cuenca': {
    eyebrow: 'Sede regional',
    description:
      'Cuenca forma parte del bloque de la Sierra. La ficha operativa de la sede sigue en actualización.',
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '—' },
      { label: 'Atletas', value: '—' },
      { label: 'Partidos', value: '—' },
    ],
    mainLocations: [],
  },

  'tungurahua-ambato': {
    eyebrow: 'Sede regional',
    description:
      'Ambato forma parte del bloque de la Sierra. La ficha operativa de la sede sigue en actualización.',
    venueImage: `${R2_BASE}optimized-Tungurahua.webp`,
    // El registro informa 1 escenario pero entrega 2 nombres.
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '—' },
      { label: 'Atletas', value: '—' },
      { label: 'Partidos', value: '—' },
    ],
    mainLocations: ['Estadio de Césped Sintético MAO', 'Federación Deportiva de Tungurahua'],
  },

  'imbabura-ibarra': {
    eyebrow: 'Sede regional',
    description:
      'Ibarra forma parte del bloque de la Sierra. La ficha operativa de la sede sigue en actualización.',
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '—' },
      { label: 'Atletas', value: '—' },
      { label: 'Partidos', value: '—' },
    ],
    mainLocations: [],
  },

  'napo-tena': {
    eyebrow: 'Sede regional',
    description:
      'Tena representa a la Amazonía en la Copa. La ficha operativa de la sede sigue en actualización.',
    stats: [
      { label: 'Escenarios', value: '1' },
      { label: 'Colegios', value: '—' },
      { label: 'Atletas', value: '—' },
      { label: 'Partidos', value: '—' },
    ],
    mainLocations: [],
  },
};

/** Ficha genérica para sedes sin contenido editorial propio todavía. */
export const FALLBACK_FEATURED_CONTENT: FeaturedVenueContent = {
  eyebrow: 'Sede regional',
  description: '',
  stats: [
    { label: 'Escenarios', value: '—' },
    { label: 'Colegios', value: '—' },
    { label: 'Atletas', value: '—' },
    { label: 'Partidos', value: '—' },
  ],
  mainLocations: [],
};

/** Accesos rápidos al final de la página. */
export const VENUE_QUICK_ACCESS = [
  {
    id: 'calendario',
    title: 'Ver calendario de la Copa',
    description:
      'Consulta fechas de inscripción, documentación e inicio de partidos por sede y región.',
    ctaLabel: 'Ir al calendario',
    // El bloque de calendario todavía no tiene ancla propia publicada;
    // apunta a /la-copa hasta que exista la sección montada.
    to: '/la-copa',
  },
  {
    id: 'fan-app',
    title: 'Abrir Fan App',
    description:
      'Sigue resultados, tabla de posiciones y novedades de tu sede desde la Fan App oficial.',
    // La Fan App es PWA/Web App: no se enlazan tiendas de aplicaciones.
    ctaLabel: 'Abrir Fan App',
    to: FAN_APP_URL,
  },
] as const;

/**
 * FAQ específica de Sedes. Alimenta el sistema de FAQ del Home (misma
 * presentación, contenido propio de esta página).
 *
 * IMPORTANTE — política oficial pendiente:
 * las reglas de asignación, sede principal, transporte y cambio de sede NO
 * están confirmadas por la organización. Las respuestas marcadas abajo son
 * copy editorial seguro: informan que el detalle se publicará, sin afirmar
 * ninguna regla. NO reemplazarlas por criterios inventados.
 */
export const VENUE_FAQ_ITEMS = [
  {
    // PENDIENTE de política oficial.
    question: '¿Puedo competir en más de una sede?',
    answer:
      'La organización publicará el detalle oficial de participación por sede antes del cierre de inscripciones. Cualquier caso particular debe consultarse directamente con el equipo de la Copa.',
  },
  {
    // PENDIENTE de política oficial.
    question: '¿Cómo se asignan las sedes a los colegios?',
    answer:
      'El criterio oficial de asignación será comunicado por la organización. Mientras tanto, en el mapa de esta página puedes ver todas las ciudades anfitrionas confirmadas y sus fechas.',
  },
  {
    // PENDIENTE de política oficial.
    question: '¿Cómo se define la sede principal?',
    answer:
      'La designación de sede principal corresponde a la organización de la Copa y se anunciará junto con la información oficial de cada ciudad.',
  },
  {
    // PENDIENTE de política oficial.
    question: '¿Habrá transporte entre sedes?',
    answer:
      'Los servicios logísticos de cada sede todavía no están confirmados. Cuando se definan, se publicarán en esta página y en la Fan App oficial.',
  },
  {
    // PENDIENTE de política oficial.
    question: '¿Puedo solicitar un cambio de sede?',
    answer:
      'El procedimiento para solicitudes de este tipo será informado por la organización. Cualquier gestión debe canalizarse por los canales oficiales de la Copa.',
  },
  {
    // Respuesta factual: describe lo que esta misma página ya hace.
    question: '¿Dónde consulto las fechas y escenarios de mi sede?',
    answer:
      'Selecciona tu sede en el mapa o en el listado de esta página: el bloque de información útil muestra la ciudad, las fechas de inscripción, el inicio de partidos y las categorías de esa sede.',
  },
] as const;

/** Texto introductorio del FAQ en /sedes. */
export const VENUE_FAQ_DESCRIPTION =
  'Encuentra respuestas sobre sedes, asignación, fechas y participación en cada ciudad de la Copa.';
