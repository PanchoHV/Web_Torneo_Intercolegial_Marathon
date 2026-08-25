import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

import { HERO_ACCENT_STYLE, HERO_TITLE_STYLE, HERO_TYPE } from '@/lib/constants/hero-typography';
import { Container } from "@/components/ui/container";
import { HeroBreadcrumb } from "@/components/ui/hero-breadcrumb";
import { REGISTRATION_HERO_LAYERS } from "@/lib/constants/inscripcionesPage";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

gsap.registerPlugin(ScrollTrigger);

/** Por debajo de este ancho la escena queda estática. */
const PARALLAX_QUERY = "(min-width: 768px)";

/** El depth por cursor solo aplica con puntero fino: en táctil no hay hover. */
const POINTER_QUERY =
  "(min-width: 768px) and (hover: hover) and (pointer: fine)";

/**
 * Amplitud del desplazamiento por cursor, en px, por plano.
 *
 * La jerarquía es la que da la sensación 3D: el estadio apenas se mueve por
 * estar al fondo, los jugadores son la fuente principal de profundidad y el
 * papel queda prácticamente fijo para no desalinear el rasgado ni el copy.
 */
const POINTER_DEPTH = {
  stadium: { x: 4, y: 2 },
  team: { x: 11, y: 5 },
  paper: { x: 1.5, y: 1 },
  tactical: { x: 8, y: 6 },
  brush: { x: 5, y: 3 },
} as const;

/** Inclinación máxima del plano de jugadores, en grados. Deliberadamente mínima. */
const TEAM_TILT = 1.4;

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

  // Nodos propios para el cursor: el ScrollTrigger ya escribe transform en los
  // wrappers de scroll, así que el pointer necesita su propia capa o se pisan.
  const stadiumPointerRef = useRef<HTMLDivElement>(null);
  const teamPointerRef = useRef<HTMLDivElement>(null);
  const paperPointerRef = useRef<HTMLDivElement>(null);
  const tacticalPointerRef = useRef<HTMLDivElement>(null);
  const brushPointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stadium = stadiumRef.current;
    const team = teamRef.current;
    const paper = paperRef.current;
    const tactical = tacticalRef.current;
    const brush = brushRef.current;

    if (!hero || !stadium || !team || !paper || !tactical || !brush) return;

    // Estado base: se aplica siempre, la composición estática manda.
    gsap.set([stadium, paper], {
      scale: PLANE_BASE_SCALE,
      y: 0,
      force3D: true,
    });
    gsap.set([team, tactical, brush], { x: 0, y: 0, force3D: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add(PARALLAX_QUERY, () => {
      const scrollTriggerConfig = {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
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
          ease: "none",
          scrollTrigger: scrollTriggerConfig,
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  /**
   * Micro tridimensionalidad por cursor.
   *
   * Cada capa se desplaza en proporción a su cercanía y los jugadores añaden
   * una inclinación mínima. `quickTo` da la inercia: entra siguiendo el cursor
   * y vuelve al reposo al salir, sin saltos.
   */
  useEffect(() => {
    const hero = heroRef.current;
    const targets = {
      stadium: stadiumPointerRef.current,
      team: teamPointerRef.current,
      paper: paperPointerRef.current,
      tactical: tacticalPointerRef.current,
      brush: brushPointerRef.current,
    };

    if (!hero || Object.values(targets).some((el) => !el)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add(POINTER_QUERY, () => {
      const tween = (el: HTMLDivElement, prop: "x" | "y" | "rotationY") =>
        gsap.quickTo(el, prop, { duration: 0.9, ease: "power3.out" });

      const setters = {
        stadium: {
          x: tween(targets.stadium!, "x"),
          y: tween(targets.stadium!, "y"),
        },
        team: {
          x: tween(targets.team!, "x"),
          y: tween(targets.team!, "y"),
          rotationY: tween(targets.team!, "rotationY"),
        },
        paper: { x: tween(targets.paper!, "x"), y: tween(targets.paper!, "y") },
        tactical: {
          x: tween(targets.tactical!, "x"),
          y: tween(targets.tactical!, "y"),
        },
        brush: { x: tween(targets.brush!, "x"), y: tween(targets.brush!, "y") },
      };

      const apply = (nx: number, ny: number) => {
        (
          Object.keys(POINTER_DEPTH) as Array<keyof typeof POINTER_DEPTH>
        ).forEach((layer) => {
          setters[layer].x(nx * POINTER_DEPTH[layer].x);
          setters[layer].y(ny * POINTER_DEPTH[layer].y);
        });
        setters.team.rotationY(nx * TEAM_TILT);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect();
        // Normalizado a -1..1 desde el centro del hero.
        apply(
          gsap.utils.clamp(
            -1,
            1,
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
          ),
          gsap.utils.clamp(
            -1,
            1,
            ((event.clientY - rect.top) / rect.height) * 2 - 1,
          ),
        );
      };

      const resetPointer = () => apply(0, 0);

      hero.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      hero.addEventListener("pointerleave", resetPointer);

      return () => {
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerleave", resetPointer);
        gsap.killTweensOf(Object.values(targets));
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="inscripciones-hero-title"
      className="relative isolate flex min-h-[540px] flex-col justify-end overflow-hidden pb-[clamp(2rem,4vw,2.75rem)] md:min-h-[calc(var(--header-height)+clamp(430px,33vw,520px))] md:justify-center pt-[calc(var(--header-height)+clamp(1.25rem,2.5vw,2.25rem))] text-marathon-navy"
    >
      {/* ── Planos de fondo ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={{ perspective: "1400px" }}
      >
        {/* 2 · Estadio: plano más profundo. */}
        <div
          ref={stadiumRef}
          className="absolute inset-0 will-change-transform"
        >
          <div
            ref={stadiumPointerRef}
            className="h-full w-full will-change-transform"
          >
            <img
              src={REGISTRATION_HERO_LAYERS.stadium}
              alt=""
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover object-[70%_78%] lg:object-center"
            />
          </div>
        </div>

        {/* 3 · Equipo: por delante del estadio, anclado al piso de la escena. */}
        <div className="absolute inset-y-0 right-0 z-[2] w-[74%] md:z-auto md:w-[70%] lg:w-[62%]">
          {/* Se dimensiona por altura: si se limita por ancho, la piña se sale
              por arriba del hero y el recorte corta las cabezas. */}
          <div
            ref={teamRef}
            className="absolute bottom-0 right-[-16%] h-[56%] will-change-transform md:right-[2%] md:h-[92%]"
          >
            <div ref={teamPointerRef} className="h-full will-change-transform">
              <img
                src={REGISTRATION_HERO_LAYERS.team}
                alt=""
                decoding="async"
                draggable={false}
                className="h-full w-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        {/* 4 · Papel rasgado: mismo encuadre que el estadio para que el rasgado
               calce. Va por encima del equipo, que así entra tras el borde. */}
        <div
          ref={paperRef}
          className="absolute inset-0 z-[1] hidden will-change-transform md:block md:z-auto"
        >
          <div
            ref={paperPointerRef}
            className="h-full w-full will-change-transform"
          >
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
      </div>

      {/*
        Capa de contraste: solo por debajo de md. En desktop el copy vive sobre
        el papel rasgado del propio asset y no la necesita.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(6,42,79,0.14)_0%,rgba(6,42,79,0.58)_40%,rgba(6,42,79,0.93)_100%)] md:hidden"
      />

      {/* ── 5 · Contenido: sobre el papel en desktop, sobre la escena en mobile ── */}
      <Container className="relative z-10 w-full" style={{ maxWidth: "88rem" }}>
        <div className="max-w-[34rem] lg:max-w-[min(44vw,40rem)]">
          <HeroBreadcrumb page="Inscripciones" tone="md" />

          <h1
            id="inscripciones-hero-title"
            className={`${HERO_TYPE.titleGap} ${HERO_TYPE.title} text-marathon-cream md:text-marathon-navy`}
            style={HERO_TITLE_STYLE}
          >
            Inscripciones
          </h1>

          <p
            className={`${HERO_TYPE.accentGap} ${HERO_TYPE.accent} text-marathon-red`}
            style={HERO_ACCENT_STYLE}
          >
            Copa Nacional Intercolegial Marathon 2026
          </p>

          <div
            aria-hidden="true"
            className="mt-5 h-[3px] w-24 rounded-full bg-marathon-red/70"
          />

          <p className={`${HERO_TYPE.bodyGap} max-w-[34rem] ${HERO_TYPE.body} text-white md:text-marathon-gray`}>
            Prepara a tu institución y participa en la competencia más grande
            del país. Consulta el estado por región y sigue la guía para
            completar tu inscripción.
          </p>

          <div className={`${HERO_TYPE.ctaGap} flex flex-wrap items-center gap-x-6 gap-y-3`}>
            <a
              href="#registration-form"
              onClick={(event) => scrollToAnchor(event, "registration-form")}
              className={`group inline-flex h-12 items-center gap-2 rounded-lg bg-marathon-red px-6 ${HERO_TYPE.cta} text-white transition-colors duration-200 hover:bg-[#c41626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-navy`}
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
              onClick={(event) => scrollToAnchor(event, "registration-guide")}
              className={`group inline-flex h-12 items-center gap-2 border-b-2 border-white/30 pb-1 ${HERO_TYPE.cta} text-white transition-colors duration-200 hover:border-white md:border-marathon-navy/20 md:text-marathon-navy md:hover:border-marathon-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marathon-navy`}
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 select-none"
      >
        {/* 6 · Elementos tácticos. */}
        <div
          ref={tacticalRef}
          className="absolute left-[53%] top-[5%] hidden w-[clamp(110px,12vw,200px)] will-change-transform sm:block"
        >
          <div ref={tacticalPointerRef} className="will-change-transform">
            <img
              src={REGISTRATION_HERO_LAYERS.tactical}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full opacity-[0.6]"
            />
          </div>
        </div>

        {/* 7 · Brochazo rojo: energía en la esquina inferior derecha. */}
        <div
          ref={brushRef}
          className="absolute bottom-[-5%] right-[-6%] w-[clamp(130px,22vw,380px)] will-change-transform"
        >
          <div ref={brushPointerRef} className="will-change-transform">
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
      </div>
    </section>
  );
}
