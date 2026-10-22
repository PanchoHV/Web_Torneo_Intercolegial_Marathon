import { useEffect } from 'react';

import AboutCopaSection from '@/sections/home/AboutCopaSection';
import FaqSection from '@/sections/home/FaqSection';
import FanAppSection from '@/sections/home/FanAppSection';
import InsuranceBannerSection from '@/sections/home/InsuranceBannerSection';
import RegionStatusSection from '@/sections/home/RegionStatusSection';
import SponsorsSection from '@/sections/home/SponsorsSection';
import VenuesByRegionSection from '@/sections/home/VenuesByRegionSection';

/**
 * Secciones de la home que quedan bajo el pliegue. Se cargan juntas, en un solo
 * chunk y una sola frontera de Suspense: así se montan en el mismo commit y los
 * ScrollTrigger de GSAP miden un layout ya completo.
 */
export default function HomeBelowFold() {
  useEffect(() => {
    // Un enlace externo con hash (`/#sobre-la-copa`) llega antes de que exista el destino.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <SponsorsSection />
      <AboutCopaSection />
      <RegionStatusSection />
      <InsuranceBannerSection />
      <VenuesByRegionSection />
      <FanAppSection />
      <FaqSection />
    </>
  );
}
