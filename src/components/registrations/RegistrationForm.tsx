/* eslint-disable react-hooks/refs */
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronDown,
  Building2,
  CheckCircle2,
  CirclePlay,
  Loader2,
  LockKeyhole,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { type ReactNode, useCallback, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

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
  CITIES_WITH_FULL_QUOTA,
  DELEGATE_ROLE_OPTIONS,
  SCHOOL_TYPE_OPTIONS,
  TOURNAMENT_CATEGORY_OPTIONS,
} from '@/lib/constants/registrationOptions';
import {
  registrationSchema,
  type RegistrationSchemaValues,
} from '@/lib/validations/registrationSchema';
import {
  trackGenerateLead,
  trackRegistrationError,
  trackRegistrationSubmitAttempt,
} from '@/lib/analytics/gtm';
import { getRegionalSchedule } from '@/lib/registrations/regionalSchedule';
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
  const [turnstileErrorCode, setTurnstileErrorCode] = useState<string | null>(null);
  const [turnstileState, setTurnstileState] = useState<'loading' | 'ready' | 'verified' | 'error'>(
    'loading'
  );
  const turnstileRef = useRef<TurnstileChallengeHandle | null>(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const hasTurnstile = Boolean(turnstileSiteKey);

  const getTurnstileMessage = useCallback((errorCode?: string | null) => {
    if (!errorCode) {
      return 'No pudimos completar la verificación de seguridad. Intenta nuevamente.';
    }

    if (errorCode.startsWith('110200')) {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'este dominio';

      return `El captcha no está autorizado para este dominio. Agrega el hostname actual en Cloudflare Turnstile: ${hostname}`;
    }

    if (
      errorCode.startsWith('110100') ||
      errorCode.startsWith('110110') ||
      errorCode.startsWith('400020')
    ) {
      return 'La Site Key de Turnstile no es válida o no coincide con el widget configurado.';
    }

    if (errorCode.startsWith('400070')) {
      return 'La Site Key de Turnstile está deshabilitada en Cloudflare.';
    }

    if (errorCode.startsWith('200500')) {
      return 'El navegador no pudo cargar el challenge de Cloudflare. Revisa extensiones, bloqueadores o restricciones de red.';
    }

    if (errorCode.startsWith('110600') || errorCode.startsWith('110620')) {
      return 'La verificación de seguridad expiró. Complétala nuevamente antes de enviar.';
    }

    return `No pudimos completar la verificación de seguridad. Código Cloudflare: ${errorCode}.`;
  }, []);

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
      categories: [],
      termsAccepted: false,
      website: '',
      turnstileToken: '',
    },
  });

  const selectedCity = useWatch({ control, name: 'city' });
  const selectedSchedule = selectedCity ? getRegionalSchedule(selectedCity) : null;
  const isQuotaFull = selectedCity ? CITIES_WITH_FULL_QUOTA.includes(selectedCity) : false;

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
      trackRegistrationSubmitAttempt({
        city: values.city,
        school_type: values.schoolType,
        categories: values.categories,
      });

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

      trackGenerateLead({
        lead_id: result.id,
        city: values.city,
        school_type: values.schoolType,
        categories: values.categories,
      });

      reset();
      setTurnstileToken('');
      setTurnstileErrorCode(null);
      setValue('turnstileToken', '');
      turnstileRef.current?.reset();
      if (hasTurnstile) {
        setTurnstileState('ready');
      }
      onSubmitSuccess(result);
    } catch (error) {
      trackRegistrationError({
        error_type: error instanceof Error ? error.message.slice(0, 80) : 'unknown_error',
        city: selectedCity,
      });
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
      if (hasTurnstile) {
        setTurnstileToken('');
        setTurnstileErrorCode(null);
        setValue('turnstileToken', '');
        turnstileRef.current?.reset();
        setTurnstileState('error');
      }
    }
  });

  const handleTurnstileReady = useCallback(() => {
    setTurnstileReady(true);
    setTurnstileErrorCode(null);
    setTurnstileState('ready');
  }, []);

  const handleTurnstileVerify = useCallback(
    (token: string) => {
      setTurnstileToken(token);
      setTurnstileErrorCode(null);
      setTurnstileState('verified');
      setSubmitError(null);
      setValue('turnstileToken', token, { shouldValidate: false });
    },
    [setValue]
  );

  const handleTurnstileError = useCallback(
    (errorCode?: string) => {
      setTurnstileToken('');
      setTurnstileErrorCode(errorCode ?? null);
      setValue('turnstileToken', '');
      setTurnstileState('error');
      setSubmitError(getTurnstileMessage(errorCode));
    },
    [getTurnstileMessage, setValue]
  );

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('');
    setTurnstileErrorCode(null);
    setValue('turnstileToken', '');
    setTurnstileState('ready');
    setSubmitError('La verificación de seguridad expiró. Complétala nuevamente antes de enviar.');
  }, [setValue]);

  return (
    <section
      id="formulario-inscripcion"
      className="min-w-0 overflow-hidden rounded-[1.25rem] border border-marathon-blue/10 bg-white shadow-card sm:rounded-[1.5rem]"
    >
      <div className="grid min-w-0 lg:grid-cols-[0.62fr_1.38fr]">
        <aside className="relative min-w-0 overflow-hidden bg-[linear-gradient(180deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_100%)] p-4 text-white sm:p-7 lg:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:46px_46px] opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-marathon-red" />
          <div className="relative">
            <h2 className="max-w-full break-words text-[1.18rem] font-black uppercase leading-tight tracking-[0.01em] sm:text-[clamp(1.35rem,3vw,2.35rem)] sm:tracking-[0.02em]">
              Inscribe a tu colegio
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/82 sm:mt-3 sm:text-base">
              Déjanos tus datos y los de tu colegio para contactarte y asesorarte en el proceso de inscripción.
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
          className="grid min-w-0 gap-4 bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FBFE_100%)] p-2 sm:gap-6 sm:p-7 lg:p-8"
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

          <div className="grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2">
            <Field
              label="Nombre completo del Colegio"
              error={errors.institutionName?.message}
              required
            >
              <Input
                disabled={isQuotaFull}
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {selectedSchedule && (
              <div className="md:col-span-2 rounded-2xl border border-marathon-blue/10 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-marathon-blue">
                <strong>{selectedSchedule.region}:</strong> {selectedSchedule.calendarMessage}{' '}
                Inscripciones previstas desde el <strong>{selectedSchedule.inscriptionStart}</strong>{' '}
                y partidos desde el <strong>{selectedSchedule.matchStart}</strong>. Fechas sujetas a
                confirmación oficial.
              </div>
            )}

            {isQuotaFull && (
              <div className="md:col-span-2 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700 font-semibold flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Lo sentimos, los cupos para esta ciudad están llenos.
              </div>
            )}

            <Field
              label="Dirección del colegio"
              error={errors.institutionAddress?.message}
              required
            >
              <Input
                disabled={isQuotaFull}
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isQuotaFull}
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={isQuotaFull}
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
                    disabled={isQuotaFull}
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
                disabled={isQuotaFull}
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isQuotaFull}
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isQuotaFull}
                type="email"
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="encargado@colegio.edu.ec"
                {...register('email')}
              />
            </Field>

            <Field
              label="Categorías del torneo"
              error={errors.categories?.message}
              required
              className="md:col-span-2"
            >
              <Controller
                control={control}
                name="categories"
                render={({ field }) => (
                  <CategoryMultiSelect
                    options={TOURNAMENT_CATEGORY_OPTIONS}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    disabled={isQuotaFull}
                  />
                )}
              />
            </Field>
          </div>

          <div className="rounded-2xl border border-marathon-blue/10 bg-white p-3 shadow-[0_10px_28px_rgba(6,42,79,0.05)] sm:p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                disabled={isQuotaFull}
                className="mt-1 h-4 w-4 shrink-0 accent-marathon-red disabled:opacity-50 disabled:cursor-not-allowed"
                {...register('termsAccepted')}
              />
              <span className="min-w-0 flex-1 break-words text-sm leading-relaxed text-marathon-gray">
                Acepto que la Copa Intercolegial organizada por la fundación Marathon utilice estos datos para gestionar la inscripción y el contrato oficial del torneo.
              </span>
            </label>
            {errors.termsAccepted?.message && (
              <p className="mt-2 text-xs font-semibold text-red-600">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          {hasTurnstile && turnstileSiteKey ? (
            <div className="min-w-0 rounded-2xl border border-marathon-blue/10 bg-white p-2 shadow-[0_10px_28px_rgba(6,42,79,0.05)] sm:p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-marathon-blue">
                    Verificación de envío seguro.
                  </p>
                  <p className="mt-1 break-words text-sm leading-relaxed text-marathon-gray">
                    Protegido por Cloudflare para evitar spam y proteger tu envío.
                  </p>
                </div>

                <div
                  className={`inline-flex max-w-full items-center gap-2 self-start rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] ${
                    turnstileState === 'verified'
                      ? 'bg-emerald-50 text-emerald-700'
                      : turnstileState === 'error'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-marathon-blue/8 text-marathon-blue'
                  }`}
                >
                  {turnstileState === 'verified' ? (
                    <CheckCircle2 size={14} className="shrink-0" />
                  ) : (
                    <ShieldCheck size={14} className="shrink-0" />
                  )}
                  <span className="min-w-0 truncate">
                    {turnstileState === 'loading'
                      ? 'Protección cargando'
                      : turnstileState === 'verified'
                      ? 'Formulario protegido'
                      : turnstileState === 'error'
                      ? 'Verificación pendiente'
                      : 'Protección activa'}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-marathon-blue/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F6FAFF_100%)] p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-marathon-blue text-white">
                    {turnstileState === 'verified' ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold text-marathon-blue">
                      {turnstileState === 'verified'
                        ? 'Verificación completada'
                        : turnstileState === 'error'
                        ? 'Completa la verificación para continuar'
                        : 'Protección anti-spam habilitada'}
                    </p>
                    <p className="mt-1 break-words text-sm leading-relaxed text-marathon-gray">
                      {turnstileState === 'verified'
                        ? 'La validación pasó correctamente y el envío puede continuar.'
                        : turnstileState === 'error'
                        ? 'Interactúa con el módulo de seguridad de Cloudflare y luego envía la inscripción.'
                        : 'Utilizamos tecnología anti-spam para asegurarnos de que las inscripciones sean legítimas y evitar registros automáticos.'}
                    </p>
                    {turnstileErrorCode && (
                      <p className="mt-2 text-xs font-semibold text-red-600">
                        Código de verificación: {turnstileErrorCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="-mx-2 mt-4 max-w-none overflow-x-auto sm:mx-0 sm:max-w-full">
                <TurnstileChallenge
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  onReady={handleTurnstileReady}
                  onVerify={handleTurnstileVerify}
                  onError={handleTurnstileError}
                  onExpire={handleTurnstileExpire}
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
            <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-marathon-gray">
              <LockKeyhole size={16} className="shrink-0 text-marathon-blue" />
              Registro seguro para contacto oficial.
            </p>
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-marathon-red px-8 font-montserrat text-base font-bold text-white shadow-button hover:bg-marathon-red/90 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || isQuotaFull}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {isSubmitting ? 'Enviando...' : 'Enviar inscripción'}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-marathon-blue/70">
            <CheckCircle2 size={14} className="text-marathon-red" />
            Costa, Sierra y Amazonía
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
    <div className={`min-w-0 space-y-2 ${className}`}>
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
  disabled = false,
}: {
  options:
    | readonly string[]
    | ReadonlyArray<{
        region: string;
        options: readonly string[];
      }>;
  placeholder: string;
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}) {
  const groupedOptions = options.every((option) => typeof option !== 'string')
    ? (options as ReadonlyArray<{ region: string; options: readonly string[] }>)
    : null;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="h-[3.25rem] w-full min-w-0 rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] focus-visible:ring-marathon-blue/25 [&>span]:min-w-0 [&>span]:truncate disabled:opacity-50 disabled:cursor-not-allowed">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-64 max-w-[calc(100vw-1rem)] rounded-2xl border-marathon-blue/10">
        {groupedOptions
          ? groupedOptions.map((group) => (
              <div key={group.region} className="px-1 py-1.5">
                <div className="px-2 pb-1 text-[0.7rem] font-black uppercase tracking-[0.12em] text-marathon-blue/55">
                  {group.region}
                </div>
                <div className="grid gap-1">
                  {group.options.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="rounded-xl py-2.5 font-semibold text-marathon-blue"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </div>
              </div>
            ))
          : (options as readonly string[]).map((option) => (
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

function CategoryMultiSelect({
  options,
  value,
  onChange,
  disabled = false,
}: {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}) {
  const selected = new Set(value);

  const toggleOption = (option: string) => {
    if (disabled) return;
    if (selected.has(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    onChange([...value, option]);
  };

  return (
    <div className="rounded-[1.4rem] border border-marathon-blue/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F6FAFF_100%)] p-3 shadow-[0_12px_30px_rgba(6,42,79,0.05)] sm:p-4">
      <div className="mb-3 flex items-start gap-3 rounded-2xl border border-marathon-blue/10 bg-white/90 p-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-marathon-blue text-white shadow-[0_10px_24px_rgba(0,80,164,0.22)]">
          <CirclePlay size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-semibold text-marathon-blue">
            Selecciona una o varias categorías
          </p>
          <p className="mt-1 break-words text-sm leading-relaxed text-marathon-gray">
            Marca todas las categorías en las que tu colegio desea participar.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => {
          const isSelected = selected.has(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              disabled={disabled}
              aria-pressed={isSelected}
              className={`group flex min-h-[84px] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed border-marathon-blue/10 bg-white'
                  : isSelected
                  ? 'border-emerald-500/45 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.98))] shadow-[0_16px_32px_rgba(16,185,129,0.14)]'
                  : 'border-marathon-blue/10 bg-white hover:-translate-y-0.5 hover:border-marathon-blue/25 hover:shadow-[0_14px_28px_rgba(6,42,79,0.08)]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black uppercase tracking-[0.08em] text-marathon-blue/45">
                  Categoria
                </div>
                <div className="mt-1 text-sm font-bold leading-snug text-marathon-blue">
                  {option}
                </div>
              </div>

              <div
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-marathon-blue/15 bg-marathon-blue/[0.04] text-marathon-blue'
                }`}
              >
                {isSelected ? <CheckCircle2 size={18} /> : <ChevronDown size={16} />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {value.length > 0 ? (
          value.map((item) => (
            <span
              key={item}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700"
            >
              <CheckCircle2 size={13} />
              <span className="min-w-0 truncate">{item}</span>
            </span>
          ))
        ) : (
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-marathon-blue/55">
            Aún no has seleccionado categorías
          </span>
        )}
      </div>
    </div>
  );
}
