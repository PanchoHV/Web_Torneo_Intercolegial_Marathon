import { KeyRound, LogOut, ShieldCheck, TableProperties, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { profile, signOut, isAdmin } = useAdminAuth();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-marathon-cream">
      <div className="border-b border-marathon-blue/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1360px] min-w-0 flex-col gap-4 px-3 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/65">
                Módulo privado
              </p>
              <h1 className="mt-1 break-words text-2xl font-black uppercase tracking-[0.02em] text-marathon-blue">
                Onboarding Intercolegial
              </h1>
              <p className="mt-1 break-words text-sm text-marathon-gray">
                {profile?.full_name || profile?.email} · {profile?.role}
              </p>
            </div>

            <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <Button
                variant="outline"
                className="min-h-11 rounded-full border-marathon-blue/15 text-marathon-blue"
                onClick={() => navigate('/')}
              >
                Ir a la landing
              </Button>
              <Button
                variant="outline"
                className="min-h-11 rounded-full border-marathon-blue/15 text-marathon-blue"
                onClick={() => navigate('/admin/mi-acceso')}
              >
                <KeyRound size={16} />
                Mi acceso
              </Button>
              <Button
                variant="outline"
                className="min-h-11 rounded-full border-marathon-blue/15 text-marathon-blue"
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

          <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <AdminNavLink to="/admin/onboarding" icon={TableProperties} label="Onboarding" />
            <AdminNavLink to="/admin/mi-acceso" icon={KeyRound} label="Mi acceso" />
            {isAdmin && <AdminNavLink to="/admin/usuarios" icon={Users} label="Usuarios" />}
            {isAdmin && <AdminNavLink to="/admin/auditoria" icon={ShieldCheck} label="Auditoría" />}
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1360px] min-w-0 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
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
          'inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition sm:px-4',
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
