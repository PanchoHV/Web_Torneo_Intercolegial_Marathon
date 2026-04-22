import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import SobreElTorneo from '@/sections/SobreElTorneo';
import ComoInscribirse from '@/sections/ComoInscribirse';
import Tutoriales from '@/sections/Tutoriales';
import Comunicacion from '@/sections/Comunicacion';
import Calendario from '@/sections/Calendario';
import FAQ from '@/sections/FAQ';
import CTAFinal from '@/sections/CTAFinal';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import InscripcionesPage from '@/pages/InscripcionesPage';

function HomeLanding() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-marathon-cream">
      <Navigation />
      <main>
        <Hero />
        <SobreElTorneo />
        <ComoInscribirse />
        <Tutoriales />
        <Comunicacion />
        <Calendario />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/inscripciones" element={<InscripcionesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
