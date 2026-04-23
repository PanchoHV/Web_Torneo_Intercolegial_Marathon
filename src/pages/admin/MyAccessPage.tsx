import { KeyRound, ShieldCheck } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { updateOwnPassword } from '@/services/admin/auth';

export default function MyAccessPage() {
  const { profile } = useAdminAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/60">
            Mi acceso
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.02em] text-marathon-blue">
            Seguridad de tu cuenta
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marathon-gray">
            Cada integrante del equipo administra su propia clave. Si recibiste una contraseña
            temporal, cámbiala aquí apenas ingreses.
          </p>

          <div className="mt-6 rounded-[1.25rem] border border-marathon-blue/10 bg-marathon-cream/60 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/60">
              Usuario activo
            </p>
            <p className="mt-2 text-lg font-bold text-marathon-blue">
              {profile?.full_name || 'Usuario interno'}
            </p>
            <p className="mt-1 text-sm text-marathon-gray">{profile?.email}</p>
            <p className="mt-1 text-sm text-marathon-gray">Rol: {profile?.role}</p>
          </div>
        </div>

        <section className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-6 shadow-card">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-marathon-blue text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">
                Cambiar contraseña
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-marathon-gray">
                Usa una clave de al menos 8 caracteres. Idealmente combina mayúsculas, minúsculas,
                números y símbolos.
              </p>
            </div>
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError(null);
              setSuccess(null);

              if (newPassword.trim().length < 8) {
                setError('La nueva contraseña debe tener al menos 8 caracteres.');
                return;
              }

              if (newPassword !== confirmPassword) {
                setError('La confirmación no coincide con la nueva contraseña.');
                return;
              }

              setSubmitting(true);

              try {
                await updateOwnPassword(newPassword.trim());
                setSuccess('Tu contraseña se actualizó correctamente.');
                setNewPassword('');
                setConfirmPassword('');
              } catch (submitError) {
                setError(
                  submitError instanceof Error
                    ? submitError.message
                    : 'No se pudo actualizar tu contraseña.'
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Field label="Nueva contraseña">
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="h-11 rounded-2xl border-marathon-blue/10"
                autoComplete="new-password"
                required
              />
            </Field>

            <Field label="Confirmar contraseña">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repite la nueva contraseña"
                className="h-11 rounded-2xl border-marathon-blue/10"
                autoComplete="new-password"
                required
              />
            </Field>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {success}
              </p>
            )}

            <Button
              type="submit"
              className="rounded-full bg-marathon-red text-white shadow-button hover:bg-marathon-red/90"
              disabled={submitting}
            >
              <KeyRound size={16} />
              {submitting ? 'Actualizando...' : 'Guardar nueva contraseña'}
            </Button>
          </form>
        </section>
      </section>
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
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/65">
        {label}
      </span>
      {children}
    </label>
  );
}
