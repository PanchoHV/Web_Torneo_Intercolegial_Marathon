import { ShieldCheck } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { fetchAdminProfile, getCurrentSession, signInAdmin, signOutAdmin } from '@/services/admin/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthorized, loading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get('reason') === 'unauthorized'
      ? 'Tu usuario no tiene acceso al módulo privado.'
      : null
  );

  const next = searchParams.get('next') || '/admin/onboarding';

  if (!loading && isAuthorized) {
    return <Navigate to={next} replace />;
  }

  return (
    <div className="min-h-screen bg-marathon-cream px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <section className="relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_100%)] p-6 text-white shadow-[0_24px_60px_rgba(6,42,79,0.28)] sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:46px_46px] opacity-20" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
              Acceso interno
            </p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-black uppercase leading-[1.02] tracking-[0.02em]">
              CRM de onboarding
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/82 sm:text-base">
              Panel privado para seguimiento de instituciones, notas internas, auditoría y exportaciones controladas.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/14">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em]">Acceso seguro</p>
                <p className="mt-1 text-sm text-white/78">
                  Solo usuarios internos con rol activo pueden ingresar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-6 shadow-card sm:p-8">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/60">
              Iniciar sesión
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.02em] text-marathon-blue">
              Equipo onboarding
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-marathon-gray">
              Ingresa con tu correo y contraseña de Supabase Auth.
            </p>
          </div>

          <form
            className="mt-8 grid gap-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setSubmitting(true);
              setError(null);

              try {
                await signInAdmin(email.trim(), password);
                const session = await getCurrentSession();
                const userId = session?.user.id;

                if (!userId) {
                  throw new Error('No se pudo validar la sesión.');
                }

                const profile = await fetchAdminProfile(userId);
                if (!profile) {
                  await signOutAdmin();
                  throw new Error('Tu usuario no tiene acceso activo al módulo privado.');
                }

                navigate(next, { replace: true });
              } catch (submitError) {
                setError(
                  submitError instanceof Error
                    ? submitError.message
                    : 'No se pudo iniciar sesión.'
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Field label="Correo">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="equipo@torneo.com"
                className="h-12 rounded-2xl border-marathon-blue/10 px-4"
                autoComplete="email"
                required
              />
            </Field>

            <Field label="Contraseña">
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-2xl border-marathon-blue/10 px-4"
                autoComplete="current-password"
                required
              />
            </Field>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-12 rounded-full bg-marathon-red font-montserrat text-base font-bold text-white shadow-button hover:bg-marathon-red/90"
              disabled={submitting}
            >
              {submitting ? 'Ingresando...' : 'Entrar al panel'}
            </Button>

            <Link to="/" className="text-sm font-semibold text-marathon-blue hover:text-marathon-red">
              Volver al sitio público
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-marathon-blue">{label}</span>
      {children}
    </label>
  );
}
