import { useEffect } from 'react';

import Hero from '@/sections/Hero';
import AboutCopaSection from '@/sections/home/AboutCopaSection';
import FaqSection from '@/sections/home/FaqSection';
import FanAppSection from '@/sections/home/FanAppSection';
import RegionStatusSection from '@/sections/home/RegionStatusSection';
import VenuesByRegionSection from '@/sections/home/VenuesByRegionSection';
import SmartCopaBar from '@/sections/home/SmartCopaBar';
import SponsorsSection from '@/sections/home/SponsorsSection';

export default function HomePage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Hero />
      <SmartCopaBar />
      <SponsorsSection />
      <AboutCopaSection />
      <RegionStatusSection />
      <VenuesByRegionSection />
      <FanAppSection />
      <FaqSection />
    </>
  );
}
