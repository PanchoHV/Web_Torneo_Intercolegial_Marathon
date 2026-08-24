import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { SEDES_HERO_ASSETS } from '@/lib/constants/sedesPage';

gsap.registerPlugin(ScrollTrigger);

/**
 * A partir de este ancho la fotografía pasa a ser fondo full-bleed del hero
 * y se habilita el depth de scroll. Por debajo, la escena es una banda
 * estática bajo el copy (mejor legibilidad y scroll táctil sin movimiento).
 */
const DEPTH_MEDIA_QUERY = '(min-width: 1024px)';

/** Escala base del fondo: reserva margen para que el desplazamiento nunca deje ver bordes. */
const PHOTO_BASE_SCALE = 1.05;

/**
 * Hero editorial de /sedes.
 *
 * Capas: papel/base → fotografía → brochazo rojo → copy HTML.
 * El asset de fondo ya trae papel, rasgado, brochazo rojo y confeti, así que
 * aquí no se dibuja ninguno de esos gestos: solo se monta y se le da
 * profundidad. El copy nunca se mueve.
 */
export default function SedesHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const photoMotionRef = useRef<HTMLDivElement>(null);
  const brushMotionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const photo = photoMotionRef.current;
    const brush = brushMotionRef.current;

    if (!hero || !photo || !brush) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // El estado base se aplica siempre: la composición estática es la autoridad.
    gsap.set(photo, { scale: PHOTO_BASE_SCALE, y: 0, force3D: true });
    gsap.set(brush, { x: 0, y: 0, force3D: true });

    if (reducedMotion) return;

    /**
     * gsap.matchMedia registra sus propios tweens y ScrollTriggers: al salir
     * del breakpoint o al llamar mm.revert() se destruyen solos, así que no
     * quedan triggers duplicados tras hot reload ni navegación.
     */
    const mm = gsap.matchMedia();

    mm.add(DEPTH_MEDIA_QUERY, () => {
      const scrollTriggerConfig = {
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      } as const;

      // Plano profundo: recorrido mínimo, subliminal.
      gsap.to(photo, {
        y: -10,
        ease: 'none',
        scrollTrigger: scrollTriggerConfig,
      });

      // Brochazo: plano intermedio, deriva contraria al táctico para que las
      // dos esquinas del hero no se muevan en bloque.
      gsap.to(brush, {
        y: -16,
        x: -6,
        ease: 'none',
        scrollTrigger: scrollTriggerConfig,
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="sedes-hero-title"
      className="relative isolate flex min-h-[540px] w-full items-center overflow-hidden pt-[var(--header-height)] lg:min-h-[calc(var(--header-height)+clamp(455px,34vw,520px))] lg:flex-row lg:pt-[var(--header-height)]"
    >
      {/* ── LAYER 1+2: fotografía (papel, rasgado y acentos ya vienen en el asset) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden lg:inset-x-0 lg:bottom-0 lg:top-[var(--header-height)]"
      >
        {/* Wrapper de MOTION: separado del wrapper de layout para que el
            encuadre sea idéntico con o sin animación. */}
        <div ref={photoMotionRef} className="absolute inset-0 will-change-transform">
          <img
            src={SEDES_HERO_ASSETS.background}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-[76%_center] lg:object-center"
          />
        </div>

      </div>

      {/*
        Capa de contraste: solo por debajo de lg. En desktop el copy vive sobre
        el papel del propio asset y no la necesita.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(6,42,79,0.18)_0%,rgba(6,42,79,0.62)_44%,rgba(6,42,79,0.94)_100%)] lg:hidden"
      />

      {/* ── LAYER 4: brochazo rojo, esquina inferior izquierda ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6%] left-[-3%] z-[5] w-[clamp(128px,13vw,230px)]"
      >
        <div ref={brushMotionRef} className="will-change-transform">
          <img
            src={SEDES_HERO_ASSETS.redBrush}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full"
          />
        </div>
      </div>

      {/* ── LAYER 5: copy HTML, siempre estático ── */}
      <Container
        className="relative z-10 order-1 w-full lg:order-none"
        style={{ maxWidth: '88rem' }}
      >
        <div className="max-w-[34rem] pb-[clamp(1.75rem,3vw,2.5rem)] pt-[calc(var(--header-height)+clamp(1.25rem,3vw,2.75rem))] lg:max-w-[min(38vw,34rem)] lg:py-[clamp(1.5rem,2.5vw,2.5rem)]">
          <nav aria-label="Ruta de navegación">
            <ol className="flex items-center gap-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.18em] text-white/70 lg:text-marathon-gray">
              <li>
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-marathon-red focus-visible:text-marathon-red"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/45 lg:text-marathon-gray/50">
                <ChevronRight size={13} strokeWidth={3} />
              </li>
              <li aria-current="page" className="text-marathon-cream lg:text-marathon-navy">
                Sedes
              </li>
            </ol>
          </nav>

          <h1
            id="sedes-hero-title"
            className="mt-4 font-normal uppercase leading-[0.84] text-marathon-cream lg:text-marathon-navy"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(3rem, 5.6vw, 5.4rem)',
            }}
          >
            Sedes de la Copa
          </h1>

          <p
            className="mt-2 font-normal uppercase leading-[0.9] text-marathon-red"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(2rem, 3.5vw, 3.4rem)',
            }}
          >
            Encuentra tu sede
          </p>

          <p className="mt-4 max-w-[34rem] text-[0.92rem] leading-6 text-white lg:text-[0.95rem] lg:leading-7 lg:text-marathon-gray">
            Explora las ciudades anfitrionas, conoce los escenarios y toda la
            información útil para tu participación.
          </p>
        </div>
      </Container>
    </section>
  );
}
