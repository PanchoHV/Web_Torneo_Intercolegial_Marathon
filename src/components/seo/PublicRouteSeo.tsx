import { useEffect } from 'react';

const SITE_URL = 'https://www.copamarathon.com';
const SITE_NAME = 'Copa Marathon';

const OG_IMAGE_URL =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-OG_IMAGE.webp';
const OG_IMAGE_ALT = 'Copa Marathon 2026 — Torneo Intercolegial de Fútbol Ecuador';

const SEO_BY_PATH = {
  '/': {
    title: 'Copa Marathon 2026 | Torneo Intercolegial de Fútbol Ecuador',
    description:
      'Vive la Copa Marathon 2026, el torneo intercolegial de fútbol que reúne colegios de Ecuador. Conoce la Copa, sus sedes, inscripciones y Fan App.',
    breadcrumb: null,
  },
  '/la-copa': {
    title: 'Copa Nacional Intercolegial Marathon | Fútbol Escolar Ecuador',
    description:
      'Conoce la Copa Nacional Intercolegial Marathon 2026, el torneo de fútbol escolar que conecta colegios, talento y pasión por el deporte en Ecuador.',
    breadcrumb: 'La Copa',
  },
  '/sedes': {
    title: 'Sedes Copa Marathon 2026 | Torneo Intercolegial Ecuador',
    description:
      'Consulta las sedes de la Copa Marathon 2026 en Ecuador. Encuentra ciudades, escenarios e información útil del torneo intercolegial de fútbol.',
    breadcrumb: 'Sedes',
  },
  '/inscripciones': {
    title: 'Inscripciones Copa Marathon 2026 | Registra tu Colegio',
    description:
      'Conoce cómo participar en la Copa Marathon 2026. Revisa requisitos, fechas y el proceso de inscripción para colegios participantes en Ecuador.',
    breadcrumb: 'Inscripciones',
  },
  '/fan-app': {
    title: 'Fan App Copa Marathon | Sigue el Torneo Intercolegial',
    description:
      'Sigue la Copa Marathon desde tu celular. Consulta partidos, sedes, estadísticas y equipos desde la Fan App oficial del torneo.',
    breadcrumb: 'Fan App',
  },
} as const;

export type PublicSeoPath = keyof typeof SEO_BY_PATH;

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.head.querySelector(`script#${id}`)?.remove();
}

export default function PublicRouteSeo({ path }: { path: PublicSeoPath }) {
  useEffect(() => {
    const seo = SEO_BY_PATH[path];
    const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', 'index, follow');

    upsertCanonical(canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:locale', 'es_EC');
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);

    upsertMeta('property', 'og:image', OG_IMAGE_URL);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT);
    upsertMeta('name', 'twitter:image', OG_IMAGE_URL);
    upsertMeta('name', 'twitter:image:alt', OG_IMAGE_ALT);

    upsertJsonLd('seo-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: 'es-EC',
    });

    upsertJsonLd('seo-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/marathon-logo.webp`,
    });

    if (seo.breadcrumb) {
      upsertJsonLd('seo-breadcrumb', {
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
            name: seo.breadcrumb,
            item: canonical,
          },
        ],
      });
    } else {
      removeJsonLd('seo-breadcrumb');
    }
  }, [path]);

  return null;
}
