import { useEffect, useMemo, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ChevronRight, SlidersHorizontal } from 'lucide-react';

import EcuadorVenueMap from '@/components/venues/EcuadorVenueMap';
import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Surface } from '@/components/ui/surface';
import { SEDES_BRAND_OVERLAYS } from '@/lib/constants/sedesPage';
import { VENUE_REGION_OPTIONS, type Venue } from '@/lib/constants/venues';

gsap.registerPlugin(ScrollTrigger);

/** Por debajo de este ancho los overlays quedan estáticos. */
const OVERLAY_MOTION_QUERY = '(min-width: 768px)';

type RegionFilter = (typeof VENUE_REGION_OPTIONS)[number];

type SedesExplorerSectionProps = {
  venues: Venue[];
  selectedVenueId: string;
  onSelectVenue: (venueId: string) => void;
};

const ALL_CITIES = 'todas';

/** Tinte del thumbnail por región. Mismos colores que usa la leyenda del mapa. */
const REGION_TINT: Record<Venue['region'], string> = {
  Costa: 'border-[#19bfff]/40 bg-[#19bfff]/10 text-[#0d76a6]',
  Sierra: 'border-marathon-red/30 bg-marathon-red/[0.08] text-marathon-red',
  Amazonía: 'border-marathon-green/30 bg-marathon-green/10 text-marathon-green',
};

const MONTH_ABBR: Record<string, string> = {
  enero: 'ENE',
  febrero: 'FEB',
  marzo: 'MAR',
  abril: 'ABR',
  mayo: 'MAY',
  junio: 'JUN',
  julio: 'JUL',
  agosto: 'AGO',
  septiembre: 'SEP',
  octubre: 'OCT',
  noviembre: 'NOV',
  diciembre: 'DIC',
};

/**
 * "17 de agosto de 2026" → "17 AGO 2026".
 *
 * Devuelve null si la cadena no calza con el formato de `venues.ts`: la card
 * omite la línea de fecha antes que mostrar un dato mal formado.
 */
function toCompactDate(value: string) {
  const match = /^(\d{1,2}) de ([a-záéíóú]+) de (\d{4})$/i.exec(value.trim());

  if (!match) return null;

  const month = MONTH_ABBR[match[2].toLowerCase()];

  return month ? `${match[1]} ${month} ${match[3]}` : null;
}

function filterVenues(venues: Venue[], region: RegionFilter, city: string) {
  return venues.filter(
    (venue) =>
      (region === 'Todas' || venue.region === region) &&
      (city === ALL_CITIES || venue.city === city),
  );
}

/**
 * Corazón de /sedes: mapa existente + filtros + listado.
 *
 * El mapa es zona LOCKED/REUSE — se monta una sola vez, con su data y su
 * contrato original (`venues` / `selectedVenueId` / `onSelectVenue`).
 * Los filtros reducen la colección que se pasa al mapa Y al listado, así que
 * marcadores y filas quedan sincronizados sin tocar el componente del mapa.
 */
export default function SedesExplorerSection({
  venues,
  selectedVenueId,
  onSelectVenue,
}: SedesExplorerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tacticalRef = useRef<HTMLDivElement>(null);
  const xoxRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const chevronsRef = useRef<HTMLDivElement>(null);

  /**
   * Profundidad de las marcas de agua. Cada capa recorre una distancia
   * distinta para que la franja Navy se lea con planos, no como un bloque.
   * El contenido nunca se mueve.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const layers = [
      { el: tacticalRef.current, y: -18 },
      { el: xoxRef.current, y: -8 },
      { el: arrowRef.current, y: -14, x: 4 },
      { el: chevronsRef.current, y: -6 },
    ].filter((layer): layer is { el: HTMLDivElement; y: number; x?: number } => Boolean(layer.el));

    if (!section || layers.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // matchMedia revierte sus tweens y ScrollTriggers al salir del breakpoint
    // y en mm.revert(): sin duplicados tras hot reload o navegación.
    const mm = gsap.matchMedia();

    mm.add(OVERLAY_MOTION_QUERY, () => {
      layers.forEach((layer) => {
        gsap.to(layer.el, {
          y: layer.y,
          x: layer.x ?? 0,
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

  const [region, setRegion] = useState<RegionFilter>('Todas');
  const [city, setCity] = useState<string>(ALL_CITIES);

  const filteredVenues = useMemo(
    () => filterVenues(venues, region, city),
    [city, region, venues],
  );

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(filterVenues(venues, region, ALL_CITIES).map((venue) => venue.city))).sort(),
    [region, venues],
  );

  /**
   * La sede destacada siempre debe ser una de las sedes visibles: si el filtro
   * deja fuera la selección actual, se promueve la primera del set resultante.
   * Se resuelve en el handler (no en un efecto) para evitar renders en cascada.
   */
  function reconcileSelection(nextVenues: Venue[]) {
    if (nextVenues.length === 0) return;
    if (nextVenues.some((venue) => venue.id === selectedVenueId)) return;

    onSelectVenue(nextVenues[0].id);
  }

  function handleRegionChange(nextRegion: RegionFilter) {
    setRegion(nextRegion);
    // Al cambiar de región la ciudad elegida puede dejar de existir en el set.
    setCity(ALL_CITIES);
    reconcileSelection(filterVenues(venues, nextRegion, ALL_CITIES));
  }

  function handleCityChange(nextCity: string) {
    setCity(nextCity);
    reconcileSelection(filterVenues(venues, region, nextCity));
  }

  const activeRegions = useMemo(
    () => new Set(filteredVenues.map((venue) => venue.region)).size,
    [filteredVenues],
  );

  return (
    <section
      ref={sectionRef}
      id="explorador-sedes"
      aria-labelledby="explorador-sedes-title"
      className="relative overflow-hidden bg-marathon-navy py-[clamp(3.5rem,5vw,5rem)] text-white"
    >
      {/* ── Capa de marcas de agua: siempre por debajo del contenido ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <div
          ref={tacticalRef}
          className="absolute right-[-7%] top-[-9%] w-[clamp(220px,30vw,500px)] will-change-transform"
        >
          <img src={SEDES_BRAND_OVERLAYS.tacticalMain} alt="" className="w-full opacity-[0.16]" />
        </div>

        <div
          ref={xoxRef}
          className="absolute bottom-[-8%] left-[-5%] w-[clamp(170px,20vw,330px)] will-change-transform"
        >
          <img src={SEDES_BRAND_OVERLAYS.tacticalXox} alt="" className="w-full opacity-[0.14]" />
        </div>

        <div
          ref={arrowRef}
          className="absolute bottom-[-6%] left-[48%] w-[clamp(200px,28vw,460px)] will-change-transform"
        >
          <img src={SEDES_BRAND_OVERLAYS.arrowDashed} alt="" className="w-full opacity-[0.12]" />
        </div>

        <div
          ref={chevronsRef}
          className="absolute left-[36%] top-[3%] hidden w-[clamp(70px,8vw,120px)] will-change-transform lg:block"
        >
          <img src={SEDES_BRAND_OVERLAYS.chevronsRed} alt="" className="w-full opacity-[0.26]" />
        </div>
      </div>

      <Container className="relative z-10 w-full" style={{ maxWidth: '88rem' }}>
        {/* ── Header del explorer ── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <SectionLabel tone="gold">Explorador de sedes</SectionLabel>
            <h2
              id="explorador-sedes-title"
              className="mt-3 font-normal uppercase leading-[0.88] text-marathon-cream"
              style={{
                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                fontSize: 'clamp(2.1rem, 3.4vw, 3.4rem)',
              }}
            >
              Mapa general del Ecuador
            </h2>
          </div>

          <div className="lg:max-w-[24rem] lg:pb-1 lg:text-right">
            <p className="text-[0.9rem] leading-6 text-white/70">
              Explora nuestras sedes por región y encuentra toda la información
              para tu participación.
            </p>
            {/* Cifras derivadas de la colección filtrada, nunca hardcodeadas. */}
            <p className="mt-2 font-montserrat text-[0.66rem] font-black uppercase tracking-[0.16em] text-marathon-cream">
              {filteredVenues.length} {filteredVenues.length === 1 ? 'sede' : 'sedes'}
              <span className="mx-2 text-marathon-gold">/</span>
              {activeRegions} {activeRegions === 1 ? 'región' : 'regiones'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* ── Mapa ──────────────────────────────────────────────
              EcuadorVenueMap ya trae su propio panel navy, su leyenda de
              regiones y su caption inferior. Este wrapper NO añade otra card:
              recorta al mismo radio, sin sombra: sobre el Navy del escenario
              la caja debe fundirse en vez de flotar. */}
          <div className="min-w-0 overflow-hidden rounded-[1.35rem]">
            <EcuadorVenueMap
              venues={filteredVenues}
              selectedVenueId={selectedVenueId}
              onSelectVenue={onSelectVenue}
            />
          </div>

          {/* ── Control rail ───────────────────────────────────────
              En lg el contenido se saca del flujo (absolute inset-0) para que
              la altura de la fila la marque solo el mapa: así el rail termina
              exactamente en el mismo borde inferior sin alturas mágicas.
              Por debajo de lg vuelve al flujo normal y recupera su altura
              natural apilado bajo el mapa. */}
          <div className="min-w-0 lg:relative">
            <div className="flex flex-col gap-4 lg:absolute lg:inset-0">
            <Surface
              variant="paper"
              className="shrink-0 rounded-2xl border-marathon-navy/10 bg-white p-[clamp(1.15rem,1.5vw,1.45rem)] shadow-[0_14px_34px_rgba(2,17,35,0.28)]"
            >
              <h3 className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.18em] text-marathon-navy">
                Filtrar por región
              </h3>

              <div
                role="group"
                aria-label="Filtrar sedes por región"
                className="mt-3 flex flex-wrap gap-2"
              >
                {VENUE_REGION_OPTIONS.map((option) => {
                  const isActive = option === region;

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleRegionChange(option)}
                      className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 font-montserrat text-[0.66rem] font-black uppercase tracking-[0.1em] transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red ${
                        isActive
                          ? 'border-marathon-navy bg-marathon-navy text-white'
                          : 'border-marathon-navy/15 bg-white text-marathon-navy hover:-translate-y-px hover:border-marathon-navy/30 hover:bg-marathon-navy/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-marathon-red"
                        />
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                {/*
                  Select custom sobre el primitive Radix ya presente en el
                  sistema (`@/components/ui/select`): el menú nativo del SO
                  rompía el lenguaje visual al abrirse. El estado, las opciones
                  y el callback de filtrado son exactamente los de antes.
                */}
                <span
                  id="sedes-city-label"
                  className="font-montserrat text-[0.62rem] font-black uppercase tracking-[0.16em] text-marathon-gray"
                >
                  Ciudad
                </span>

                <Select value={city} onValueChange={handleCityChange}>
                  <SelectTrigger
                    aria-labelledby="sedes-city-label"
                    className="mt-1.5 h-11 w-full rounded-[10px] border-marathon-navy/[0.14] bg-white px-3.5 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.08em] text-marathon-navy shadow-none transition-colors duration-200 hover:border-marathon-navy/30 focus-visible:border-marathon-blue focus-visible:ring-marathon-blue/25 data-[state=open]:border-marathon-navy/30 [&>svg]:size-4 [&>svg]:text-marathon-navy [&>svg]:opacity-100 [&>svg]:transition-transform [&>svg]:duration-200"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    align="start"
                    sideOffset={6}
                    className="max-h-[19rem] w-[var(--radix-select-trigger-width)] rounded-xl border-marathon-navy/[0.12] bg-marathon-surface-paper p-1.5 shadow-[0_14px_36px_rgba(6,42,79,0.16)]"
                  >
                    <SelectItem value={ALL_CITIES} className="venue-city-option">
                      Todas las ciudades
                    </SelectItem>
                    {cityOptions.map((option) => (
                      <SelectItem key={option} value={option} className="venue-city-option">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Acción secundaria: los filtros avanzados llegan en otro loop. */}
              <button
                type="button"
                disabled
                title="Filtros avanzados disponibles próximamente"
                className="mt-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-marathon-navy/20 bg-transparent font-montserrat text-[0.68rem] font-black uppercase tracking-[0.12em] text-marathon-navy/65 disabled:cursor-not-allowed"
              >
                <SlidersHorizontal size={15} strokeWidth={2.4} aria-hidden="true" />
                Más filtros
              </button>
            </Surface>

            <Surface
              variant="paper"
              className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-marathon-navy/10 bg-white shadow-[0_14px_34px_rgba(2,17,35,0.28)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-marathon-navy/[0.08] px-5 py-3.5">
                <h3 className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.18em] text-marathon-navy">
                  Sedes disponibles
                </h3>
                <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-marathon-navy px-2 font-montserrat text-[0.66rem] font-black text-white">
                  {filteredVenues.length}
                </span>
              </div>

              {filteredVenues.length === 0 ? (
                <p className="px-5 py-6 text-sm leading-6 text-marathon-gray">
                  No hay sedes que coincidan con el filtro seleccionado.
                </p>
              ) : (
                <ul className="venue-scroll max-h-[26rem] min-h-0 flex-1 space-y-1 overflow-y-auto p-2 lg:max-h-none">
                  {filteredVenues.map((venue) => (
                    <li key={venue.id}>
                      <VenueCard
                        venue={venue}
                        isSelected={venue.id === selectedVenueId}
                        onSelect={onSelectVenue}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </Surface>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        #explorador-sedes .venue-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 42, 79, 0.22) transparent;
        }

        #explorador-sedes .venue-scroll::-webkit-scrollbar {
          width: 6px;
        }

        #explorador-sedes .venue-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(6, 42, 79, 0.22);
          border-radius: 999px;
        }

        #explorador-sedes [data-slot='select-trigger'][data-state='open'] > svg {
          transform: rotate(180deg);
        }
      `}</style>

      {/* El dropdown vive en un portal fuera de la sección: los estilos van sin
          anidar bajo #explorador-sedes. */}
      <style>{`
        .venue-city-option {
          height: 2.75rem;
          border-radius: 8px;
          padding-left: 0.85rem;
          padding-right: 2.25rem;
          font-family: Montserrat, sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #062a4f;
          transition: background-color 160ms ease, color 160ms ease;
          /* Radix enfoca la opción resaltada: sin esto asoma el anillo azul del navegador. */
          outline: none;
        }

        .venue-city-option[data-highlighted] {
          background-color: rgba(6, 42, 79, 0.07);
          color: #062a4f;
        }

        .venue-city-option[data-state='checked'] {
          background-color: rgba(226, 27, 45, 0.07);
        }

        .venue-city-option [data-slot='select-item-indicator'] svg {
          color: #e21b2d;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-slot='select-content'] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

type VenueCardProps = {
  venue: Venue;
  isSelected: boolean;
  onSelect: (venueId: string) => void;
};

/** Card horizontal del listado. Un solo markup para todas las sedes. */
function VenueCard({ venue, isSelected, onSelect }: VenueCardProps) {
  const startDate = toCompactDate(venue.matchStart);

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(venue.id)}
      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl py-2.5 pl-3.5 pr-3 text-left transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-marathon-red ${
        isSelected ? 'bg-marathon-red/[0.05]' : 'hover:bg-marathon-navy/[0.03]'
      }`}
    >
      {/* Rail recto: el borde izquierdo se curvaría con el radio de la card. */}
      {isSelected && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-marathon-red"
        />
      )}
      {/*
        Fallback tipográfico: no hay foto por sede en la data todavía, así que
        se compone un thumbnail con las iniciales y el tinte de su región.
      */}
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border font-normal leading-none transition-transform duration-200 ease-out group-hover:scale-[1.02] ${REGION_TINT[venue.region]}`}
        style={{ fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif', fontSize: '1.3rem' }}
      >
        {venue.city.slice(0, 2).toUpperCase()}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block font-normal uppercase leading-none text-marathon-navy"
          style={{ fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif', fontSize: '1.28rem' }}
        >
          {venue.city}
        </span>
        <span className="mt-0.5 block truncate text-[0.78rem] leading-5 text-marathon-gray">
          {venue.province}
        </span>
        {startDate && (
          <span className="mt-1 block font-montserrat text-[0.6rem] font-black uppercase tracking-[0.12em] text-marathon-navy/55">
            Inicia {startDate}
          </span>
        )}
      </span>

      <ChevronRight
        size={17}
        strokeWidth={2.6}
        aria-hidden="true"
        className={`shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 ${
          isSelected ? 'text-marathon-red' : 'text-marathon-navy/45'
        }`}
      />
    </button>
  );
}
