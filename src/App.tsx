import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import SobreElTorneo from '@/sections/SobreElTorneo';
import ComoInscribirse from '@/sections/ComoInscribirse';
import SedesCalendario from '@/sections/SedesCalendario';
import Tutoriales from '@/sections/Tutoriales';
import Comunicacion from '@/sections/Comunicacion';
import FAQ from '@/sections/FAQ';
import CTAFinal from '@/sections/CTAFinal';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import RouteAnalytics from '@/components/analytics/RouteAnalytics';
import InscripcionesPage from '@/pages/InscripcionesPage';
import AdminLogin from '@/pages/admin/Login';
import AuditPage from '@/pages/admin/AuditPage';
import MyAccessPage from '@/pages/admin/MyAccessPage';
import OnboardingDashboard from '@/pages/admin/OnboardingDashboard';
import OnboardingDetail from '@/pages/admin/OnboardingDetail';
import UsersPage from '@/pages/admin/UsersPage';

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
        <SedesCalendario />
        <ComoInscribirse />
        <Tutoriales />
        <Comunicacion />
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
      <RouteAnalytics />
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/inscripciones" element={<InscripcionesPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/onboarding" replace />} />
          <Route path="onboarding" element={<OnboardingDashboard />} />
          <Route path="onboarding/:id" element={<OnboardingDetail />} />
          <Route path="mi-acceso" element={<MyAccessPage />} />
          <Route
            path="usuarios"
            element={
              <ProtectedAdminRoute allowedRoles={['admin']}>
                <UsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="auditoria"
            element={
              <ProtectedAdminRoute allowedRoles={['admin']}>
                <AuditPage />
              </ProtectedAdminRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
