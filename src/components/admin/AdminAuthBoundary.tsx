import { Outlet } from 'react-router';

import { AdminAuthProvider } from '@/lib/auth/adminAuth';

/**
 * Monta la sesión del panel solo bajo /admin. El proveedor arrastra el cliente
 * de Supabase (~50 KB gzip), que el sitio público no necesita para pintar.
 */
export default function AdminAuthBoundary() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}
