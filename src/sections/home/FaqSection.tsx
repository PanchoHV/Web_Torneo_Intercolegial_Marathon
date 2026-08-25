import { useEffect, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  /** Ancla e id de scope de los estilos. Cambiarlo permite montar la sección en otra página. */
  id?: string;
  /** Preguntas a renderizar. Por defecto, las generales de la Copa (Home). */
  items?: FaqItem[];
  /** Párrafo introductorio del panel izquierdo. */
  description?: string;
  /**
   * Omite el fondo propio de la sección. Se usa cuando la página ya pinta ese
   * mismo papel en un wrapper superior y repintarlo generaría un escalón.
   */
  inheritBackground?: boolean;
};

const DEFAULT_DESCRIPTION =
  'Resuelve tus dudas sobre la Copa Nacional Intercolegial Marathon y descubre cómo participar en el torneo intercolegial más grande del país.';

const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Qué es la Copa Nacional Intercolegial Marathon?',
    answer:
      'Es un torneo de fútbol escolar que reúne a colegios de distintas regiones del país en una experiencia deportiva, formativa y competitiva.',
  },
  {
    question: '¿Cuál es el costo de inscripción por colegio?',
    answer:
      'Para colegios privados, la inscripción tiene un costo de USD 170 por cada categoría inscrita, más IVA. Los colegios fiscales y fiscomisionales no pagan costo de inscripción.',
  },
  {
    question: '¿Cuántos jugadores puedo inscribir por equipo?',
    answer:
      'La nómina se define según la modalidad de competencia: Fútbol 9 admite hasta 20 jugadores por equipo y Fútbol 11 hasta 25 jugadores por equipo.',
  },
  {
    question: '¿Qué documentación necesito para inscribir la nómina de jugadores?',
    answer:
      'Debes presentar el listado oficial de estudiantes, la carta de participación firmada por la autoridad correspondiente y la copia de cédula de cada estudiante jugador.',
  },
  {
    question: '¿Qué categorías podrán participar?',
    answer:
      'La planificación contempla categorías masculinas y femeninas según la sede y la modalidad habilitada: masculina Sub 13, Sub 15 y Sub 17; femenina Sub 15 y Sub 17.',
  },
  {
    question: '¿Cuándo inicia la Copa Nacional Intercolegial Marathon?',
    answer:
      'La planificación general inicia el 17 de agosto de 2026 y se extiende hasta el 12 de diciembre de 2026, con ajustes posibles según región y sede.',
  },
];

/**
 * Sistema de FAQ del sitio.
 *
 * La presentación es única y vive aquí; el contenido se inyecta por props.
 * Sin props renderiza exactamente el FAQ general del Home, así que montar la
 * sección en otra página no altera lo aprobado.
 */
export default function FaqSection({
  id = 'faq-home',
  items = FAQ_ITEMS,
  description = DEFAULT_DESCRIPTION,
  inheritBackground = false,
}: FaqSectionProps = {}) {
  const titleId = `${id}-title`;

  const [isReady, setIsReady] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (isReady) return;

    const raf = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(raf);
  }, [isReady]);

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative overflow-hidden py-[clamp(2.75rem,4.6vw,4.25rem)] text-marathon-navy"
      style={
        inheritBackground
          ? undefined
          : {
              backgroundColor: '#F4F8FC',
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 24%), url('https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-paper-background.webp')",
              backgroundRepeat: 'repeat, repeat',
              backgroundPosition: 'center top, center top',
              backgroundSize: 'auto, 700px auto',
            }
      }
    >
      {inheritBackground ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,27,45,0.07),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,80,164,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_22%)]"
        />
      )}

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <Surface
          variant="paper"
          className="relative overflow-hidden rounded-[30px] border border-marathon-border-subtle bg-[rgba(244,248,252,0.78)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marathon-red/55 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-marathon-navy/10 to-transparent" />

          <div
            className={`relative px-5 py-6 transition-all duration-700 sm:px-7 sm:py-7 lg:px-8 lg:py-8 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <div className="pointer-events-none absolute left-[-1.5rem] top-[-0.25rem] hidden h-[132px] w-[224px] bg-[url('https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Componete%20x%20y%20O.webp')] bg-contain bg-left-top bg-no-repeat opacity-[0.14] lg:block" />
            <div className="pointer-events-none absolute right-[-0.5rem] top-[7.4rem] hidden h-[74px] w-[120px] bg-[url('https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-brush-plus.webp')] bg-contain bg-center bg-no-repeat opacity-[0.18] lg:block" />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start lg:gap-8">
              <div className="relative max-w-[31rem] lg:pt-2">
                <SectionLabel tone="red">PREGUNTAS FRECUENTES</SectionLabel>
                <h2
                  id={titleId}
                  className="mt-4 max-w-[10ch] font-normal uppercase leading-[0.82] text-marathon-navy"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                    fontSize: 'clamp(3.2rem, 5.6vw, 5.6rem)',
                  }}
                >
                  ¿TIENES DUDAS?
                </h2>
                <p className="mt-5 max-w-[27rem] text-[0.96rem] leading-7 text-marathon-gray sm:text-[1rem]">
                  {description}
                </p>

                <div className="mt-6 lg:mt-8">
                  <div className="relative inline-flex">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-marathon-red/8 blur-2xl"
                    />
                    <img
                      src="https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-copa-stamp.webp"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="relative h-[96px] w-auto rotate-[-7deg] object-contain transition-all duration-700 sm:h-[110px] lg:h-[138px] motion-reduce:transition-none"
                    />
                  </div>
                </div>
              </div>

              <div className="relative transition-all duration-700 delay-150">
                <div className="relative overflow-hidden rounded-[26px] border border-[#0b3f78]/55 bg-[linear-gradient(180deg,#0b4ea0_0%,#083974_100%)] text-white shadow-[0_18px_44px_rgba(0,62,124,0.14)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(226,27,45,0.08),transparent_25%)] opacity-70" />

                  {/* Halftone a la derecha y trazo rojo parcial abajo: acentos de esquina. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:9px_9px] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_72%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-8 h-[3px] w-28 rounded-full bg-marathon-red/70"
                  />

                  <div className="relative">
                    {items.map((item, index) => (
                      <details
                        key={item.question}
                        open={index === 0}
                        className="faq-row group border-b border-white/10 transition-colors duration-200 last:border-b-0 open:bg-white/[0.05]"
                      >
                        <summary className="relative flex cursor-pointer list-none items-center gap-4 px-5 py-[1.15rem] outline-none transition-colors duration-200 hover:bg-white/[0.045] focus-visible:bg-white/[0.06] [&::-webkit-details-marker]:hidden sm:px-7">
                          {/* Acento dorado a la izquierda: marca la fila abierta. */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-2 left-0 w-[3px] origin-top scale-y-0 rounded-r bg-marathon-gold transition-transform duration-200 group-open:scale-y-100"
                          />

                          <span
                            className="shrink-0 font-normal leading-none text-marathon-gold/85 transition-colors duration-200 group-open:text-marathon-gold"
                            style={{
                              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                              fontSize: 'clamp(1.5rem, 1.9vw, 1.9rem)',
                            }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span aria-hidden="true" className="h-7 w-px shrink-0 bg-white/15" />

                          <span className="min-w-0 flex-1 font-montserrat text-sm font-black uppercase leading-snug tracking-[0.1em] text-white/88 transition-colors duration-200 group-hover:text-white group-open:text-white sm:text-[0.95rem]">
                            {item.question}
                          </span>

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/80 transition-[transform,background-color,border-color] duration-200 group-hover:border-white/25 group-open:rotate-180 group-open:border-marathon-gold/45 group-open:bg-marathon-gold/12 group-open:text-marathon-gold motion-reduce:transition-none">
                            <ChevronDown size={17} strokeWidth={2.3} />
                          </span>
                        </summary>

                        <div className="faq-answer px-5 pb-[1.15rem] pl-[3.9rem] pt-0 text-sm leading-7 text-white/78 sm:px-7 sm:pl-[4.9rem] sm:text-[0.98rem]">
                          <p className="max-w-[46ch]">{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Surface>
      </Container>
      <style>{`
        @keyframes faq-answer-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        #${id} details[open] .faq-answer {
          animation: faq-answer-in 220ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          #${id} details[open] .faq-answer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
