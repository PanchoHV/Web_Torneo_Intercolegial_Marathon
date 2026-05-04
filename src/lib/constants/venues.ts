export type VenueRegion = 'Costa' | 'Sierra' | 'Amazonía';

export type VenueSide = 'Lado A' | 'Lado B';

export type VenueStatus =
  | 'pre_registration_open'
  | 'coming_soon'
  | 'documentation_phase'
  | 'matches_scheduled';

export type VenueStageStatus = 'active' | 'upcoming' | 'scheduled';

export type VenueStage = {
  label: string;
  dateLabel: string;
  status: VenueStageStatus;
};

export type Venue = {
  id: string;
  province: string;
  city: string;
  displayName: string;
  region: VenueRegion;
  side: VenueSide;
  status: VenueStatus;
  statusLabel: string;
  statusDescription: string;
  preRegistrationStart: string;
  preRegistrationDeadline: string;
  documentationDeadline: string;
  matchStart: string;
  categories: readonly string[];
  stages: VenueStage[];
  note: string;
};

export const TOURNAMENT_CATEGORIES = [
  'Sub 13 Masculino',
  'Sub 15 Masculino',
  'Sub 17 Masculino',
  'Sub 15 Femenino',
  'Sub 17 Femenino',
] as const;

export const VENUE_REGION_OPTIONS = ['Todas', 'Costa', 'Sierra', 'Amazonía'] as const;

export const VENUES: Venue[] = [
  {
    id: 'guayas-guayaquil',
    province: 'Guayas',
    city: 'Guayaquil',
    displayName: 'Guayas / Guayaquil',
    region: 'Costa',
    side: 'Lado A',
    status: 'pre_registration_open',
    statusLabel: 'Preinscripción activa',
    statusDescription: 'Primer bloque competitivo de la Región Costa.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '17 de julio de 2026',
    documentationDeadline: '20 de julio de 2026',
    matchStart: '27 de julio de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 17 jul 2026', status: 'active' },
      { label: 'Documentación', dateLabel: '20 jul 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '27 jul 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Las fechas corresponden a la planificación inicial y pueden ajustarse por razones de fuerza mayor o logística deportiva.',
  },

  {
    id: 'eloro-machala',
    province: 'El Oro',
    city: 'Machala',
    displayName: 'El Oro / Machala',
    region: 'Costa',
    side: 'Lado A',
    status: 'pre_registration_open',
    statusLabel: 'Preinscripción activa',
    statusDescription: 'Bloque Costa.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '17 de julio de 2026',
    documentationDeadline: '20 de julio de 2026',
    matchStart: '27 de julio de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 17 jul 2026', status: 'active' },
      { label: 'Documentación', dateLabel: '20 jul 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '27 jul 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Las fechas corresponden a la planificación inicial y pueden ajustarse por razones de fuerza mayor o logística deportiva.',
  },

  {
    id: 'esmeraldas',
    province: 'Esmeraldas',
    city: 'Esmeraldas',
    displayName: 'Esmeraldas',
    region: 'Costa',
    side: 'Lado A',
    status: 'pre_registration_open',
    statusLabel: 'Preinscripción activa',
    statusDescription: 'Bloque Costa.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '17 de julio de 2026',
    documentationDeadline: '20 de julio de 2026',
    matchStart: '27 de julio de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 17 jul 2026', status: 'active' },
      { label: 'Documentación', dateLabel: '20 jul 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '27 jul 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Las fechas corresponden a la planificación inicial y pueden ajustarse por razones de fuerza mayor o logística deportiva.',
  },

  {
    id: 'manabi-manta',
    province: 'Manabí',
    city: 'Manta',
    displayName: 'Manabí / Manta',
    region: 'Costa',
    side: 'Lado A',
    status: 'pre_registration_open',
    statusLabel: 'Preinscripción activa',
    statusDescription: 'Bloque Costa.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '28 de agosto de 2026',
    documentationDeadline: '8 de septiembre de 2026',
    matchStart: '14 de septiembre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 28 ago 2026', status: 'active' },
      { label: 'Documentación', dateLabel: '8 sep 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '14 sep 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note: 'Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.',
  },

  {
    id: 'manabi-portoviejo',
    province: 'Manabí',
    city: 'Portoviejo',
    displayName: 'Manabí / Portoviejo',
    region: 'Costa',
    side: 'Lado A',
    status: 'pre_registration_open',
    statusLabel: 'Preinscripción activa',
    statusDescription: 'Bloque Costa.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '28 de agosto de 2026',
    documentationDeadline: '8 de septiembre de 2026',
    matchStart: '14 de septiembre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 28 ago 2026', status: 'active' },
      { label: 'Documentación', dateLabel: '8 sep 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '14 sep 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note: 'Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.',
  },

  {
    id: 'pichincha-quito',
    province: 'Pichincha',
    city: 'Quito',
    displayName: 'Pichincha / Quito',
    region: 'Sierra',
    side: 'Lado B',
    status: 'coming_soon',
    statusLabel: 'Preinscripción próxima',
    statusDescription: 'Bloque Sierra.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '2 de octubre de 2026',
    documentationDeadline: '6 de octubre de 2026',
    matchStart: '12 de octubre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 2 oct 2026', status: 'upcoming' },
      { label: 'Documentación', dateLabel: '6 oct 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '12 oct 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note: 'Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.',
  },

  {
    id: 'azuay-cuenca',
    province: 'Azuay',
    city: 'Cuenca',
    displayName: 'Azuay / Cuenca',
    region: 'Sierra',
    side: 'Lado B',
    status: 'coming_soon',
    statusLabel: 'Preinscripción próxima',
    statusDescription: 'Bloque Sierra.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '2 de octubre de 2026',
    documentationDeadline: '6 de octubre de 2026',
    matchStart: '12 de octubre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 2 oct 2026', status: 'upcoming' },
      { label: 'Documentación', dateLabel: '6 oct 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '12 oct 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note: 'Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.',
  },

  {
    id: 'imbabura-ibarra',
    province: 'Imbabura',
    city: 'Ibarra',
    displayName: 'Imbabura / Ibarra',
    region: 'Sierra',
    side: 'Lado B',
    status: 'coming_soon',
    statusLabel: 'Preinscripción próxima',
    statusDescription: 'Bloque Sierra.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '16 de octubre de 2026',
    documentationDeadline: '20 de octubre de 2026',
    matchStart: '19 de octubre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 16 oct 2026', status: 'upcoming' },
      { label: 'Documentación', dateLabel: '20 oct 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '19 oct 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Fechas sujetas a ajuste por calendario operativo de sede. Las fechas corresponden a la planificación inicial.',
  },

  {
    id: 'tungurahua-ambato',
    province: 'Tungurahua',
    city: 'Ambato',
    displayName: 'Tungurahua / Ambato',
    region: 'Sierra',
    side: 'Lado B',
    status: 'coming_soon',
    statusLabel: 'Preinscripción próxima',
    statusDescription: 'Bloque Sierra.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '16 de octubre de 2026',
    documentationDeadline: '20 de octubre de 2026',
    matchStart: '19 de octubre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 16 oct 2026', status: 'upcoming' },
      { label: 'Documentación', dateLabel: '20 oct 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '19 oct 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Fechas sujetas a ajuste por calendario operativo de sede. Las fechas corresponden a la planificación inicial.',
  },

  {
    id: 'napo-tena',
    province: 'Napo',
    city: 'Tena',
    displayName: 'Napo / Tena',
    region: 'Amazonía',
    side: 'Lado B',
    status: 'coming_soon',
    statusLabel: 'Preinscripción próxima',
    statusDescription: 'Bloque Amazonía.',
    preRegistrationStart: '4 de mayo de 2026',
    preRegistrationDeadline: '16 de octubre de 2026',
    documentationDeadline: '20 de octubre de 2026',
    matchStart: '19 de octubre de 2026',
    categories: [...TOURNAMENT_CATEGORIES],
    stages: [
      { label: 'Preinscripción', dateLabel: 'Hasta 16 oct 2026', status: 'upcoming' },
      { label: 'Documentación', dateLabel: '20 oct 2026', status: 'upcoming' },
      { label: 'Inicio de partidos', dateLabel: '19 oct 2026', status: 'scheduled' },
      { label: 'Camino a la final', dateLabel: 'Según fixture oficial', status: 'scheduled' },
    ],
    note:
      'Fechas sujetas a ajuste por calendario operativo de sede. Las fechas corresponden a la planificación inicial.',
  },
];

export default VENUES;
