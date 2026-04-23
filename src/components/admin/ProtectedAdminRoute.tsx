import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAdminAuth } from '@/lib/auth/adminAuth';
import type { AdminRole } from '@/types/admin';

type ProtectedAdminRouteProps = PropsWithChildren<{
  allowedRoles?: AdminRole[];
}>;

export default function ProtectedAdminRoute({
  children,
  allowedRoles,
}: ProtectedAdminRouteProps) {
  const location = useLocation();
  const { loading, user, profile } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-marathon-cream px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-marathon-blue/10 bg-white p-8 text-center shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-marathon-blue/60">
            Cargando módulo privado
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/admin/login?next=${next}`} replace />;
  }

  if (!profile) {
    return <Navigate to="/admin/login?reason=unauthorized" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/admin/onboarding" replace />;
  }

  return <>{children}</>;
}
