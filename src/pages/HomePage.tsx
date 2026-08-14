import { useEffect } from 'react';

import CTAFinal from '@/sections/CTAFinal';
import ComoInscribirse from '@/sections/ComoInscribirse';
import Comunicacion from '@/sections/Comunicacion';
import FAQ from '@/sections/FAQ';
import Hero from '@/sections/Hero';
import SmartCopaBar from '@/sections/home/SmartCopaBar';
import SponsorsSection from '@/sections/home/SponsorsSection';
import SedesCalendario from '@/sections/SedesCalendario';
import SobreElTorneo from '@/sections/SobreElTorneo';
import Tutoriales from '@/sections/Tutoriales';

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
      <SobreElTorneo />
      <SedesCalendario />
      <ComoInscribirse />
      <Tutoriales />
      <Comunicacion />
      <FAQ />
      <CTAFinal />
    </>
  );
}
