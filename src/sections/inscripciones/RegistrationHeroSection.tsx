import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { REGISTRATION_HERO_LAYERS } from '@/lib/constants/inscripcionesPage';
import { scrollToAnchor } from '@/lib/scrollToAnchor';

gsap.registerPlugin(ScrollTrigger);

/** Por debajo de este ancho la escena queda estática. */
const PARALLAX_QUERY = '(min-width: 768px)';

/**
 * Escala base de papel y estadio: reserva margen para que el desplazamiento
 * hacia abajo nunca deje ver el borde superior. Ambas capas comparten el mismo
 * valor porque el rasgado tiene que seguir calzando.
 */
const PLANE_BASE_SCALE = 1.05;

/**
 * Hero por capas de /inscripciones.
 *
 * Profundidad, de atrás hacia adelante:
 *   estadio → jugadores → papel rasgado → copy → tácticos → brochazo
 *
 * El papel va POR ENCIMA de los jugadores a propósito: así el equipo entra
 * parcialmente detrás del rasgado y la escena gana volumen. Tácticos y
 * brochazo quedan por encima del copy en z, pero viven solo en la mitad
 * derecha, así que nunca se cruzan con el texto.
 */
export default function RegistrationHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const stadiumRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const tacticalRef = useRef<HTMLDivElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stadium = stadiumRef.current;
    const team = teamRef.current;
    const paper = paperRef.current;
    const tactical = tacticalRef.current;
    const brush = brushRef.current;

    if (!hero || !stadium || !team || !paper || !tactical || !brush) return;

    // Estado base: se aplica siempre, la composición estática manda.
    gsap.set([stadium, paper], { scale: PLANE_BASE_SCALE, y: 0, force3D: true });
    gsap.set([team, tactical, brush], { x: 0, y: 0, force3D: true });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add(PARALLAX_QUERY, () => {
      const scrollTriggerConfig = {
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      } as const;

      const layers: Array<{ el: HTMLDivElement; y: number; x?: number }> = [
        { el: stadium, y: 12 },
        { el: team, y: 18 },
        { el: paper, y: 6 },
        { el: tactical, y: 14, x: 4 },
        { el: brush, y: 10 },
      ];

      layers.forEach((layer) => {
        gsap.to(layer.el, {
          y: layer.y,
          x: layer.x ?? 0,
          ease: 'none',
          scrollTrigger: scrollTriggerConfig,
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="inscripciones-hero-title"
      className="relative isolate flex min-h-[calc(var(--header-height)+clamp(430px,34vw,600px))] flex-col justify-center overflow-hidden pb-[8.5rem] pt-[calc(var(--header-height)+clamp(1.25rem,2.5vw,2.25rem))] md:pb-[clamp(1.75rem,3vw,2.75rem)] text-marathon-navy"
    >
      {/* ── Planos de fondo ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* 2 · Estadio: plano más profundo. */}
        <div ref={stadiumRef} className="absolute inset-0 hidden will-change-transform md:block">
          <img
            src={REGISTRATION_HERO_LAYERS.stadium}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-[72%_center] lg:object-center"
          />
        </div>

        {/* 3 · Equipo: por delante del estadio, anclado al piso de la escena. */}
        <div className="absolute inset-y-0 right-0 z-[2] w-[64%] md:z-auto md:w-[70%] lg:w-[62%]">
          {/* Se dimensiona por altura: si se limita por ancho, la piña se sale
              por arriba del hero y el recorte corta las cabezas. */}
          <div
            ref={teamRef}
            className="absolute bottom-0 right-[-4%] h-[44%] will-change-transform md:right-[2%] md:h-[92%]"
          >
            <img
              src={REGISTRATION_HERO_LAYERS.team}
              alt=""
              decoding="async"
              draggable={false}
              className="h-full w-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* 4 · Papel rasgado: mismo encuadre que el estadio para que el rasgado
               calce. Va por encima del equipo, que así entra tras el borde. */}
        <div ref={paperRef} className="absolute inset-0 z-[1] will-change-transform md:z-auto">
          <img
            src={REGISTRATION_HERO_LAYERS.paper}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-left md:object-[72%_center] lg:object-center"
          />
        </div>
      </div>

      {/* ── 5 · Contenido: siempre sobre el papel ── */}
      <Container className="relative z-10 w-full" style={{ maxWidth: '88rem' }}>
        <div className="max-w-[34rem] lg:max-w-[min(44vw,40rem)]">
          <nav aria-label="Ruta de navegación">
            <ol className="flex items-center gap-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.18em] text-marathon-gray">
              <li>
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-marathon-red focus-visible:text-marathon-red"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-marathon-gray/50">
                <ChevronRight size={13} strokeWidth={3} />
              </li>
              <li aria-current="page" className="text-marathon-navy">
                Inscripciones
              </li>
            </ol>
          </nav>

          <h1
            id="inscripciones-hero-title"
            className="mt-4 font-normal uppercase leading-[0.84] text-marathon-navy"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 6rem)',
            }}
          >
            Inscripciones
          </h1>

          <p
            className="mt-2 font-normal uppercase leading-[0.94] text-marathon-red"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
            }}
          >
            Copa Nacional Intercolegial Marathon 2026
          </p>

          <div aria-hidden="true" className="mt-5 h-[3px] w-24 rounded-full bg-marathon-red/70" />

          <p className="mt-5 max-w-[34rem] text-[0.98rem] leading-7 text-marathon-gray sm:text-[1.05rem]">
            Prepara a tu institución y participa en la competencia más grande del
            país. Consulta el estado por región y sigue la guía para completar tu
            inscripción.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#registration-form"
              onClick={(event) => scrollToAnchor(event, 'registration-form')}
              className="group inline-flex items-center gap-2 rounded-lg bg-marathon-red px-6 py-3.5 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#c41626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-navy"
            >
              Inscribir mi institución
              <ArrowDown
                size={15}
                strokeWidth={2.8}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="#registration-guide"
              onClick={(event) => scrollToAnchor(event, 'registration-guide')}
              className="group inline-flex items-center gap-2 border-b-2 border-marathon-navy/20 pb-1 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.1em] text-marathon-navy transition-colors duration-200 hover:border-marathon-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marathon-navy"
            >
              Ver cómo funciona
              <ArrowDown
                size={15}
                strokeWidth={2.8}
                aria-hidden="true"
                className="text-marathon-red transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </Container>

      {/* ── Acentos: por encima del copy en z, pero solo en la mitad derecha ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 select-none">
        {/* 6 · Elementos tácticos. */}
        <div
          ref={tacticalRef}
          className="absolute left-[53%] top-[5%] hidden w-[clamp(110px,12vw,200px)] will-change-transform sm:block"
        >
          <img
            src={REGISTRATION_HERO_LAYERS.tactical}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full opacity-[0.6]"
          />
        </div>

        {/* 7 · Brochazo rojo: energía en la esquina inferior derecha. */}
        <div
          ref={brushRef}
          className="absolute bottom-[-5%] right-[-6%] w-[clamp(130px,22vw,380px)] will-change-transform"
        >
          <img
            src={REGISTRATION_HERO_LAYERS.brush}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
