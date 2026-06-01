type DataLayerValue = string | number | boolean | null | undefined | string[];

type GtmEventPayload = {
  event: string;
  [key: string]: DataLayerValue;
};

declare global {
  interface Window {
    dataLayer?: GtmEventPayload[];
  }
}

const isBrowser = typeof window !== 'undefined';

export function pushToDataLayer(payload: GtmEventPayload) {
  if (!isBrowser) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...payload,
    tournament_year: '2026',
    site_name: 'copa_marathon',
  });
}

export function trackPageView(path: string, title?: string) {
  pushToDataLayer({
    event: 'spa_page_view',
    page_path: path,
    page_title: title || document.title,
  });
}

export function trackCtaClick(params: {
  cta_name: string;
  cta_location: string;
  destination?: string;
}) {
  pushToDataLayer({
    event: 'cta_click',
    cta_name: params.cta_name,
    cta_location: params.cta_location,
    destination: params.destination,
  });
}

export function trackPreinscriptionStart(params: {
  cta_location: string;
  destination?: string;
}) {
  pushToDataLayer({
    event: 'start_preinscription',
    cta_location: params.cta_location,
    destination: params.destination,
  });
}

export function trackRegistrationSubmitAttempt(params: {
  city?: string;
  school_type?: string;
  categories?: string[];
}) {
  pushToDataLayer({
    event: 'preinscription_submit_attempt',
    city: params.city,
    school_type: params.school_type,
    categories: params.categories,
  });
}

export function trackGenerateLead(params: {
  lead_id?: string | null;
  city?: string;
  school_type?: string;
  categories?: string[];
}) {
  pushToDataLayer({
    event: 'generate_lead',
    lead_id: params.lead_id || undefined,
    city: params.city,
    school_type: params.school_type,
    categories: params.categories,
    lead_source: 'landing_inscripciones',
  });
}

export function trackRegistrationError(params: {
  error_type: string;
  city?: string;
}) {
  pushToDataLayer({
    event: 'preinscription_error',
    error_type: params.error_type,
    city: params.city,
  });
}

export function trackNavigationClick(params: {
  nav_label: string;
  nav_target: string;
  nav_location: 'desktop' | 'mobile' | 'logo';
}) {
  pushToDataLayer({
    event: 'navigation_click',
    nav_label: params.nav_label,
    nav_target: params.nav_target,
    nav_location: params.nav_location,
  });
}

export {};