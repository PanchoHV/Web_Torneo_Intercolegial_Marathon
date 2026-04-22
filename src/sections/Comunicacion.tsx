import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colegios = [
  'Colegio San Agustín',
  'Unidad Educativa Quito Norte',
  'Colegio Santa María',
  'Instituto Marathon',
  'Colegio José Carlos Mariátegui',
  'Institución Educativa El Progreso',
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Comunicacion() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.comunicacion-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.comunicacion-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.comunicacion-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.comunicacion-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comunicacion"
      ref={sectionRef}
      className="bg-white"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="comunicacion-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            COMUNICACIÓN DIRECTA
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            GRUPOS DE WHATSAPP POR COLEGIO
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[700px] mx-auto">
            Cada colegio tiene un grupo exclusivo de WhatsApp donde recibirás información oficial, recordatorios, cambios de horario y comunicados importantes del torneo.
          </p>
        </div>

        {/* WhatsApp Groups Grid */}
        <div className="comunicacion-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colegios.map((colegio, i) => (
            <div
              key={i}
              className="comunicacion-card bg-marathon-cream rounded-2xl p-6 border border-marathon-green/20 text-center hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-marathon-green flex items-center justify-center mx-auto mb-4">
                <WhatsAppIcon />
              </div>

              <h3 className="font-montserrat font-bold text-marathon-blue mb-2">
                {colegio}
              </h3>

              <span className="inline-block bg-marathon-green/10 text-marathon-green font-inter font-medium text-xs rounded-full px-3 py-1 mb-3">
                Activo
              </span>

              <p className="font-inter text-marathon-gray text-sm mb-5">
                Grupo oficial de comunicación para representantes y entrenadores.
              </p>

              <button className="bg-marathon-green text-white font-montserrat font-semibold text-sm rounded-full px-6 py-2.5 hover:scale-[1.02] transition-all duration-300 inline-flex items-center gap-1">
                Unirse al Grupo <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="comunicacion-nota mt-16 text-center">
          <p className="font-inter text-marathon-gray text-lg mb-3">
            ¿No encuentras tu colegio? Solicita la creación de tu grupo escribiéndonos al:
          </p>
          <p className="font-montserrat font-bold text-xl text-marathon-blue flex items-center justify-center gap-2 mb-2">
            <Phone size={22} className="text-marathon-green" />
            +593 99 888 7777
          </p>
          <p className="font-inter text-marathon-gray text-sm">
            Horario de atención: Lunes a Viernes, 9:00 am - 6:00 pm
          </p>
        </div>
      </div>
    </section>
  );
}
