import type { CSSProperties } from 'react';

import { Container } from '@/components/ui/container';

const BEBAS = '"Bebas Neue", sans-serif';

/**
 * Contrato de contenido comercial.
 *
 * Es el shape que entregará el mini CMS (Admin + Supabase). Hoy se alimenta de
 * la constante `SPONSOR_ITEMS`; cuando exista la tabla, solo se reemplaza esa
 * constante por el fetch y el render no cambia.
 */
export type SponsorItem = {
  id: string;
  name: string;
  kind: 'logo' | 'banner';

  /** `logo`: archivo del auspiciante. */
  logoUrl?: string;
  /** `banner`: creatividad por breakpoint. */
  desktopAssetUrl?: string;
  mobileAssetUrl?: string;

  alt: string;
  href?: string;

  featured?: boolean;
  active: boolean;
  order: number;

  placement: 'home_sponsors' | 'home_commercial';

  startAt?: string | null;
  endAt?: string | null;
};

/**
 * Corrección óptica por logo.
 *
 * Los archivos tienen proporciones muy distintas (escudos casi cuadrados frente
 * a wordmarks de 4:1), así que una altura uniforme los haría ver desbalanceados.
 * `scale` iguala el peso visual, no el tamaño del archivo.
 *
 * `tone` decide cómo se lleva el logo a blanco en reposo, y depende de cuántos
 * colores tenga el archivo:
 *  - `flat`  → silueta blanca pura. Solo para logos de UN color, donde el detalle
 *              interno ya está resuelto con transparencia.
 *  - `tonal` → escala de grises comprimida hacia el blanco. Para logos de varios
 *              colores: en silueta pura perderían todo su dibujo interno y se
 *              leerían como una mancha.
 */
type OpticalTuning = { scale: number; tone: 'flat' | 'tonal' };

const OPTICAL: Record<string, OpticalTuning> = {
  // Un solo color en el archivo: la silueta blanca es el tratamiento correcto.
  'agua-cielo': { scale: 1, tone: 'flat' },
  'hispana-seguros': { scale: 1.02, tone: 'flat' },
  udla: { scale: 1, tone: 'flat' },

  // Multicolor: necesitan conservar las líneas internas.
  'banco-pichincha': { scale: 1.06, tone: 'tonal' },
  'de-una': { scale: 1.04, tone: 'tonal' },
  fef: { scale: 1.16, tone: 'tonal' },
  'fundacion-marathon': { scale: 1.02, tone: 'tonal' },
  'junta-de-beneficencia': { scale: 1.06, tone: 'tonal' },
  'pony-malta': { scale: 0.9, tone: 'tonal' },
  pronaca: { scale: 1, tone: 'tonal' },
  publiarte: { scale: 1, tone: 'tonal' },
  sporade: { scale: 0.98, tone: 'tonal' },
};

/**
 * `tonal` comprime el contraste antes de subir el brillo: así los tonos oscuros
 * suben lo suficiente para verse sobre el navy y los claros llegan a blanco puro,
 * dejando el logo en familia blanca pero con su dibujo intacto.
 */
const REST_FILTER: Record<OpticalTuning['tone'], string> = {
  flat: 'brightness(0) invert(1)',
  tonal: 'grayscale(1) contrast(0.6) brightness(1.55)',
};

const logoFile = (slug: string) => `/images/sponsors/${slug}.svg`;

/** TODO(cms): reemplazar por la colección `sponsors` filtrada por `active` y vigencia. */
const SPONSOR_ITEMS: SponsorItem[] = [
  'fundacion-marathon',
  'fef',
  'banco-pichincha',
  'pronaca',
  'pony-malta',
  'sporade',
  'agua-cielo',
  'de-una',
  'udla',
  'hispana-seguros',
  'junta-de-beneficencia',
  'publiarte',
].map((slug, index) => ({
  id: slug,
  name: slug,
  kind: 'logo' as const,
  logoUrl: logoFile(slug),
  alt: `Logotipo de ${slug.replace(/-/g, ' ')}`,
  active: true,
  order: index,
  placement: 'home_sponsors' as const,
}));

/** Filtro de vigencia: el CMS puede programar entradas y salidas. */
const isLive = (item: SponsorItem, now = Date.now()) => {
  if (!item.active) return false;
  if (item.startAt && new Date(item.startAt).getTime() > now) return false;
  if (item.endAt && new Date(item.endAt).getTime() < now) return false;
  return true;
};

const visible = SPONSOR_ITEMS.filter((item) => isLive(item)).sort((a, b) => a.order - b.order);
const logos = visible.filter((item) => item.kind === 'logo' && item.placement === 'home_sponsors');
const banners = visible.filter((item) => item.kind === 'banner');

function SponsorLogo({ item }: { item: SponsorItem }) {
  const tuning = OPTICAL[item.id] ?? { scale: 1, tone: 'flat' as const };

  const mark = (
    <>
      {/* Halo cálido: sostiene la legibilidad de las marcas oscuras al recuperar color. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(244,248,252,0.9),rgba(244,248,252,0)_78%)] opacity-0 blur-[2px] transition-opacity duration-[420ms] ease-out group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100 motion-reduce:transition-none"
      />
      <img
        src={item.logoUrl}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="copa-sponsor-mark relative h-full w-full object-contain"
        style={
          {
            '--rest-filter': REST_FILTER[tuning.tone],
            '--optical-scale': tuning.scale,
          } as CSSProperties
        }
      />
    </>
  );

  const shell =
    'copa-sponsor-slot group/logo relative isolate flex h-[clamp(34px,3.4vw,46px)] w-[clamp(104px,10vw,138px)] shrink-0 items-center justify-center px-1 transition-transform duration-[420ms] ease-out hover:-translate-y-1 hover:scale-[1.06] focus-visible:-translate-y-1 focus-visible:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white/70 motion-reduce:transform-none motion-reduce:transition-none';

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener sponsored"
      aria-label={item.name}
      className={shell}
    >
      {mark}
    </a>
  ) : (
    <div className={shell}>{mark}</div>
  );
}

export default function SponsorsSection() {
  if (logos.length === 0 && banners.length === 0) return null;

  return (
    <section
      aria-label="Auspiciantes oficiales"
      className="relative border-y border-white/10 bg-[#041D36] text-white"
    >
      <style>{`
        @keyframes copa-sponsor-drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .copa-sponsor-track {
          animation: copa-sponsor-drift 46s linear infinite;
        }
        .copa-sponsor-rail:hover .copa-sponsor-track,
        .copa-sponsor-rail:focus-within .copa-sponsor-track {
          animation-play-state: paused;
        }
        .copa-sponsor-mark {
          filter: var(--rest-filter);
          transform: scale(var(--optical-scale, 1));
          transition: filter 420ms ease-out, transform 420ms ease-out;
        }
        .copa-sponsor-slot:hover .copa-sponsor-mark,
        .copa-sponsor-slot:focus-visible .copa-sponsor-mark {
          filter: none;
          transform: scale(calc(var(--optical-scale, 1) * 1.02));
        }
        @media (prefers-reduced-motion: reduce) {
          .copa-sponsor-track { animation: none; }
          .copa-sponsor-mark { transition: filter 420ms ease-out; }
          .copa-sponsor-slot:hover .copa-sponsor-mark,
          .copa-sponsor-slot:focus-visible .copa-sponsor-mark {
            transform: scale(var(--optical-scale, 1));
          }
        }
      `}</style>

      <Container className="w-full" style={{ maxWidth: '88rem' }}>
        <div className="flex flex-col gap-4 py-[clamp(1.25rem,2.2vw,1.75rem)] lg:flex-row lg:items-center lg:gap-10">
          <p
            className="shrink-0 text-[0.78rem] font-normal uppercase leading-none tracking-[0.2em] text-white/55"
            style={{ fontFamily: BEBAS }}
          >
            Auspiciantes oficiales
          </p>

          {/* Riel continuo: la pista se duplica para que el bucle no tenga costura. */}
          {/* `overflow-hidden` es necesario para el bucle, así que el riel lleva
              holgura vertical propia: sin ella el lift y el scale del hover
              recortaban los logos por arriba y por abajo. */}
          <div className="copa-sponsor-rail relative min-w-0 flex-1 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
            <ul className="copa-sponsor-track flex w-max items-center gap-[clamp(1.75rem,3.5vw,3.25rem)]">
              {[...logos, ...logos].map((item, index) => (
                <li key={`${item.id}-${index}`} aria-hidden={index >= logos.length}>
                  <SponsorLogo item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {banners.length > 0 ? (
          <div className="flex flex-col gap-3 pb-[clamp(1.25rem,2.2vw,1.75rem)]">
            {banners.map((banner) => {
              const image = (
                <picture>
                  {banner.mobileAssetUrl ? (
                    <source media="(max-width: 640px)" srcSet={banner.mobileAssetUrl} />
                  ) : null}
                  <img
                    src={banner.desktopAssetUrl}
                    alt={banner.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-[8px] object-cover"
                  />
                </picture>
              );

              return banner.href ? (
                <a
                  key={banner.id}
                  href={banner.href}
                  target="_blank"
                  rel="noreferrer noopener sponsored"
                  className="block rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {image}
                </a>
              ) : (
                <div key={banner.id}>{image}</div>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
