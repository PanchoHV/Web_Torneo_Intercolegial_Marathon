import { useState } from 'react';
import type { CSSProperties, MouseEvent, SyntheticEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { HERO_ACCENT_STYLE, HERO_TITLE_STYLE, HERO_TYPE } from '@/lib/constants/hero-typography';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { HeroBreadcrumb } from '@/components/ui/hero-breadcrumb';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

const R2_BASE = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/';

const HERO_ART = {
  background: `${R2_BASE}optimized-Fondo%20Fann%20App.webp`,
  mockup: `${R2_BASE}optimized-MockUp%20Fann%20app.webp`,
  card1: `${R2_BASE}optimized-ChatGPT%20Image%2023%20ago%202026,%2010_25_59%20p.webp`,
  card2: `${R2_BASE}optimized-ChatGPT%20Image%2023%20ago%202026,%2010_31_42%20p.webp`,
  card3: `${R2_BASE}optimized-ChatGPT%20Image%2023%20ago%202026,%2010_31_43%20p.webp`,
  tactical: `${R2_BASE}optimized-elemento%20ta%CC%81ctico.webp`,
  brush: `${R2_BASE}optimized-manchon%20rojo.webp`,
} as const;

// Cada capa decorativa falla de forma aislada: si un asset no carga se oculta
// solo esa capa y el resto de la composicion sigue en pie.
function hideArtLayer(event: SyntheticEvent<HTMLImageElement>) {
  const layer = event.currentTarget.closest<HTMLElement>('[data-art-layer]');
  (layer ?? event.currentTarget).style.display = 'none';
}

const floatCardClass =
  'absolute overflow-hidden rounded-[14px] border border-white/30 bg-[#061b34]/90 p-1 shadow-[0_18px_42px_rgba(0,0,0,0.42)] backdrop-blur-sm';

function ArtCard({
  className,
  image,
  label,
}: {
  className: string;
  image: string;
  label: string;
}) {
  return (
    <div data-art-layer className={`${floatCardClass} ${className}`}>
      <img
        src={image}
        alt={label}
        className="h-full w-full rounded-[10px] object-cover"
        decoding="async"
        onError={hideArtLayer}
      />
      <span className="absolute bottom-2 left-2 rounded-full bg-[#031426]/85 px-2 py-1 font-montserrat text-[0.52rem] font-black uppercase tracking-[0.12em] text-white">
        {label}
      </span>
    </div>
  );
}

function PhoneFrame({ style }: { style?: CSSProperties }) {
  return (
    <img
      src={HERO_ART.mockup}
      alt="Mockup de la Fan App Marathon en un telefono"
      style={style}
      className="absolute inset-0 z-40 h-full w-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.55)]"
      fetchPriority="high"
      decoding="async"
    />
  );
}

// Parallax 3D por capas: el mockup lidera, tarjetas y tactica reaccionan menos.
function tiltStyle(tilt: { x: number; y: number }, depth: number): CSSProperties {
  return {
    transform: `perspective(1100px) rotateY(${(tilt.x * 7 * depth).toFixed(2)}deg) rotateX(${(-tilt.y * 5 * depth).toFixed(2)}deg) translate3d(${(tilt.x * 18 * depth).toFixed(2)}px, ${(tilt.y * 13 * depth).toFixed(2)}px, 0)`,
    transition: 'transform 400ms cubic-bezier(0.22, 0.61, 0.36, 1)',
  };
}

export default function FanAppHeroSection() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleTilt(event: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    });
  }

  return (
    <section
      id="fan-app-hero"
      aria-labelledby="fan-app-hero-title"
      className="relative isolate w-full overflow-hidden bg-[#f4f0e8]"
    >
      {/* Altura desktop derivada del alto real de la columna editorial + header,
          para que ni la etiqueta FAN APP ni el microcopy queden recortados. */}
      <div
        onMouseMove={handleTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative w-full overflow-hidden pt-[var(--header-height)] lg:pt-0 lg:min-h-[calc(var(--header-height)+clamp(30rem,33vw,36rem))]"
      >
        <img
          src={HERO_ART.background}
          alt="Estadio iluminado durante la Copa Marathon"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[72%_center] lg:object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,21,40,0.14)_0%,rgba(3,21,40,0.58)_100%)] lg:hidden"
        />

        <Container className="relative z-20 w-full lg:h-full" style={{ maxWidth: '96rem' }}>
          <div className="flex w-full flex-col items-stretch gap-8 py-8 sm:gap-10 sm:py-10 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:py-[clamp(1.25rem,2vw,2.25rem)] lg:pt-[calc(var(--header-height)+clamp(1.25rem,2vw,2.25rem))]">
            <div className="w-full max-w-[34rem] rounded-xl bg-[#f4f0e8]/95 px-5 py-6 shadow-[0_14px_36px_rgba(3,20,38,0.12)] sm:px-8 lg:w-[clamp(27rem,39vw,40rem)] lg:max-w-none lg:bg-transparent lg:px-0 lg:py-0 lg:pl-[clamp(1rem,5vw,5rem)] lg:shadow-none">
<HeroBreadcrumb page="Fan App" tone="paper" />

              <h1
                id="fan-app-hero-title"
                className={`${HERO_TYPE.titleGap} max-w-[10ch] ${HERO_TYPE.title} text-[#062A4F]`}
                style={HERO_TITLE_STYLE}
              >
                <span className="block">VIVE CADA</span>
                <span className="block">MOMENTO</span>
              </h1>

              <p
                className={`${HERO_TYPE.accentGap} ${HERO_TYPE.accent} text-[#E21B2D]`}
                style={HERO_ACCENT_STYLE}
              >
                DE LA COPA
              </p>

              <p className={`${HERO_TYPE.bodyGap} max-w-[29rem] ${HERO_TYPE.body} text-[#18344f]/85`}>
                Resultados en vivo, equipos, fotos, historias y mucho más. Todo en la Fan App
                oficial de la Copa Nacional Intercolegial Marathon 2026.
              </p>

              <div className={`${HERO_TYPE.ctaGap} flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center`}>
                <Button
                  asChild
                  variant="action"
                  size="cta"
                  className={`h-12 rounded-[4px] px-5 ${HERO_TYPE.cta} shadow-button sm:px-6`}
                >
                  <a href={FAN_APP_URL} {...EXTERNAL_LINK_PROPS}>
                    Abrir Fan App
                    <ArrowUpRight size={16} strokeWidth={2.4} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="actionOutline"
                  size="cta"
                  className={`h-12 border-[#062A4F]/40 px-5 ${HERO_TYPE.cta} text-[#062A4F] hover:bg-[#062A4F]/10 sm:px-6`}
                >
                  <a href="#fan-app-install">
                    Como instalarla
                    <ArrowDown size={15} strokeWidth={2.2} />
                  </a>
                </Button>
              </div>

              <p className="mt-4 font-montserrat text-[0.56rem] font-bold uppercase tracking-[0.1em] text-[#18344f]/65 sm:text-[0.62rem] sm:tracking-[0.14em]">
                Fan App PWA · Instalable desde tu navegador · Sin tiendas
              </p>
            </div>

            {/* Mobile / tablet: la escena vive en el flujo, debajo del copy, para
                que nunca tape los CTAs. */}
            <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[32rem] lg:hidden">
              <div className="relative mx-auto aspect-[1086/1448] w-[min(66vw,16rem)] sm:w-[min(32vw,18rem)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-[-10%] z-0 rounded-[48%] bg-[#E21B2D]/25 blur-3xl"
                />
                <ArtCard
                  className="left-[-20%] top-[2%] z-30 h-[5.5rem] w-[5.5rem] rotate-[-7deg] sm:h-28 sm:w-28"
                  image={HERO_ART.card2}
                  label="Partidos"
                />
                <ArtCard
                  className="bottom-[2%] left-[-24%] z-30 h-[5rem] w-[6rem] rotate-[5deg] sm:h-24 sm:w-28"
                  image={HERO_ART.card3}
                  label="Historias"
                />
                <ArtCard
                  className="right-[-24%] top-[20%] z-30 h-[5.5rem] w-[6rem] rotate-[6deg] sm:h-28 sm:w-32"
                  image={HERO_ART.card1}
                  label="Galeria"
                />
                <PhoneFrame />
              </div>
            </div>
          </div>
        </Container>

        {/* Desktop: composicion completa sobre la mitad derecha del arte. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
        >
          <img
            data-art-layer
            src={HERO_ART.tactical}
            alt=""
            decoding="async"
            onError={hideArtLayer}
            style={tiltStyle(tilt, 0.35)}
            className="absolute left-[42%] top-[calc(var(--header-height)+2%)] z-10 w-[clamp(8rem,13vw,13rem)] opacity-70 mix-blend-screen"
          />

          <div className="absolute inset-y-0 left-[41%] right-[2%] z-20">
            <div className="absolute left-1/2 top-[calc(50%+var(--header-height)/2)] aspect-[1086/1448] h-[84%] -translate-x-1/2 -translate-y-1/2">
              <div
                aria-hidden="true"
                className="absolute inset-[-8%] z-0 rounded-[48%] bg-[#E21B2D]/20 blur-3xl"
              />

              <div className="absolute inset-0 z-30" style={tiltStyle(tilt, 0.55)}>
                <ArtCard
                  className="left-[-15%] top-[20%] h-[clamp(5.8rem,9vw,8.5rem)] w-[clamp(6.4rem,9.5vw,9.5rem)] rotate-[-7deg]"
                  image={HERO_ART.card2}
                  label="Partidos"
                />
                <ArtCard
                  className="bottom-[4%] left-[-22%] h-[clamp(6rem,9.5vw,9rem)] w-[clamp(6.8rem,10vw,9.5rem)] rotate-[5deg]"
                  image={HERO_ART.card3}
                  label="Historias"
                />
                <ArtCard
                  className="right-[-18%] top-[8%] h-[clamp(6rem,9.5vw,9rem)] w-[clamp(6.8rem,10vw,9.5rem)] rotate-[7deg]"
                  image={HERO_ART.card1}
                  label="Galeria"
                />
              </div>

              <PhoneFrame style={tiltStyle(tilt, 1)} />
            </div>
          </div>

          <img
            data-art-layer
            src={HERO_ART.brush}
            alt=""
            decoding="async"
            onError={hideArtLayer}
            className="absolute bottom-[-9%] right-[-2%] z-50 w-[clamp(11rem,18vw,18rem)] rotate-[-8deg] opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
