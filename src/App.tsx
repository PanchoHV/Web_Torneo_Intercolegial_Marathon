import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import ScrollToTop from '@/components/ScrollToTop';
import RouteAnalytics from '@/components/analytics/RouteAnalytics';
import PublicLayout from '@/components/layout/PublicLayout';
import HomePage from '@/pages/HomePage';
import FAQPage from '@/pages/FAQPage';
import FanAppPage from '@/pages/FanAppPage';
import LaCopaPage from '@/pages/LaCopaPage';
import InscripcionesPage from '@/pages/InscripcionesPage';
import AdminLogin from '@/pages/admin/Login';
import AuditPage from '@/pages/admin/AuditPage';
import MyAccessPage from '@/pages/admin/MyAccessPage';
import OnboardingDashboard from '@/pages/admin/OnboardingDashboard';
import OnboardingDetail from '@/pages/admin/OnboardingDetail';
import UsersPage from '@/pages/admin/UsersPage';
import SedesPage from '@/pages/SedesPage';

function App() {
  return (
    <>
      <RouteAnalytics />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="la-copa" element={<LaCopaPage />} />
          <Route path="sedes" element={<SedesPage />} />
          <Route path="preinscripciones" element={<InscripcionesPage />} />
          <Route path="fan-app" element={<FanAppPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="inscripciones" element={<InscripcionesPage />} />
        </Route>
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
          <Route path="/admin/onboarding" element={<OnboardingDashboard />} />
          <Route path="/admin/onboarding/:id" element={<OnboardingDetail />} />
          <Route path="/admin/mi-acceso" element={<MyAccessPage />} />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedAdminRoute allowedRoles={['admin']}>
                <UsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/auditoria"
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
