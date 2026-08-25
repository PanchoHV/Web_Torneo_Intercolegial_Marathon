import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_ACCENT_STYLE, HERO_TITLE_STYLE, HERO_TYPE } from '@/lib/constants/hero-typography';
import { HeroBreadcrumb } from '@/components/ui/hero-breadcrumb';
import { REGLAMENTO_LINK_PROPS } from '@/lib/constants/links';

gsap.registerPlugin(ScrollTrigger);

const HERO_BACKGROUND =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-fondo_de_copa.webp';

/** Capa aislada del trofeo sobre transparencia: se puede animar sin afectar
 *  al papel rasgado ni a los grafismos, que viven en el fondo. */
const HERO_CUP =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Hero%20Web.webp';

export default function CopaHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cupScrollRef = useRef<HTMLDivElement>(null);
  const cupPointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    if (reducedMotion) return;

    // MACRO DEPTH: la copa se desplaza contra el fondo al hacer scroll.
    const ctx = gsap.context(() => {
      gsap.to(cupScrollRef.current, {
        yPercent: -4,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    // MICRO DEPTH: inclinación 3D siguiendo el puntero. Solo en punteros finos,
    // así el táctil queda fuera y no compite con el scroll nativo.
    const stage = stageRef.current;
    const cup = cupPointerRef.current;

    if (!finePointer || !stage || !cup) {
      return () => ctx.revert();
    }

    const ease = { duration: 0.7, ease: 'power3.out' } as const;
    const setRotX = gsap.quickTo(cup, 'rotationX', ease);
    const setRotY = gsap.quickTo(cup, 'rotationY', ease);
    const setX = gsap.quickTo(cup, 'x', ease);
    const setY = gsap.quickTo(cup, 'y', ease);

    const handleMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      setRotY(nx * 8);
      setRotX(-ny * 5);
      setX(nx * 14);
      setY(ny * 8);
    };

    const handleLeave = () => {
      setRotX(0);
      setRotY(0);
      setX(0);
      setY(0);
    };

    stage.addEventListener('pointermove', handleMove);
    stage.addEventListener('pointerleave', handleLeave);

    return () => {
      stage.removeEventListener('pointermove', handleMove);
      stage.removeEventListener('pointerleave', handleLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-la-copa"
      className="relative isolate w-full overflow-hidden bg-[#031528]"
    >
      {/* El lienzo conserva el aspecto nativo del artwork (1920/900). Si se
          recorta, el papel rasgado se desplaza y el copy deja de caer dentro. */}
      <div
        ref={stageRef}
        className="relative min-h-[570px] w-full overflow-hidden sm:min-h-[560px] lg:aspect-[1920/900] lg:max-h-[640px] lg:min-h-[600px] lg:bg-[#031528]"
        style={{ perspective: '1200px' }}
      >
        {/* Art stage. Mobile: banda superior con el trofeo a la vista.
            Desktop: lienzo completo con el papel a la izquierda. */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src={HERO_BACKGROUND}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 z-0 h-full w-full object-cover object-[66%_center] lg:object-center"
          />

          <div
            ref={cupScrollRef}
            className="absolute inset-0 z-10 will-change-transform"
          >
            <div
              ref={cupPointerRef}
              className="h-full w-full origin-top scale-[0.82] will-change-transform [transform-style:preserve-3d] lg:origin-bottom lg:scale-[0.87]"
            >
              <img
                src={HERO_CUP}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[74%_top] lg:object-center"
              />
            </div>
          </div>
        </div>

        {/*
          Capa de contraste. Solo por debajo de lg: en desktop el copy vive
          sobre el papel y no la necesita. Deja respirar la fotografía arriba
          y concentra la densidad donde cae el texto.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,21,40,0.24)_0%,rgba(3,21,40,0.68)_46%,rgba(3,21,40,0.92)_100%)] lg:hidden"
        />

        {/* Copy editorial: superpuesto a la escena en todas las escalas. */}
        <div className="absolute inset-0 z-20">
          <div className="flex h-full w-full items-end pt-[var(--header-height)] lg:items-center lg:pt-[var(--header-height)]">
            {/* El ancho útil del papel es proporcional al viewport: el rasgado
                cae en ~39% del lienzo, menos el margen izquierdo. */}
            <div className="w-full max-w-[560px] px-6 pb-9 pt-4 sm:px-8 sm:pb-10 lg:w-[calc(34vw+clamp(48px,5vw,145px))] lg:max-w-[700px] xl:w-[calc(34vw+clamp(64px,7.5vw,145px))] lg:px-0 lg:py-0 lg:pl-[clamp(64px,7.5vw,145px)]">
              <HeroBreadcrumb page="La Copa" tone="lg" />

              <h1
                className={`${HERO_TYPE.titleGap} ${HERO_TYPE.title} text-marathon-cream lg:text-[#062A4F]`}
                style={HERO_TITLE_STYLE}
              >
                La Copa
              </h1>

              <h2
                className={`${HERO_TYPE.accentGap} ${HERO_TYPE.accent} text-[#E21B2D] lg:max-w-[33vw] xl:max-w-[30vw]`}
                style={HERO_ACCENT_STYLE}
              >
                <span className="block">Donde nacen las historias</span>
                <span className="block">que se vuelven leyenda</span>
              </h2>

              <p className={`${HERO_TYPE.bodyGap} max-w-[440px] ${HERO_TYPE.body} text-white lg:text-[#062A4F]/85 lg:max-w-[30vw] xl:max-w-[27vw]`}>
                La Copa Nacional Intercolegial Marathon Ecuador 2026 es el
                torneo escolar de fútbol más grande del país. Conectamos
                colegios, jugadores y comunidades a través de la pasión, el
                respeto y el orgullo de representar sus colores en la cancha.
              </p>

              <div className={`${HERO_TYPE.ctaGap} flex flex-wrap items-center gap-x-4 gap-y-3`}>
                <a
                  {...REGLAMENTO_LINK_PROPS}
                  className={`group inline-flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[#E21B2D] px-6 ${HERO_TYPE.cta} text-white shadow-button transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E21B2D]`}
                >
                  Ver reglamento
                  <span
                    aria-hidden="true"
                    className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>

                <a
                  href="#categorias"
                  className={`group inline-flex h-12 items-center gap-2 border-b-2 border-white/30 px-1 ${HERO_TYPE.cta} text-white transition-colors duration-200 hover:border-white lg:border-[#062A4F]/20 lg:text-[#062A4F] lg:hover:border-[#062A4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062A4F]`}
                >
                  Conocer categorías
                  <span
                    aria-hidden="true"
                    className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
