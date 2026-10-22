import { useEffect } from 'react';

import {
  SEO_BY_PATH,
  SITE_URL,
  buildBreadcrumbJsonLd,
  canonicalFor,
  type PublicSeoPath,
} from './seoData';

export type { PublicSeoPath };

const SITE_NAME = 'Copa Marathon';
const ENTITY_NAME = 'Copa Marathon 2026';
const ENTITY_ALTERNATE_NAMES = ['Copa Marathon', 'Copa Nacional Intercolegial Marathon'];

const OG_IMAGE_URL =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-OG_IMAGE.webp';
const OG_IMAGE_ALT = 'Copa Marathon 2026 — Torneo Intercolegial de Fútbol Ecuador';

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
    const canonical = canonicalFor(path);

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
    upsertMeta('property', 'og:image:secure_url', OG_IMAGE_URL);
    upsertMeta('property', 'og:image:type', 'image/webp');
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT);
    upsertMeta('name', 'twitter:image', OG_IMAGE_URL);
    upsertMeta('name', 'twitter:image:alt', OG_IMAGE_ALT);

    upsertJsonLd('seo-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: ENTITY_NAME,
      alternateName: ENTITY_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      image: OG_IMAGE_URL,
      inLanguage: 'es-EC',
    });

    upsertJsonLd('seo-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ENTITY_NAME,
      alternateName: ENTITY_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/marathon-logo.webp`,
      image: OG_IMAGE_URL,
    });

    const breadcrumb = buildBreadcrumbJsonLd(path);

    if (breadcrumb) {
      upsertJsonLd('seo-breadcrumb', breadcrumb);
    } else {
      removeJsonLd('seo-breadcrumb');
    }
  }, [path]);

  return null;
}
