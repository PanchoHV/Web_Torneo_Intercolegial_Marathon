import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusBadge } from '@/components/ui/status-badge';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

const R2 = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev';
/** Varios nombres de archivo llevan espacios; hay que codificarlos. */
const file = (name: string) => `${R2}/${encodeURIComponent(name)}`;

const FAN_APP_ART = {
  stadium: file('optimized-Fondo de estadio.webp'),
  lights: file('optimized-luces y rayas.webp'),
  mockup: file('optimized-mockup de app.webp'),
} as const;

/**
 * Rail de funcionalidades.
 *
 * Cinco items usan los iconos oficiales entregados; `Historias` conserva el icono
 * de lucide que ya tenía, a la espera de su asset.
 */
const fanAppRailItems = [
  { title: 'Partidos en vivo', iconSrc: file('optimized-partidos en vivo icon.webp') },
  { title: 'Resultados', iconSrc: file('optimized-Resultados Icon.webp') },
  { title: 'Equipos', iconSrc: file('optimized-Equipos Icon.webp') },
  { title: 'Sedes', iconSrc: file('optimized-Sedes Icon.webp') },
  { title: 'Fotos', iconSrc: file('optimized-Fotos icon.webp') },
  { title: 'Historias', icon: Star },
] as const;

export default function FanAppSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stadiumRef = useRef<HTMLImageElement>(null);
  const diagonalsRef = useRef<HTMLImageElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  /**
   * Micro profundidad por pointer.
   *
   * Las tres capas siguen al cursor con amplitudes y signos distintos —el fondo
   * casi no se mueve, las diagonales van en contra y el teléfono es el que más
   * viaja— para que la escena se lea con planos y no como un bloque plano.
   * En reposo todo queda exactamente en neutro: no hay ninguna animación
   * automática que mueva el teléfono.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const stadium = stadiumRef.current;
    const diagonals = diagonalsRef.current;
    const phone = phoneRef.current;
    if (!section || !stadium || !diagonals || !phone) return;

    // Sin mouse o con reduced motion, la escena se queda estática.
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // El fondo se agranda apenas para que su desplazamiento no descubra el borde.
      gsap.set(stadium, { scale: 1.03 });

      const follow = (target: Element, duration: number) => ({
        x: gsap.quickTo(target, 'x', { duration, ease: 'power2.out' }),
        y: gsap.quickTo(target, 'y', { duration, ease: 'power2.out' }),
      });

      const layers = {
        stadium: follow(stadium, 0.7),
        diagonals: follow(diagonals, 0.55),
        phone: follow(phone, 0.5),
      };

      const handleMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        layers.stadium.x(nx * 2);
        layers.stadium.y(ny * 1);
        layers.diagonals.x(nx * -5);
        layers.diagonals.y(ny * -3);
        layers.phone.x(nx * 7);
        layers.phone.y(ny * 4);
      };

      const handleLeave = () => {
        layers.stadium.x(0);
        layers.stadium.y(0);
        layers.diagonals.x(0);
        layers.diagonals.y(0);
        layers.phone.x(0);
        layers.phone.y(0);
      };

      section.addEventListener('pointermove', handleMove);
      section.addEventListener('pointerleave', handleLeave);

      return () => {
        section.removeEventListener('pointermove', handleMove);
        section.removeEventListener('pointerleave', handleLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fan-app-oficial"
      className="relative isolate overflow-hidden bg-[#031426] text-white"
    >
      {/* Capa 2 · estadio como atmósfera */}
      <img
        ref={stadiumRef}
        src={FAN_APP_ART.stadium}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center]"
      />

      {/* Capa 3 · legibilidad: navy sólido a la izquierda, estadio visible a la derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,20,38,0.97)_0%,rgba(3,20,38,0.9)_34%,rgba(3,20,38,0.62)_58%,rgba(3,20,38,0.42)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,20,38,0.55)_0%,transparent_22%,transparent_74%,rgba(3,20,38,0.8)_100%)]"
      />

      {/* Capa 4 · diagonales deportivas: puente visual entre el copy y el teléfono */}
      <img
        ref={diagonalsRef}
        src={FAN_APP_ART.lights}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="fan-app-diagonals pointer-events-none absolute -z-10 hidden object-contain opacity-[0.42] mix-blend-screen md:block md:left-[38%] md:top-0 md:h-full md:w-[62%]"
      />

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="grid items-center gap-8 py-[clamp(2.75rem,4.6vw,4.25rem)] lg:min-h-[clamp(560px,46vw,660px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6">
          {/* Capa 6 · copy */}
          <div className="max-w-[34rem]">
            <SectionLabel tone="gold" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              FAN APP OFICIAL
            </SectionLabel>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StatusBadge
                variant="live"
                className="border-white/10 bg-marathon-action-primary text-white shadow-[0_10px_24px_rgba(226,27,45,0.18)]"
              >
                PWA OFICIAL
              </StatusBadge>
              <p className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.24em] text-white/50">
                Una sola experiencia para seguir la Copa
              </p>
            </div>

            <h2
              className="mt-5 max-w-[9ch] font-normal uppercase leading-[0.82] text-white"
              style={{
                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                fontSize: 'clamp(3rem, 5.4vw, 5.3rem)',
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              TODO EL TORNEO EN TU MANO
            </h2>

            <p
              className="mt-5 max-w-[30rem] text-[0.92rem] leading-7 text-white/72 sm:text-[0.98rem]"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
            >
              Sigue partidos, revisa sedes y consulta la actualidad desde una experiencia PWA
              compacta, oficial y pensada para vivir la Copa en movimiento.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                variant="action"
                size="cta"
                className="fan-app-cta rounded-lg px-7 font-montserrat text-sm font-black uppercase tracking-[0.08em]"
              >
                <a href={FAN_APP_URL} {...EXTERNAL_LINK_PROPS}>
                  Abrir Fan App
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
              Disponible en la web y lista para usarse como PWA.
            </p>
          </div>

          {/* Capa 5 · mockup, sin marco ni card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marathon-action-primary/10 blur-3xl sm:h-72 sm:w-72"
            />
            <div ref={phoneRef} className="relative w-full max-w-[330px] sm:max-w-[380px] lg:max-w-none">
              <div
                className="fan-app-phone relative mx-auto w-[80vw] max-w-[330px] sm:max-w-[380px] lg:w-[clamp(360px,31vw,520px)] lg:max-w-none motion-reduce:animate-none"
                style={{ filter: 'drop-shadow(0 30px 42px rgba(0,0,0,0.45))' }}
              >
                <img
                  src={FAN_APP_ART.mockup}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Capa 7 · rail de funcionalidades: un único contenedor, un solo contorno */}
      <Container className="relative w-full pb-[clamp(2rem,3vw,2.75rem)]" style={{ maxWidth: '88rem' }}>
        <ul className="fan-app-rail relative grid grid-cols-2 overflow-hidden rounded-[14px] border border-white/12 bg-[rgba(6,26,48,0.72)] md:grid-cols-3 lg:grid-cols-6">
          {fanAppRailItems.map((item, index) => (
            <li
              key={item.title}
              className="fan-app-rail-item group relative flex min-h-[72px] items-center gap-2.5 px-3 py-3 transition-colors duration-200 hover:bg-white/[0.03] md:px-3.5"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="flex shrink-0 items-center justify-center text-marathon-gold transition-transform duration-200 group-hover:-translate-y-px motion-reduce:transform-none motion-reduce:transition-none">
                {'iconSrc' in item ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                ) : (
                  <item.icon size={22} strokeWidth={2.1} aria-hidden="true" />
                )}
              </span>
              <p className="font-montserrat text-[0.68rem] font-black uppercase leading-none tracking-[0.14em] text-white/80 transition-colors duration-200 group-hover:text-white">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <style>{`
        @keyframes fan-app-phone-enter {
          0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.975); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes fan-app-rail-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Solo entrada. En reposo el teléfono queda en neutro: sin bobbing. */
        .fan-app-phone {
          animation: fan-app-phone-enter 850ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          transform-origin: center bottom;
        }

        /* Acentos rojos: cortes diagonales en los dos extremos del rail. */
        .fan-app-rail::before,
        .fan-app-rail::after {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: 10px;
          background: #E21B2D;
          opacity: 0.85;
          pointer-events: none;
        }

        .fan-app-rail::before {
          left: 0;
          clip-path: polygon(0 0, 100% 0, 34% 100%, 0 100%);
        }

        .fan-app-rail::after {
          right: 0;
          clip-path: polygon(66% 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Divisores cortos: el rail se lee segmentado, no como seis cajas. */
        .fan-app-rail-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 28%;
          height: 44%;
          width: 1px;
          background: rgba(255, 255, 255, 0.18);
        }

        .fan-app-rail-item:nth-child(2n + 1)::before {
          display: none;
        }

        @media (min-width: 768px) {
          .fan-app-rail-item:nth-child(2n + 1)::before {
            display: block;
          }

          .fan-app-rail-item:nth-child(3n + 1)::before {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .fan-app-rail-item:nth-child(3n + 1)::before {
            display: block;
          }

          .fan-app-rail-item:nth-child(6n + 1)::before {
            display: none;
          }
        }

        .fan-app-rail-item {
          animation: fan-app-rail-in 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .fan-app-cta {
          transition: transform 200ms ease-out, background-color 200ms ease-out;
        }

        .fan-app-cta:hover {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .fan-app-phone,
          .fan-app-rail-item {
            animation: none !important;
          }

          .fan-app-cta,
          .fan-app-cta:hover {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
