import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CirclePlay, Clock3, LayoutTemplate, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const primaryTutorials = [
  {
    title: 'Tutorial de Bienvenida al torneo',
    subtitle: 'Cómo funciona',
    duration: '03:40',
    description:
      'Conoce el flujo general del torneo, el proceso de acompañamiento y qué recibirás después de la preinscripción.',
    badge: 'Inicio',
  },
  {
    title: 'Tutorial para Llenar formulario de preinscripción',
    subtitle: 'Registro institucional',
    duration: '05:15',
    description:
      'Aprende a completar correctamente la información del colegio, responsable y categorías para evitar demoras.',
    badge: 'Formulario',
  },
  {
    title: 'Tutorial de Activación del responsable en la app del Torneo',
    subtitle: 'Acceso del delegado',
    duration: '04:20',
    description:
      'Prepara el acceso del responsable verificado y sigue el proceso para activar su cuenta dentro del ecosistema del torneo.',
    badge: 'App',
  },
  {
    title: 'Tutorial de Inscripción de Jugadores',
    subtitle: 'Carga por categorías',
    duration: '06:05',
    description:
      'Descubre cómo registrar jugadores, organizar planteles y asegurar que cada participante quede en su categoría correcta.',
    badge: 'Jugadores',
  },
] as const;

const extraTutorials = [
  {
    title: 'Tutorial de Validación documental',
    subtitle: 'Próximamente',
    duration: 'Nuevo',
    description:
      'Espacio reservado para la guía de revisión de documentación y correcciones posteriores.',
    badge: 'Próximo',
  },
  {
    title: 'Tutorial de seguimiento competitivo',
    subtitle: 'Próximamente',
    duration: 'Nuevo',
    description:
      'Patrón preparado para sumar tutoriales de fixtures, resultados, alertas y novedades del torneo.',
    badge: 'Próximo',
  },
] as const;

export default function Tutoriales() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  const tutorials = showMore ? [...primaryTutorials, ...extraTutorials] : primaryTutorials;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tutoriales-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tutoriales-header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.tutorial-card',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.tutoriales-grid', start: 'top 84%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [showMore]);

  return (
    <section
      id="tutoriales"
      ref={sectionRef}
      className="bg-marathon-cream py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="tutoriales-header mx-auto max-w-[780px] text-center">
          <span className="inline-flex rounded-full border border-marathon-red/15 bg-marathon-red/8 px-5 py-2 text-xs font-semibold tracking-[0.12em] text-marathon-red">
            CENTRO DE AYUDA
          </span>
          <h2 className="mt-5 font-montserrat text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-marathon-blue">
            Tutoriales del Torneo
          </h2>
          <p className="mt-5 text-base leading-relaxed text-marathon-gray sm:text-lg">
            Estos tutoriales te permitirán hacer uso de nuestras herramientas y facilitar el
            registro de tu colegio, y la inscripción de tus jugadores de una forma sencilla.
          </p>
        </div>

        <div className="tutoriales-grid mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-6">
          {tutorials.map((tutorial) => (
            <article
              key={tutorial.title}
              className="tutorial-card group overflow-hidden rounded-[1.6rem] border border-marathon-blue/10 bg-white shadow-[0_18px_38px_rgba(6,42,79,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(6,42,79,0.1)]"
            >
              <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0c2a5b_0%,#0050A4_58%,#1a74cb_100%)] p-5 sm:p-6">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-20" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-white backdrop-blur-sm">
                    <CirclePlay size={26} />
                  </div>
                  <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
                    {tutorial.badge}
                  </span>
                </div>

                <div className="relative mt-8 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#fa411e]">
                      {tutorial.subtitle}
                    </p>
                    <p className="mt-2 text-lg font-black leading-tight text-white sm:text-xl">
                      {tutorial.title}
                    </p>
                  </div>
                  <div className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
                    {tutorial.duration}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-marathon-gray sm:text-[0.96rem]">
                  {tutorial.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-marathon-blue/60">
                  <span className="inline-flex items-center gap-1 rounded-full bg-marathon-blue/6 px-3 py-1.5">
                    <LayoutTemplate size={13} />
                    Preparado para video
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-marathon-red/6 px-3 py-1.5 text-marathon-red">
                    <Clock3 size={13} />
                    Guía rápida
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowMore((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-marathon-blue/12 bg-white px-5 py-3 text-sm font-bold text-marathon-blue shadow-[0_14px_28px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(6,42,79,0.1)]"
          >
            <Sparkles size={16} className="text-marathon-red" />
            {showMore ? 'Ver menos' : 'Ver más'}
            <ArrowRight size={16} className={showMore ? 'rotate-90 transition-transform' : ''} />
          </button>
        </div>
      </div>
    </section>
  );
}
