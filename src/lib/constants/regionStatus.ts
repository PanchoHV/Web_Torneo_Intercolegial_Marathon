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
  /** Sobrescribe el texto del badge si una región necesita un matiz propio. */
  availabilityLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  active?: boolean;
};

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
    headline: 'A la espera del inicio de competencia',
    description: 'Ya puedes registrar a tu institución y asegurar su participación.',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_Sierra.webp',
  },
  {
    id: 'amazonia',
    region: 'Oriente',
    label: 'REGIÓN ORIENTE',
    status: 'open',
    headline: 'A la espera del inicio de competencia',
    description: 'Ya puedes registrar a tu institución y asegurar su participación.',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_oriente.webp',
  },
];
