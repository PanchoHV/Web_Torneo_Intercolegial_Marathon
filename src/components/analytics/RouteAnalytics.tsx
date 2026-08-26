import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { trackPageView } from '@/lib/analytics/gtm';

const PUBLIC_ROUTES = new Set(['/', '/la-copa', '/sedes', '/inscripciones', '/fan-app']);

export default function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!PUBLIC_ROUTES.has(location.pathname)) return;

    // Espera a que la metadata de la ruta actualice document.title. En
    // StrictMode el primer frame se cancela, evitando un pageview doble en dev.
    const frame = window.requestAnimationFrame(() => {
      trackPageView(location.pathname, document.title);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  return null;
}
