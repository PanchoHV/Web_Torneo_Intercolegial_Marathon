import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CalendarRange,
  Flag,
  MapPinned,
  ShieldCheck,
  Trophy,
  Users,
  Volleyball,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Tipado estricto con Discriminated Union ─── */
type Stat =
  | {
      id: string;
      type: 'number';
      value: number;
      suffix: string;
      label: string;
      icon: LucideIcon;
    }
  | {
      id: string;
      type: 'text';
      display: string;
      label: string;
      icon: LucideIcon;
    };

const features = [
  {
    icon: MapPinned,
    title: 'Cobertura Nacional',
    description:
      'Un torneo que conecta instituciones educativas de Costa, Sierra y Amazonía en una competencia de alcance nacional.',
  },
  {
    icon: Flag,
    title: 'Camino a la Final Nacional',
    description:
      'Cada colegio compite desde fases regionales hasta alcanzar la gran final nacional del Torneo Intercolegial Marathon.',
  },
  {
    icon: Volleyball,
    title: 'Competencia en 5 Categorías',
    description:
      'Participa en categorías masculinas y femeninas diseñadas para impulsar talento, formación y alto nivel competitivo.',
  },
  {
    icon: ShieldCheck,
    title: 'La Copa Colegial más Grande del Ecuador',
    description:
      'Formación, comunidad y una experiencia deportiva única para colegios, jugadores y sus familias.',
  },
] as const;

const stats: readonly Stat[] = [
  { id: 'equipos', type: 'number', value: 600, suffix: '+', label: 'Equipos', icon: Users },
  { id: 'jugadores', type: 'number', value: 12000, suffix: '+', label: 'Jugadores', icon: Trophy },
  { id: 'partidos', type: 'number', value: 1400, suffix: '+', label: 'Partidos', icon: Volleyball },
  { id: 'duracion', type: 'text', display: 'Jul 2026 - Ene 2027', label: 'Duración del torneo', icon: CalendarRange },
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
      duration: 1.6,
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
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-marathon-red/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-marathon-blue/8 blur-3xl" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="about-header mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full border border-marathon-blue/10 bg-white px-5 py-2 text-xs font-semibold tracking-[0.12em] text-marathon-blue shadow-[0_10px_24px_rgba(6,42,79,0.05)]">
            EL TORNEO INTERCOLEGIAL MÁS GRANDE DE ECUADOR
          </span>
          <h2 className="mt-5 font-montserrat text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-marathon-blue">
            Sobre el Torneo
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-relaxed text-marathon-gray sm:text-lg">
            Una competencia nacional que conecta colegios, talento y pasión por el fútbol en todo Ecuador.
          </p>
        </div>

        <div className="about-grid mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const accentBorder =
              index % 2 === 0 ? 'before:bg-marathon-red' : 'before:bg-marathon-blue';

            return (
              <article
                key={feature.title}
                className={`about-card relative overflow-hidden rounded-[1.6rem] border border-marathon-blue/10 bg-white p-5 shadow-[0_18px_40px_rgba(6,42,79,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(6,42,79,0.1)] before:absolute before:inset-y-0 before:left-0 before:w-1 ${accentBorder} sm:p-6`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(0,80,164,0.12),rgba(0,80,164,0.04))] text-marathon-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-montserrat text-[1.05rem] font-bold leading-tight text-marathon-blue sm:text-[1.15rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-marathon-gray sm:text-[0.96rem]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════
            BARRA DE STATS PREMIUM — REDISEÑADA
            ═══════════════════════════════════════════════════ */}
        <div
          className={`about-stats mt-14 transition-all duration-1000 delay-200 ${
            statsActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-marathon-blue/10 bg-gradient-to-br from-white via-white to-[#f0f7ff] p-2 shadow-[0_28px_60px_rgba(6,42,79,0.12)] sm:p-3">
            {/* Glow decorativo de fondo */}
            <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-marathon-blue/5 blur-[60px]" />
            <div className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-marathon-red/5 blur-[60px]" />

            <div className="relative grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isNumber = stat.type === 'number';

                return (
                  <article
                    key={stat.id}
                    className={`about-stat group relative flex flex-col items-center gap-4 px-4 py-7 text-center sm:px-6 sm:py-8 lg:items-start lg:text-left ${
                      index < stats.length - 1
                        ? 'lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-16 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-marathon-blue/20 lg:after:to-transparent'
                        : ''
                    }`}
                  >
                    {/* Icono Premium: gradiente + glass */}
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-marathon-blue to-[#0050a4] shadow-lg shadow-marathon-blue/25 transition-all duration-500 group-hover:shadow-marathon-blue/40 group-hover:scale-105">
                        <Icon size={24} className="text-white drop-shadow-sm" />
                      </div>
                      {/* Anillo decorativo sutil */}
                      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-marathon-blue/20 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Número / Texto principal */}
                    <div className="flex flex-col gap-1">
                      <div className="font-montserrat text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-none tracking-tight text-marathon-blue drop-shadow-sm">
                        {isNumber ? (
                          <CountUpValue
                            value={stat.value}
                            suffix={stat.suffix}
                            active={statsActive}
                          />
                        ) : (
                          <span className="text-[clamp(1.1rem,2.4vw,1.5rem)] leading-tight">
                            {stat.display}
                          </span>
                        )}
                      </div>

                      {/* Label con pill elegante */}
                      <div className="mt-1 inline-flex items-center gap-2 self-center rounded-full border border-marathon-blue/10 bg-marathon-blue/[0.03] px-3 py-1 lg:self-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-marathon-red shadow-[0_0_6px_rgba(220,38,38,0.4)]" />
                        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-marathon-gray/80">
                          {stat.label}
                        </span>
                      </div>
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