import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Registra tu Colegio',
    description:
      'Completa el formulario de inscripción institucional con los datos de tu colegio y del delegado deportivo.',
    cta: 'Formulario de Inscripción',
    href: '/inscripciones',
  },
  {
    number: '02',
    title: 'Inscribe a tus Jugadores',
    description:
      'Accede a nuestra plataforma y registra a cada jugador con sus datos personales, foto y certificado médico.',
    cta: 'Ver Tutorial de Registro',
    href: '#tutoriales',
  },
  {
    number: '03',
    title: 'Confirma tu Participación',
    description:
      'Realiza el pago de la inscripción y recibe la confirmación oficial con tu grupo asignado y calendario de partidos.',
    cta: 'Métodos de Pago',
    href: '#',
  },
];

export default function ComoInscribirse() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.inscripcion-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.inscripcion-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.inscripcion-step',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.inscripcion-steps', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.inscripcion-nota',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.inscripcion-nota', start: 'top 85%' },
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
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="como-inscribirse"
      ref={sectionRef}
      className="bg-white"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="inscripcion-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            PROCESO DE INSCRIPCIÓN
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            INSCRIBE A TU COLEGIO EN 3 PASOS
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[700px] mx-auto">
            El proceso de inscripción es completamente digital. Sigue estos pasos y asegura la participación de tu colegio en la Copa Nacional Marathon Intercolegial 2026.
          </p>
        </div>

        {/* Steps */}
        <div className="inscripcion-steps relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-marathon-red/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="inscripcion-step text-center relative">
                {/* Number */}
                <div className="w-16 h-16 rounded-full gradient-sports flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="font-montserrat font-black text-white text-2xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-montserrat font-bold text-xl text-marathon-blue mb-3">
                  {step.title}
                </h3>
                <p className="font-inter text-marathon-gray leading-relaxed mb-6 max-w-[320px] mx-auto">
                  {step.description}
                </p>

                <button
                  onClick={() => handleNavClick(step.href)}
                  className={`font-inter font-semibold text-sm flex items-center gap-1 mx-auto transition-all duration-300 ${
                    i === 0
                      ? 'bg-marathon-red text-white rounded-full px-6 py-3 shadow-button hover:scale-[1.02]'
                      : 'text-marathon-red hover:gap-2'
                  }`}
                >
                  {step.cta} <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nota importante */}
        <div className="inscripcion-nota mt-16 bg-marathon-red/5 border border-marathon-red/15 rounded-2xl p-6 flex items-start gap-4 max-w-[800px] mx-auto">
          <AlertCircle className="text-marathon-red shrink-0 mt-0.5" size={22} />
          <p className="font-inter font-medium text-marathon-blue">
            Fecha límite de inscripción: 30 de junio, 2026. Las inscripciones son por orden de llegada y los cupos son limitados.
          </p>
        </div>
      </div>
    </section>
  );
}
