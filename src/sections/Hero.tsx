import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Layers3, Radio, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Surface } from '@/components/ui/surface';
import { trackCtaClick } from '@/lib/analytics/gtm';

gsap.registerPlugin(ScrollTrigger);

const HERO_BACKGROUND =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Esquema%20Pichazos%20(1).webp';

const HERO_LOGO =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Vigia-Logos-2.webp';

const broadcastPills = [
  { label: 'Fan App', icon: Radio },
  { label: 'Historias', icon: Sparkles },
  { label: 'Fotos', icon: Camera },
  { label: 'Highlights', icon: Layers3 },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const pointerRafRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    reducedMotionRef.current = reducedMotion;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, { scale: 1.08, y: 18 });
        intro.to(
          backgroundRef.current,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: reducedMotion ? 0.01 : 1.8,
          },
          0
        );
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, { opacity: 0, scale: 0.96 });
        intro.to(
          glowRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: reducedMotion ? 0.01 : 1.4,
          },
          0.1
        );
      }

      if (graphicRef.current) {
        gsap.set(graphicRef.current, { opacity: 0, y: 30, rotateX: 14 });
        intro.to(
          graphicRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: reducedMotion ? 0.01 : 1.5,
          },
          0.18
        );
      }

      if (deviceRef.current) {
        gsap.set(deviceRef.current, { opacity: 0, y: 42, z: -120, rotateY: 18, scale: 0.94 });
        intro.to(
          deviceRef.current,
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateY: 0,
            scale: 1,
            duration: reducedMotion ? 0.01 : 1.65,
          },
          0.22
        );
      }

      if (contentRef.current) {
        const planes = contentRef.current.querySelectorAll('[data-hero-plane]');
        gsap.set(planes, { opacity: 0, y: 26 });
        intro.to(
          planes,
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.01 : 0.9,
            stagger: reducedMotion ? 0 : 0.1,
          },
          0.38
        );
      }
    }, heroRef);

    if (!reducedMotion) {
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      if (graphicRef.current) {
        gsap.to(graphicRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      if (deviceRef.current) {
        gsap.to(deviceRef.current, {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          xPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotionRef.current || !deviceRef.current) return;

      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
      }

      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (event.clientX - centerX) / (rect.width / 2);
      const offsetY = (event.clientY - centerY) / (rect.height / 2);

      const nextX = gsap.utils.clamp(-4, 4, -offsetY * 4);
      const nextY = gsap.utils.clamp(-4, 4, offsetX * 4);

      pointerRafRef.current = requestAnimationFrame(() => {
        deviceRef.current?.style.setProperty('--hero-tilt-x', `${nextX}deg`);
        deviceRef.current?.style.setProperty('--hero-tilt-y', `${nextY}deg`);
      });
    };

    const resetTilt = () => {
      if (!deviceRef.current) return;
      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
        pointerRafRef.current = null;
      }
      deviceRef.current.style.setProperty('--hero-tilt-x', '0deg');
      deviceRef.current.style.setProperty('--hero-tilt-y', '0deg');
    };

    const heroEl = heroRef.current;
    if (heroEl && finePointer && !reducedMotion) {
      heroEl.addEventListener('pointermove', handlePointerMove);
      heroEl.addEventListener('pointerleave', resetTilt);
    }

    return () => {
      ctx.revert();
      if (heroEl && finePointer && !reducedMotion) {
        heroEl.removeEventListener('pointermove', handlePointerMove);
        heroEl.removeEventListener('pointerleave', resetTilt);
      }
      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
      }
    };
  }, []);

  const handleCtaClick = (ctaName: string, destination: string) => {
    trackCtaClick({
      cta_name: ctaName,
      cta_location: 'hero',
      destination,
    });
  };

  return (
    <section
      ref={heroRef}
      aria-labelledby="home-hero-title"
      className="relative isolate min-h-screen overflow-hidden bg-marathon-surface-stadium text-white"
      style={{ perspective: '1700px' }}
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-85"
        style={{ backgroundImage: `url("${HERO_BACKGROUND}")` }}
        aria-hidden="true"
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(0,80,164,0.34),transparent_28rem)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(226,27,45,0.26),transparent_24rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] via-[#020817]/70 to-transparent" />
      </div>

      <div
        ref={graphicRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_37%,rgba(255,255,255,0.08)_50%,transparent_63%,transparent_100%)] opacity-35" />
        <div className="absolute left-[7%] top-[18%] h-40 w-40 rounded-full border border-white/10" />
        <div className="absolute right-[12%] top-[12%] h-52 w-52 rounded-full border border-marathon-gold/15" />
        <div className="absolute left-[14%] bottom-[18%] h-px w-[28rem] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-[8%] bottom-[22%] h-px w-[18rem] bg-gradient-to-r from-transparent via-marathon-red/35 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-center py-[calc(var(--header-height)+1.25rem)]">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-8">
          <div ref={contentRef} className="order-2 lg:order-1">
            <div
              data-hero-plane
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/82"
            >
              <span className="h-2 w-2 rounded-full bg-marathon-gold" />
              Copa Nacional Intercolegial Marathon Ecuador 2026
            </div>

            <h1
              id="home-hero-title"
              data-hero-plane
              className="mt-5 max-w-3xl font-montserrat text-[clamp(2.55rem,7vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[0.01em] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
            >
              <span className="block">Vive la Copa</span>
              <span className="block text-white/96">como nunca</span>
            </h1>

            <p
              data-hero-plane
              className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-white/80 sm:text-lg"
            >
              Seguí la Copa desde una experiencia editorial y cinematográfica: historias,
              fotos, momentos clave y toda la energía del torneo en Fan App.
            </p>

            <div
              data-hero-plane
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                asChild
                variant="action"
                size="cta"
                className="rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] shadow-button"
              >
                <Link
                  to="/fan-app"
                  onClick={() => handleCtaClick('abrir_fan_app', '/fan-app')}
                >
                  Abrir Fan App
                </Link>
              </Button>

              <Button
                asChild
                variant="actionOutline"
                size="cta"
                className="rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em]"
              >
                <Link to="/sedes" onClick={() => handleCtaClick('ver_sedes', '/sedes')}>
                  Ver sedes
                </Link>
              </Button>
            </div>

            <div
              data-hero-plane
              className="mt-7 flex flex-wrap items-center gap-2"
            >
              {broadcastPills.map((item) => {
                const Icon = item.icon;

                return (
                  <Surface
                    key={item.label}
                    variant="transparent"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/78"
                  >
                    <Icon size={13} className="text-marathon-gold" />
                    {item.label}
                  </Surface>
                );
              })}
            </div>

            <div
              data-hero-plane
              className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur-sm sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                  <img
                    src={HERO_LOGO}
                    alt="Copa Nacional Marathon Intercolegial Ecuador 2026"
                    className="h-8 w-auto object-contain"
                    loading="eager"
                    fetchPriority="high"
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-montserrat text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/62">
                    Fan App / Web App / PWA
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/76">
                    El lugar donde se vive la Copa con más intensidad, foco visual y seguimiento
                    de los mejores momentos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div
              ref={deviceRef}
              className="relative mx-auto max-w-[34rem] [transform-style:preserve-3d]"
              style={{
                transform:
                  'perspective(1700px) rotateX(var(--hero-tilt-x, 0deg)) rotateY(var(--hero-tilt-y, 0deg)) translate3d(0,0,0)',
                transition: 'transform 240ms cubic-bezier(0.2, 0, 0, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-[0.88] rounded-[2.5rem] bg-[#02111f]/80 blur-2xl" aria-hidden="true" />

              <div className="relative rounded-[2rem] border border-white/10 bg-[#061225]/78 p-3 shadow-elevated">
                <div className="rounded-[1.6rem] border border-white/10 bg-[#071427]/92 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.24em] text-white/55">
                        Broadcast view
                      </p>
                      <p className="mt-2 font-montserrat text-lg font-black uppercase tracking-[0.08em] text-white">
                        Fan App
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-marathon-red/35 bg-marathon-red/12 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                      <span className="h-2 w-2 rounded-full bg-marathon-red" />
                      Live feel
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
                      <Surface
                        variant="scoreboard"
                        className="rounded-2xl border border-white/10 px-4 py-4 shadow-button"
                      >
                        <p className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/72">
                          Hoy en la Copa
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white/76">Historias</p>
                            <p className="mt-1 text-[0.72rem] text-white/58">Fotos, momentos y cobertura editorial.</p>
                          </div>
                          <Sparkles size={18} className="shrink-0 text-marathon-gold" />
                        </div>
                      </Surface>

                      <div className="grid gap-3">
                        <Surface
                          variant="paper"
                          className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-white"
                        >
                          <p className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.18em] text-white/60">
                            Actualizaciones
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white">Fotos + momentos clave</p>
                        </Surface>

                        <Surface
                          variant="paper"
                          className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-white"
                        >
                          <p className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.18em] text-white/60">
                            Estado
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white">Seguir el torneo</p>
                        </Surface>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {broadcastPills.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={`${item.label}-${index}`}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-white"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                              <Icon size={16} className="text-marathon-gold" />
                            </div>
                            <div>
                              <p className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.18em] text-white/55">
                                Fan App
                              </p>
                              <p className="mt-1 text-sm font-semibold">{item.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -left-6 top-10 hidden w-36 -rotate-6 lg:block"
                style={{ transform: 'translate3d(-12px, -8px, 48px) rotate(-7deg)' }}
              >
                <Surface
                  variant="paper"
                  className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 shadow-elevated"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/66">
                    Highlights
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">Lo mejor del torneo</p>
                </Surface>
              </div>

              <div
                className="absolute -right-5 top-24 hidden w-40 rotate-6 lg:block"
                style={{ transform: 'translate3d(10px, 0, 72px) rotate(6deg)' }}
              >
                <Surface
                  variant="scoreboard"
                  className="rounded-2xl border border-white/10 px-4 py-3 shadow-elevated"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/66">
                    Stories
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">Cobertura editorial</p>
                </Surface>
              </div>

              <div
                className="absolute -bottom-5 left-8 hidden w-44 lg:block"
                style={{ transform: 'translate3d(0, 18px, 54px)' }}
              >
                <Surface
                  variant="transparent"
                  className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 shadow-elevated"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-marathon-gold">
                    Abrir Fan App
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/88">
                    El torneo vive aquí.
                  </p>
                </Surface>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/72"
          aria-hidden="true"
          tabIndex={-1}
        >
          <span className="h-2 w-2 rounded-full bg-marathon-red" />
          VIVE LA COPA DESDE FAN APP
        </button>
      </Container>
    </section>
  );
}
