import { ArrowDown } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import { REGISTRATION_GUIDE_STEPS } from '@/lib/constants/inscripcionesPage';
import { scrollToAnchor } from '@/lib/scrollToAnchor';

/**
 * Guía de inscripción sobre PAPER.
 *
 * Los cuatro pasos describen los bloques del formulario real (envío único),
 * no un stepper multipágina.
 */
export default function RegistrationGuideSection() {
  return (
    <section
      id="registration-guide"
      aria-labelledby="registration-guide-title"
      className="relative scroll-mt-[calc(var(--header-height)+1.5rem)] py-[clamp(2.5rem,4.5vw,4rem)] text-marathon-navy"
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="red">Guía de inscripción</SectionLabel>
        <h2
          id="registration-guide-title"
          className="mt-3 font-normal uppercase leading-[0.9] text-marathon-navy"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
          }}
        >
          Cómo funciona
        </h2>
        <p className="mt-3 max-w-[44rem] text-[0.95rem] leading-7 text-marathon-gray">
          El formulario se completa y se envía en una sola sesión. Estos son los
          cuatro bloques de datos que vas a llenar.
        </p>

        <ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {REGISTRATION_GUIDE_STEPS.map((step, index) => (
            <li key={step.id} className="relative">
              <Surface
                variant="paper"
                className="h-full rounded-2xl border-marathon-navy/10 bg-white/75 p-5"
              >
                <span
                  className="block font-normal leading-none text-marathon-red"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                    fontSize: 'clamp(2rem, 2.6vw, 2.6rem)',
                  }}
                >
                  {step.number}
                </span>
                <h3 className="mt-2 font-montserrat text-[0.74rem] font-black uppercase tracking-[0.12em] text-marathon-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-6 text-marathon-gray">
                  {step.description}
                </p>
              </Surface>

              {/* Conector: solo entre tarjetas y solo cuando van en fila. */}
              {index < REGISTRATION_GUIDE_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-1rem] top-1/2 hidden h-px w-4 -translate-y-1/2 bg-marathon-navy/20 lg:block"
                />
              )}
            </li>
          ))}
        </ol>

        <a
          href="#registration-form"
          onClick={(event) => scrollToAnchor(event, 'registration-form')}
          className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-marathon-navy px-6 py-3.5 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-marathon-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red"
        >
          Inscribir mi institución
          <ArrowDown
            size={15}
            strokeWidth={2.8}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </a>
      </Container>
    </section>
  );
}
