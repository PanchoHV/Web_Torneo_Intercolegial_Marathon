/**
 * Contenido de /seguro-estudiantil.
 *
 * Fuente: oferta de póliza de accidentes personales de Hispana de Seguros y
 * Reaseguros (17 ago 2026), su listado de clínicas en convenio y su proceso de
 * atención de reclamos. Aquí solo vive lo que le sirve a una familia o a un
 * delegado: primas, cláusulas de pago y datos internos de la Fundación quedan
 * fuera a propósito.
 */

export const SEGURO_PATH = '/seguro-estudiantil';

export const INSURER = {
  name: 'Hispana de Seguros y Reaseguros',
  pbxLabel: '(04) 261-0909',
  pbxTel: '042610909',
  tollFreeLabel: '1800-HISPANA (447726)',
  tollFreeTel: '1800447726',
  claimsEmail: 'indemnizaciones.vida@hispanadeseguros.com',
  website: 'https://www.hispanadeseguros.com',
} as const;

/** Plazo para avisar de un accidente cuando se pedirá reembolso. */
export const CLAIM_NOTICE_DAYS = 10;

export const EMERGENCY_STEPS = [
  {
    title: 'Acude a una clínica en convenio',
    body: 'Ante cualquier emergencia por accidente, lleva al jugador a una de las clínicas del listado.',
  },
  {
    title: 'Presenta la cédula del jugador',
    body: 'Indica que viene derivado por Fundación Marathon para que lo atiendan con crédito hospitalario.',
  },
  {
    title: 'Llena el formulario de la clínica',
    body: 'El formulario está en la propia clínica. No necesitas llevarlo impreso.',
  },
  {
    title: 'Hispana autoriza la atención',
    body: 'La aseguradora envía la carta de autorización a la clínica, hasta el monto asegurado de la póliza.',
  },
] as const;

export const COVERAGES = [
  { label: 'Gastos médicos por accidente', amount: '$750', note: 'Con deducible de $10' },
  { label: 'Ambulancia terrestre', amount: '$200', note: 'Hasta el centro médico' },
  { label: 'Muerte accidental', amount: '$3.000' },
  { label: 'Incapacidad total y permanente', amount: '$3.000' },
  { label: 'Desmembración accidental', amount: '$3.000', note: 'Según tabla de la póliza' },
  { label: 'Gastos de sepelio por accidente', amount: '$500' },
] as const;

export const COVERAGE_FACTS = [
  {
    title: 'Cuándo aplica',
    body: 'Durante las fechas y los horarios del campeonato organizado por Fundación Marathon.',
  },
  {
    title: 'Crédito hospitalario',
    body: 'En las clínicas en convenio la atención de emergencia se cubre directamente, sin pagar primero.',
  },
  {
    title: 'Deducible',
    body: 'En gastos médicos, los primeros $10 los asume la familia.',
  },
  {
    title: 'Edad',
    body: 'Cubre desde los 3 hasta los 35 años con el 100% de la indemnización.',
  },
] as const;

export const REFUND_STEPS = [
  {
    title: 'Avisa del accidente',
    body: `El mismo día o dentro de un máximo de ${CLAIM_NOTICE_DAYS} días, por correo a Hispana.`,
  },
  {
    title: 'Reúne los documentos',
    body: 'Formulario de reclamación, cédulas, facturas originales y respaldos médicos.',
  },
  {
    title: 'Auditoría médica',
    body: 'Con la documentación completa, Hispana revisa el caso.',
  },
  {
    title: 'Confirmación de cobertura',
    body: 'Se define si el accidente está cubierto y qué valores se reconocen.',
  },
  {
    title: 'Pago',
    body: 'Los valores aprobados se pagan por cheque o transferencia bancaria.',
  },
] as const;

export const REFUND_DOCUMENTS = [
  'Formulario de reclamación lleno, firmado y sellado por el colegio.',
  'Copia de la cédula o credencial del jugador.',
  'Copia de la cédula del representante o de quien recibirá el pago.',
  'Facturas originales de la clínica u hospital, con su desglose.',
  'Facturas originales de farmacia.',
  'Facturas originales de honorarios médicos, con el informe de los procedimientos.',
  'Recetas médicas originales.',
  'Órdenes médicas de exámenes y sus resultados (copias).',
  'Facturas originales de los exámenes.',
  'Copia de la historia clínica o formulario 008, notas de evolución, rayos X e informes.',
] as const;

export const EXCLUSIONS = [
  'Enfermedades y tratamientos médicos o quirúrgicos que no se originen en un accidente.',
  'Desmayos, síncopes, vértigos, ataques epilépticos y otros eventos médicos similares.',
  'Accidentes ocurridos bajo la influencia de alcohol o estupefacientes.',
  'Lesiones causadas intencionalmente.',
  'Riñas, peleas y actos fuera de la ley.',
] as const;

export type InsuranceDownload = {
  id: string;
  title: string;
  description: string;
  /** Sin `href` el documento se muestra como "Disponible pronto". */
  href?: string;
  filename?: string;
};

export const DOWNLOADS: InsuranceDownload[] = [
  {
    id: 'formulario-reclamacion',
    title: 'Formulario de reclamación',
    description: 'El que debes llenar y sellar en el colegio para pedir un reembolso.',
  },
  {
    id: 'clinicas-convenio',
    title: 'Listado de clínicas en convenio',
    description: 'Clínicas de Costa y Sierra con dirección y teléfonos, para guardar o imprimir.',
    href: '/docs/seguro/clinicas-en-convenio-hispana.pdf',
    filename: 'Clinicas-en-convenio-Copa-Marathon.pdf',
  },
];

/* -------------------------------------------------------------------------- */
/* Clínicas en convenio                                                        */
/* -------------------------------------------------------------------------- */

export type ClinicRegion = 'Costa' | 'Sierra';

export type ClinicPhone = { label: string; tel: string };

export type Clinic = {
  name: string;
  address: string;
  phones: ClinicPhone[];
  /** Aclaración del propio listado de Hispana. */
  note?: string;
};

export type ClinicCity = {
  city: string;
  region: ClinicRegion;
  /** La ciudad es sede de la Copa: se ordena primero y se marca en el filtro. */
  isVenue?: boolean;
  clinics: Clinic[];
};

const phone = (label: string, tel: string): ClinicPhone => ({ label, tel });

export const CLINIC_CITIES: ClinicCity[] = [
  {
    city: 'Guayaquil',
    region: 'Costa',
    isVenue: true,
    clinics: [
      {
        name: 'Pensionado del Hospital Luis Vernaza (Enrique Sotomayor)',
        address: 'Av. Julián Coronel y Escobedo',
        phones: [phone('(04) 256-0300', '042560300')],
      },
      {
        name: 'Pensionado del Hospital de Niños Roberto Gilbert E.',
        address: 'Cdla. Atarazana, Av. Sufragio Libre',
        phones: [phone('(04) 228-7310', '042287310')],
      },
      {
        name: 'Hospital Semedic',
        address: 'Av. León Febres Cordero Rivadeneira, calle segunda, ciudadela Villa Club',
        phones: [phone('(04) 503-0100', '045030100'), phone('097 986 2371', '0979862371')],
      },
      {
        name: 'Clínica San Francisco',
        address: 'Alejandro Andrade Coello 2729 y Juan Rolando Coello, Kennedy Norte',
        phones: [phone('(04) 259-5400', '042595400')],
      },
      {
        name: 'Hospital Santa María',
        address: 'Lorenzo de Garaycoa 3209 y Argentina',
        phones: [phone('098 089 2296', '0980892296')],
      },
      {
        name: 'Clínica Alborada',
        address: 'Cdla. Alborada, 7ma etapa, Mz. 737, solar 5',
        phones: [phone('(04) 227-3400', '042273400')],
      },
      {
        name: 'Clínica Panamericana',
        address: 'Panamá 616 y Roca',
        phones: [phone('(04) 259-0000', '042590000')],
      },
      {
        name: 'Clínica Sur Hospital',
        address: 'José Mascote entre Cap. Nájera y Huancavilca',
        phones: [phone('(04) 259-0670', '042590670')],
      },
      {
        name: 'Clínica Urdenor',
        address: 'Centro Comercial Mall del Sol',
        phones: [phone('(04) 292-1784', '042921784'), phone('(04) 292-1583', '042921583')],
      },
    ],
  },
  {
    city: 'Esmeraldas',
    region: 'Costa',
    isVenue: true,
    clinics: [
      {
        name: 'Clínica Piedrahita',
        address: 'Piedrahita 135 y Bolívar',
        phones: [phone('(06) 271-0195', '062710195')],
      },
      {
        name: 'Clínica Colón',
        address: 'Av. Colón 225 e Imbabura',
        phones: [
          phone('(06) 245-3947', '062453947'),
          phone('(06) 273-1268', '062731268'),
          phone('(06) 245-5811', '062455811'),
        ],
      },
    ],
  },
  {
    city: 'Machala',
    region: 'Costa',
    isVenue: true,
    clinics: [
      {
        name: 'Clínica de Traumatología',
        address: 'Cdla. La Carolina, Circunvalación Norte s/n y Marcel Laniado',
        phones: [
          phone('(07) 298-1060', '072981060'),
          phone('(07) 293-2509', '072932509'),
          phone('(07) 296-1069', '072961069'),
        ],
        note: 'Solo atenciones hospitalarias.',
      },
    ],
  },
  {
    city: 'Manta',
    region: 'Costa',
    isVenue: true,
    clinics: [
      {
        name: 'Clínica Centeno',
        address: 'Calle 18 entre Av. 37 y Av. 38',
        phones: [phone('(05) 262-4353', '052624353')],
      },
    ],
  },
  {
    city: 'Portoviejo',
    region: 'Costa',
    isVenue: true,
    clinics: [
      {
        name: 'Portoviejo Medical Clinic (La Merced)',
        address: 'Vía Crucita km 1½, junto al Comando de la Policía, Cdla. San José',
        phones: [phone('(05) 244-1417', '052441417')],
      },
    ],
  },
  {
    city: 'Durán',
    region: 'Costa',
    clinics: [
      {
        name: 'Clínica Saguay',
        address: 'Cooperativa 2 de Mayo, Mz. 2, V. 01',
        phones: [phone('(04) 281-0187', '042810187')],
      },
    ],
  },
  {
    city: 'Milagro',
    region: 'Costa',
    clinics: [
      {
        name: 'Clínica Santa Inés',
        address: 'José Joaquín de Olmedo y Maruri 1000',
        phones: [phone('(04) 297-7086', '042977086')],
      },
    ],
  },
  {
    city: 'Salinas',
    region: 'Costa',
    clinics: [
      {
        name: 'Clínica Granados',
        address: 'Cdla. Santa Paula, calle 5ta entre Av. 14 y Av. 18',
        phones: [phone('(04) 277-5576', '042775576')],
      },
    ],
  },
  {
    city: 'La Libertad',
    region: 'Costa',
    clinics: [
      {
        name: 'Clínica Metropolitana – Clinimet S.A.',
        address: 'Calle 8 y Av. 14, vía a Punta Carnero',
        phones: [phone('(04) 277-9030', '042779030'), phone('(04) 277-6797', '042776797')],
      },
    ],
  },
  {
    city: 'Babahoyo',
    region: 'Costa',
    clinics: [
      {
        name: 'Clínica Touma',
        address: 'Ricaurte 112 y Gral. Barona',
        phones: [
          phone('(05) 273-1720', '052731720'),
          phone('(05) 273-1769', '052731769'),
          phone('(05) 273-0815', '052730815'),
        ],
      },
    ],
  },
  {
    city: 'Quevedo',
    region: 'Costa',
    clinics: [
      {
        name: 'Hospital Básico Guayaquil de Quevedo',
        address: 'Bolívar 1116 y Décima Segunda',
        // El listado trae un segundo número incompleto ("2763-47"): no se publica.
        phones: [phone('(05) 275-3075', '052753075')],
      },
    ],
  },
  {
    city: 'Quito',
    region: 'Sierra',
    isVenue: true,
    clinics: [
      {
        name: 'Hospital Padre Carollo',
        address:
          'Chillogallo, Av. Rumichaca S33-10 y Matilde Álvarez, frente al Parque de las Cuadras',
        phones: [phone('(02) 263-6660', '022636660')],
      },
      {
        name: 'Clínica de Especialidades María Auxiliadora',
        address: 'Av. La Prensa 3678 y pasaje Héctor Molina OE3-44, junto a la FAE',
        phones: [phone('(02) 229-1750', '022291750'), phone('(02) 253-1085', '022531085')],
      },
      {
        name: 'Citimed Clínica Quirúrgica',
        address: 'Av. Mariana de Jesús OE7-02 y Nuño de Valderrama',
        phones: [
          phone('(02) 600-7213', '026007213'),
          phone('099 773 4936', '0997734936'),
          phone('096 019 0982', '0960190982'),
        ],
      },
      {
        name: 'Clínica Adventista',
        address: 'Av. 10 de Agosto N30-164 y Cuero y Caicedo',
        phones: [phone('(02) 256-6388', '022566388'), phone('(02) 223-4471', '022234471')],
      },
    ],
  },
  {
    city: 'Cuenca',
    region: 'Sierra',
    isVenue: true,
    clinics: [
      {
        name: 'Clínica de Especialidades Praxxel',
        address: 'Padre Aguirre 13-18 y Vega Muñoz',
        phones: [phone('(07) 282-0198', '072820198'), phone('(07) 283-6800', '072836800')],
      },
    ],
  },
  {
    city: 'Ambato',
    region: 'Sierra',
    isVenue: true,
    clinics: [
      {
        name: 'Hospital General Privado Tungurahua S.A.',
        address: 'Juan Benigno Vela 07-17 y Mera',
        // Tal como figura en el listado de Hispana (prefijo 04). Pendiente de confirmar.
        phones: [phone('04-2821721', '042821721')],
      },
    ],
  },
  {
    city: 'Ibarra',
    region: 'Sierra',
    isVenue: true,
    clinics: [
      {
        name: 'Instituto Médico de Especialidades Medibarra',
        address: 'Padre Jacinto Egas y Teodoro Gómez de la Torre',
        phones: [phone('(06) 295-5612', '062955612')],
      },
    ],
  },
  {
    city: 'San Rafael',
    region: 'Sierra',
    clinics: [
      {
        name: 'Clínica San Rafael',
        address: 'General Enríquez s/n e Isla Santiago',
        phones: [phone('(02) 286-4906', '022864906')],
      },
    ],
  },
  {
    city: 'Sangolquí',
    region: 'Sierra',
    clinics: [
      {
        name: 'Clínica Emergencias San Francisco',
        address: 'Guayaquil 359 y Atahualpa',
        phones: [phone('(02) 233-0645', '022330645')],
      },
      {
        name: 'Novaclínica del Valle',
        address: 'Riofrío s/n y Cotacachi',
        phones: [phone('(02) 233-7559', '022337559')],
      },
    ],
  },
  {
    city: 'Riobamba',
    region: 'Sierra',
    clinics: [
      {
        name: 'Clínica Metropolitana – Metrisa',
        address: 'Junín 25-28 y España, a dos cuadras del coliseo',
        phones: [phone('(03) 294-1931', '032941931'), phone('(03) 294-1930', '032941930')],
      },
    ],
  },
  {
    city: 'Latacunga',
    region: 'Sierra',
    clinics: [
      {
        name: 'Clínica Latacunga',
        address: 'Sánchez de Orellana 1179 y Marquez de Mains, junto a los Bomberos',
        phones: [phone('(03) 281-0260', '032810260'), phone('098 477 3761', '0984773761')],
      },
    ],
  },
  {
    city: 'Azogues',
    region: 'Sierra',
    clinics: [
      {
        name: 'Hospital Clemed S.A.',
        address: 'River 3-17 y 3 de Noviembre',
        phones: [phone('(07) 224-2936', '072242936')],
      },
    ],
  },
];

export const CLINIC_COUNT = CLINIC_CITIES.reduce((total, item) => total + item.clinics.length, 0);

export const SEGURO_FAQ_ITEMS = [
  {
    question: '¿Quiénes están cubiertos por el seguro?',
    answer:
      'Los jugadores que participan en la Copa Marathon 2026, durante las fechas y los horarios del campeonato. La póliza es de accidentes personales y la contrata Fundación Marathon con Hispana de Seguros y Reaseguros.',
  },
  {
    question: '¿Tengo que pagar algo por el seguro?',
    answer:
      'No. El seguro lo contrata la organización. En un reclamo de gastos médicos solo aplica un deducible de $10, que asume la familia.',
  },
  {
    question: '¿Qué hago si el accidente ocurre lejos de una clínica en convenio?',
    answer:
      'Atiende primero la emergencia. Luego puedes pedir el reembolso de los gastos médicos: avisa a Hispana dentro de los 10 días y guarda todas las facturas originales, recetas y resultados.',
  },
  {
    question: '¿Cuánto tiempo tengo para avisar de un accidente?',
    answer:
      'El mismo día o dentro de un máximo de 10 días, escribiendo a indemnizaciones.vida@hispanadeseguros.com.',
  },
  {
    question: '¿El seguro cubre enfermedades?',
    answer:
      'No. Es un seguro de accidentes: no cubre enfermedades ni eventos como desmayos, síncopes o ataques epilépticos.',
  },
  {
    question: '¿Dónde consigo el formulario de reclamación?',
    answer:
      'En la sección de documentos de esta página. Para la atención de emergencia con crédito hospitalario no lo necesitas: el formulario está en la clínica.',
  },
] as const;
