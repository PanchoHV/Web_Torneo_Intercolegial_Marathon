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
    region: 'Sierra y Amazonía',
    options: ['Quito (Pichincha)', 'Ibarra', 'Ambato', 'Cuenca', 'Tena'],
  },
];

export const CITY_OPTIONS_FLAT: RegistrationCity[] = CITY_OPTIONS.flatMap((group) => group.options);

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
 * Ciudades sin cupo, derivadas de CITY_OPTIONS — la relación ciudad→región
 * del formulario. Si mañana se agrega una ciudad a Costa queda bloqueada sola.
 */
export const CITIES_WITH_FULL_QUOTA: RegistrationCity[] = CITY_OPTIONS.filter((group) =>
  CLOSED_REGISTRATION_REGIONS.includes(group.region)
).flatMap((group) => group.options);

/** Mensaje único: lo comparten el aviso del formulario y la guarda del submit. */
export const CLOSED_CITY_MESSAGE = 'Lo sentimos, los cupos para esta ciudad están llenos.';

/** Fuente única para UI y submit. Acepta valores sueltos por si el estado llega sucio. */
export function isCityRegistrationClosed(city: string | undefined | null): boolean {
  if (!city) return false;

  return (CITIES_WITH_FULL_QUOTA as string[]).includes(city);
}
