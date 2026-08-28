import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate';
import RouteAnalytics from '@/components/analytics/RouteAnalytics';
import PublicLayout from '@/components/layout/PublicLayout';
import PublicRouteSeo, { type PublicSeoPath } from '@/components/seo/PublicRouteSeo';
import HomePage from '@/pages/HomePage';
const FanAppPage = lazy(() => import('@/pages/FanAppPage'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AuditPage = lazy(() => import('@/pages/admin/AuditPage'));
const MyAccessPage = lazy(() => import('@/pages/admin/MyAccessPage'));
const OnboardingDashboard = lazy(() => import('@/pages/admin/OnboardingDashboard'));
const OnboardingDetail = lazy(() => import('@/pages/admin/OnboardingDetail'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const LaCopaPage = lazy(() => import('@/pages/LaCopaPage'));
const InscripcionesPage = lazy(() => import('@/pages/InscripcionesPage'));
const SedesPage = lazy(() => import('@/pages/SedesPage'));

/** Frontera de carga del panel: sin ella un chunk perezoso rompe la ruta. */
function AdminPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

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
        <Route path="/admin/login" element={<AdminPage><AdminLogin /></AdminPage>} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage>
                <AdminLayout />
              </AdminPage>
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/onboarding" replace />} />
          <Route path="/admin/onboarding" element={<AdminPage><OnboardingDashboard /></AdminPage>} />
          <Route path="/admin/onboarding/:id" element={<AdminPage><OnboardingDetail /></AdminPage>} />
          <Route path="/admin/mi-acceso" element={<AdminPage><MyAccessPage /></AdminPage>} />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedAdminRoute allowedRoles={['admin']}>
                <AdminPage>
                  <UsersPage />
                </AdminPage>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/auditoria"
            element={
              <ProtectedAdminRoute allowedRoles={['admin']}>
                <AdminPage>
                  <AuditPage />
                </AdminPage>
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
