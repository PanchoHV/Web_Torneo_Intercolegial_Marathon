import { zodResolver } from '@hookform/resolvers/zod';
import {
  Building2,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { type ReactNode, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import TurnstileChallenge, {
  type TurnstileChallengeHandle,
} from '@/components/registrations/TurnstileChallenge';
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
  CITY_OPTIONS,
  DELEGATE_ROLE_OPTIONS,
  SCHOOL_TYPE_OPTIONS,
} from '@/lib/constants/registrationOptions';
import {
  registrationSchema,
  type RegistrationSchemaValues,
} from '@/lib/validations/registrationSchema';
import { normalizeDigits, normalizePhone, normalizeText } from '@/lib/utils/formFormatters';
import { createRegistration } from '@/services/registrations/createRegistration';
import type { RegistrationResult } from '@/types/registration';

type RegistrationFormProps = {
  onSubmitSuccess: (result: RegistrationResult) => void;
};

export default function RegistrationForm({ onSubmitSuccess }: RegistrationFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileState, setTurnstileState] = useState<'loading' | 'ready' | 'verified' | 'error'>(
    'loading'
  );
  const turnstileRef = useRef<TurnstileChallengeHandle | null>(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const hasTurnstile = Boolean(turnstileSiteKey);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm<RegistrationSchemaValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      institutionName: '',
      institutionAddress: '',
      delegateName: '',
      delegateRole: undefined,
      schoolType: undefined,
      delegateId: '',
      email: '',
      phone: '',
      city: undefined,
      termsAccepted: false,
      website: '',
      turnstileToken: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    if (hasTurnstile) {
      if (!turnstileReady) {
        setTurnstileState('loading');
        setSubmitError(
          'La verificación de seguridad aún se está cargando. Intenta nuevamente en un momento.'
        );
        return;
      }

      if (!turnstileToken) {
        setTurnstileState('error');
        setSubmitError('Completa la verificación de seguridad antes de enviar.');
        return;
      }
    }

    try {
      const result = await createRegistration({
        ...values,
        institutionName: normalizeText(values.institutionName),
        institutionAddress: normalizeText(values.institutionAddress),
        delegateName: normalizeText(values.delegateName),
        delegateId: normalizeDigits(values.delegateId),
        phone: normalizePhone(values.phone),
        website: values.website?.trim() || '',
        turnstileToken,
      });

      reset();
      setTurnstileToken('');
      setValue('turnstileToken', '');
      turnstileRef.current?.reset();
      if (hasTurnstile) {
        setTurnstileState('ready');
      }
      onSubmitSuccess(result);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
      if (hasTurnstile) {
        setTurnstileToken('');
        setValue('turnstileToken', '');
        turnstileRef.current?.reset();
        setTurnstileState('error');
      }
    }
  });

  return (
    <section
      id="formulario-inscripcion"
      className="overflow-hidden rounded-[1.25rem] border border-marathon-blue/10 bg-white shadow-card sm:rounded-[1.5rem]"
    >
      <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
        <aside className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_100%)] p-4 text-white sm:p-7 lg:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:46px_46px] opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-marathon-red" />
          <div className="relative">
            <h2 className="text-[clamp(1.35rem,3vw,2.35rem)] font-black uppercase leading-tight tracking-[0.02em]">
              Inscribe a tu colegio
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/82 sm:mt-3 sm:text-base">
              Toma menos de dos minutos. Necesitamos los datos del colegio y de la persona
              responsable para dar seguimiento.
            </p>

            <div className="mt-6 hidden gap-3 sm:grid">
              {[
                { icon: Building2, text: 'Datos oficiales del colegio' },
                { icon: UserRound, text: 'Persona responsable autorizada' },
                { icon: LockKeyhole, text: 'Uso exclusivo para contacto oficial' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-sm font-semibold"
                >
                  <item.icon size={18} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <form
          className="grid gap-5 bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FBFE_100%)] p-4 sm:gap-6 sm:p-7 lg:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
            {...register('website')}
          />
          <input type="hidden" {...register('turnstileToken')} />

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Nombre completo del Colegio"
              error={errors.institutionName?.message}
              required
            >
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Unidad Educativa Marathon"
                {...register('institutionName', { setValueAs: normalizeText })}
              />
            </Field>

            <Field label="Ciudad" error={errors.city?.message} required>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <SelectField
                    options={CITY_OPTIONS}
                    placeholder="Selecciona la ciudad"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              label="Dirección del colegio"
              error={errors.institutionAddress?.message}
              required
            >
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Av. principal, sector, referencia"
                {...register('institutionAddress', { setValueAs: normalizeText })}
              />
            </Field>

            <Field
              label="Nombre de la persona encargada"
              error={errors.delegateName?.message}
              required
            >
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Nombre y apellido"
                {...register('delegateName', { setValueAs: normalizeText })}
              />
            </Field>

            <Field label="Cargo del solicitante" error={errors.delegateRole?.message} required>
              <Controller
                control={control}
                name="delegateRole"
                render={({ field }) => (
                  <SelectField
                    options={DELEGATE_ROLE_OPTIONS}
                    placeholder="Selecciona el cargo"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field label="Tipo de Colegio" error={errors.schoolType?.message} required>
              <Controller
                control={control}
                name="schoolType"
                render={({ field }) => (
                  <SelectField
                    options={SCHOOL_TYPE_OPTIONS}
                    placeholder="Selecciona el tipo"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              label="Cédula de la persona a cargo"
              error={errors.delegateId?.message}
              required
            >
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                inputMode="numeric"
                maxLength={10}
                onInput={(event) => {
                  event.currentTarget.value = normalizeDigits(event.currentTarget.value);
                }}
                placeholder="10 dígitos"
                {...register('delegateId', { setValueAs: normalizeDigits })}
              />
            </Field>

            <Field
              label="Celular de la persona encargada"
              error={errors.phone?.message}
              required
            >
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                inputMode="tel"
                maxLength={10}
                onInput={(event) => {
                  event.currentTarget.value = normalizePhone(event.currentTarget.value);
                }}
                placeholder="0998887777"
                {...register('phone', { setValueAs: normalizePhone })}
              />
            </Field>

            <Field
              label="Correo de la persona encargada"
              error={errors.email?.message}
              required
              className="md:col-span-2"
            >
              <Input
                type="email"
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="encargado@colegio.edu.ec"
                {...register('email')}
              />
            </Field>
          </div>

          <div className="rounded-2xl border border-marathon-blue/10 bg-white p-4 shadow-[0_10px_28px_rgba(6,42,79,0.05)]">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-marathon-red"
                {...register('termsAccepted')}
              />
              <span className="text-sm leading-relaxed text-marathon-gray">
                Acepto que Marathon utilice estos datos para gestionar la inscripción y el
                contacto oficial del torneo.
              </span>
            </label>
            {errors.termsAccepted?.message && (
              <p className="mt-2 text-xs font-semibold text-red-600">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          {hasTurnstile && turnstileSiteKey ? (
            <div className="rounded-2xl border border-marathon-blue/10 bg-white p-4 shadow-[0_10px_28px_rgba(6,42,79,0.05)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-marathon-blue">
                    Verificación final antes del envío
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-marathon-gray">
                    Protegido por Cloudflare para reducir bots, spam y envíos automáticos.
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                    turnstileState === 'verified'
                      ? 'bg-emerald-50 text-emerald-700'
                      : turnstileState === 'error'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-marathon-blue/8 text-marathon-blue'
                  }`}
                >
                  {turnstileState === 'verified' ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <ShieldCheck size={14} />
                  )}
                  {turnstileState === 'loading'
                    ? 'Protección cargando'
                    : turnstileState === 'verified'
                    ? 'Formulario protegido'
                    : turnstileState === 'error'
                    ? 'Verificación pendiente'
                    : 'Protección activa'}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-marathon-blue/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F6FAFF_100%)] p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-marathon-blue text-white">
                    {turnstileState === 'verified' ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-marathon-blue">
                      {turnstileState === 'verified'
                        ? 'Verificación completada'
                        : turnstileState === 'error'
                        ? 'Completa la verificación para continuar'
                        : 'Protección anti-spam habilitada'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-marathon-gray">
                      {turnstileState === 'verified'
                        ? 'La validación pasó correctamente y el envío puede continuar.'
                        : turnstileState === 'error'
                        ? 'Interactúa con el módulo de seguridad de Cloudflare y luego envía la inscripción.'
                        : 'Utilizamos tecnología anti-spam para asegurarnos de que las inscripciones sean legítimas y evitar registros automáticos.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <TurnstileChallenge
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  onReady={() => {
                    setTurnstileReady(true);
                    setTurnstileState('ready');
                  }}
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    setTurnstileState('verified');
                    setSubmitError(null);
                    setValue('turnstileToken', token, { shouldValidate: false });
                  }}
                  onError={() => {
                    setTurnstileToken('');
                    setValue('turnstileToken', '');
                    setTurnstileState('error');
                    setSubmitError(
                      'No pudimos completar la verificación de seguridad. Intenta nuevamente.'
                    );
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                    setValue('turnstileToken', '');
                    setTurnstileState('ready');
                    setSubmitError(
                      'La verificación de seguridad expiró. Complétala nuevamente antes de enviar.'
                    );
                  }}
                />
              </div>
            </div>
          ) : null}

          {submitError && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-4 border-t border-marathon-blue/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <p className="flex items-center gap-2 text-sm font-medium text-marathon-gray">
              <LockKeyhole size={16} className="text-marathon-blue" />
              Registro seguro para contacto oficial.
            </p>
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-marathon-red px-8 font-montserrat text-base font-bold text-white shadow-button hover:bg-marathon-red/90 sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {isSubmitting ? 'Enviando...' : 'Enviar inscripción'}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-marathon-blue/70">
            <CheckCircle2 size={14} className="text-marathon-red" />
            Quito, Cuenca y Santo Domingo
          </div>
        </form>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
};

function Field({ label, error, children, required, className = '' }: FieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-marathon-blue">
        {label}
        {required && <span className="ml-1 text-marathon-red">*</span>}
      </label>
      {children}
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({
  options,
  placeholder,
  value,
  onValueChange,
}: {
  options: readonly string[];
  placeholder: string;
  value?: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-[3.25rem] w-full rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] focus-visible:ring-marathon-blue/25">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-64 rounded-2xl border-marathon-blue/10">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="rounded-xl py-2.5 font-semibold text-marathon-blue"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
