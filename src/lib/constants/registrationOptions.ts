import type { DelegateRole, RegistrationCategory, RegistrationCity, SchoolType } from '@/types/registration';

export const DELEGATE_ROLE_OPTIONS: DelegateRole[] = ['Rector', 'Entrenador', 'Docente', 'Otros'];

export const SCHOOL_TYPE_OPTIONS: SchoolType[] = ['Privado', 'Fiscal', 'Fiscomisional'];

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
