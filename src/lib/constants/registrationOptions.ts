import type { DelegateRole, RegistrationCategory, RegistrationCity, SchoolType } from '@/types/registration';

export const DELEGATE_ROLE_OPTIONS: DelegateRole[] = ['Rector', 'Entrenador', 'Docente', 'Otros'];

export const SCHOOL_TYPE_OPTIONS: SchoolType[] = ['Privado', 'Público'];

export const CITY_OPTIONS: Array<{
  region: string;
  options: RegistrationCity[];
}> = [
  {
    region: 'Costa',
    options: ['Guayaquil (Guayas)', 'Manta', 'Portoviejo', 'Esmeraldas', 'Machala'],
  },
  {
    region: 'Sierra',
    options: ['Quito (Pichincha)', 'Ibarra', 'Ambato', 'Cuenca'],
  },
];

/**
 * Lista plana para los filtros del panel admin. Conserva 'Tena': la sede ya no
 * se ofrece en el formulario, pero sus inscripciones históricas siguen ahí.
 */
export const CITY_OPTIONS_FLAT: RegistrationCity[] = [
  ...CITY_OPTIONS.flatMap((group) => group.options),
  'Tena',
];

export const TOURNAMENT_CATEGORY_OPTIONS: RegistrationCategory[] = [
  'Sub 13 Masculino',
  'Sub 15 Masculino',
  'Sub 17 Masculino',
  'Sub 15 Femenino',
  'Sub 17 Femenino',
];

/**
 * Regiones con inscripciones cerradas.
 *
 * Es la ÚNICA regla de negocio: el bloqueo de ciudades se deriva de aquí, no
 * de una lista paralela. Añadir o quitar una región cierra o reabre todas sus
 * ciudades a la vez, en la UI y en la guarda del submit.
 */
export const CLOSED_REGISTRATION_REGIONS: string[] = ['Costa'];

/**
 * Cierres programados del formulario por región (ISO con offset, UTC-5).
 *
 * Es un margen de gracia: el contador y el estado público de Sierra cierran en
 * `REGISTRATION_CLOSE_AT` (regionStatus.ts), pero el formulario sigue aceptando
 * inscripciones hasta este instante. Al vencer, la región se comporta igual que
 * una de CLOSED_REGISTRATION_REGIONS, sin necesidad de un nuevo deploy.
 */
export const REGISTRATION_FORM_CLOSE_AT: Record<string, string> = {
  Sierra: '2026-10-16T23:59:59-05:00',
};

/** Se evalúa en cada llamada: el corte aplica aunque la página lleve horas abierta. */
function isRegionRegistrationClosed(region: string): boolean {
  if (CLOSED_REGISTRATION_REGIONS.includes(region)) return true;

  const closesAtMs = new Date(REGISTRATION_FORM_CLOSE_AT[region] ?? '').getTime();
  return Number.isFinite(closesAtMs) && Date.now() >= closesAtMs;
}

/** Mensaje único: lo comparten el aviso del formulario y la guarda del submit. */
export const CLOSED_CITY_MESSAGE = 'Lo sentimos, los cupos para esta ciudad están llenos.';

/** Fuente única para UI y submit. Acepta valores sueltos por si el estado llega sucio. */
export function isCityRegistrationClosed(city: string | undefined | null): boolean {
  if (!city) return false;

  // La relación ciudad→región sale de CITY_OPTIONS: una ciudad nueva en una
  // región cerrada queda bloqueada sola.
  return CITY_OPTIONS.some(
    (group) =>
      (group.options as string[]).includes(city) && isRegionRegistrationClosed(group.region)
  );
}
