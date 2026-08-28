import { trackWebVital } from '@/lib/analytics/gtm';

/**
 * Reporte de Core Web Vitals con usuarios reales.
 *
 * La librería se carga con `import()` dinámico y solo después de que la página
 * termina de cargar: medir el rendimiento no debe competir con él. Cada métrica
 * se emite una vez por visita — INP y CLS al final del ciclo de vida, porque
 * hasta entonces su valor puede empeorar.
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  const start = () => {
    void import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const report = (metric: {
        name: string;
        value: number;
        rating: string;
        id: string;
        navigationType: string;
      }) => {
        trackWebVital({
          metric_name: metric.name as 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB',
          // CLS es un ratio pequeño: sin escalar, GA4 lo redondearía a 0.
          metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
          metric_id: metric.id,
          metric_navigation_type: metric.navigationType,
        });
      };

      onCLS(report);
      onFCP(report);
      onINP(report);
      onLCP(report);
      onTTFB(report);
    });
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
