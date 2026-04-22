import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, CheckCircle2, Loader2, LockKeyhole, MapPin, Send, UserRound } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const result = await createRegistration({
        ...values,
        institutionName: normalizeText(values.institutionName),
        institutionAddress: normalizeText(values.institutionAddress),
        delegateName: normalizeText(values.delegateName),
        delegateId: normalizeDigits(values.delegateId),
        phone: normalizePhone(values.phone),
      });

      reset();
      onSubmitSuccess(result);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
    }
  });

  return (
    <section id="formulario-inscripcion" className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-marathon-blue/10 bg-white shadow-card">
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_100%)] p-5 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:46px_46px] opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-marathon-red" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
              Formulario oficial
            </span>
            <h2 className="mt-5 text-[clamp(1.8rem,3vw,2.6rem)] font-black uppercase leading-tight tracking-[0.02em]">
              Inscribe a tu colegio
            </h2>
            <p className="mt-4 leading-relaxed text-white/82">
              Completa los datos institucionales. Un ejecutivo del torneo revisará la información y se comunicará con la persona encargada.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                { icon: Building2, text: 'Datos oficiales del colegio' },
                { icon: UserRound, text: 'Persona responsable autorizada' },
                { icon: MapPin, text: 'Ciudades participantes habilitadas' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-sm font-semibold">
                  <item.icon size={18} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <form className="grid gap-5 sm:gap-6 bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FBFE_100%)] p-4 sm:p-8 lg:p-10" onSubmit={onSubmit} noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nombre completo del Colegio" error={errors.institutionName?.message} required>
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Unidad Educativa Marathon"
                {...register('institutionName', { setValueAs: normalizeText })}
              />
            </Field>

            <Field label="Ciudad" error={errors.city?.message} required>
              <OptionGrid columns="grid-cols-1 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                {CITY_OPTIONS.map((city) => (
                  <OptionCard key={city} label={city}>
                    <input
                      type="radio"
                      value={city}
                      className="peer sr-only"
                      {...register('city')}
                    />
                  </OptionCard>
                ))}
              </OptionGrid>
            </Field>

            <Field label="Dirección del colegio" error={errors.institutionAddress?.message} required>
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Av. principal, sector, referencia"
                {...register('institutionAddress', { setValueAs: normalizeText })}
              />
            </Field>

            <Field label="Nombre de la persona encargada" error={errors.delegateName?.message} required>
              <Input
                className="h-[3.25rem] rounded-2xl border-marathon-blue/10 bg-white px-4 font-semibold text-marathon-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(6,42,79,0.06)] transition placeholder:font-medium placeholder:text-marathon-gray/55 focus-visible:ring-marathon-blue/25"
                placeholder="Nombre y apellido"
                {...register('delegateName', { setValueAs: normalizeText })}
              />
            </Field>

            <Field label="Cargo del solicitante" error={errors.delegateRole?.message} required>
              <OptionGrid columns="grid-cols-2">
                {DELEGATE_ROLE_OPTIONS.map((role) => (
                  <OptionCard key={role} label={role}>
                    <input
                      type="radio"
                      value={role}
                      className="peer sr-only"
                      {...register('delegateRole')}
                    />
                  </OptionCard>
                ))}
              </OptionGrid>
            </Field>

            <Field label="Tipo de Colegio" error={errors.schoolType?.message} required>
              <OptionGrid columns="grid-cols-2">
                {SCHOOL_TYPE_OPTIONS.map((type) => (
                  <OptionCard key={type} label={type}>
                    <input
                      type="radio"
                      value={type}
                      className="peer sr-only"
                      {...register('schoolType')}
                    />
                  </OptionCard>
                ))}
              </OptionGrid>
            </Field>

            <Field label="Cédula de la persona a cargo" error={errors.delegateId?.message} required>
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

            <Field label="Celular de la persona encargada" error={errors.phone?.message} required>
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

            <Field label="Correo de la persona encargada" error={errors.email?.message} required className="md:col-span-2">
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
              <input type="checkbox" className="mt-1 h-4 w-4 accent-marathon-red" {...register('termsAccepted')} />
              <span className="text-sm leading-relaxed text-marathon-gray">
                Acepto que Marathon utilice estos datos para gestionar la inscripción y el contacto oficial del torneo.
              </span>
            </label>
            {errors.termsAccepted?.message && <p className="mt-2 text-xs font-semibold text-red-600">{errors.termsAccepted.message}</p>}
          </div>

          {submitError && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{submitError}</p>
          )}

          <div className="flex flex-col gap-4 border-t border-marathon-blue/10 pt-5 sm:pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-medium text-marathon-gray">
              <LockKeyhole size={16} className="text-marathon-blue" />
              Registro seguro para contacto oficial.
            </p>
            <Button
              type="submit"
              className="h-12 w-full sm:w-auto rounded-full bg-marathon-red px-8 font-montserrat text-base font-bold text-white shadow-button hover:bg-marathon-red/90"
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

function OptionGrid({ children, columns }: { children: ReactNode; columns: string }) {
  return <div className={`grid gap-3 ${columns}`}>{children}</div>;
}

function OptionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="group relative flex min-h-12 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white px-3 py-3 text-center text-sm font-black text-marathon-blue shadow-[0_10px_28px_rgba(6,42,79,0.06)] transition hover:-translate-y-0.5 hover:border-marathon-red/40 has-[:checked]:border-marathon-red has-[:checked]:bg-marathon-red has-[:checked]:text-white has-[:checked]:shadow-[0_16px_34px_rgba(226,27,45,0.24)]">
      {children}
      <span className="absolute inset-x-0 top-0 h-1 bg-marathon-red opacity-0 transition group-has-[:checked]:opacity-100" />
      <span>{label}</span>
    </label>
  );
}
