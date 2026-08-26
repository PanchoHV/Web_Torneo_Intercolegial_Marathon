import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent, WheelEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { HERO_ACCENT_STYLE, HERO_TYPE } from '@/lib/constants/hero-typography';
import { trackFanAppGalleryView } from '@/lib/analytics/gtm';

const R2_BASE = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/';

const ART = {
  stamp: `${R2_BASE}optimized-copa-stamp.webp`,
  tactical: `${R2_BASE}optimized-elementos%201.webp`,
  arrow: `${R2_BASE}optimized-flecha%20entre%20cortada.webp`,
} as const;

const ICONS = {
  ball: `${R2_BASE}optimized-Icono%20balo%CC%81n.webp`,
  team: `${R2_BASE}optimized-Icono%20equipo.webp`,
  stats: `${R2_BASE}optimized-Icono%20estadi%CC%81stica.webp`,
  venues: `${R2_BASE}optimized-Icono%20sedes.webp`,
  calendar: `${R2_BASE}optimized-Icono%20Calendario.webp`,
} as const;

const slides = [
  {
    id: 'inicio',
    title: 'Inicio',
    text: 'Todo comienza aquí. Entra a la Copa, descubre los partidos destacados y sigue de cerca lo más importante del torneo.',
    image: `${R2_BASE}optimized-Inicio.webp`,
    icon: ICONS.calendar,
  },
  {
    id: 'partidos',
    title: 'Partidos',
    text: 'Consulta cruces, horarios y sigue cada encuentro para no perderte ni un minuto de acción.',
    image: `${R2_BASE}optimized-Partidos.webp`,
    icon: ICONS.ball,
  },
  {
    id: 'sedes',
    title: 'Sedes',
    text: 'Encuentra dónde se juega cada jornada y ubica fácilmente los escenarios del torneo.',
    image: `${R2_BASE}optimized-Sede.webp`,
    icon: ICONS.venues,
  },
  {
    id: 'estadisticas',
    title: 'Estadísticas',
    text: 'Revisa tablas, posiciones y datos clave para entender cómo se mueve la competencia.',
    image: `${R2_BASE}optimized-Estadi%CC%81sticas.webp`,
    icon: ICONS.stats,
  },
  {
    id: 'equipos',
    title: 'Equipos',
    text: 'Busca a tu colegio, sigue su participación y acompaña su camino dentro de la Copa.',
    image: `${R2_BASE}optimized-Equipos.webp`,
    icon: ICONS.team,
  },
] as const;

const total = slides.length;
const DRAG_THRESHOLD = 48;
const WHEEL_COOLDOWN = 420;

export default function FanAppScreensSection() {
  const [active, setActive] = useState(Math.floor(slides.length / 2));
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const wheelLock = useRef(0);

  const current = slides[active];

  function showSlide(
    nextIndex: number,
    interaction: 'arrow' | 'dot' | 'swipe' | 'wheel'
  ) {
    const boundedIndex = Math.min(Math.max(nextIndex, 0), total - 1);
    if (boundedIndex === active) return;

    const nextSlide = slides[boundedIndex];
    trackFanAppGalleryView({
      screen_id: nextSlide.id,
      screen_name: nextSlide.title,
      interaction,
    });
    setActive(boundedIndex);
  }

  function go(direction: number, interaction: 'arrow' | 'swipe' | 'wheel') {
    showSlide(active + direction, interaction);
  }

  // Pointer events cubren mouse y touch con un solo camino.
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragStart.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    setDragX(event.clientX - dragStart.current);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    setIsDragging(false);
    setDragX(0);
    if (Math.abs(delta) > DRAG_THRESHOLD) go(delta < 0 ? 1 : -1, 'swipe');
  }

  function handlePointerCancel() {
    dragStart.current = null;
    setIsDragging(false);
    setDragX(0);
  }

  // Trackpad horizontal: el desplazamiento vertical sigue siendo de la pagina.
  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12) return;
    const now = Date.now();
    if (now - wheelLock.current < WHEEL_COOLDOWN) return;
    wheelLock.current = now;
    go(event.deltaX > 0 ? 1 : -1, 'wheel');
  }

  return (
    <section
      id="fan-app-screens"
      aria-labelledby="fan-app-screens-title"
      className="relative overflow-hidden py-[clamp(2.75rem,5vw,5rem)] text-[#062A4F]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={ART.stamp}
          alt=""
          loading="lazy"
          className="absolute -left-[9%] top-[4%] w-[clamp(11rem,21vw,21rem)] -rotate-12 opacity-[0.09]"
        />
        <img
          src={ART.tactical}
          alt=""
          loading="lazy"
          className="absolute -right-[6%] top-[6%] hidden w-[clamp(16rem,34vw,34rem)] opacity-[0.22] lg:block"
        />
        <img
          src={ART.arrow}
          alt=""
          loading="lazy"
          className="absolute -left-[2%] bottom-[18%] hidden w-[clamp(6rem,10vw,10rem)] -scale-x-100 opacity-[0.12] lg:block"
        />
      </div>

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#E21B2D]">
            Fan App
          </p>

          <h2
            id="fan-app-screens-title"
            className="mt-3 font-normal uppercase leading-[0.86] tracking-[-0.01em]"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(2.5rem, 5.4vw, 4.75rem)',
            }}
          >
            Vive la Copa desde adentro
          </h2>

          <p
            className={`${HERO_TYPE.accentGap} ${HERO_TYPE.accent} text-[#E21B2D]`}
            style={HERO_ACCENT_STYLE}
          >
            Descarga la Fan App
          </p>

          <p className="mx-auto mt-4 max-w-[38rem] font-inter text-[0.92rem] leading-7 text-[#18344f]/80">
            Explora la Fan App y descubre cómo seguir partidos, encontrar sedes, revisar
            estadísticas y acompañar a tu equipo en cada momento del torneo.
          </p>
        </div>

        <div className="relative mt-[clamp(2rem,3.6vw,3.25rem)]">
          <div
            className="cursor-grab select-none overflow-hidden active:cursor-grabbing"
            style={
              {
                '--slide-w': 'clamp(14rem,48vw,17.5rem)',
                touchAction: 'pan-y',
              } as CSSProperties
            }
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onWheel={handleWheel}
          >
            <ul
              className={`flex ease-out motion-reduce:transition-none ${
                isDragging ? '' : 'transition-transform duration-500'
              }`}
              style={{
                paddingInline: 'calc(50% - var(--slide-w) / 2)',
                transform: `translateX(calc(-1 * ${active} * var(--slide-w) + ${dragX}px))`,
              }}
            >
              {slides.map((slide, index) => {
                const isActive = index === active;
                // Profundidad graduada. El desplazamiento hacia el centro cierra el
                // hueco que deja el escalado y agrupa los cinco telefonos.
                const distance = index - active;
                const depth = Math.min(Math.abs(distance), 2);
                const scale = [1, 0.9, 0.78][depth];
                const opacity = [1, 0.92, 0.62][depth];
                const shift = [0, 7, 17][depth] * Math.sign(-distance);

                return (
                  <li
                    key={slide.id}
                    aria-hidden={!isActive}
                    className="w-[var(--slide-w)] shrink-0 px-[clamp(0.1rem,0.4vw,0.4rem)] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateX(${shift}%) scale(${scale})`, opacity }}
                  >
                    <div className="transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none lg:hover:scale-[1.02]">
                      <img
                        src={slide.image}
                        alt={`Pantalla de ${slide.title} en la Fan App Marathon`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-auto w-full drop-shadow-[0_12px_22px_rgba(6,42,79,0.15)]"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => go(-1, 'arrow')}
            disabled={active === 0}
            aria-label="Ver la captura anterior"
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#062A4F] text-white shadow-[0_8px_16px_rgba(6,42,79,0.18)] transition hover:bg-[#0B4EA0] disabled:pointer-events-none disabled:opacity-30 sm:h-13 sm:w-13"
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={() => go(1, 'arrow')}
            disabled={active === total - 1}
            aria-label="Ver la siguiente captura"
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#062A4F] text-white shadow-[0_8px_16px_rgba(6,42,79,0.18)] transition hover:bg-[#0B4EA0] disabled:pointer-events-none disabled:opacity-30 sm:h-13 sm:w-13"
          >
            <ChevronRight size={22} strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-[clamp(0.5rem,1.2vw,1rem)] flex flex-col items-center gap-2.5">
          <p className="font-montserrat text-[0.95rem] font-black tracking-[0.16em] text-[#E21B2D]">
            {String(active + 1).padStart(2, '0')}
            <span className="text-[#062A4F]/35"> / {String(total).padStart(2, '0')}</span>
          </p>

          <div className="flex items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => showSlide(index, 'dot')}
                aria-label={`Ver ${slide.title}`}
                aria-current={index === active}
                className={`h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  index === active ? 'w-6 bg-[#E21B2D]' : 'w-2.5 bg-[#062A4F]/25 hover:bg-[#062A4F]/45'
                }`}
              />
            ))}
          </div>
        </div>

        <div
          aria-live="polite"
          className="mx-auto mt-[clamp(0.75rem,1.6vw,1.25rem)] flex min-h-[9.5rem] max-w-[40rem] flex-col items-center text-center sm:min-h-[8.5rem]"
        >
          <img
            key={current.icon}
            src={current.icon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
          <h3 className="mt-2 font-montserrat text-[1rem] font-black uppercase tracking-[0.12em]">
            {current.title}
          </h3>
          <p className="mt-2 font-inter text-[0.9rem] leading-7 text-[#18344f]/80">
            {current.text}
          </p>
        </div>

      </Container>
    </section>
  );
}
