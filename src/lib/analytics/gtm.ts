const ANALYTICS_CONTEXT = {
  tournament_year: '2026',
  site_name: 'copa_marathon',
} as const;

type AnalyticsEventMap = {
  spa_page_view: { page_path: string; page_title: string };
  cta_click: {
    cta_name: string;
    cta_location: string;
    destination?: string;
    source_page?: string;
    section?: string;
  };
  fan_app_open: { cta_location: string; destination: string };
  start_preinscription: { form_location: string };
  preinscription_submit_attempt: {
    city?: string;
    school_type?: string;
    categories?: string[];
  };
  generate_lead: {
    city?: string;
    school_type?: string;
    categories?: string[];
    lead_source: 'landing_inscripciones';
  };
  preinscription_error: { error_type: string; city?: string };
  preinscription_validation_error: {
    source_page: '/inscripciones';
    section: 'registration_form';
    error_type: 'validation_error';
  };
  navigation_click: {
    nav_label: string;
    nav_target: string;
    nav_location: 'desktop' | 'mobile' | 'logo';
  };
  faq_open: { faq_id: string; faq_index: number; faq_question: string };
  venue_filter: { filter_type: 'region' | 'city'; filter_value: string };
  venue_select: {
    venue_id: string;
    venue_city: string;
    venue_region: string;
    selection_source: 'map' | 'list';
  };
  venue_detail_open: {
    source_page: '/sedes';
    section: 'featured_venue';
    region: string;
    city: string;
    venue_name: string;
  };
  fan_app_install_guide_view: {
    source_page: '/fan-app';
    section: 'install_guide';
    platform: 'ios' | 'android';
  };
  fan_app_gallery_view: {
    screen_id: string;
    screen_name: string;
    interaction: 'arrow' | 'dot' | 'swipe' | 'wheel';
  };
  outbound_click: { link_domain: string; link_location: string };
  file_download: { file_name: string; file_extension: string; link_location: string };
  /**
   * Core Web Vitals medidos en usuarios reales.
   *
   * CrUX tarda 28 días en reflejar un cambio; esto lo deja ver en días y con
   * el tráfico propio, que es lo que hace falta para saber si una optimización
   * de INP funcionó o no.
   */
  web_vital: {
    metric_name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
    /** Milisegundos, salvo CLS, que va sin unidad ×1000 para no perder decimales. */
    metric_value: number;
    metric_rating: 'good' | 'needs-improvement' | 'poor';
    /** Identificador de la medición: permite deduplicar en GA4. */
    metric_id: string;
    metric_navigation_type: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEvent = {
  [EventName in AnalyticsEventName]: {
    event: EventName;
  } & AnalyticsEventMap[EventName] &
    typeof ANALYTICS_CONTEXT;
}[AnalyticsEventName];

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const isBrowser = typeof window !== 'undefined';

export function pushToDataLayer<EventName extends AnalyticsEventName>(
  event: EventName,
  params: AnalyticsEventMap[EventName]
) {
  if (!isBrowser) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, ...ANALYTICS_CONTEXT });
}

export function trackPageView(path: string, title: string) {
  pushToDataLayer('spa_page_view', { page_path: path, page_title: title });
}

export function trackCtaClick(params: AnalyticsEventMap['cta_click']) {
  pushToDataLayer('cta_click', params);
}

export function trackFanAppOpen(params: AnalyticsEventMap['fan_app_open']) {
  pushToDataLayer('fan_app_open', params);
}

export function trackPreinscriptionStart(params: AnalyticsEventMap['start_preinscription']) {
  pushToDataLayer('start_preinscription', params);
}

export function trackRegistrationSubmitAttempt(
  params: AnalyticsEventMap['preinscription_submit_attempt']
) {
  pushToDataLayer('preinscription_submit_attempt', params);
}

export function trackGenerateLead(params: Omit<AnalyticsEventMap['generate_lead'], 'lead_source'>) {
  pushToDataLayer('generate_lead', { ...params, lead_source: 'landing_inscripciones' });
}

export function trackRegistrationError(params: AnalyticsEventMap['preinscription_error']) {
  pushToDataLayer('preinscription_error', params);
}

export function trackPreinscriptionValidationError(
  params: AnalyticsEventMap['preinscription_validation_error']
) {
  pushToDataLayer('preinscription_validation_error', params);
}

export function trackNavigationClick(params: AnalyticsEventMap['navigation_click']) {
  pushToDataLayer('navigation_click', params);
}

export function trackFaqOpen(params: AnalyticsEventMap['faq_open']) {
  pushToDataLayer('faq_open', params);
}

export function trackVenueFilter(params: AnalyticsEventMap['venue_filter']) {
  pushToDataLayer('venue_filter', params);
}

export function trackVenueSelect(params: AnalyticsEventMap['venue_select']) {
  pushToDataLayer('venue_select', params);
}

export function trackVenueDetailOpen(params: AnalyticsEventMap['venue_detail_open']) {
  pushToDataLayer('venue_detail_open', params);
}

export function trackFanAppInstallGuideView(
  params: AnalyticsEventMap['fan_app_install_guide_view']
) {
  pushToDataLayer('fan_app_install_guide_view', params);
}

export function trackFanAppGalleryView(params: AnalyticsEventMap['fan_app_gallery_view']) {
  pushToDataLayer('fan_app_gallery_view', params);
}

export function trackOutboundClick(params: AnalyticsEventMap['outbound_click']) {
  pushToDataLayer('outbound_click', params);
}

export function trackFileDownload(params: AnalyticsEventMap['file_download']) {
  pushToDataLayer('file_download', params);
}

export {};

export function trackWebVital(params: AnalyticsEventMap['web_vital']) {
  pushToDataLayer('web_vital', params);
}
