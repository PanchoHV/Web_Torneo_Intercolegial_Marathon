import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';

type RegistrationFormSectionProps = {
  /** El formulario real o su estado de éxito, según el flujo de la página. */
  children: ReactNode;
  /** Con el envío confirmado el encabezado editorial sobra. */
  isSubmitted?: boolean;
};

/**
 * Contenedor de la inscripción oficial.
 *
 * Solo aporta ancla, encabezado y el fondo de la sección: el formulario entra
 * como children con su contrato intacto. Nunca se oculta tras un disclosure.
 */
export default function RegistrationFormSection({
  children,
  isSubmitted = false,
}: RegistrationFormSectionProps) {
  return (
    <section
      id="registration-form"
      aria-labelledby="registration-form-title"
      className="relative scroll-mt-[calc(var(--header-height)+1.5rem)] py-[clamp(2.5rem,4.5vw,4rem)] text-marathon-navy"
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className={isSubmitted ? 'sr-only' : undefined}>
          <SectionLabel tone="red">Inscripción oficial</SectionLabel>
          <h2
            id="registration-form-title"
            className="mt-3 font-normal uppercase leading-[0.9] text-marathon-navy"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
            }}
          >
            Inscribe a tu institución
          </h2>
          <p className="mt-3 max-w-[44rem] text-[0.95rem] leading-7 text-marathon-gray">
            Completa los datos requeridos para registrar a tu institución en la Copa.
          </p>
        </div>

        {/* Título accesible cuando el encabezado se oculta tras el envío. */}
        {isSubmitted && (
          <h2 id="registration-form-title" className="sr-only">
            Inscripción enviada
          </h2>
        )}

        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
