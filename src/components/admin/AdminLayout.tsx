import { KeyRound, LogOut, ShieldCheck, TableProperties, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { profile, signOut, isAdmin } = useAdminAuth();

  return (
    <div className="min-h-screen bg-marathon-cream">
      <div className="border-b border-marathon-blue/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/65">
                Módulo privado
              </p>
              <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em] text-marathon-blue">
                Onboarding Intercolegial
              </h1>
              <p className="mt-1 text-sm text-marathon-gray">
                {profile?.full_name || profile?.email} · {profile?.role}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full border-marathon-blue/15 text-marathon-blue"
                onClick={() => navigate('/')}
              >
                Ir a la landing
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-marathon-blue/15 text-marathon-blue"
                onClick={() => navigate('/admin/mi-acceso')}
              >
                <KeyRound size={16} />
                Mi acceso
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-marathon-blue/15 text-marathon-blue"
                onClick={async () => {
                  await signOut();
                  navigate('/admin/login', { replace: true });
                }}
              >
                <LogOut size={16} />
                Cerrar sesión
              </Button>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            <AdminNavLink to="/admin/onboarding" icon={TableProperties} label="Onboarding" />
            <AdminNavLink to="/admin/mi-acceso" icon={KeyRound} label="Mi acceso" />
            {isAdmin && <AdminNavLink to="/admin/usuarios" icon={Users} label="Usuarios" />}
            {isAdmin && <AdminNavLink to="/admin/auditoria" icon={ShieldCheck} label="Auditoría" />}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

function AdminNavLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof TableProperties;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition',
          isActive
            ? 'border-marathon-red bg-marathon-red text-white shadow-button'
            : 'border-marathon-blue/10 bg-white text-marathon-blue hover:border-marathon-red/30 hover:text-marathon-red'
        )
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}
