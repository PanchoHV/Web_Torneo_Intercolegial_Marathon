import { EyeOff, Plus, RefreshCw } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/auth/adminFormatters';
import { fetchActiveAdminUsers } from '@/services/admin/registrations';
import { createAdminUser, deactivateAdminUser } from '@/services/admin/users';
import type { AdminRole, AdminUserProfile } from '@/types/admin';

const roleOptions: Array<{ value: AdminRole; label: string }> = [
  { value: 'admin', label: 'Admin' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'viewer', label: 'Viewer' },
];

const PROTECTED_SUPERADMIN_EMAIL = 'copaintercolegial@fundacionmarathon.com';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('viewer');

  const loadUsers = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      setError(null);
      const data = await fetchActiveAdminUsers();
      setUsers(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar usuarios.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <div className="grid min-w-0 gap-6">
      <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/60">
            Administración interna
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.02em] text-marathon-blue">
            Usuarios del panel
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-marathon-gray">
            Crea accesos internos para el equipo y asigna roles del módulo privado.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-marathon-blue/15 text-marathon-blue"
          onClick={() => void loadUsers(true)}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Actualizar
        </Button>
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-w-0 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
          <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">
            Crear usuario
          </h3>
          <div className="mt-5 grid gap-4">
            <Field label="Nombre completo">
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Nombre del miembro del team"
                className="h-11 rounded-2xl border-marathon-blue/10"
              />
            </Field>

            <Field label="Correo">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="team@dominio.com"
                className="h-11 rounded-2xl border-marathon-blue/10"
              />
            </Field>

            <Field label="Contraseña temporal">
              <Input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="h-11 rounded-2xl border-marathon-blue/10"
              />
            </Field>

            <Field label="Rol">
              <Select value={role} onValueChange={(value) => setRole(value as AdminRole)}>
                <SelectTrigger className="h-11 w-full rounded-2xl border-marathon-blue/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="rounded-2xl border-marathon-blue/10">
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              className="rounded-full bg-marathon-red text-white shadow-button hover:bg-marathon-red/90"
              disabled={submitting}
              onClick={async () => {
                setSubmitting(true);
                setError(null);
                setSuccess(null);

                if (password.trim().length < 8) {
                  setError('La contraseña temporal debe tener al menos 8 caracteres.');
                  setSubmitting(false);
                  return;
                }

                try {
                  const result = await createAdminUser({
                    email: email.trim(),
                    password: password.trim(),
                    fullName: fullName.trim(),
                    role,
                  });

                  const baseMessage = result?.reactivated
                      ? 'Usuario reactivado correctamente.'
                      : result?.created
                      ? 'Usuario creado correctamente.'
                      : 'Usuario existente actualizado correctamente.';

                  setSuccess(
                    result?.inviteEmailSent === false
                      ? `${baseMessage} El correo de acceso no pudo enviarse${result.inviteEmailError ? `: ${result.inviteEmailError}` : '.'}`
                      : `${baseMessage} Se envió el correo de acceso al usuario.`
                  );
                  setEmail('');
                  setFullName('');
                  setPassword('');
                  setRole('viewer');
                  await loadUsers(true);
                } catch (submitError) {
                  setError(
                    submitError instanceof Error
                      ? submitError.message
                      : 'No se pudo crear el usuario.'
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <Plus size={16} />
              {submitting ? 'Guardando...' : 'Crear usuario'}
            </Button>
          </div>
        </div>

        <div className="grid min-w-0 gap-6">
          <section className="min-w-0 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">
                Usuarios activos
              </h3>
              <span className="text-sm font-semibold text-marathon-gray">
                Cada usuario cambia su propia clave desde Mi acceso.
              </span>
            </div>

            <div className="mt-5">
              <Table className="min-w-[760px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Creado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-marathon-gray">
                        Cargando usuarios...
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-marathon-gray">
                        No hay usuarios internos registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.full_name || '—'}</TableCell>
                        <TableCell className="max-w-[220px] whitespace-normal">{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{formatDateTime(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            {user.email.toLowerCase() === PROTECTED_SUPERADMIN_EMAIL ? (
                              <span className="inline-flex items-center rounded-full px-3 text-xs font-bold uppercase tracking-[0.1em] text-marathon-blue/45">
                                Protegido
                              </span>
                            ) : (
                              <Button
                                variant="outline"
                                className="rounded-full text-marathon-blue"
                                onClick={async () => {
                                  const confirmed = window.confirm(
                                    `¿Ocultar el usuario ${user.email}? Ya no podrá entrar al panel.`
                                  );

                                  if (!confirmed) {
                                    return;
                                  }

                                  setError(null);
                                  setSuccess(null);

                                  try {
                                    await deactivateAdminUser(user.id);
                                    setSuccess(`Usuario ${user.email} ocultado correctamente.`);
                                    await loadUsers(true);
                                  } catch (deactivateError) {
                                    setError(
                                      deactivateError instanceof Error
                                        ? deactivateError.message
                                        : 'No se pudo ocultar el usuario.'
                                    );
                                  }
                                }}
                              >
                                <EyeOff size={16} />
                                Ocultar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
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
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/60">
        {label}
      </span>
      {children}
    </label>
  );
}
