import { CheckCircle2, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { RegistrationResult } from '@/types/registration';

type RegistrationSuccessProps = {
  registration: RegistrationResult;
  onReset: () => void;
};

export default function RegistrationSuccess({ registration, onReset }: RegistrationSuccessProps) {
  const hasReceipt = Boolean(registration.id && registration.createdAt);

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-marathon-blue/10 bg-white p-5 sm:p-8 text-center shadow-card">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-marathon-red" />
      <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-marathon-blue text-white shadow-[0_18px_36px_rgba(0,80,164,0.24)]">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] font-black uppercase tracking-[0.02em] text-marathon-blue">
        ¡Preinscripción recibida con éxito!
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-marathon-gray">
        Gracias por registrar a tu institución. Tu colegio ya quedó dentro del proceso de
        preinscripción. Nuestro equipo revisará la información y notificará los siguientes pasos de
        acuerdo con la ciudad, región y categorías seleccionadas.
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-marathon-gray">
        Recuerda que la confirmación oficial de participación estará sujeta a validación de
        requisitos, disponibilidad de cupos, calendario de la sede y confirmación oficial de la
        organización.
      </p>
      <p className="mt-4 text-sm font-semibold text-marathon-blue">
        Hemos recibido tu preinscripción correctamente.
      </p>
      {hasReceipt && (
        <div className="mt-3 space-y-1 text-sm text-marathon-gray">
          <p>
            Código de registro: <span className="font-semibold text-marathon-blue">{registration.id}</span>
          </p>
          <p>
            Fecha de envío:{' '}
            <span className="font-semibold text-marathon-blue">
              {new Date(registration.createdAt as string).toLocaleString()}
            </span>
          </p>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={onReset}
          className="w-full sm:w-auto rounded-full bg-marathon-blue px-6 py-2 text-white hover:bg-marathon-blue/90"
        >
          <RotateCcw size={16} /> Registrar otro colegio
        </Button>
      </div>
    </section>
  );
}
