import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, AlertCircle, BadgeCheck, FileCheck2, UsersRound } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Toggle temporal para ocultar/desactivar acceso a tutoriales
const SHOW_TUTORIALS = false;

const steps = [
  {
    number: '01',
    title: 'Registra tu Colegio',
    description:
      'Completa el formulario de inscripción institucional con los datos de tu colegio y del delegado deportivo.',
    cta: 'Formulario de Inscripción',
    href: '/inscripciones',
    icon: FileCheck2,
  },
  {
    number: '02',
    title: 'Confirmación de cupo y participación',
    description:
      'Nuestros ejecutivos se pondrán en contacto para la confirmación de los cupos y las participaciones en las categorías correspondientes.',
    cta: 'Ver Tutorial de Registro',
    href: '#tutoriales',
    icon: BadgeCheck,
  },
  {
    number: '03',
    title: 'Inscripción de jugadores',
    description:
      'En este paso los responsables de cada entidad recibirán por los medios verificados la información para la inscripción de cada uno de los jugadores en sus respectivas categorías.',
    cta: 'Tutoriales del Torneo',
    href: '#tutoriales',
    icon: UsersRound,
  },
] as const;

export default function ComoInscribirse() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.inscripcion-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.inscripcion-header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.inscripcion-step',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.inscripcion-steps', start: 'top 84%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    if (!href.startsWith('#')) {
      navigate(href);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="como-inscribirse"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(248,251,255,0.95),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute -left-16 top-32 h-56 w-56 rounded-full bg-marathon-blue/6 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-marathon-red/6 blur-3xl" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="inscripcion-header mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full border border-marathon-red/15 bg-marathon-red/8 px-5 py-2 text-xs font-semibold tracking-[0.12em] text-marathon-red">
            PROCESO DE INSCRIPCIÓN
          </span>
          <h2 className="mt-5 font-montserrat text-[clamp(1.9rem,4vw,3.15rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-marathon-blue">
            Inscribe a tu colegio en 3 pasos
          </h2>
          <p className="mt-5 text-base leading-relaxed text-marathon-gray sm:text-lg">
            El proceso de inscripción es completamente digital. Sigue estos pasos y asegura la
            participación de tu colegio en la Copa Nacional Marathon Intercolegial 2026.
          </p>
        </div>

        <div className="inscripcion-steps relative mt-12 sm:mt-14">
          <div className="absolute left-1/2 top-10 hidden h-px w-[72%] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(226,27,45,0.12),rgba(226,27,45,0.4),rgba(226,27,45,0.12))] lg:block" />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="inscripcion-step group relative overflow-hidden rounded-[1.7rem] border border-marathon-blue/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)] p-5 shadow-[0_18px_38px_rgba(6,42,79,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(6,42,79,0.1)] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(226,27,45,0.9),rgba(0,80,164,0.8))] opacity-80" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-marathon-blue text-white shadow-[0_14px_28px_rgba(0,80,164,0.22)]">
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full border border-marathon-red/15 bg-marathon-red/6 px-3 py-1 text-xs font-black tracking-[0.14em] text-marathon-red">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-montserrat text-xl font-bold leading-tight text-marathon-blue">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-marathon-gray sm:text-[0.96rem]">
                    {step.description}
                  </p>

                  <div className="mt-6 border-t border-marathon-blue/8 pt-5">
                    {
                      (() => {
                        const isTutorialStep = step.href === '#tutoriales' && !SHOW_TUTORIALS;
                        return (
                          <button
                            type="button"
                            onClick={() => {
                              if (isTutorialStep) return;
                              handleNavClick(step.href);
                            }}
                            aria-disabled={isTutorialStep}
                            className={`inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-bold transition-all duration-200 ${
                              step.number === '01'
                                ? 'bg-marathon-red px-5 py-3 text-white shadow-[0_14px_28px_rgba(226,27,45,0.22)] hover:scale-[1.01]'
                                : 'text-marathon-red hover:gap-3'
                            } ${isTutorialStep ? 'pointer-events-none opacity-50' : ''}`}
                          >
                            {step.cta}
                            <ArrowRight size={16} />
                          </button>
                        );
                      })()
                    }
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-[1.7rem] border border-marathon-red/15 bg-[linear-gradient(135deg,rgba(226,27,45,0.08),rgba(255,255,255,0.98))] p-5 shadow-[0_18px_40px_rgba(226,27,45,0.08)] sm:mt-12 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-marathon-red text-white">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-marathon-red">
                Cupos limitados
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-marathon-blue sm:text-base">
                Las inscripciones se revisarán por orden de llegada, de acuerdo con la ciudad, región y calendario correspondiente. Las fechas de cierre serán comunicadas oficialmente por la organización para cada bloque regional.
                La confirmación final dependerá de cupos disponibles, categorías habilitadas y cumplimiento de requisitos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
