/**
 * Estado de inscripciones por región.
 *
 * Fuente única: la consumen el Home y /inscripciones. No duplicar este array
 * ni derivar estados en otro sitio — si mañana Sierra pasa a `open`, las dos
 * páginas cambian solas.
 *
 * Nomenclatura acordada: el id interno sigue a `venues.ts` (`amazonia`),
 * mientras que el label visible del sitio es `ORIENTE`.
 *
 * TODO(cms): reemplazar por la colección `registration_status` del mini CMS.
 */

export type RegistrationStatus = 'closed' | 'upcoming' | 'open';

export type RegionRegistration = {
  id: string;
  region: string;
  label: string;
  status: RegistrationStatus;
  headline: string;
  description: string;
  mapSrc: string;
  /** Fecha confirmada de apertura. Solo se renderiza si el CMS la entrega. */
  openingDate?: string;
  /** Fecha de cierre. Igual que la de apertura: si no existe, no se muestra. */
  closingDate?: string;
  /**
   * Instante real de cierre (ISO con offset). Es lo que decide el estado:
   * `closingDate` es solo la etiqueta visible. Si falta, la región no cierra sola.
   */
  closesAt?: string;
  /** Sobrescribe el texto del badge si una región necesita un matiz propio. */
  availabilityLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  active?: boolean;
};

/**
 * Cierre operacional de Sierra y Oriente (America/Guayaquil, UTC-5).
 *
 * El offset va explícito para que el corte sea el mismo instante en cualquier
 * zona horaria del visitante.
 */
export const REGISTRATION_CLOSE_AT = '2026-10-05T23:59:59-05:00';

/** Copy oficial de una región sin inscripciones activas. */
const CLOSED_COPY = {
  headline: 'INSCRIPCIONES CERRADAS',
  description: 'El periodo de inscripción de esta región finalizó.',
} as const;

export const REGISTRATION_STATUS: RegionRegistration[] = [
  {
    id: 'costa',
    region: 'Costa',
    label: 'REGIÓN COSTA',
    status: 'closed',
    headline: 'INSCRIPCIONES CERRADAS',
    description: 'El periodo de inscripción de esta región finalizó.',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_Costa.webp',
  },
  {
    id: 'sierra',
    region: 'Sierra',
    label: 'REGIÓN SIERRA',
    status: 'open',
    headline: 'INSCRIPCIONES ABIERTAS',
    description:
      'Registra a tu institución y asegura su participación hasta el 05 de octubre.',
    closingDate: '05 OCT 2026',
    closesAt: REGISTRATION_CLOSE_AT,
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_Sierra.webp',
  },
  {
    id: 'amazonia',
    region: 'Oriente',
    label: 'REGIÓN ORIENTE',
    status: 'open',
    headline: 'INSCRIPCIONES ABIERTAS',
    description:
      'Registra a tu institución y asegura su participación hasta el 05 de octubre.',
    closingDate: '05 OCT 2026',
    closesAt: REGISTRATION_CLOSE_AT,
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_oriente.webp',
  },
];

/**
 * Estado efectivo de una región en el momento del render.
 *
 * Una región `open` con `closesAt` ya vencido se sirve como cerrada, con el copy
 * de cierre y sin fecha visible. Esto se resuelve al montar, no en vivo: el
 * contador segundo a segundo vive en el scoreboard del Home, aquí solo hace
 * falta que la página no siga ofreciendo un cupo que ya no existe.
 */
export function resolveRegion(region: RegionRegistration): RegionRegistration {
  if (region.status !== 'open' || !region.closesAt) return region;

  const closesAtMs = new Date(region.closesAt).getTime();
  if (!Number.isFinite(closesAtMs) || Date.now() < closesAtMs) return region;

  return {
    ...region,
    status: 'closed',
    ...CLOSED_COPY,
    closingDate: undefined,
    closesAt: undefined,
  };
}
