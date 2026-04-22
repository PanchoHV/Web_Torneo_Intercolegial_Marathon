import { ArrowDown, Trophy } from 'lucide-react';
import { Link } from 'react-router';

export default function RegistrationHero() {
  return (
    <section className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-white/50 bg-[linear-gradient(130deg,rgba(6,42,79,0.98)_0%,rgba(0,80,164,0.94)_58%,rgba(226,27,45,0.9)_100%)] px-4 py-6 text-white shadow-[0_28px_70px_rgba(6,42,79,0.3)] sm:px-10 sm:py-10 lg:min-h-[520px] lg:px-14 lg:py-14">
      <img
        src="/hero-background.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,42,79,0.98)_0%,rgba(6,42,79,0.88)_48%,rgba(0,80,164,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:54px_54px] opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-marathon-red" />

      <div className="relative flex h-full flex-col gap-6 sm:gap-9 lg:justify-between">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <img
              src="/marathon-logo.webp"
              alt="Copa Nacional Marathon Intercolegial 2026"
              className="h-12 w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)] sm:h-20"
            />
          </Link>
          <Link
            to="/"
            className="hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20 sm:inline-flex"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="max-w-4xl">
          <span className="mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 sm:px-4 py-1.5 text-[0.66rem] sm:text-xs font-bold tracking-[0.08em] sm:tracking-[0.12em]">
            <Trophy size={14} /> CONVOCATORIA OFICIAL 2026
          </span>
          <h1 className="max-w-3xl text-[clamp(2rem,10vw,5.2rem)] font-black uppercase leading-[0.98] tracking-[0.02em]">
            Torneo Intercolegial Marathon Ecuador 2026
          </h1>
          <p className="mt-3 sm:mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-xl">
            Registra oficialmente a tu institución educativa y participa en la competencia escolar más emocionante del país.
          </p>

          <div className="mt-5 sm:mt-8">
            <a
              href="#formulario-inscripcion"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-marathon-red px-6 sm:px-8 py-3.5 sm:py-4 font-montserrat text-sm font-bold text-white shadow-button transition hover:-translate-y-0.5 hover:scale-[1.02] sm:text-base"
            >
              Inscribir mi colegio <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
