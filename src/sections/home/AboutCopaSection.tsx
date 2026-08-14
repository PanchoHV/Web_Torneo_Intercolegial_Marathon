import { useEffect, useRef } from 'react';
import { Radio, School, Trophy, UsersRound } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container } from '@/components/ui/container';

gsap.registerPlugin(ScrollTrigger);

const historicalFacts = [
  {
    icon: School,
    value: '+600',
    label: 'Colegios',
    description: 'Instituciones educativas formaron parte de la escala histórica inicial.',
  },
  {
    icon: UsersRound,
    value: '+12.000',
    label: 'Jugadores',
    description: 'Estudiantes vivieron la competencia desde la cancha y sus comunidades.',
  },
  {
    icon: Trophy,
    value: '+1.400',
    label: 'Partidos',
    description: 'Encuentros marcaron el recorrido deportivo de la primera edición.',
  },
  {
    icon: Radio,
    value: 'FIFA PLAY',
    label: 'Transmisión en vivo',
    description: 'Primera edición transmitida en vivo para amplificar la historia del torneo.',
  },
] as const;

export default function AboutCopaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(
        '[data-about-editorial]',
        {
          opacity: 0,
          x: -18,
          duration: 0.7,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 78%' },
        }
      );

      gsap.from(
        '[data-about-fact]',
        {
          opacity: 0,
          y: 18,
          rotate: -0.25,
          duration: 0.68,
          stagger: 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );

      gsap.from(
        '[data-about-rule]',
        {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.72,
          stagger: 0.05,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-la-copa"
      aria-labelledby="about-copa-title"
      className="relative overflow-hidden bg-[#efe5d2] py-16 text-marathon-navy sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42] [background-image:radial-gradient(rgba(6,34,77,0.13)_0.7px,transparent_0.7px),linear-gradient(90deg,rgba(6,34,77,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(6,34,77,0.045)_1px,transparent_1px)] [background-size:18px_18px,64px_64px,64px_64px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-6 h-44 w-44 rotate-[-10deg] border-[12px] border-marathon-red/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-8 left-4 hidden font-montserrat text-[8rem] font-black uppercase leading-none tracking-[-0.08em] text-marathon-navy/[0.035] lg:block"
        aria-hidden="true"
      >
        COPA
      </div>

      <Container className="relative">
        <div className="border-y border-marathon-navy/20 bg-[#f4ead8]/82 shadow-[0_18px_48px_rgba(57,39,18,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div
              data-about-editorial
              className="relative border-b border-marathon-navy/20 px-5 py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-12"
            >
              <div
                className="absolute left-0 top-0 h-2 w-20 bg-marathon-red"
                aria-hidden="true"
              />
              <p className="font-montserrat text-xs font-black uppercase tracking-[0.24em] text-marathon-red">
                Sobre la Copa
              </p>
              <h2
                id="about-copa-title"
                className="mt-5 text-[clamp(3.25rem,12vw,4.75rem)] font-normal uppercase leading-[0.9] tracking-[0.005em] text-marathon-navy lg:text-[clamp(3.25rem,4vw,4.75rem)]"
                style={{ fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif' }}
              >
                <span className="block">El torneo intercolegial</span>
                <span className="block">más grande del Ecuador</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-marathon-navy/88">
                La Copa Nacional Intercolegial Marathon reúne a estudiantes, colegios y
                comunidades alrededor del fútbol, el orgullo y la competencia entre regiones del
                Ecuador.
              </p>
              <p className="mt-4 font-montserrat text-sm font-black uppercase tracking-[0.12em] text-marathon-navy/72">
                Una historia que se construye dentro y fuera de la cancha.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {historicalFacts.map((fact, index) => {
                const Icon = fact.icon;

                return (
                  <article
                    key={fact.label}
                    data-about-fact
                    className="relative min-h-[13.5rem] border-b border-marathon-navy/20 px-5 py-7 last:border-b-0 sm:px-6 lg:border-b-0 lg:px-5 lg:py-9"
                  >
                    {index > 0 ? (
                      <div
                        data-about-rule
                        className="absolute left-0 top-0 hidden h-full w-px bg-marathon-navy/22 lg:block"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div
                      className="absolute right-4 top-4 h-8 w-8 border-r border-t border-marathon-red/35"
                      aria-hidden="true"
                    />
                    <Icon
                      className="h-8 w-8 text-marathon-navy/90"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <p
                      className="mt-6 text-[clamp(2.7rem,10vw,3.5rem)] font-normal uppercase leading-none tracking-[0.005em] text-marathon-navy lg:text-[clamp(2.25rem,3vw,3.5rem)]"
                      style={{ fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif' }}
                    >
                      {fact.value}
                    </p>
                    <h3 className="mt-2 font-montserrat text-[0.78rem] font-black uppercase tracking-[0.16em] text-marathon-red">
                      {fact.label}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-marathon-navy/82">{fact.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="border-t border-marathon-navy/20 px-5 py-4 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.18em] text-marathon-navy/68 sm:px-7 lg:px-8">
            La primera edición dejó una escala histórica para el fútbol colegial del Ecuador.
          </p>
        </div>
      </Container>
    </section>
  );
}
