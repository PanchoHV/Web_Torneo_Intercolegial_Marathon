import { trackWebVital } from '@/lib/analytics/gtm';

/**
 * Reporte de Core Web Vitals con usuarios reales.
 *
 * La librería se carga con `import()` dinámico y solo después de que la página
 * termina de cargar: medir el rendimiento no debe competir con él. Cada métrica
 * se emite una vez por visita — INP y CLS al final del ciclo de vida, porque
 * hasta entonces su valor puede empeorar.
 *
 * Se usa la build `attribution`: INP y LCP llevan además el elemento y las fases
 * que explican el valor, para corregir la causa real y no adivinarla.
 */

// GA4 recorta los valores de los parámetros a 100 caracteres.
const MAX_PARAM_LENGTH = 100;

const trim = (value: string | undefined) => value?.slice(0, MAX_PARAM_LENGTH);

export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  const start = () => {
    void import('web-vitals/attribution').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const base = (metric: {
        name: string;
        value: number;
        rating: string;
        id: string;
        navigationType: string;
      }) => ({
        metric_name: metric.name as 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB',
        // CLS es un ratio pequeño: sin escalar, GA4 lo redondearía a 0.
        metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
        metric_id: metric.id,
        metric_navigation_type: metric.navigationType,
      });

      onCLS((metric) => trackWebVital(base(metric)));
      onFCP((metric) => trackWebVital(base(metric)));
      onTTFB((metric) => trackWebVital(base(metric)));

      onLCP((metric) =>
        trackWebVital({ ...base(metric), metric_target: trim(metric.attribution.target) }),
      );

      onINP((metric) => {
        const { attribution } = metric;

        trackWebVital({
          ...base(metric),
          metric_target: trim(attribution.interactionTarget),
          metric_interaction_type: attribution.interactionType,
          metric_load_state: attribution.loadState,
          inp_input_delay: Math.round(attribution.inputDelay),
          inp_processing_duration: Math.round(attribution.processingDuration),
          inp_presentation_delay: Math.round(attribution.presentationDelay),
        });
      });
    });
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
