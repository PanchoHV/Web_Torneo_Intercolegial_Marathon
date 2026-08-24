import { ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { textures } from '@/lib/assets/textures';
import { SectionLabel } from '@/components/ui/section-label';
import { REGISTRATION_GUIDE_STEPS } from '@/lib/constants/inscripcionesPage';
import { scrollToAnchor } from '@/lib/scrollToAnchor';

/**
 * Guía de inscripción sobre PAPER.
 *
 * Es un único proceso continuo, no cuatro tarjetas: los pasos comparten frame
 * y quedan unidos por una línea punteada con flechas rojas. Los cuatro pasos
 * describen los bloques del formulario REAL, que se envía en una sola sesión.
 *
 * Los iconos oficiales ya traen su propio círculo navy, así que aquí no se
 * añade ningún borde extra: duplicaría el aro.
 */
export default function RegistrationGuideSection() {
  const lastIndex = REGISTRATION_GUIDE_STEPS.length - 1;

  return (
    <section
      id="registration-guide"
      aria-labelledby="registration-guide-title"
      className="relative overflow-hidden scroll-mt-[calc(var(--header-height)+1.5rem)] py-[clamp(2.25rem,4vw,3.5rem)] text-marathon-navy"
    >
      {/* Marcas de agua de marca: refuerzan la idea de recorrido táctico sin
          competir con la numeración, los iconos ni el copy. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
        <img
          src={textures.tacticalRoute}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -right-12 top-2 w-[clamp(110px,17vw,280px)] opacity-[0.05] md:-right-10 md:opacity-[0.07]"
        />
        <img
          src={textures.arrowDashed}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -left-8 bottom-4 hidden w-[clamp(120px,13vw,200px)] opacity-[0.08] lg:block"
        />
      </div>
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

        {/* Frame único del proceso. Sin gap entre columnas: los conectores se
            posicionan contra el borde de cada celda y así calzan exactos. */}
        <div className="mt-6 rounded-xl border border-marathon-navy/15 bg-white/45 px-[clamp(0.75rem,2vw,1.75rem)] py-[clamp(1.25rem,2.4vw,1.75rem)]">
          <ol className="grid grid-cols-1 lg:grid-cols-4">
            {REGISTRATION_GUIDE_STEPS.map((step, index) => (
              <li
                key={step.id}
                className="relative flex gap-4 pb-7 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:px-3 lg:pb-0 lg:text-center"
              >
                {/* Conector horizontal (desktop): se ancla a la COLUMNA, no al
                    icono, y cruza el hueco hasta el siguiente paso. El eje Y
                    coincide con el centro del icono: 24 (número) + 8 + 28. */}
                {index < lastIndex && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-[60px] hidden -translate-y-1/2 items-center gap-1.5 lg:flex"
                  >
                    <span className="h-px flex-1 border-t border-dashed border-marathon-navy/40" />
                    <ChevronRight
                      size={14}
                      strokeWidth={3}
                      className="shrink-0 text-marathon-red"
                    />
                  </span>
                )}

                {/* Rail: número + icono. En mobile es columna izquierda; en
                    desktop, el eje horizontal del proceso. */}
                <div className="relative flex shrink-0 flex-col items-center lg:w-full">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-marathon-navy font-montserrat text-[0.6rem] font-black text-white">
                    {index + 1}
                  </span>

                  <div className="relative mt-2">
                    <img
                      src={step.icon}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 object-contain lg:h-14 lg:w-14"
                    />

                  </div>

                  {/* Conector vertical (mobile): mismo lenguaje, eje girado. */}
                  {index < lastIndex && (
                    <span
                      aria-hidden="true"
                      className="mt-2 flex flex-1 flex-col items-center gap-1 lg:hidden"
                    >
                      <span className="min-h-[22px] w-0 flex-1 border-l border-dashed border-marathon-navy/40" />
                      <ChevronDown size={13} strokeWidth={3} className="text-marathon-red" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 pt-1 lg:pt-4">
                  <h3 className="font-montserrat text-[0.74rem] font-black uppercase tracking-[0.1em] text-marathon-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.84rem] leading-6 text-marathon-gray lg:mx-auto lg:max-w-[24ch]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <a
          href="#registration-form"
          onClick={(event) => scrollToAnchor(event, 'registration-form')}
          className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-marathon-navy px-6 py-3.5 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-marathon-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red sm:w-auto"
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
