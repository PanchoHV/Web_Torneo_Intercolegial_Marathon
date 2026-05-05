import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTION_BACKGROUND =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT Image 5 may 2026, 09_39_36 a.webp';

const FEATURE_ICONS = {
  national:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Cobertura Nacional.webp',
  final:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Camino a la Final.webp',
  categories:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Torneo+.webp',
  cup:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-El Torneo Intercolegial más Grande del Ecuador.webp',
} as const;

const STAT_ICONS = {
  teams:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-600 Equipos.webp',
  players: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-12.webp',
  matches:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-1400 partidos.webp',
  duration:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Duración del Torneo.webp',
} as const;

type Stat =
  | {
      id: string;
      type: 'number';
      value: number;
      suffix: string;
      label: string;
      icon: string;
    }
  | {
      id: string;
      type: 'text';
      display: string;
      label: string;
      icon: string;
    };

const features = [
  {
    icon: FEATURE_ICONS.national,
    title: 'Cobertura Nacional',
    description:
      'Un torneo que conecta instituciones educativas de Costa, Sierra y Amazonía en una competencia de alcance nacional.',
    accent: 'red',
  },
  {
    icon: FEATURE_ICONS.final,
    title: 'Camino a la Final Nacional',
    description:
      'Cada colegio compite desde fases regionales hasta alcanzar la gran final nacional del Torneo Intercolegial Marathon.',
    accent: 'blue',
  },
  {
    icon: FEATURE_ICONS.categories,
    title: 'Competencia en 5 Categorías',
    description:
      'Participa en categorías masculinas y femeninas diseñadas para impulsar talento, formación y alto nivel competitivo.',
    accent: 'red',
  },
  {
    icon: FEATURE_ICONS.cup,
    title: 'La Copa Colegial más Grande del Ecuador',
    description:
      'Formación, comunidad y una experiencia deportiva única para colegios, jugadores y sus familias.',
    accent: 'blue',
  },
] as const;

const stats: readonly Stat[] = [
  { id: 'equipos', type: 'number', value: 600, suffix: '+', label: 'EQUIPOS', icon: STAT_ICONS.teams },
  {
    id: 'jugadores',
    type: 'number',
    value: 12000,
    suffix: '+',
    label: 'JUGADORES',
    icon: STAT_ICONS.players,
  },
  {
    id: 'partidos',
    type: 'number',
    value: 1400,
    suffix: '+',
    label: 'PARTIDOS',
    icon: STAT_ICONS.matches,
  },
  {
    id: 'duracion',
    type: 'text',
    display: '6+ meses',
    label: 'DE COMPETENCIA',
    icon: STAT_ICONS.duration,
  },
] as const;

/* ─── CountUp optimizado con ref (sin re-renders) ─── */
function CountUpValue({
  value,
  suffix = '',
  active,
}: {
  value: number;
  suffix?: string;
  active: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      ref.current.textContent = new Intl.NumberFormat('es-EC').format(value) + suffix;
      return;
    }

    const state = { current: 0 };
    const tween = gsap.to(state, {
      current: value,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent =
            new Intl.NumberFormat('es-EC').format(Math.round(state.current)) + suffix;
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [active, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function SobreElTorneo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-header', start: 'top 84%' },
        }
      );

      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 84%' },
        }
      );

      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 86%' },
        }
      );

      ScrollTrigger.create({
        trigger: '.about-stats',
        start: 'top 86%',
        once: true,
        onEnter: () => setStatsActive(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre-el-torneo"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url("${SECTION_BACKGROUND}")` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-white/78" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-marathon-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-marathon-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 border-l-[12px] border-t-[12px] border-marathon-blue/90 sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute left-4 top-0 h-24 w-24 border-l-[8px] border-t-[8px] border-marathon-red/90 sm:left-7 sm:h-36 sm:w-36" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="about-header mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#d7e1f0] bg-white/90 px-5 py-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#1456a8] shadow-[0_12px_28px_rgba(13,79,163,0.06)] backdrop-blur-sm sm:tracking-[0.22em]">
            EL TORNEO INTERCOLEGIAL MÁS GRANDE DE ECUADOR
          </span>
          <h2 className="mt-6 font-montserrat text-4xl font-black uppercase leading-[0.95] tracking-[0.01em] text-[#062a67] drop-shadow-[0_8px_18px_rgba(13,79,163,0.08)] sm:text-5xl lg:text-7xl">
            SOBRE EL TORNEO
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#5b6c84] sm:text-lg">
            Una competencia nacional que conecta colegios, talento y pasión por el fútbol en todo Ecuador.
          </p>
        </div>

        <div className="about-grid mt-14 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-2">
          {features.map((feature) => {
            const accentClass =
              feature.accent === 'red' ? 'bg-[#f02835]' : 'bg-[#0d4fa3]';
            const glowClass =
              feature.accent === 'red' ? 'bg-[#f02835]/10' : 'bg-[#0d4fa3]/10';

            return (
              <article
                key={feature.title}
                className="about-card group relative overflow-hidden rounded-[28px] border border-[#dbe4f0] bg-white/92 p-5 shadow-[0_16px_40px_rgba(13,79,163,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(13,79,163,0.12)] sm:p-7"
              >
                <div className={`absolute inset-y-0 left-0 w-1 ${accentClass}`} />
                <div className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${glowClass} blur-3xl`} />
                <img
                  src={feature.icon}
                  alt=""
                  className="pointer-events-none absolute bottom-4 right-5 h-28 w-28 object-contain opacity-[0.055] transition-transform duration-500 group-hover:scale-110 sm:h-36 sm:w-36"
                  loading="lazy"
                />

                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#0a3f86] bg-[#0d4fa3] shadow-[0_12px_24px_rgba(13,79,163,0.22)] sm:h-20 sm:w-20">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="h-10 w-10 object-contain brightness-0 invert sm:h-12 sm:w-12"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-montserrat text-xl font-extrabold leading-tight text-[#0d4fa3]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5b6c84] sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`about-stats mt-12 transition-all duration-1000 delay-200 lg:mt-14 ${
            statsActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-[32px] border border-[#dbe4f0] bg-white/95 p-5 shadow-[0_20px_50px_rgba(13,79,163,0.08)] backdrop-blur-sm sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full border-[12px] border-[#0d4fa3]/14" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-[10px] border-[#f02835]/14" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#0d4fa3]/20 to-transparent" />

            <div className="relative grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-0">
              {stats.map((stat, index) => {
                const isNumber = stat.type === 'number';

                return (
                  <article
                    key={stat.id}
                    className={`about-stat relative flex flex-col items-center justify-center px-3 py-4 text-center lg:px-6 ${
                      index > 0 ? 'lg:border-l lg:border-[#dbe4f0]' : ''
                    }`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-[#0d4fa3] shadow-[0_14px_32px_rgba(13,79,163,0.18)] sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20">
                      <img
                        src={stat.icon}
                        alt={stat.label}
                        className="h-[82%] w-[82%] scale-110 object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4 font-montserrat text-3xl font-black leading-none tracking-tight text-marathon-gold sm:text-4xl lg:text-5xl">
                      {isNumber ? (
                        <CountUpValue
                          value={stat.value}
                          suffix={stat.suffix}
                          active={statsActive}
                        />
                      ) : (
                        <span className="block text-[1.15rem] leading-tight sm:text-[1.9rem] lg:text-[2.15rem]">
                          {stat.display}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#dbe4f0] bg-[#f9fbff] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#6b7a90] sm:text-[0.68rem] sm:tracking-[0.18em]">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#f02835]" />
                      <span className="text-center leading-tight">{stat.label}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
