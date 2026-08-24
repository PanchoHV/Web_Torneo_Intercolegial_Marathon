import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BadgeCheck, CalendarDays, Lock } from 'lucide-react';

import { Container } from '@/components/ui/container';
import {
  REGISTRATION_STATUS,
  type RegistrationStatus,
} from '@/lib/constants/regionStatus';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gramática visual compartida por las tres tarjetas.
 *
 * Todas usan la misma estructura, el mismo borde base y el mismo ritmo interno;
 * lo único que cambia por estado es la temperatura: `closed` se desatura y se
 * enfría, `upcoming` mantiene el navy activo, `open` sube el contraste.
 *
 * `accent` es el color de refuerzo en hover — rojo para cerrado, verde para los
 * dos estados con futuro. El verde no es de la paleta base: es un tono contenido,
 * elegido para leerse como disponibilidad sin competir con el rojo Marathon.
 */
type StatusTheme = {
  badgeLabel: string;
  icon: typeof Lock;
  panel: string;
  border: string;
  badge: string;
  iconTone: string;
  dot: string;
  map: string;
  accentLine: string;
  hoverBorder: string;
  hoverLabel: string;
  hoverLabelTone: string;
  pulse: boolean;
};

const STATUS_THEME: Record<RegistrationStatus, StatusTheme> = {
  closed: {
    badgeLabel: 'CERRADO',
    icon: Lock,
    panel: 'bg-[linear-gradient(150deg,rgba(14,22,32,0.98)_0%,rgba(20,29,40,0.96)_100%)]',
    border: 'border-white/10',
    badge: 'border-white/14 bg-white/[0.04] text-white/60',
    iconTone: 'border-white/12 bg-white/[0.04] text-white/60',
    dot: 'bg-slate-400',
    // Desatura el mapa: la región cerrada se lee inactiva antes de leer el texto.
    map: 'opacity-[0.5] saturate-[0.25] brightness-[0.95]',
    accentLine: 'from-white/22 via-white/8 to-transparent',
    hoverBorder: 'group-hover:border-[#E21B2D]/55 group-focus-visible:border-[#E21B2D]/55',
    hoverLabel: 'Inscripciones cerradas',
    hoverLabelTone: 'border-[#E21B2D]/45 bg-[#E21B2D]/12 text-[#FF8A93]',
    pulse: false,
  },
  upcoming: {
    badgeLabel: 'PRÓXIMAMENTE',
    icon: CalendarDays,
    panel: 'bg-[linear-gradient(150deg,rgba(6,32,60,0.98)_0%,rgba(9,42,74,0.96)_100%)]',
    border: 'border-white/14',
    badge: 'border-white/18 bg-white/[0.07] text-white/82',
    iconTone: 'border-white/18 bg-white/[0.07] text-white',
    dot: 'bg-[#35C07A]',
    map: 'opacity-100 saturate-[1.02]',
    accentLine: 'from-[#35C07A]/45 via-white/12 to-transparent',
    hoverBorder: 'group-hover:border-[#35C07A]/55 group-focus-visible:border-[#35C07A]/55',
    hoverLabel: 'Apertura próximamente',
    hoverLabelTone: 'border-[#35C07A]/45 bg-[#35C07A]/12 text-[#7BE0AE]',
    pulse: true,
  },
  open: {
    badgeLabel: 'ABIERTO',
    icon: BadgeCheck,
    panel: 'bg-[linear-gradient(150deg,rgba(7,38,71,0.98)_0%,rgba(11,53,92,0.96)_100%)]',
    border: 'border-[#35C07A]/28',
    badge: 'border-[#35C07A]/40 bg-[#35C07A]/12 text-[#7BE0AE]',
    iconTone: 'border-[#35C07A]/35 bg-[#35C07A]/12 text-[#7BE0AE]',
    dot: 'bg-[#35C07A]',
    map: 'opacity-100 saturate-[1.08]',
    accentLine: 'from-[#35C07A]/70 via-[#35C07A]/20 to-transparent',
    hoverBorder: 'group-hover:border-[#35C07A]/75 group-focus-visible:border-[#35C07A]/75',
    hoverLabel: 'Inscripciones abiertas',
    hoverLabelTone: 'border-[#35C07A]/45 bg-[#35C07A]/12 text-[#7BE0AE]',
    pulse: false,
  },
};

const visibleRegions = REGISTRATION_STATUS.filter((region) => region.active !== false);

export default function RegionStatusSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          '.registration-intro',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.registration-intro', start: 'top 82%' },
          }
        );

        gsap.fromTo(
          '.registration-card',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.76,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.registration-cards', start: 'top 86%' },
          }
        );
      }

      if (prefersReducedMotion || !finePointer) return;

      const cards = section.querySelectorAll<HTMLElement>('.registration-card');

      cards.forEach((card) => {
        const map = card.querySelector<HTMLElement>('[data-region-map]');
        const accent = card.querySelector<HTMLElement>('[data-region-accent]');

        const handleMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
          const normalizedY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));

          gsap.to(card, {
            x: normalizedX * 3.5,
            y: normalizedY * -1.5,
            rotateY: normalizedX * 1.5,
            rotateX: normalizedY * -1,
            transformPerspective: 900,
            duration: 0.28,
            ease: 'power3.out',
          });

          if (map) {
            gsap.to(map, {
              x: normalizedX * 4,
              scale: 1.035,
              duration: 0.28,
              ease: 'power3.out',
            });
          }

          if (accent) {
            gsap.to(accent, {
              opacity: 1,
              duration: 0.28,
              ease: 'power3.out',
            });
          }
        };

        const handleLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 0.36,
            ease: 'power3.out',
          });

          if (map) {
            gsap.to(map, {
              x: 0,
              scale: 1,
              duration: 0.36,
              ease: 'power3.out',
            });
          }

          if (accent) {
            gsap.to(accent, {
              opacity: 0.72,
              duration: 0.36,
              ease: 'power3.out',
            });
          }
        };

        card.addEventListener('pointermove', handleMove);
        card.addEventListener('pointerleave', handleLeave);

        cleanups.push(() => {
          card.removeEventListener('pointermove', handleMove);
          card.removeEventListener('pointerleave', handleLeave);
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
      id="estado-de-inscripciones"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#031528] py-[clamp(2.75rem,4.6vw,4.25rem)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="mx-auto w-full">
          <div className="registration-intro flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-[48rem]">
              <p className="font-montserrat text-[11px] font-black uppercase tracking-[0.3em] text-marathon-red">
                ESTADO DE INSCRIPCIONES
              </p>
              <h2 className="mt-3 max-w-[14ch] font-montserrat text-[clamp(2rem,4vw,3.35rem)] font-black uppercase leading-[0.92] tracking-[0.01em] text-white">
                ASEGURA EL LUGAR
                <br />
                DE TU COLEGIO
              </h2>
              <p className="mt-4 max-w-[42rem] text-sm leading-relaxed text-white/74 sm:text-[0.98rem]">
                Cada región avanza en un momento distinto. Consulta el estado y participa cuando las
                inscripciones estén disponibles.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/inscripciones')}
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 self-start rounded-full bg-marathon-red px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all duration-200 hover:gap-2.5 hover:brightness-110 sm:w-auto motion-reduce:transition-none"
            >
              Ir a inscripciones
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-[2px]" />
            </button>
          </div>

          <div className="registration-cards mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleRegions.map((region) => {
              const theme = STATUS_THEME[region.status];
              const Icon = theme.icon;
              const badgeLabel = region.availabilityLabel ?? theme.badgeLabel;
              const hasCta = Boolean(region.ctaLabel && region.ctaHref);

              return (
                <article
                  key={region.id}
                  tabIndex={0}
                  aria-label={`${region.region}: ${badgeLabel}`}
                  className={`registration-card group relative overflow-hidden rounded-[18px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_36px_rgba(0,0,0,0.16)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none md:last:col-span-2 xl:last:col-span-1 ${theme.panel} ${theme.border} ${theme.hoverBorder}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Línea de acento superior: el detalle que hermana a las tres tarjetas. */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${theme.accentLine} opacity-70 transition-opacity duration-200 group-hover:opacity-100`}
                  />

                  <div className="relative flex h-full flex-col gap-4 p-5 sm:p-[1.4rem]">
                    {/* 1 · Región + icono de estado */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/58">
                          {region.label}
                        </p>

                        {/* 2 · Badge siempre visible: el estado nunca depende del hover. */}
                        <div className="mt-2 flex items-center gap-2.5">
                          <span
                            className={`inline-flex h-2.5 w-2.5 rounded-full ${theme.dot} ${
                              theme.pulse
                                ? 'motion-safe:animate-[pulse_5.5s_ease-in-out_infinite] motion-reduce:animate-none'
                                : ''
                            }`}
                            aria-hidden="true"
                          />
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] ${theme.badge}`}
                          >
                            {badgeLabel}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${theme.iconTone}`}
                        aria-hidden="true"
                      >
                        <Icon size={16} strokeWidth={2.5} />
                      </span>
                    </div>

                    {/* 3 · Cuerpo + 4 · mapa de apoyo */}
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0 max-w-[19rem]">
                        <p
                          className="font-normal uppercase leading-[0.9] text-white"
                          style={{
                            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                            fontSize: 'clamp(1.45rem, 1.8vw, 2.08rem)',
                          }}
                          data-region-headline
                        >
                          {region.headline}
                        </p>
                        <p className="mt-2 max-w-[18rem] text-[0.9rem] leading-relaxed text-white/72">
                          {region.description}
                        </p>

                        {region.openingDate ? (
                          <p className="mt-2 text-[0.78rem] font-black uppercase tracking-[0.16em] text-white/60">
                            Apertura {region.openingDate}
                          </p>
                        ) : null}

                        {hasCta ? (
                          <button
                            type="button"
                            onClick={() => navigate(region.ctaHref!)}
                            className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-marathon-red px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white transition-all duration-200 hover:gap-2.5 motion-reduce:transition-none"
                          >
                            {region.ctaLabel}
                            <ArrowRight size={14} />
                          </button>
                        ) : null}
                      </div>

                      <div className="relative flex w-[84px] shrink-0 items-center justify-center sm:w-[92px] xl:w-[100px]">
                        <div
                          data-region-accent
                          className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${theme.accentLine} opacity-[0.72] blur-xl transition-opacity duration-200 group-hover:opacity-100`}
                        />
                        <img
                          src={region.mapSrc}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          data-region-map
                          className={`relative z-10 h-[66px] w-full object-contain transition-[transform,opacity,filter] duration-200 group-hover:scale-[1.035] sm:h-[72px] ${theme.map}`}
                        />
                      </div>
                    </div>

                    {/* 5 · Capa de refuerzo: repite el estado en hover/focus, nunca lo sustituye. */}
                    <div
                      aria-hidden="true"
                      className="mt-auto overflow-hidden pt-1"
                    >
                      <span
                        className={`inline-flex translate-y-1 items-center rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity ${theme.hoverLabelTone}`}
                      >
                        {theme.hoverLabel}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
