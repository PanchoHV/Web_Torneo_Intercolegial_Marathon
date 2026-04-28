import { useCountdown } from '@/hooks/useCountdown';
import { Calendar, ArrowRight, Play, MessageCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';

const TARGET_DATE = new Date('2026-07-17T23:59:59');

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
    <div className="w-full min-w-0 bg-white rounded-2xl px-3 py-4 sm:w-auto sm:min-w-[90px] sm:px-6 sm:py-5 shadow-card text-center">
      <div
        ref={numRef}
        className="font-montserrat font-black text-marathon-red tabular-nums text-[clamp(1.75rem,6vw,3.5rem)] leading-none"
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="font-inter font-medium text-[0.7rem] sm:text-xs text-marathon-gray mt-1 sm:mt-2 uppercase tracking-wide">
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
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-marathon-cream overflow-hidden"
    >
      <img
        src="/hero-background.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.90] pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,248,252,0.98)_0%,rgba(244,248,252,0.9)_42%,rgba(244,248,252,0.72)_100%),radial-gradient(circle_at_top,rgba(0,80,164,0.18),transparent_34rem)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-marathon-cream to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-marathon-red via-marathon-gold to-marathon-blue" />

      {/* SVG diagonal lines pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M-10 50 L50 -10" stroke="#0050A4" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      <div className="relative z-10 w-full max-w-[min(960px,100vw)] mx-auto px-5 sm:px-6 text-center pt-[96px] sm:pt-[120px] pb-12 sm:pb-16">
        {/* Badge */}
        <div className="hero-badge inline-flex max-w-full flex-wrap items-center justify-center gap-2 bg-white/80 text-center text-marathon-blue font-inter font-bold text-[0.66rem] leading-snug sm:text-xs tracking-[0.06em] sm:tracking-[0.12em] rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8 border border-marathon-blue/10 shadow-card backdrop-blur">
          <span className="h-2 w-2 shrink-0 rounded-full bg-marathon-red" /> EDICIÓN 2026 - PREINSCRIPCIONES ABIERTAS
        </div>

        {/* Title */}
        <h1 className="hero-title mx-auto flex max-w-full flex-col items-center font-montserrat font-black uppercase text-marathon-blue tracking-[0.01em] sm:tracking-[0.02em] text-[clamp(2rem,9.2vw,3.35rem)] sm:text-[clamp(3.25rem,7vw,4.7rem)] leading-[1.02] mb-5">
          <span className="block max-w-full whitespace-nowrap">COPA NACIONAL</span>
          <span className="block max-w-full whitespace-nowrap">INTERCOLEGIAL</span>
          <img
            src="https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Vigia-Logos-2.webp"
            alt="Marathon"
            className="mt-2 h-[clamp(2.25rem,10vw,3rem)] w-auto max-w-[72vw] sm:h-[clamp(3rem,5vw,4.25rem)] sm:max-w-none"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle font-inter text-marathon-gray text-base sm:text-xl leading-relaxed max-w-[680px] mx-auto mb-8 sm:mb-10">
          El torneo intercolegial más grande del Ecuador. Preinscribe a tu colegio y sé parte de una experiencia nacional con nivel de copa.
        </p>

        {/* Countdown */}
        <div className="hero-countdown mx-auto mb-8 max-w-full rounded-[1.25rem] bg-white/55 border border-white/70 shadow-card px-3 py-5 backdrop-blur-md sm:mb-10 sm:rounded-3xl sm:px-6 sm:py-7" aria-live="polite">
          <p className="font-inter font-semibold text-xs tracking-[0.1em] text-marathon-gray uppercase mb-4">
            {isExpired ? 'PREINSCRIPCIONES CERRADAS' : 'CIERRE DE PREINSCRIPCIONES EN:'}
          </p>
          {!isExpired && (
            <div className="mx-auto grid max-w-[320px] grid-cols-2 justify-center gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:gap-4">
              <CountdownUnit value={days} label="DÍAS" />
              <CountdownUnit value={hours} label="HORAS" />
              <CountdownUnit value={minutes} label="MINUTOS" />
              <CountdownUnit value={seconds} label="SEGUNDOS" />
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/inscripciones')}
            className="w-full sm:w-auto justify-center bg-marathon-red text-white font-montserrat font-bold rounded-full px-7 sm:px-9 py-3.5 sm:py-4 shadow-button hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            Preinscribir a mi Colegio <ArrowRight size={18} />
          </button>
          <button
            onClick={() => handleNavClick('#tutoriales')}
            className="w-full sm:w-auto justify-center bg-transparent border border-marathon-blue/35 text-marathon-blue font-inter font-semibold rounded-full px-6 sm:px-7 py-3 sm:py-3.5 hover:bg-white/65 hover:border-marathon-blue/50 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <Play size={18} /> Ver Tutorial de Preinscripción
          </button>
          <button
            onClick={() => handleNavClick('#comunicacion')}
            className="w-full sm:w-auto justify-center text-marathon-blue/90 font-inter font-semibold rounded-full px-4 py-2.5 hover:text-marathon-blue hover:bg-white/45 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <MessageCircle size={18} className="text-marathon-green" /> Canal oficial
          </button>
        </div>

        {/* Date */}
        <div className="hero-date mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 text-marathon-blue font-inter font-semibold text-sm sm:text-base">
          <Calendar size={20} className="text-marathon-red" />
          <span>Inicio del Torneo: 15 de Julio, 2026</span>
        </div>
      </div>
    </section>
  );
}
