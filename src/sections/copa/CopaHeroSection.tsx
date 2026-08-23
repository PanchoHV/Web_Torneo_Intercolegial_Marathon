import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      className="relative isolate w-full overflow-hidden bg-[#E8D9C5] pt-[var(--header-height)] xl:bg-[#031528] xl:pt-0"
    >
      {/* El lienzo conserva el aspecto nativo del artwork (1920/900). Si se
          recorta, el papel rasgado se desplaza y el copy deja de caer dentro. */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden xl:aspect-[1920/900] xl:bg-[#031528]"
        style={{ perspective: '1200px' }}
      >
        {/* Art stage. Mobile: banda superior con el trofeo a la vista.
            Desktop: lienzo completo con el papel a la izquierda. */}
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] xl:absolute xl:inset-0 xl:aspect-auto xl:h-full">
          <img
            src={HERO_BACKGROUND}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 z-0 h-full w-full object-cover object-right xl:object-center"
          />

          <div
            ref={cupScrollRef}
            className="absolute inset-0 z-10 will-change-transform"
          >
            <div
              ref={cupPointerRef}
              className="h-full w-full will-change-transform [transform-style:preserve-3d]"
            >
              <img
                src={HERO_CUP}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-right xl:object-center"
              />
            </div>
          </div>
        </div>

        {/* Copy editorial: en flujo sobre papel en mobile, superpuesto en desktop. */}
        <div className="relative z-20 xl:absolute xl:inset-0">
          <div className="flex h-full w-full items-start xl:items-center">
            {/* El ancho útil del papel es proporcional al viewport: el rasgado
                cae en ~39% del lienzo, menos el margen izquierdo. */}
            <div className="w-full max-w-[560px] px-6 pb-10 pt-8 sm:px-8 xl:w-[calc(34vw+clamp(64px,7.5vw,145px))] xl:max-w-[700px] xl:px-0 xl:py-0 xl:pl-[clamp(64px,7.5vw,145px)]">
              <h1
                className="m-0 font-normal uppercase leading-[0.84] text-[#062A4F]"
                style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(3.6rem, 12vw, 7rem)',
                }}
              >
                La Copa
              </h1>

              <h2
                className="mt-3 font-normal uppercase leading-[0.94] text-[#E21B2D] xl:mt-4 xl:max-w-[30vw]"
                style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(1.5rem, 5.4vw, 2.3rem)',
                }}
              >
                <span className="block">Donde nacen las historias</span>
                <span className="block">que se vuelven leyenda</span>
              </h2>

              <p className="mt-5 max-w-[440px] font-inter text-[15px] leading-[1.6] text-[#062A4F]/85 sm:text-[16px] xl:max-w-[27vw]">
                La Copa Nacional Intercolegial Marathon Ecuador 2026 es el
                torneo escolar de fútbol más grande del país. Conectamos
                colegios, jugadores y comunidades a través de la pasión, el
                respeto y el orgullo de representar sus colores en la cancha.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href="#reglamento"
                  className="group inline-flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[#E21B2D] px-6 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-white shadow-button transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E21B2D]"
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
                  className="group inline-flex h-12 items-center gap-2 border-b-2 border-[#062A4F]/20 px-1 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-[#062A4F] transition-colors duration-200 hover:border-[#062A4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062A4F]"
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
