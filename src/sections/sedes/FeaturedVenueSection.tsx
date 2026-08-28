import { useEffect, useRef, type MouseEvent } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ArrowDown, Check, ImageIcon } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import { trackVenueDetailOpen } from '@/lib/analytics/gtm';
import {
  SEDES_BRAND_OVERLAYS,
  type FeaturedVenue,
} from '@/lib/constants/sedesPage';

gsap.registerPlugin(ScrollTrigger);

/** Por debajo de este ancho los overlays quedan estáticos. */
const OVERLAY_MOTION_QUERY = '(min-width: 768px)';

type FeaturedVenueSectionProps = {
  venue: FeaturedVenue;
};

/** Ancla de la sección de información útil, que ya refleja la sede seleccionada. */
const VENUE_INFO_ANCHOR = 'venue-information';

/**
 * El href nativo ya funciona sin JS; esto solo añade el desplazamiento suave
 * cuando el usuario no ha pedido reducir movimiento (`scroll-behavior` es
 * `auto` a nivel global, así que el salto sería seco).
 */
function handleInfoScroll(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(VENUE_INFO_ANCHOR);

  if (!target) return;

  event.preventDefault();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

/**
 * Bloque SEDE DESTACADA.
 *
 * Presentación pura: toda la data llega resuelta desde la página
 * (VENUES + capa editorial de `sedesPage`).
 */
export default function FeaturedVenueSection({ venue }: FeaturedVenueSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tacticalRef = useRef<HTMLDivElement>(null);
  const chevronsRef = useRef<HTMLDivElement>(null);

  const handleVenueDetailOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    trackVenueDetailOpen({
      source_page: '/sedes',
      section: 'featured_venue',
      region: venue.region,
      city: venue.city,
      venue_name: venue.displayName,
    });
    handleInfoScroll(event);
  };

  /** Marcas de agua con profundidad. Featured es más sobrio que el Explorer. */
  useEffect(() => {
    const section = sectionRef.current;
    const layers = [
      { el: tacticalRef.current, y: -10 },
      { el: chevronsRef.current, y: -5 },
    ].filter((layer): layer is { el: HTMLDivElement; y: number } => Boolean(layer.el));

    if (!section || layers.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add(OVERLAY_MOTION_QUERY, () => {
      layers.forEach((layer) => {
        gsap.to(layer.el, {
          y: layer.y,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="sede-destacada"
      aria-labelledby="sede-destacada-title"
      ref={sectionRef}
      className="relative scroll-mt-[calc(var(--header-height)+1.5rem)] overflow-hidden bg-marathon-navy pb-[clamp(3.5rem,5vw,5rem)] pt-[clamp(1rem,2vw,2rem)] text-white"
    >
      {/* ── Capa de marcas de agua: por debajo del contenido ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <div
          ref={tacticalRef}
          className="absolute right-[-6%] top-[2%] w-[clamp(190px,26vw,430px)] will-change-transform"
        >
          <img src={SEDES_BRAND_OVERLAYS.tacticalMain} alt="" className="w-full opacity-[0.13]" />
        </div>

        <div
          ref={chevronsRef}
          className="absolute bottom-[6%] left-[-3%] w-[clamp(80px,8vw,130px)] will-change-transform"
        >
          <img src={SEDES_BRAND_OVERLAYS.chevronsRed} alt="" className="w-full opacity-[0.22]" />
        </div>
      </div>

      <Container className="relative z-10 w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="gold">Sede destacada</SectionLabel>

        <Surface
          key={venue.id}
          variant="stadium"
          className="mt-4 animate-[featured-venue-in_380ms_ease-out_both] overflow-hidden rounded-[26px] border-white/10 bg-white/[0.045] motion-reduce:animate-none"
        >
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/*
              FOTO — placeholder hasta que exista el arte por sede.
              No se referencia ninguna URL inventada.
            */}
            {venue.venueImage ? (
              <img
                src={venue.venueImage}
                alt={`Escenario principal de ${venue.city}`}
                loading="lazy"
                decoding="async"
                className="h-full min-h-[220px] w-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                data-slot="featured-venue-photo"
                className="relative flex min-h-[220px] items-center justify-center border-b border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] lg:border-b-0 lg:border-r"
              >
                <div className="flex flex-col items-center gap-2 text-white/35">
                  <ImageIcon size={28} strokeWidth={1.6} />
                  <span className="font-montserrat text-[0.62rem] font-black uppercase tracking-[0.2em]">
                    Foto pendiente
                  </span>
                </div>
              </div>
            )}

            <div className="p-[clamp(1.35rem,2.4vw,2.25rem)]">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  id="sede-destacada-title"
                  className="font-normal uppercase leading-[0.88] text-marathon-cream"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                    fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                  }}
                >
                  {venue.city}
                </h2>
                <span
                  className={`rounded-full border px-3 py-1 font-montserrat text-[0.62rem] font-black uppercase tracking-[0.14em] ${
                    venue.isMainVenue
                      ? 'border-transparent bg-marathon-cream text-marathon-navy'
                      : 'border-marathon-cream/45 bg-transparent text-marathon-cream'
                  }`}
                >
                  {venue.eyebrow}
                </span>
              </div>

              <p className="mt-1 font-montserrat text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/70">
                Provincia de {venue.province} · {venue.region}
              </p>

              {venue.description ? (
                <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-7 text-white/78">
                  {venue.description}
                </p>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {venue.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd
                          className="font-normal leading-none text-marathon-cream"
                          style={{
                            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                            fontSize: 'clamp(1.9rem, 2.6vw, 2.6rem)',
                          }}
                        >
                          {stat.value}
                        </dd>
                        <p className="mt-1 font-montserrat text-[0.6rem] font-black uppercase tracking-[0.16em] text-white/55">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="border-t border-white/12 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <h3 className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.16em] text-marathon-cream">
                    Escenarios principales
                  </h3>

                  {venue.mainLocations.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {venue.mainLocations.map((location) => (
                        <li
                          key={location}
                          className="flex items-start gap-2 text-[0.85rem] leading-6 text-white/78"
                        >
                          <Check
                            size={15}
                            strokeWidth={3}
                            className="mt-1 shrink-0 text-marathon-red"
                            aria-hidden="true"
                          />
                          <span>{location}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-[0.85rem] leading-6 text-white/55">
                      Escenarios por confirmar para esta sede.
                    </p>
                  )}

                  {/*
                    La información de la sede ya vive en la sección siguiente,
                    así que el CTA baja hasta ahí en vez de prometer una ficha
                    individual que todavía no existe.
                  */}
                  <a
                    href={`#${VENUE_INFO_ANCHOR}`}
                    onClick={handleVenueDetailOpen}
                    className="group mt-5 inline-flex items-center gap-2 border-b border-marathon-red/60 pb-1 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.14em] text-marathon-cream transition-colors duration-200 hover:border-marathon-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red"
                  >
                    Ver información de la sede
                    <ArrowDown
                      size={14}
                      strokeWidth={2.8}
                      aria-hidden="true"
                      className="text-marathon-red transition-transform duration-200 group-hover:translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Surface>
      </Container>

      <style>{`
        @keyframes featured-venue-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
