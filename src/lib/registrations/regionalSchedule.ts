import type { RegistrationCity, SchoolType } from '@/types/registration';

export type RegistrationRegion = 'Costa' | 'Sierra' | 'Amazonía';

export type RegionalScheduleInfo = {
  city: RegistrationCity;
  region: RegistrationRegion;
  inscriptionStart: string;
  matchStart: string;
  calendarMessage: string;
};

export const REGIONAL_SCHEDULE_BY_CITY: Record<RegistrationCity, RegionalScheduleInfo> = {
  'Guayaquil (Guayas)': {
    city: 'Guayaquil (Guayas)',
    region: 'Costa',
    inscriptionStart: '4 de mayo de 2026',
    matchStart: '27 de julio de 2026',
    calendarMessage:
      'Tu sede forma parte del primer bloque de activación de la Región Costa.',
  },
  Manta: {
    city: 'Manta',
    region: 'Costa',
    inscriptionStart: '4 de mayo de 2026',
    matchStart: '14 de septiembre de 2026',
    calendarMessage:
      'Tu sede forma parte del bloque Costa con activación deportiva programada para septiembre.',
  },
  Portoviejo: {
    city: 'Portoviejo',
    region: 'Costa',
    inscriptionStart: '4 de mayo de 2026',
    matchStart: '14 de septiembre de 2026',
    calendarMessage:
      'Tu sede forma parte del bloque Costa con activación deportiva programada para septiembre.',
  },
  Esmeraldas: {
    city: 'Esmeraldas',
    region: 'Costa',
    inscriptionStart: '4 de mayo de 2026',
    matchStart: '27 de julio de 2026',
    calendarMessage:
      'Tu sede forma parte del primer bloque de activación de la Región Costa.',
  },
  Machala: {
    city: 'Machala',
    region: 'Costa',
    inscriptionStart: '4 de mayo de 2026',
    matchStart: '27 de julio de 2026',
    calendarMessage:
      'Tu sede forma parte del primer bloque de activación de la Región Costa.',
  },
  'Quito (Pichincha)': {
    city: 'Quito (Pichincha)',
    region: 'Sierra',
    inscriptionStart: '7 de septiembre de 2026',
    matchStart: '12 de octubre de 2026',
    calendarMessage: 'Tu sede se activará según el calendario escolar de Sierra.',
  },
  Ibarra: {
    city: 'Ibarra',
    region: 'Sierra',
    inscriptionStart: '7 de septiembre de 2026',
    matchStart: '19 de octubre de 2026',
    calendarMessage: 'Tu sede se activará según el calendario escolar de Sierra.',
  },
  Ambato: {
    city: 'Ambato',
    region: 'Sierra',
    inscriptionStart: '7 de septiembre de 2026',
    matchStart: '19 de octubre de 2026',
    calendarMessage: 'Tu sede se activará según el calendario escolar de Sierra.',
  },
  Cuenca: {
    city: 'Cuenca',
    region: 'Sierra',
    inscriptionStart: '7 de septiembre de 2026',
    matchStart: '12 de octubre de 2026',
    calendarMessage: 'Tu sede se activará según el calendario escolar de Sierra.',
  },
  Tena: {
    city: 'Tena',
    region: 'Amazonía',
    inscriptionStart: '7 de septiembre de 2026',
    matchStart: '19 de octubre de 2026',
    calendarMessage:
      'Tu sede forma parte del bloque Amazonía y se activará según su calendario correspondiente.',
  },
};

export function getRegionalSchedule(city: RegistrationCity) {
  return REGIONAL_SCHEDULE_BY_CITY[city];
}

export function getSchoolTypeCostMessage(schoolType: SchoolType) {
  if (schoolType === 'Privado') {
    return 'Para instituciones privadas, la preinscripción tiene un valor de USD 170 por categoría inscrita, más IVA. El equipo organizador confirmará los pasos correspondientes una vez revisada la información.';
  }

  return 'Los colegios fiscales y fiscomisionales no pagan costo de preinscripción. La participación estará sujeta a revisión de requisitos, cupos disponibles y calendario oficial de la sede.';
}
