import { Fragment, useEffect, useMemo, useState } from 'react';
import { CalendarCheck, ChevronRight, Lock, SquarePen } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { trackCtaClick } from '@/lib/analytics/gtm';
import { REGISTRATION_CLOSE_AT } from '@/lib/constants/regionStatus';

const R2 = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev';

const ASSETS = {
  /** Estructura física de la pizarra. El contenido va en HTML encima. */
  ledPanel: `${R2}/optimized-Pantalla%20Led.webp`,
  /** Estadio nocturno: atmósfera del módulo. */
  stadium: `${R2}/optimized-Fondo%20de%20est%C3%A1dio.webp`,
  /** Playbook táctico: detalle recortado al borde izquierdo. */
  tactical: `${R2}/optimized-elemento%20t%C3%A1ctico.webp`,
} as const;

/** Apertura del periodo. Solo alimenta el rango visible y el `<time>`. */
const REGISTRATION_OPEN_AT = '2026-08-28T00:00:00-05:00';

/** Rango visible. Parametrizado para ajustar el copy sin tocar las fechas. */
const REGISTRATION_WINDOW_LABEL = 'DEL 28 DE AGOSTO AL 05 DE OCTUBRE';

const REGIONS_LABEL = 'SIERRA Y ORIENTE';

/** Ámbar del marcador y rojo de alarma. Locales al módulo: no son tokens del sitio. */
const LED_AMBER = '#FFC400';
const LED_RED = '#FF2D2D';

type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO: Remaining = { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemaining(targetMs: number): Remaining {
  if (!Number.isFinite(targetMs)) return ZERO;

  const total = Math.max(0, targetMs - Date.now());
  const totalSeconds = Math.floor(total / 1000);

  return {
    total,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Cuenta regresiva de un segundo.
 *
 * Cada tick recalcula contra `Date.now()` en vez de restar 1s al estado
 * anterior: así no acumula deriva si la pestaña se suspende, y al volver del
 * background el número ya está corregido.
 */
function useCountdown(targetIso: string): Remaining {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(targetMs));

  useEffect(() => {
    // El valor inicial ya se calcula en el initializer de useState; aquí solo
    // nos suscribimos al reloj. Si el objetivo ya pasó, no abrimos intervalo.
    if (!Number.isFinite(targetMs) || Date.now() >= targetMs) return;

    const id = window.setInterval(() => {
      const next = getRemaining(targetMs);
      setRemaining(next);
      if (next.total <= 0) window.clearInterval(id);
    }, 1_000);

    return () => window.clearInterval(id);
  }, [targetMs]);

  return remaining;
}

const pad = (value: number) => String(value).padStart(2, '0');

const plural = (value: number, one: string, many: string) =>
  `${value} ${value === 1 ? one : many}`;

type Unit = {
  value: string;
  label: string;
  /** Etiqueta corta: en mobile no cabe "MINUTOS" sin romper la fila. */
  short: string;
};

/** Cabina LED: display ámbar con la malla de diodos superpuesta. */
function LedDisplay({ value }: { value: string }) {
  return (
    <div className="min-w-0 rounded-[9px] bg-white/[0.028] p-1.5 sm:p-2">
      <div className="relative overflow-hidden rounded-[6px] border border-[#FFC400]/60 bg-[#050505] px-1 py-2 text-center shadow-[inset_0_0_18px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,196,0,0.08)] [--led-cell:3.2px] sm:py-2.5 sm:[--led-cell:4px] md:[--led-cell:5px] lg:[--led-cell:6.4px]">
        <span className="relative inline-block">
          <span className="block font-montserrat text-[clamp(1.65rem,7.8vw,2.2rem)] font-black leading-[0.92] tracking-[0.02em] tabular-nums text-[#FFC400] [text-shadow:0_0_9px_rgba(255,196,0,0.32),0_0_26px_rgba(255,196,0,0.12)] md:text-[clamp(2.8rem,4.75vw,4.55rem)]">
            {value}
          </span>
          <span className="led-mesh pointer-events-none absolute -inset-2" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

function LedLabel({ label, short }: { label: string; short: string }) {
  return (
    <p className="min-w-0 text-center font-montserrat text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/80 sm:text-[0.6rem] sm:tracking-[0.2em]">
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </p>
  );
}

/** Separador: dos LEDs ámbar, no dos puntos tipográficos. */
function LedColon() {
  return (
    <span className="flex flex-col justify-center gap-[5px] self-center" aria-hidden="true">
      <span className="h-[3px] w-[3px] rounded-full bg-[#FFC400] shadow-[0_0_6px_rgba(255,196,0,0.8)] sm:h-1 sm:w-1" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#FFC400] shadow-[0_0_6px_rgba(255,196,0,0.8)] sm:h-1 sm:w-1" />
    </span>
  );
}

export default function SmartCopaBar() {
  const remaining = useCountdown(REGISTRATION_CLOSE_AT);
  const isClosed = remaining.total <= 0;

  const handleCtaClick = () => {
    trackCtaClick({
      cta_name: 'ir_a_inscripciones',
      cta_location: 'smart_copa_bar',
      destination: '/inscripciones',
    });
  };

  const accent = isClosed ? LED_RED : LED_AMBER;

  const units: Unit[] = [
    { value: pad(remaining.days), label: 'Días', short: 'Días' },
    { value: pad(remaining.hours), label: 'Horas', short: 'Horas' },
    { value: pad(remaining.minutes), label: 'Minutos', short: 'Min' },
    { value: pad(remaining.seconds), label: 'Segundos', short: 'Seg' },
  ];

  return (
    <section
      aria-labelledby="smart-copa-bar-title"
      className="relative isolate overflow-hidden bg-[#04070E] py-10 text-white md:pb-16 md:pt-14"
    >
      {/* LAYER 2 — estadio nocturno */}
      <img
        src={ASSETS.stadium}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.3] [filter:saturate(0.5)_contrast(0.85)_brightness(0.78)]"
      />
      {/* LAYER 3 — overlay: baja el centro para que la pizarra mande, deja luces laterales */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_76%_at_50%_50%,rgba(3,6,14,0.95)_0%,rgba(3,6,14,0.86)_38%,rgba(3,6,14,0.66)_68%,rgba(3,6,14,0.5)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-14 bg-gradient-to-b from-[#04070E] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-[#04070E] to-transparent"
        aria-hidden="true"
      />

      <Container className="relative max-w-[1290px]">
        <div className="relative mx-auto w-full max-w-[1280px]">
          <div
            className="pointer-events-none absolute inset-x-4 bottom-2 top-6 rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,146,226,0.2),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-24 -bottom-1 h-12 rounded-[50%] blur-xl"
            style={{ backgroundImage: `radial-gradient(closest-side, ${accent}26, transparent)` }}
            aria-hidden="true"
          />

          {/* LAYER 4 — cuerpo físico de la pantalla */}
          <div
            data-state={isClosed ? 'closed' : 'open'}
            className="relative rounded-[20px] border border-white/12 bg-[#0B0C10] p-2 shadow-[0_28px_60px_rgba(0,0,0,0.55),0_60px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.09)] sm:p-2.5 md:rounded-[26px] md:p-3"
          >
            <img
              src={ASSETS.ledPanel}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full rounded-[20px] object-cover opacity-40 mix-blend-screen md:rounded-[26px]"
            />

            {/* LAYER 5/6 — superficie de pantalla: negra + matriz de puntos CSS */}
            <div className="relative overflow-hidden rounded-[14px] bg-[#050506] px-4 py-6 shadow-[inset_0_0_50px_rgba(0,0,0,0.95)] sm:px-6 md:rounded-[18px] md:px-9 md:py-9">
              <div
                className="led-screen pointer-events-none absolute inset-0"
                aria-hidden="true"
              />

              {/* LAYER 7 — playbook táctico, recortado al borde */}
              <img
                src={ASSETS.tactical}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -left-10 top-1/2 hidden w-[105px] -translate-y-1/2 opacity-[0.11] mix-blend-screen md:block lg:-left-8 lg:w-[120px]"
              />

              {/* LED indicador físico */}
              <span
                className="pointer-events-none absolute left-3 top-3 h-2 w-2 rounded-full md:left-4 md:top-4 md:h-2.5 md:w-2.5"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 8px ${accent}, 0 0 17px ${accent}55`,
                }}
                aria-hidden="true"
              >
                <span
                  className="absolute inset-0 animate-[led-pulse_2.6s_ease-in-out_infinite] rounded-full motion-reduce:animate-none"
                  style={{ backgroundColor: accent }}
                />
              </span>

              <div className="relative grid gap-7 md:grid-cols-[38%_minmax(0,1fr)] md:items-center md:gap-6 lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-8">
                {/* ── Bloque informativo ── */}
                <div className="min-w-0 pl-1 md:pl-3 lg:pl-7">
                  <p className="font-montserrat text-[clamp(0.95rem,4vw,1.15rem)] font-bold uppercase leading-none tracking-[0.02em] text-white/92 md:text-[clamp(1rem,1.35vw,1.35rem)]">
                    Inscripciones
                  </p>
                  <h2
                    id="smart-copa-bar-title"
                    className="mt-1.5 w-fit max-w-full bg-gradient-to-b from-white via-white to-white/62 bg-clip-text font-montserrat text-[clamp(2.05rem,9.4vw,2.75rem)] font-black uppercase leading-[0.86] tracking-[-0.025em] text-transparent md:text-[clamp(2.25rem,3.35vw,3.25rem)]"
                  >
                    {isClosed ? 'Cerradas' : 'Abiertas'}
                  </h2>
                  <p
                    className="mt-4 inline-block rounded-[2px] px-3 py-1.5 font-montserrat text-[clamp(0.72rem,2.9vw,0.85rem)] font-black uppercase tracking-[0.1em] md:text-[clamp(0.75rem,1vw,0.95rem)]"
                    style={{
                      backgroundColor: accent,
                      color: isClosed ? '#FFFFFF' : '#0A0A0A',
                    }}
                  >
                    {REGIONS_LABEL}
                  </p>
                  <p className="mt-3 font-montserrat text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white/80 sm:text-[0.66rem] lg:whitespace-nowrap lg:text-[0.72rem]">
                    <time dateTime={REGISTRATION_OPEN_AT}>{REGISTRATION_WINDOW_LABEL}</time>
                  </p>
                </div>

                {/* ── Bloque marcador ── */}
                <div className="min-w-0">
                  {isClosed ? (
                    <div role="status">
                      <span
                        className="block h-px w-full"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, ${LED_RED} 0 6px, transparent 6px 12px)`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-center gap-4 py-5 md:gap-8 md:py-7">
                        <p
                          className="relative min-w-0 text-center font-montserrat text-[clamp(1.35rem,6.4vw,1.95rem)] font-black uppercase leading-[1.05] tracking-[0.06em] [--led-cell:2.6px] sm:[--led-cell:3.4px] md:text-[clamp(1.6rem,3vw,2.6rem)] md:[--led-cell:5px]"
                          style={{
                            color: LED_RED,
                            textShadow: `0 0 14px ${LED_RED}88, 0 0 38px ${LED_RED}33`,
                          }}
                        >
                          Inscripciones
                          <br />
                          Cerradas
                          <span
                            className="led-mesh pointer-events-none absolute inset-0"
                            aria-hidden="true"
                          />
                        </p>
                        <Lock
                          className="h-9 w-9 shrink-0 md:h-14 md:w-14"
                          style={{
                            color: LED_RED,
                            filter: `drop-shadow(0 0 12px ${LED_RED}88)`,
                          }}
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className="block h-px w-full"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, ${LED_RED} 0 6px, transparent 6px 12px)`,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div role="timer">
                      {/* ──── CIERRE DE INSCRIPCIONES EN: ──── */}
                      <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
                        <span
                          className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FFC400]/70"
                          aria-hidden="true"
                        />
                        <p className="shrink-0 font-montserrat text-[clamp(0.6rem,2.5vw,0.72rem)] font-black uppercase tracking-[0.2em] text-[#FFC400] [text-shadow:0_0_10px_rgba(255,196,0,0.45)] md:text-[clamp(0.72rem,1.1vw,0.95rem)] md:tracking-[0.26em]">
                          Cierre de inscripciones en:
                        </p>
                        <span
                          className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FFC400]/70"
                          aria-hidden="true"
                        />
                      </div>

                      <div
                        className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-1 sm:gap-x-2 md:gap-x-3"
                        aria-hidden="true"
                      >
                        {units.map((unit, index) => (
                          <Fragment key={unit.label}>
                            <LedDisplay value={unit.value} />
                            {index < units.length - 1 ? <LedColon /> : null}
                          </Fragment>
                        ))}
                        {units.map((unit, index) => (
                          <Fragment key={`${unit.label}-label`}>
                            <LedLabel label={unit.label} short={unit.short} />
                            {index < units.length - 1 ? <span /> : null}
                          </Fragment>
                        ))}
                      </div>

                      <p className="sr-only">
                        Faltan {plural(remaining.days, 'día', 'días')},{' '}
                        {plural(remaining.hours, 'hora', 'horas')} y{' '}
                        {plural(remaining.minutes, 'minuto', 'minutos')} para el cierre de
                        inscripciones de Sierra y Oriente. Las inscripciones cierran el 5 de
                        octubre de 2026 a las 23:59, hora de Ecuador.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA montado sobre el borde inferior de la pantalla */}
          <div className="relative z-10 -mt-4 flex justify-center px-4 md:-mt-5">
            {isClosed ? (
              <p className="inline-flex items-center gap-2.5 rounded-[8px] border border-white/14 bg-[#080A0F] px-4 py-3 text-center font-montserrat text-[0.72rem] font-bold text-white/88 shadow-[0_14px_34px_rgba(0,0,0,0.55)] sm:px-6 sm:text-sm">
                <CalendarCheck
                  className="h-4 w-4 shrink-0 text-white/55"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                ¡Gracias por ser parte de la Copa Marathon 2026!
              </p>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="cta"
                className="rounded-[8px] border border-[#FFC400] bg-[#050505] px-6 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(0,0,0,0.6),0_0_22px_rgba(255,196,0,0.14)] transition-colors hover:bg-[#0E0E10] hover:text-white sm:px-9 sm:text-sm"
              >
                <Link to="/inscripciones" onClick={handleCtaClick}>
                  <SquarePen
                    className="h-4 w-4 text-[#FFC400]"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  Ir a inscripciones
                  <ChevronRight
                    className="h-4 w-4 text-[#FFC400]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        /* Textura de pantalla: puntos finos y discretos sobre el área negra. */
        .led-screen {
          background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0.7px, transparent 0.8px);
          background-size: 5px 5px;
        }
        /*
         * Matriz LED real: la malla oscura son los HUECOS entre diodos. Sobre el
         * fondo casi negro es invisible; sobre el glifo ámbar recorta la forma en
         * puntos, que es lo que da la lectura de marcador electrónico.
         */
        .led-mesh {
          background-image: radial-gradient(
            circle at center,
            transparent 0 40%,
            rgba(5, 5, 6, 0.95) 53%
          );
          background-size: var(--led-cell, 5px) var(--led-cell, 5px);
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0; transform: scale(2.1); }
        }
      `}</style>
    </section>
  );
}
