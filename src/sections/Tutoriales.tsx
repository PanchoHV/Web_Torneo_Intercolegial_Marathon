import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Eye, Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tutorials = [
  {
    title: 'Cómo registrar a un jugador paso a paso',
    description:
      'Guía completa para añadir jugadores a tu equipo: datos personales, fotografía, certificado médico y firma de autorización.',
    duration: '8:45',
    views: '1,240',
    timeAgo: 'Hace 2 semanas',
    image: '/images/tutorial-thumbnail-1.jpg',
  },
  {
    title: 'Subir documentos al sistema',
    description:
      'Aprende a cargar certificados médicos, constancias de estudios y autorizaciones de padres de forma correcta.',
    duration: '5:30',
    views: '980',
    timeAgo: 'Hace 3 semanas',
    image: '/images/tutorial-thumbnail-2.jpg',
  },
  {
    title: 'Editar y eliminar registros',
    description:
      '¿Cometiste un error? No te preocupes. Este tutorial te muestra cómo modificar o eliminar registros de jugadores.',
    duration: '4:15',
    views: '756',
    timeAgo: 'Hace 1 mes',
    image: '/images/tutorial-thumbnail-3.jpg',
  },
  {
    title: 'Guía de pagos y confirmación',
    description:
      'Todo sobre los métodos de pago, comprobantes y cómo confirmar la inscripción de tu equipo.',
    duration: '6:20',
    views: '1,543',
    timeAgo: 'Hace 1 mes',
    image: '/images/tutorial-thumbnail-4.jpg',
  },
];

export default function Tutoriales() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tutoriales-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tutoriales-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.tutorial-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.tutoriales-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tutoriales"
      ref={sectionRef}
      className="bg-marathon-cream"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="tutoriales-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            CENTRO DE AYUDA
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            TUTORIALES PARA ENTRENADORES
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[700px] mx-auto">
            Videos paso a paso para que puedas registrar a tus jugadores, subir documentos y gestionar tu equipo sin complicaciones.
          </p>
        </div>

        {/* Tutorials Grid */}
        <div className="tutoriales-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial, i) => (
            <div
              key={i}
              className="tutorial-card bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-[200px] bg-marathon-blue relative overflow-hidden">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={28} className="text-marathon-red ml-1" fill="#E21B2D" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white font-inter font-medium text-xs rounded-full px-3 py-1">
                  {tutorial.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-marathon-blue mb-2 group-hover:text-marathon-red transition-colors duration-300">
                  {tutorial.title}
                </h3>
                <p className="font-inter text-marathon-gray text-sm leading-relaxed mb-4">
                  {tutorial.description}
                </p>

                <div className="flex items-center gap-4 text-marathon-gray text-xs font-inter">
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {tutorial.views} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {tutorial.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to all tutorials */}
        <div className="text-center mt-10">
          <button className="font-inter font-semibold text-marathon-red flex items-center gap-1 mx-auto hover:gap-2 transition-all duration-300">
            Ver todos los tutoriales <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
