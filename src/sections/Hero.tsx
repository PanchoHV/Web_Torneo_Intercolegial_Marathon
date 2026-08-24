import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Button } from '@/components/ui/button';
import { trackCtaClick } from '@/lib/analytics/gtm';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

gsap.registerPlugin(ScrollTrigger);

const HERO_FIELD = encodeURI(
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Fono de estadio.webp'
);
const HERO_ELEMENTS = encodeURI(
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-elementos 1.webp'
);
const HERO_PLAYERS = encodeURI(
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Jugadores Transparencia.webp'
);
const HERO_PHONE = encodeURI(
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Imagen Celular Mock.webp'
);

const HERO_COPY_STYLES = `
  .hero-copy-layer {
    position: absolute;
    inset: 0;
    z-index: 60;
    pointer-events: none;
  }

  .hero-copy {
    position: absolute;
    left: 24px;
    right: 24px;
    top: 48%;
    width: auto;
    max-width: 430px;
    margin-inline: auto;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    pointer-events: auto;
    opacity: 1;
    transform: translateY(-54%);
  }

  .hero-title {
    margin: 0;
    font-family: "Bebas Neue", "Arial Narrow", sans-serif;
    font-size: clamp(42px, 11vw, 54px);
    font-weight: 400;
    line-height: 0.84;
    letter-spacing: 0.005em;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  }

  .hero-title-line {
    display: block;
    white-space: nowrap;
  }

  .hero-title-line--red {
    color: var(--marathon-red, #e21b2d);
  }

  .hero-copy-text {
    display: block;
    width: 100%;
    max-width: 410px;
    margin: 20px auto 0;
    color: rgba(255, 255, 255, 0.88);
    font-size: 16px;
    line-height: 1.45;
    text-align: center;
  }

  .hero-copy-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
  }

  .hero-copy-primary {
    width: auto;
    min-width: 220px;
    max-width: 100%;
  }

  .hero-copy-secondary {
    width: auto;
    min-width: 250px;
    max-width: 100%;
  }


  .hero-readable-left {
    position: absolute;
    inset-block: 0;
    left: 0;
    width: 62%;
    background: linear-gradient(
      90deg,
      rgba(2, 8, 23, 0.98) 0%,
      rgba(2, 8, 23, 0.94) 18%,
      rgba(2, 8, 23, 0.78) 30%,
      rgba(2, 8, 23, 0.50) 40%,
      rgba(2, 8, 23, 0.20) 50%,
      rgba(2, 8, 23, 0.00) 62%
    );
  }

  .hero-readable-mobile {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(2, 8, 23, 0.97) 0%,
      rgba(2, 8, 23, 0.91) 20%,
      rgba(2, 8, 23, 0.72) 40%,
      rgba(2, 8, 23, 0.40) 56%,
      rgba(2, 8, 23, 0.10) 70%,
      rgba(2, 8, 23, 0.00) 80%
    );
  }

  @media (min-width: 1024px) {
    .hero-copy {
      left: 6.5vw;
      right: auto;
      top: 50%;
      width: min(540px, 37vw);
      max-width: 540px;
      margin-inline: 0;
      align-items: flex-start;
      text-align: left;
      transform: translateY(-48%);
    }

    .hero-title {
      font-size: clamp(78px, 5.1vw, 102px);
      line-height: 0.84;
      letter-spacing: 0.005em;
    }

    .hero-copy-text {
      max-width: 470px;
      margin: 22px 0 0;
      font-size: 18px;
      line-height: 1.45;
      text-align: left;
    }

    .hero-copy-actions {
      flex-direction: row;
      align-items: center;
      gap: 14px;
      margin-top: 26px;
    }

  }
`;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const fieldScrollRef = useRef<HTMLDivElement>(null);
  const fieldPointerRef = useRef<HTMLDivElement>(null);
  const fieldImageRef = useRef<HTMLImageElement>(null);
  const elementsScrollRef = useRef<HTMLDivElement>(null);
  const elementsPointerRef = useRef<HTMLDivElement>(null);
  const elementsImageRef = useRef<HTMLImageElement>(null);
  const playersScrollRef = useRef<HTMLDivElement>(null);
  const playersPointerRef = useRef<HTMLDivElement>(null);
  const playersImageRef = useRef<HTMLImageElement>(null);
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const phonePointerRef = useRef<HTMLDivElement>(null);
  const phoneImageRef = useRef<HTMLImageElement>(null);
  const contentBaseRef = useRef<HTMLDivElement>(null);
  const contentHeadlineRef = useRef<HTMLHeadingElement>(null);
  const contentCopyRef = useRef<HTMLParagraphElement>(null);
  const contentCtaRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    reducedMotionRef.current = reducedMotion;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (fieldImageRef.current) {
        gsap.set(fieldImageRef.current, { opacity: 0 });
        intro.to(fieldImageRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 1.1 }, 0);
      }

      if (elementsImageRef.current) {
        gsap.set(elementsImageRef.current, { opacity: 0 });
        intro.to(elementsImageRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 1.05 }, 0.08);
      }

      if (playersImageRef.current) {
        gsap.set(playersImageRef.current, { opacity: 0 });
        intro.to(playersImageRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 1.1 }, 0.16);
      }

      if (phoneImageRef.current) {
        gsap.set(phoneImageRef.current, { opacity: 0 });
        intro.to(phoneImageRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 1.2 }, 0.24);
      }

      const contentNodes = [
        contentHeadlineRef.current,
        contentCopyRef.current,
        contentCtaRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (contentNodes.length > 0) {
        gsap.set(contentNodes, { opacity: 0, y: 18 });
        intro.to(
          contentNodes,
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.01 : 0.85,
            stagger: reducedMotion ? 0 : 0.08,
            clearProps: 'transform,opacity',
          },
          0.18
        );
      }
    }, heroRef);

    if (!reducedMotion) {
      if (fieldScrollRef.current) {
        gsap.to(fieldScrollRef.current, {
          xPercent: 1,
          yPercent: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      if (elementsScrollRef.current) {
        gsap.to(elementsScrollRef.current, {
          xPercent: 2,
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.85,
          },
        });
      }

      if (playersScrollRef.current) {
        gsap.to(playersScrollRef.current, {
          xPercent: 2,
          yPercent: -4,
          rotateZ: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.85,
          },
        });
      }

      if (phoneScrollRef.current) {
        gsap.to(phoneScrollRef.current, {
          xPercent: 1.5,
          yPercent: -5,
          rotateY: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }
    }

    const heroEl = heroRef.current;
    const fieldPointerEl = fieldPointerRef.current;
    const elementsPointerEl = elementsPointerRef.current;
    const playersPointerEl = playersPointerRef.current;
    const phonePointerEl = phonePointerRef.current;

    const quickSetters =
      heroEl && fieldPointerEl && elementsPointerEl && playersPointerEl && phonePointerEl
        ? {
            fieldX: gsap.quickTo(fieldPointerEl, 'x', { duration: 0.65, ease: 'power3.out' }),
            fieldY: gsap.quickTo(fieldPointerEl, 'y', { duration: 0.65, ease: 'power3.out' }),
            elementsX: gsap.quickTo(elementsPointerEl, 'x', {
              duration: 0.68,
              ease: 'power3.out',
            }),
            elementsY: gsap.quickTo(elementsPointerEl, 'y', {
              duration: 0.68,
              ease: 'power3.out',
            }),
            elementsRotate: gsap.quickTo(elementsPointerEl, 'rotation', {
              duration: 0.88,
              ease: 'power3.out',
            }),
            playersX: gsap.quickTo(playersPointerEl, 'x', {
              duration: 0.62,
              ease: 'power3.out',
            }),
            playersY: gsap.quickTo(playersPointerEl, 'y', {
              duration: 0.62,
              ease: 'power3.out',
            }),
            playersRotate: gsap.quickTo(playersPointerEl, 'rotation', {
              duration: 0.82,
              ease: 'power3.out',
            }),
            phoneX: gsap.quickTo(phonePointerEl, 'x', { duration: 0.58, ease: 'power3.out' }),
            phoneY: gsap.quickTo(phonePointerEl, 'y', { duration: 0.58, ease: 'power3.out' }),
            phoneRotateX: gsap.quickTo(phonePointerEl, 'rotationX', {
              duration: 0.9,
              ease: 'power3.out',
            }),
            phoneRotateY: gsap.quickTo(phonePointerEl, 'rotationY', {
              duration: 0.9,
              ease: 'power3.out',
            }),
          }
        : null;

    const resetDepth = () => {
      if (!quickSetters) return;

      quickSetters.fieldX(0);
      quickSetters.fieldY(0);
      quickSetters.elementsX(0);
      quickSetters.elementsY(0);
      quickSetters.elementsRotate(0);
      quickSetters.playersX(0);
      quickSetters.playersY(0);
      quickSetters.playersRotate(0);
      quickSetters.phoneX(0);
      quickSetters.phoneY(0);
      quickSetters.phoneRotateX(0);
      quickSetters.phoneRotateY(0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!heroEl || !quickSetters || !finePointer || reducedMotionRef.current) return;

      const rect = heroEl.getBoundingClientRect();
      const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clampedX = gsap.utils.clamp(-1, 1, offsetX);
      const clampedY = gsap.utils.clamp(-1, 1, offsetY);

      quickSetters.fieldX(-clampedX * 2);
      quickSetters.fieldY(-clampedY);
      quickSetters.elementsX(-clampedX * 6);
      quickSetters.elementsY(-clampedY * 4.5);
      quickSetters.elementsRotate(-clampedX * 0.65);
      quickSetters.playersX(clampedX * 7);
      quickSetters.playersY(clampedY * 4);
      quickSetters.playersRotate(clampedX * 0.25);
      quickSetters.phoneX(clampedX * 12);
      quickSetters.phoneY(clampedY * 7);
      quickSetters.phoneRotateX(-clampedY);
      quickSetters.phoneRotateY(clampedX * 1.5);
    };

    if (heroEl && finePointer && !reducedMotion) {
      heroEl.addEventListener('pointermove', handlePointerMove);
      heroEl.addEventListener('pointerleave', resetDepth);
    }

    return () => {
      ctx.revert();

      if (heroEl && finePointer && !reducedMotion) {
        heroEl.removeEventListener('pointermove', handlePointerMove);
        heroEl.removeEventListener('pointerleave', resetDepth);
      }

      if (fieldPointerEl && elementsPointerEl && playersPointerEl && phonePointerEl) {
        gsap.killTweensOf([fieldPointerEl, elementsPointerEl, playersPointerEl, phonePointerEl]);
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
      <style>{HERO_COPY_STYLES}</style>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0">
          <div ref={fieldScrollRef} className="absolute inset-0">
            <div ref={fieldPointerRef} className="absolute inset-0">
              <img
                ref={fieldImageRef}
                src={HERO_FIELD}
                alt=""
                className="absolute inset-0 h-full w-full select-none object-cover object-[48%_40%] sm:object-center"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <div ref={elementsScrollRef} className="absolute inset-0">
            <div ref={elementsPointerRef} className="absolute inset-0">
              <img
                ref={elementsImageRef}
                src={HERO_ELEMENTS}
                alt=""
                className="absolute inset-0 h-full w-full select-none object-cover object-[48%_40%] sm:object-center"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <div ref={playersScrollRef} className="absolute inset-0">
            <div
              ref={playersPointerRef}
              className="absolute inset-0"
              style={{ transformOrigin: '65% 50%' }}
            >
              <img
                ref={playersImageRef}
                src={HERO_PLAYERS}
                alt=""
                className="absolute inset-0 h-full w-full select-none object-cover object-[48%_40%] sm:object-center"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <div ref={phoneScrollRef} className="absolute inset-0">
            <div
              ref={phonePointerRef}
              className="absolute inset-0"
              style={{
                transformOrigin: '80% 42%',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                ref={phoneImageRef}
                src={HERO_PHONE}
                alt=""
                className="absolute inset-0 h-full w-full select-none object-cover object-[50%_40%] sm:object-center"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden="true">
        <div className="hero-readable-left" />
        <div className="absolute inset-x-0 top-0 h-[12%] bg-[linear-gradient(180deg,rgba(2,8,23,0.68)_0%,rgba(2,8,23,0.38)_10%,rgba(2,8,23,0.12)_22%,rgba(2,8,23,0)_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(0deg,rgba(2,8,23,0.82)_0%,rgba(2,8,23,0.38)_12%,rgba(2,8,23,0.08)_24%,rgba(2,8,23,0)_34%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20 md:hidden"
        aria-hidden="true"
      >
        <div className="hero-readable-mobile" />
      </div>

      <div className="hero-copy-layer">
        <div
          ref={contentBaseRef}
          className="hero-copy"
        >
          <h1
            id="home-hero-title"
            ref={contentHeadlineRef}
            className="hero-title"
          >
            <span className="hero-title-line">VIVE LA COPA</span>
            <span className="hero-title-line hero-title-line--red">COMO NUNCA</span>
          </h1>

          <p
            ref={contentCopyRef}
            className="hero-copy-text"
          >
            Sigue el torneo, conoce historias, mira los highlights, revive las fotos y no te
            pierdas ningún momento desde la Fan App oficial.
          </p>

          <div
            ref={contentCtaRef}
            className="hero-copy-actions"
          >
            <Button
              asChild
              variant="action"
              size="cta"
              className="hero-copy-primary rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] shadow-button"
            >
              <a
                href={FAN_APP_URL}
                {...EXTERNAL_LINK_PROPS}
                onClick={() => handleCtaClick('abrir_fan_app', FAN_APP_URL)}
              >
                ABRIR FAN APP
              </a>
            </Button>

            <Button
              asChild
              variant="actionOutline"
              size="cta"
              className="hero-copy-secondary rounded-lg border border-white/35 bg-[#091f3d]/96 px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.42)] backdrop-blur-md hover:border-white/45 hover:bg-[#10305d]"
            >
              <Link
                to="/inscripciones"
                onClick={() => handleCtaClick('ver_inscripciones', '/inscripciones')}
              >
                VER INSCRIPCIONES
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
