import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container } from '@/components/ui/container';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_COPA_ASSETS = {
  paperBackground:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-paper-background.webp',
  copaStamp:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-copa-stamp.webp',
  tacticalXO:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-tactical-xox.webp',
  tacticalXORoute:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-tactical-xo-route.webp',
  arrowCurveBlue:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-flecha%20entre%20cortada.webp',
  arrowDashedNavy:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-flecha.webp',
  chevronsRed:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-chevrons-red.webp',
  brushRedDouble:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-brush-red-double.webp',
  brushBlue:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-brush-blue.webp',
  brushPlus:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-brush-plus.webp',
  factSchools: '/images/about-copa/fact-schools.svg',
  factPlayers: '/images/about-copa/fact-players.svg',
  factMatches: '/images/about-copa/fact-matches.svg',
  factBroadcast: '/images/about-copa/fact-broadcast.svg',
} as const;

const historicalFacts = [
  {
    iconSrc: ABOUT_COPA_ASSETS.factSchools,
    value: '+600',
    countTarget: 600,
    label: 'Colegios',
    description: 'Instituciones educativas formaron parte de la escala histórica inicial.',
    restRotate: -0.45,
    entrance: { y: 34, rotateX: 7, rotateY: -4, scale: 0.985 },
  },
  {
    iconSrc: ABOUT_COPA_ASSETS.factPlayers,
    value: '+12.000',
    countTarget: 12000,
    label: 'Jugadores',
    description: 'Estudiantes vivieron la competencia desde la cancha y sus comunidades.',
    restRotate: 0.3,
    entrance: { y: 42, rotateX: 6, rotateY: 4, scale: 0.98 },
  },
  {
    iconSrc: ABOUT_COPA_ASSETS.factMatches,
    value: '+1.200',
    countTarget: 1200,
    label: 'Partidos',
    description: 'Encuentros marcaron el recorrido deportivo de la primera edición.',
    restRotate: -0.25,
    entrance: { y: 30, rotateX: 8, rotateY: -3, scale: 0.985 },
  },
  {
    iconSrc: ABOUT_COPA_ASSETS.factBroadcast,
    value: 'FIFA PLAY',
    label: 'Transmisión en vivo',
    description: 'Primera edición transmitida en vivo para amplificar la historia del torneo.',
    restRotate: 0.4,
    entrance: { y: 38, rotateX: 6, rotateY: 4, scale: 0.98 },
  },
] as const;

type TiltApi = {
  setRotateX: (value: number) => void;
  setRotateY: (value: number) => void;
  setRotateZ: (value: number) => void;
  setX: (value: number) => void;
  setY: (value: number) => void;
  setIconX: (value: number) => void;
  setIconY: (value: number) => void;
  setNumberX: (value: number) => void;
  setNumberY: (value: number) => void;
  setLabelX: (value: number) => void;
  setLabelY: (value: number) => void;
  setDecorX: (value: number) => void;
  setDecorY: (value: number) => void;
};

const noop = () => {};

const formatCount = (value: number) => `+${Math.round(value).toLocaleString('es-EC')}`;

export default function AboutCopaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardShellRefs = useRef<Array<HTMLElement | null>>([]);
  const tiltRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        section.querySelectorAll<HTMLElement>('[data-count-target]').forEach((counter) => {
          const target = Number(counter.dataset.countTarget);
          if (!Number.isFinite(target)) return;

          ScrollTrigger.create({
            trigger: section,
            start: 'top 72%',
            once: true,
            onEnter: () => {
              const countState = { value: 0 };
              counter.textContent = formatCount(0);
              gsap.to(countState, {
                value: target,
                duration: 1.45,
                ease: 'power3.out',
                onUpdate: () => {
                  counter.textContent = formatCount(countState.value);
                },
                onComplete: () => {
                  counter.textContent = formatCount(target);
                },
              });
            },
          });
        });

        gsap.from('[data-about-editorial]', {
          opacity: 0,
          x: -18,
          duration: 0.72,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 78%' },
        });

        gsap.from('[data-about-entrance]', {
          opacity: 0,
          y: (index: number) => historicalFacts[index]?.entrance.y ?? 34,
          rotateX: (index: number) => historicalFacts[index]?.entrance.rotateX ?? 6,
          rotateY: (index: number) => historicalFacts[index]?.entrance.rotateY ?? 4,
          scale: (index: number) => historicalFacts[index]?.entrance.scale ?? 0.98,
          duration: 0.82,
          stagger: 0.09,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        });

        gsap.from('[data-about-decoration]', {
          opacity: 0,
          y: 8,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 76%' },
        });
      }

      if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

      const buildTiltApi = (tilt: HTMLElement): TiltApi => {
        const icon = tilt.querySelector('[data-fact-icon]') as HTMLElement | null;
        const number = tilt.querySelector('[data-fact-number]') as HTMLElement | null;
        const label = tilt.querySelector('[data-fact-label]') as HTMLElement | null;
        const decor = tilt.querySelector('[data-fact-decor]') as HTMLElement | null;

        return {
          setRotateX: gsap.quickTo(tilt, 'rotateX', { duration: 0.55, ease: 'power3.out' }),
          setRotateY: gsap.quickTo(tilt, 'rotateY', { duration: 0.55, ease: 'power3.out' }),
          setRotateZ: gsap.quickTo(tilt, 'rotateZ', { duration: 0.6, ease: 'power3.out' }),
          setX: gsap.quickTo(tilt, 'x', { duration: 0.65, ease: 'power3.out' }),
          setY: gsap.quickTo(tilt, 'y', { duration: 0.65, ease: 'power3.out' }),
          setIconX: icon ? gsap.quickTo(icon, 'x', { duration: 0.55, ease: 'power3.out' }) : noop,
          setIconY: icon ? gsap.quickTo(icon, 'y', { duration: 0.55, ease: 'power3.out' }) : noop,
          setNumberX: number ? gsap.quickTo(number, 'x', { duration: 0.55, ease: 'power3.out' }) : noop,
          setNumberY: number ? gsap.quickTo(number, 'y', { duration: 0.55, ease: 'power3.out' }) : noop,
          setLabelX: label ? gsap.quickTo(label, 'x', { duration: 0.55, ease: 'power3.out' }) : noop,
          setLabelY: label ? gsap.quickTo(label, 'y', { duration: 0.55, ease: 'power3.out' }) : noop,
          setDecorX: decor ? gsap.quickTo(decor, 'x', { duration: 0.6, ease: 'power3.out' }) : noop,
          setDecorY: decor ? gsap.quickTo(decor, 'y', { duration: 0.6, ease: 'power3.out' }) : noop,
        };
      };

      cardShellRefs.current.forEach((shell, index) => {
        const tilt = tiltRefs.current[index];
        if (!shell || !tilt) return;

        const api = buildTiltApi(tilt);

        const handleMove = (event: PointerEvent) => {
          const rect = shell.getBoundingClientRect();
          const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
          const normalizedY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));

          api.setRotateX(normalizedY * -1);
          api.setRotateY(normalizedX * 1.2);
          api.setRotateZ(normalizedX * 5);
          api.setX(normalizedX * 10);
          api.setY(normalizedY * -3);
          api.setIconX(normalizedX * 5);
          api.setIconY(normalizedY * 1.5);
          api.setNumberX(normalizedX * 3);
          api.setNumberY(normalizedY * 1.2);
          api.setLabelX(normalizedX * 2);
          api.setLabelY(normalizedY * 0.8);
          api.setDecorX(normalizedX * -2);
          api.setDecorY(normalizedY * -1);
        };

        const handleLeave = () => {
          api.setRotateX(0);
          api.setRotateY(0);
          api.setRotateZ(0);
          api.setX(0);
          api.setY(0);
          api.setIconX(0);
          api.setIconY(0);
          api.setNumberX(0);
          api.setNumberY(0);
          api.setLabelX(0);
          api.setLabelY(0);
          api.setDecorX(0);
          api.setDecorY(0);
        };

        shell.addEventListener('pointermove', handleMove);
        shell.addEventListener('pointerleave', handleLeave);
        cleanups.push(() => {
          shell.removeEventListener('pointermove', handleMove);
          shell.removeEventListener('pointerleave', handleLeave);
        });
      });
    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-la-copa"
      aria-labelledby="about-copa-title"
      className="relative isolate overflow-hidden pb-[clamp(2.75rem,4.6vw,4.25rem)] pt-0 text-marathon-navy"
    >
      <style>
        {`
          @media (min-width: 1024px) {
            #sobre-la-copa .about-copa-facts-grid {
              grid-column: 2 / -1;
            }
          }

          #sobre-la-copa .about-copa-composition {
            padding-top: 20px;
            padding-bottom: 16px;
          }

          #sobre-la-copa .about-copa-stamp {
            top: auto;
            right: -96px;
            bottom: -88px;
            width: 124px;
            height: 124px;
            opacity: 0.08;
            transform: rotate(-35deg);
          }

          #sobre-la-copa .about-copa-tactical {
            left: 22%;
            top: 38%;
            width: 96px;
            height: 96px;
            opacity: 0.09;
            transform: translateY(-50%);
          }

          #sobre-la-copa .about-copa-arrow {
            left: 27%;
            top: 37%;
            opacity: 0.08;
          }

          #sobre-la-copa .about-copa-chevrons {
            opacity: 0.1;
          }

          @media (min-width: 640px) {
            #sobre-la-copa .about-copa-composition {
              padding-top: 26px;
              padding-bottom: 20px;
            }
          }

          @media (min-width: 1280px) {
            #sobre-la-copa .about-copa-composition {
              padding-top: 32px;
              padding-bottom: 24px;
            }

            #sobre-la-copa .about-copa-facts-grid {
              grid-column: 2 / -1;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 1rem;
            }
          }
        `}
      </style>
      <div
        className="pointer-events-none absolute inset-0 bg-[#efe5d2]"
        style={{
          backgroundImage: `url(${ABOUT_COPA_ASSETS.paperBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(6,34,77,0.18)_0.7px,transparent_0.7px)] [background-size:18px_18px]"
        aria-hidden="true"
      />

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="about-copa-composition relative overflow-visible" style={{ perspective: '1500px' }}>
          <img
            src={ABOUT_COPA_ASSETS.chevronsRed}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            data-about-decoration
            className="about-copa-chevrons pointer-events-none absolute right-4 top-0 hidden h-7 w-24 object-contain lg:block"
          />
          <img
            src={ABOUT_COPA_ASSETS.tacticalXO}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            data-about-decoration
            className="about-copa-tactical pointer-events-none absolute hidden object-contain lg:block"
          />
          <img
            src={ABOUT_COPA_ASSETS.arrowCurveBlue}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            data-about-decoration
            className="about-copa-arrow pointer-events-none absolute hidden h-20 w-20 rotate-[-8deg] object-contain lg:block"
          />
          <img
            src={ABOUT_COPA_ASSETS.copaStamp}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            data-about-decoration
            className="about-copa-stamp pointer-events-none absolute object-contain"
          />

          <div className="relative grid items-start gap-6 xl:grid-cols-[minmax(22rem,1.15fr)_repeat(4,minmax(0,1fr))] xl:gap-6 2xl:grid-cols-[minmax(24rem,1.2fr)_repeat(4,minmax(0,1fr))] 2xl:gap-7">
            <div data-about-editorial className="relative z-20 lg:col-span-1">
              <div className="relative inline-flex">
                <p className="relative z-10 font-montserrat text-xs font-black uppercase tracking-[0.24em] text-marathon-red">
                  Sobre la Copa
                </p>
                <span
                  className="pointer-events-none absolute -bottom-2 left-[-0.3rem] h-4 w-48 bg-contain bg-left bg-no-repeat opacity-30"
                  style={{ backgroundImage: `url(${ABOUT_COPA_ASSETS.brushRedDouble})` }}
                  aria-hidden="true"
                />
              </div>

              <h2
                id="about-copa-title"
                className="mt-4 max-w-[30rem] font-normal uppercase leading-[0.88] text-marathon-navy"
                style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(2.7rem, 3.1vw, 3.5rem)',
                }}
              >
                <span className="block">El torneo intercolegial</span>
                <span className="block">más grande del Ecuador</span>
              </h2>

              <p className="mt-4 max-w-[28rem] text-[0.95rem] leading-6 text-marathon-navy/88">
                La Copa Nacional Intercolegial Marathon reúne a estudiantes, colegios y
                comunidades alrededor del fútbol, el orgullo y la competencia entre regiones del
                Ecuador.
              </p>

              <p className="mt-3 font-montserrat text-[0.8rem] font-black uppercase tracking-[0.12em] text-marathon-navy/72">
                Una historia que se construye dentro y fuera de la cancha.
              </p>
            </div>

            <div
              className="about-copa-facts-grid relative z-10 grid gap-4 sm:grid-cols-2 xl:col-span-4 xl:gap-5"
              style={{
                perspective: '1500px',
                transformStyle: 'preserve-3d',
              }}
            >
              {historicalFacts.map((fact, index) => {
                const mobileOffset = index % 2 === 0 ? '-translate-x-1' : 'translate-x-1';
                const verticalOffset = [0, 3, 1, 4][index] ?? 0;

                return (
                  <div
                    key={fact.label}
                    className={`${mobileOffset} h-full w-full sm:translate-x-0`}
                    style={{
                      transform: `translateY(${verticalOffset}px) rotateZ(${fact.restRotate}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div
                      data-about-entrance
                      className="relative h-full w-full"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <article
                        ref={(node) => {
                          cardShellRefs.current[index] = node;
                        }}
                        className="relative mx-auto h-full w-full max-w-[24rem] overflow-visible px-2 py-2 lg:max-w-none"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div
                          ref={(node) => {
                            tiltRefs.current[index] = node;
                          }}
                          className="relative h-full border border-marathon-navy/12 bg-[#f9efdc]/95 p-[1.15rem] shadow-[0_10px_22px_rgba(6,42,79,0.08),0_2px_4px_rgba(6,42,79,0.05)]"
                          style={{ borderRadius: 2, transformOrigin: '50% 50%', transformStyle: 'preserve-3d' }}
                        >
                          <span
                            data-fact-decor
                            className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r border-t border-marathon-red/35"
                            aria-hidden="true"
                            style={{ transform: 'translateZ(4px)' }}
                          />
                          <span
                            className="pointer-events-none absolute left-3 top-3 h-1.5 w-9 bg-marathon-red/12"
                            aria-hidden="true"
                          />
                          <div className="relative flex h-full flex-col" style={{ transformStyle: 'preserve-3d' }}>
                            <img
                              data-fact-icon
                              src={fact.iconSrc}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 object-contain lg:h-11 lg:w-11 xl:h-12 xl:w-12"
                              loading="lazy"
                              decoding="async"
                              style={{ transform: 'translateZ(26px)' }}
                            />
                            <p
                              data-fact-number
                              data-count-target={'countTarget' in fact ? fact.countTarget : undefined}
                              className="mt-2.5 font-normal uppercase leading-none text-marathon-navy"
                              style={{
                                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                                fontSize: fact.value === 'FIFA PLAY' ? '1.95rem' : '2.55rem',
                                transform: 'translateZ(18px)',
                                whiteSpace: fact.value === 'FIFA PLAY' ? 'nowrap' : 'normal',
                              }}
                            >
                              {fact.value}
                            </p>
                            <h3
                              data-fact-label
                              className="mt-1.5 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.14em] text-marathon-red"
                              style={{ transform: 'translateZ(12px)' }}
                            >
                              {fact.label}
                            </h3>
                            <p
                              className="mt-2 text-[0.82rem] leading-[1.45] text-marathon-navy/82"
                              style={{ transform: 'translateZ(8px)' }}
                            >
                              {fact.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="relative z-20 mt-5 max-w-4xl border-t border-marathon-navy/18 pt-4 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.18em] text-marathon-navy/68 lg:mt-6">
            La primera edición dejó una escala histórica para el fútbol colegial del Ecuador.
          </p>
        </div>
      </Container>
    </section>
  );
}
