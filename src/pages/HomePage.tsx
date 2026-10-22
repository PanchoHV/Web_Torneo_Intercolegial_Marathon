import { lazy, Suspense, useEffect, useState } from 'react';

import Hero from '@/sections/Hero';
import SmartCopaBar from '@/sections/home/SmartCopaBar';

const HomeBelowFold = lazy(() => import('@/sections/home/HomeBelowFold'));

/** Reserva el alto del resto de la home mientras llega: solo se desplaza el pie. */
function BelowFoldPlaceholder() {
  return <div aria-hidden="true" className="min-h-[250vh]" />;
}

export default function HomePage() {
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // El resto de la home no compite con el Hero: se monta cuando el navegador está libre.
  useEffect(() => {
    const show = () => setBelowFoldReady(true);

    // Safari no implementa requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(show, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(show, 200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Hero />
      <SmartCopaBar />
      {belowFoldReady ? (
        <Suspense fallback={<BelowFoldPlaceholder />}>
          <HomeBelowFold />
        </Suspense>
      ) : (
        <BelowFoldPlaceholder />
      )}
    </>
  );
}
