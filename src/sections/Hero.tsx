import { useCountdown } from '@/hooks/useCountdown';
import { Calendar, ArrowRight, Play, MessageCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { trackCtaClick, trackPreinscriptionStart } from '@/lib/analytics/gtm';

// Toggle temporal para ocultar/desactivar acceso a tutoriales
const SHOW_TUTORIALS = false;
const TARGET_DATE = new Date('2026-07-31T23:59:59');

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const prevValue = useRef(value);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevValue.current !== value && numRef.current) {
      gsap.fromTo(
        numRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className="w-full min-w-0 rounded-xl border border-white/15 bg-[#061a38]/78 px-2 py-2 text-center shadow-[0_18px_42px_rgba(0,0,0,0.24)] sm:w-auto sm:min-w-[90px] sm:rounded-2xl sm:px-6 sm:py-5">
      <div
        ref={numRef}
        className="font-montserrat font-black text-marathon-gold tabular-nums text-[clamp(1.25rem,6.4vw,1.95rem)] leading-none sm:text-[clamp(1.75rem,6vw,3.5rem)]"
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-0.5 font-inter text-[0.56rem] font-bold uppercase tracking-wide text-white/68 sm:mt-2 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(TARGET_DATE);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-countdown',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.0 }
      );
      gsap.fromTo(
        '.hero-date',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] flex-col items-stretch justify-center overflow-hidden bg-[#020817]"
    >
      <picture className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <source
          media="(max-width: 767px)"
          srcSet="https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Esquema%20Pichazos%20(1).webp"
        />
        <img
          src="https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Esquema%20Pichazos%20(1).webp"
          alt=""
          className="h-full w-full object-cover object-center opacity-100"
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.82)_0%,rgba(2,8,23,0.58)_36%,rgba(2,8,23,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(2,8,23,0.98)_0%,rgba(3,18,48,0.93)_35%,rgba(3,18,48,0.54)_60%,rgba(2,8,23,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(0,80,164,0.22),transparent_30rem),radial-gradient(circle_at_82%_22%,rgba(226,27,45,0.2),transparent_26rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] via-[#020817]/60 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-marathon-red via-marathon-gold to-marathon-blue" />

      {/* SVG diagonal lines pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M-10 50 L50 -10" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] items-start px-4 pb-2 pt-[78px] sm:px-6 sm:pb-8 sm:pt-[94px] lg:px-8 lg:pt-[104px]">
        <div className="w-full max-w-[33rem] text-center sm:max-w-[630px] lg:text-left">
        {/* Badge */}
        <div className="hero-badge mb-2 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/18 bg-[#061a38]/72 px-3 py-1.5 text-center font-inter text-[0.56rem] font-bold leading-snug tracking-[0.06em] !text-white shadow-[0_16px_36px_rgba(0,0,0,0.22)] sm:mb-4 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.12em] lg:mb-5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-marathon-red" /> EDICIÓN 2026 - PREINSCRIPCIONES ABIERTAS
        </div>

        {/* Title */}
        <h1 className="hero-title mb-2 flex max-w-full flex-col items-center font-montserrat text-[clamp(1.85rem,8.8vw,2.8rem)] font-black uppercase leading-[0.95] tracking-[0.01em] !text-white sm:mb-3 sm:text-[clamp(3rem,5.6vw,4.45rem)] sm:tracking-[0.02em] lg:items-start">
          <span className="block max-w-full">COPA NACIONAL</span>
          <span className="block max-w-full !text-white">INTERCOLEGIAL</span>
          <img
            src="https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Vigia-Logos-2.webp"
            alt="Marathon"
            className="mt-2 h-[clamp(2.65rem,11vw,3.55rem)] w-auto max-w-[82vw] rounded-xl bg-white/92 px-3 py-1.5 shadow-[0_16px_38px_rgba(0,0,0,0.28)] sm:mt-2.5 sm:h-[clamp(3.65rem,5.4vw,4.85rem)] sm:max-w-none sm:px-4 sm:py-2"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto mb-3 max-w-[34rem] font-inter text-[0.8rem] leading-snug !text-white/90 sm:mb-5 sm:text-[1.05rem] sm:leading-relaxed lg:mx-0 lg:mb-6">
          El torneo intercolegial más grande del Ecuador. Preinscribe a tu colegio y sé parte de una experiencia nacional con nivel de copa.
        </p>

        {/* Countdown */}
        <div className="hero-countdown mx-auto mb-3 max-w-[34rem] rounded-[1rem] border border-white/15 bg-[#03122b]/72 px-2 py-2.5 shadow-[0_22px_58px_rgba(0,0,0,0.28)] sm:mb-5 sm:max-w-[630px] sm:rounded-3xl sm:px-5 sm:py-4 lg:mx-0 lg:mb-6" aria-live="polite">
          <p className="mb-2 font-inter text-[0.58rem] font-bold uppercase tracking-[0.1em] !text-white/70 sm:mb-4 sm:text-xs">
            {isExpired ? 'PREINSCRIPCIONES CERRADAS' : 'CIERRE DE PREINSCRIPCIONES EN:'}
          </p>
          {!isExpired && (
            <div className="grid max-w-[20rem] grid-cols-4 justify-center gap-1.5 sm:flex sm:max-w-none sm:flex-wrap sm:gap-4">
              <CountdownUnit value={days} label="DÍAS" />
              <CountdownUnit value={hours} label="HORAS" />
              <CountdownUnit value={minutes} label="MINUTOS" />
              <CountdownUnit value={seconds} label="SEGUNDOS" />
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col items-stretch gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
          <button
            onClick={() => {
              trackPreinscriptionStart({
                cta_location: 'hero',
                destination: '/inscripciones',
              });
              navigate('/inscripciones');
            }}
            className="flex w-full justify-center gap-2 rounded-full bg-marathon-red px-6 py-2.5 font-montserrat text-sm font-bold text-white shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] sm:w-auto sm:px-9 sm:py-4 sm:text-base"
          >
            Preinscribir a mi Colegio <ArrowRight size={18} />
          </button>
          {SHOW_TUTORIALS && (
            <button
              onClick={() => handleNavClick('#tutoriales')}
              className="w-full justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3 font-inter text-sm font-semibold text-white transition-all duration-300 hover:border-white/45 hover:bg-white/12 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
            >
              <Play size={18} /> Ver Tutorial de Preinscripción
            </button>
          )}
          <button
            onClick={() => {
              trackCtaClick({
                cta_name: 'canal_oficial',
                cta_location: 'hero',
                destination: '#comunicacion',
              });
              handleNavClick('#comunicacion');
            }}
            className="flex w-full justify-center gap-2 rounded-full px-4 py-1.5 font-inter text-sm font-semibold !text-white/86 transition-all duration-300 hover:bg-white/10 hover:!text-white sm:w-auto sm:py-2.5 sm:text-base"
          >
            <MessageCircle size={18} className="text-marathon-green" /> Canal oficial
          </button>
        </div>

        {/* Date */}
        <div className="hero-date mt-2 text-center sm:mt-5 lg:w-[calc(100vw-4rem)] lg:max-w-[1136px] lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-inter text-xs font-semibold !text-white sm:gap-2 sm:text-base lg:justify-start">
            <Calendar size={18} className="text-marathon-red sm:size-5" />
            <span>Cierre de preinscripciones: 31 de julio de 2026</span>
            <span className="hidden !text-white/70 sm:inline">Calendario progresivo por región: Costa, Sierra y Amazonía.</span>
          </div>
          <p className="mx-auto mt-1 hidden max-w-[640px] font-inter text-[0.68rem] leading-relaxed !text-white/65 sm:mt-2 sm:block sm:text-sm lg:mx-0 lg:max-w-none">
            Las fechas podrán ajustarse por calendario escolar, logística deportiva, clima, disponibilidad de escenarios o razones de fuerza mayor.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
