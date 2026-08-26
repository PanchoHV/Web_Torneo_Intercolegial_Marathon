import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate';
import RouteAnalytics from '@/components/analytics/RouteAnalytics';
import PublicLayout from '@/components/layout/PublicLayout';
import PublicRouteSeo, { type PublicSeoPath } from '@/components/seo/PublicRouteSeo';
import HomePage from '@/pages/HomePage';
import AdminLogin from '@/pages/admin/Login';
import AuditPage from '@/pages/admin/AuditPage';
import MyAccessPage from '@/pages/admin/MyAccessPage';
import OnboardingDashboard from '@/pages/admin/OnboardingDashboard';
import OnboardingDetail from '@/pages/admin/OnboardingDetail';
import UsersPage from '@/pages/admin/UsersPage';
const FanAppPage = lazy(() => import('@/pages/FanAppPage'));
const LaCopaPage = lazy(() => import('@/pages/LaCopaPage'));
const InscripcionesPage = lazy(() => import('@/pages/InscripcionesPage'));
const SedesPage = lazy(() => import('@/pages/SedesPage'));

function PublicPage({ path, children }: { path: PublicSeoPath; children: ReactNode }) {
  return (
    <>
      <PublicRouteSeo path={path} />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}

function App() {
  return (
    <>
      <RouteAnalytics />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            index
            element={
              <PublicPage path="/">
                <HomePage />
              </PublicPage>
            }
          />
          <Route
            path="la-copa"
            element={
              <PublicPage path="/la-copa">
                <LaCopaPage />
              </PublicPage>
            }
          />
          <Route
            path="sedes"
            element={
              <PublicPage path="/sedes">
                <SedesPage />
              </PublicPage>
            }
          />
          {/* Alias histórico: la ruta se renombró a /inscripciones, pero se conserva
              para no romper enlaces ya compartidos. */}
          <Route path="preinscripciones" element={<Navigate to="/inscripciones" replace />} />
          <Route
            path="fan-app"
            element={
              <PublicPage path="/fan-app">
                <FanAppPage />
              </PublicPage>
            }
          />
          <Route
            path="inscripciones"
            element={
              <PublicPage path="/inscripciones">
                <InscripcionesPage />
              </PublicPage>
            }
          />
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
      <ScrollToTopOnNavigate />
      <ScrollToTop />
    </>
  );
}

export default App;
