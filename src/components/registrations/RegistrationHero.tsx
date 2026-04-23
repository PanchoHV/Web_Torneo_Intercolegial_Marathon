import { Home, Trophy } from 'lucide-react';
import { Link } from 'react-router';

export default function RegistrationHero() {
  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/60 bg-[linear-gradient(130deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_62%,rgba(226,27,45,0.88)_100%)] px-4 py-4 text-white shadow-[0_20px_52px_rgba(6,42,79,0.22)] sm:px-8 sm:py-7 lg:px-10">
      <img
        src="/hero-background.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-16 mix-blend-screen"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,42,79,0.98)_0%,rgba(6,42,79,0.88)_48%,rgba(0,80,164,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:54px_54px] opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-marathon-red" />

      <div className="relative grid gap-3 sm:gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="flex items-center justify-between gap-4 lg:block">
          <Link to="/" className="inline-flex items-center gap-3">
            <img
              src="/marathon-logo.webp"
              alt="Copa Nacional Marathon Intercolegial 2026"
              className="h-10 w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)] sm:h-16 lg:h-[67px]"
            />
          </Link>
          <Link
            to="/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20 lg:hidden"
            aria-label="Volver al inicio"
          >
            <Home size={18} />
          </Link>
        </div>

        <div className="max-w-3xl">
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] sm:mb-3 sm:text-xs sm:tracking-[0.12em]">
            <Trophy size={14} /> CONVOCATORIA OFICIAL 2026
          </span>
          <h1 className="max-w-3xl text-[clamp(1.55rem,6.8vw,3.7rem)] font-black uppercase leading-[1] tracking-[0.01em] sm:tracking-[0.02em]">
            Inscripción de colegios
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/90 sm:mt-3 sm:text-lg">
            Completa el registro oficial del Torneo Intercolegial Marathon Ecuador 2026. Te contactaremos para continuar el proceso.
          </p>
        </div>

        <div className="hidden lg:flex lg:items-start lg:justify-end">
          <Link
            to="/"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
