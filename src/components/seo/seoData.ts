export const SITE_URL = 'https://www.copamarathon.com';

export const SEO_BY_PATH = {
  '/': {
    title: 'Copa Marathon 2026 | Torneo Intercolegial de Fútbol Ecuador',
    description:
      'Vive la Copa Marathon 2026, el torneo intercolegial de fútbol que reúne colegios y estudiantes de Ecuador. Conoce la Copa, sus sedes, inscripciones y Fan App.',
    breadcrumb: null,
  },
  '/la-copa': {
    title: 'Copa Nacional Intercolegial Marathon | Fútbol Escolar Ecuador',
    description:
      'Conoce la Copa Nacional Intercolegial Marathon 2026, el torneo intercolegial de fútbol que conecta colegios, talento y pasión por el deporte en Ecuador.',
    breadcrumb: 'La Copa',
  },
  '/sedes': {
    title: 'Sedes Copa Marathon 2026 | Torneo Intercolegial Ecuador',
    description:
      'Consulta las sedes de Copa Marathon 2026, el torneo intercolegial de fútbol de Ecuador. Encuentra ciudades, escenarios e información útil para seguir la Copa.',
    breadcrumb: 'Sedes',
  },
  '/inscripciones': {
    title: 'Inscripciones Copa Marathon 2026 | Registra tu Colegio',
    description:
      'Conoce cómo participa tu colegio en Copa Marathon 2026, el torneo intercolegial de fútbol de Ecuador. Revisa requisitos, fechas y proceso de inscripción.',
    breadcrumb: 'Inscripciones',
  },
  '/fan-app': {
    title: 'Fan App Copa Marathon | Sigue el Torneo Intercolegial',
    description:
      'Sigue la Copa Marathon desde tu celular. Consulta partidos, sedes, estadísticas y equipos desde la Fan App oficial del torneo.',
    breadcrumb: 'Fan App',
  },
  '/seguro-estudiantil': {
    title: 'Seguro Estudiantil Copa Marathon 2026 | Clínicas y Documentos',
    description:
      'Seguro de accidentes para los jugadores de Copa Marathon 2026. Consulta qué hacer ante un accidente, las clínicas en convenio, las coberturas y los documentos.',
    breadcrumb: 'Seguro estudiantil',
  },
} as const;

export type PublicSeoPath = keyof typeof SEO_BY_PATH;

export function canonicalFor(path: PublicSeoPath) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function buildBreadcrumbJsonLd(path: PublicSeoPath) {
  const { breadcrumb } = SEO_BY_PATH[path];

  if (!breadcrumb) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumb,
        item: canonicalFor(path),
      },
    ],
  };
}
