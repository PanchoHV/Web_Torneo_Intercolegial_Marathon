import { ArrowLeft, Mail, Phone, Save, SendHorizontal, UserRound } from 'lucide-react';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { formatDateTime } from '@/lib/auth/adminFormatters';
import {
  addRegistrationNote,
  fetchActiveAdminUsers,
  fetchRegistrationById,
  fetchRegistrationNotes,
  markRegistrationAsContacted,
  resendRegistrationEmails,
  updateRegistration,
} from '@/services/admin/registrations';
import {
  INTERNAL_PRIORITY_OPTIONS,
  ONBOARDING_STATUS_OPTIONS,
  type AdminRegistration,
  type AdminUserProfile,
  type OnboardingNote,
  type OnboardingStatus,
} from '@/types/admin';

function toDateTimeLocal(value: string | null) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  const pad = (segment: number) => String(segment).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function OnboardingDetail() {
  const { id } = useParams();
  const { canManage } = useAdminAuth();
  const [registration, setRegistration] = useState<AdminRegistration | null>(null);
  const [notes, setNotes] = useState<OnboardingNote[]>([]);
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postingNote, setPostingNote] = useState(false);
  const [resending, setResending] = useState(false);
  const [markingContact, setMarkingContact] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>('new');
  const [assignedTo, setAssignedTo] = useState('');
  const [internalPriority, setInternalPriority] = useState('');
  const [lastContactAt, setLastContactAt] = useState('');

  const loadDetail = useCallback(async () => {
    if (!id) {
      return;
    }

    setLoading(true);
    try {
      setError(null);
      const [registrationData, notesData, usersData] = await Promise.all([
        fetchRegistrationById(id),
        fetchRegistrationNotes(id),
        fetchActiveAdminUsers(),
      ]);

      setRegistration(registrationData);
      setNotes(notesData);
      setUsers(usersData);
      setOnboardingStatus(registrationData.onboarding_status);
      setAssignedTo(registrationData.assigned_to ?? '');
      setInternalPriority(registrationData.internal_priority ?? '');
      setLastContactAt(toDateTimeLocal(registrationData.last_contact_at));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el registro.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  const assigneeLabel = useMemo(() => {
    if (!registration?.assigned_to) {
      return 'Sin asignar';
    }

    const assignee = users.find((user) => user.id === registration.assigned_to);
    return assignee?.full_name || assignee?.email || 'Usuario interno';
  }, [registration?.assigned_to, users]);

  if (!id) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-white p-6 text-red-700 shadow-card">
        Registro inválido.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-6 shadow-card">
        Cargando inscripción...
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-white p-6 text-red-700 shadow-card">
        No se encontró la inscripción solicitada.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Button asChild variant="outline" className="rounded-full border-marathon-blue/15 text-marathon-blue">
            <Link to="/admin/onboarding">
              <ArrowLeft size={16} />
              Volver al listado
            </Link>
          </Button>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/60">
            Detalle de inscripción
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.02em] text-marathon-blue">
            {registration.school_name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-marathon-gray">
            Responsable: {registration.contact_name} · {registration.contact_email}
          </p>
        </div>

        <div className="grid gap-3 lg:min-w-[280px]">
          <div className="flex items-center justify-between rounded-2xl border border-marathon-blue/10 bg-marathon-ice px-4 py-3">
            <span className="text-sm font-semibold text-marathon-gray">Onboarding</span>
            <StatusBadge status={registration.onboarding_status} />
          </div>
          <div className="rounded-2xl border border-marathon-blue/10 bg-white px-4 py-3 text-sm text-marathon-gray">
            <p><strong className="text-marathon-blue">Asignado a:</strong> {assigneeLabel}</p>
            <p className="mt-1"><strong className="text-marathon-blue">Registro:</strong> {formatDateTime(registration.created_at)}</p>
            <p className="mt-1"><strong className="text-marathon-blue">Actualizado:</strong> {formatDateTime(registration.updated_at)}</p>
          </div>
        </div>
      </section>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {successMessage && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {successMessage}
        </p>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <DataSection
            title="Datos institucionales"
            items={[
              ['Institución', registration.school_name],
              ['Dirección', registration.school_address],
              ['Ciudad', registration.city],
              ['Tipo de colegio', registration.school_type],
              ['Fuente', registration.source || '—'],
            ]}
          />

          <DataSection
            title="Persona responsable"
            items={[
              ['Nombre', registration.contact_name],
              ['Cargo', registration.applicant_role],
              ['Correo', registration.contact_email],
              ['Teléfono', registration.contact_phone],
              ['Cédula', registration.contact_id_number],
            ]}
          />

          <DataSection
            title="Historial básico"
            items={[
              ['Fecha de registro', formatDateTime(registration.created_at)],
              ['Último contacto', formatDateTime(registration.last_contact_at)],
              ['Correo al participante', registration.email_to_applicant_sent ? 'Enviado' : 'Pendiente'],
              ['Correo al ejecutivo', registration.email_to_executive_sent ? 'Enviado' : 'Pendiente'],
              ['Status público', registration.status],
            ]}
          />
        </div>

        <div className="grid gap-6">
          <section className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
            <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">
              Gestión interna
            </h3>
            <div className="mt-5 grid gap-4">
              <Field label="Onboarding status">
                <Select
                  value={onboardingStatus}
                  onValueChange={(value) => setOnboardingStatus(value as OnboardingStatus)}
                  disabled={!canManage}
                >
                  <SelectTrigger className="h-11 w-full rounded-2xl border-marathon-blue/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-2xl border-marathon-blue/10">
                    {ONBOARDING_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Asignar a">
                <Select value={assignedTo || '__none__'} onValueChange={(value) => setAssignedTo(value === '__none__' ? '' : value)} disabled={!canManage}>
                  <SelectTrigger className="h-11 w-full rounded-2xl border-marathon-blue/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-2xl border-marathon-blue/10">
                    <SelectItem value="__none__">Sin asignar</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Prioridad interna">
                <Select value={internalPriority || '__none__'} onValueChange={(value) => setInternalPriority(value === '__none__' ? '' : value)} disabled={!canManage}>
                  <SelectTrigger className="h-11 w-full rounded-2xl border-marathon-blue/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-2xl border-marathon-blue/10">
                    <SelectItem value="__none__">Sin prioridad</SelectItem>
                    {INTERNAL_PRIORITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Último contacto">
                <Input
                  type="datetime-local"
                  value={lastContactAt}
                  onChange={(event) => setLastContactAt(event.target.value)}
                  className="h-11 rounded-2xl border-marathon-blue/10"
                  disabled={!canManage}
                />
              </Field>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-full bg-marathon-red text-white shadow-button hover:bg-marathon-red/90"
                  disabled={!canManage || saving}
                  onClick={async () => {
                    setSaving(true);
                    setError(null);
                    setSuccessMessage(null);
                    try {
                      await updateRegistration({
                        registrationId: registration.id,
                        onboardingStatus,
                        assignedTo: assignedTo || null,
                        internalPriority: internalPriority || null,
                        lastContactAt: lastContactAt ? new Date(lastContactAt).toISOString() : null,
                      });
                      await loadDetail();
                    } catch (saveError) {
                      setError(
                        saveError instanceof Error
                          ? saveError.message
                          : 'No se pudo guardar el cambio.'
                      );
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  <Save size={16} />
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={!canManage || resending}
                  onClick={async () => {
                    setResending(true);
                    setError(null);
                    setSuccessMessage(null);
                    try {
                      await resendRegistrationEmails(registration.id);
                      setSuccessMessage('Correos reenviados correctamente.');
                      await loadDetail();
                    } catch (resendError) {
                      setError(
                        resendError instanceof Error
                          ? resendError.message
                          : 'No se pudieron reenviar los correos.'
                      );
                    } finally {
                      setResending(false);
                    }
                  }}
                >
                  <Mail size={16} />
                  {resending ? 'Reenviando...' : 'Reenviar correo'}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={!canManage || markingContact}
                  onClick={async () => {
                    setMarkingContact(true);
                    setError(null);
                    setSuccessMessage(null);
                    try {
                      await markRegistrationAsContacted(registration.id);
                      setSuccessMessage('Contacto registrado correctamente.');
                      await loadDetail();
                    } catch (contactError) {
                      setError(
                        contactError instanceof Error
                          ? contactError.message
                          : 'No se pudo registrar el contacto.'
                      );
                    } finally {
                      setMarkingContact(false);
                    }
                  }}
                >
                  <Phone size={16} />
                  {markingContact ? 'Registrando...' : 'Marcar contacto realizado'}
                </Button>
              </div>

              {!canManage && (
                <p className="text-sm font-semibold text-marathon-gray">
                  Tu rol es de solo lectura. Puedes revisar el caso, pero no modificarlo.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <UserRound size={18} className="text-marathon-blue" />
              <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">
                Notas internas
              </h3>
            </div>

            {canManage && (
              <div className="mt-5 grid gap-3">
                <Textarea
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Agrega contexto interno para el equipo de onboarding..."
                  className="min-h-28 rounded-2xl border-marathon-blue/10 px-4 py-3"
                />
                <div className="flex justify-end">
                  <Button
                    className="rounded-full bg-marathon-blue text-white hover:bg-marathon-blue/90"
                    disabled={postingNote || noteDraft.trim().length < 3}
                    onClick={async () => {
                      setPostingNote(true);
                      try {
                        await addRegistrationNote(registration.id, noteDraft.trim());
                        setNoteDraft('');
                        await loadDetail();
                      } catch (noteError) {
                        setError(
                          noteError instanceof Error
                            ? noteError.message
                            : 'No se pudo guardar la nota.'
                        );
                      } finally {
                        setPostingNote(false);
                      }
                    }}
                  >
                    <SendHorizontal size={16} />
                    {postingNote ? 'Guardando...' : 'Agregar nota'}
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {notes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-marathon-blue/15 bg-marathon-ice/55 px-4 py-5 text-sm text-marathon-gray">
                  Aún no hay notas internas para esta inscripción.
                </div>
              ) : (
                notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-2xl border border-marathon-blue/10 bg-marathon-ice/45 px-4 py-4"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-bold text-marathon-blue">{note.author_email}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-marathon-blue/55">
                        {formatDateTime(note.created_at)}
                      </p>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-marathon-gray">
                      {note.note}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function DataSection({
  title,
  items,
}: {
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <section className="rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
      <h3 className="text-xl font-black uppercase tracking-[0.02em] text-marathon-blue">{title}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-marathon-blue/10 bg-marathon-ice/35 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/55">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-marathon-blue">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
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
