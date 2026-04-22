import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sports = [
  {
    name: 'Fútbol',
    categories: ['Sub 14', 'Sub 16', 'Sub 18'],
    description:
      'Copa Marathon de fútbol con fase de grupos y eliminatorias. Sistema de competencia justo para todos los niveles.',
    gradient: 'from-emerald-500 to-emerald-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: 'Baloncesto',
    categories: ['Sub 14', 'Sub 16', 'Sub 18'],
    description:
      'Torneo 5x5 con tiempo reglamentario FIBA. Premio al mejor jugador y mejor defensor.',
    gradient: 'from-amber-500 to-amber-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <path d="M5.6 5.6l12.8 12.8" />
      </svg>
    ),
  },
  {
    name: 'Vóley',
    categories: ['Sub 14', 'Sub 16', 'Sub 18'],
    description:
      'Competencia por sets con sistema de liguilla. Mixto disponible en categoría Sub 18.',
    gradient: 'from-blue-500 to-blue-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2c4 3 4 17 0 20" />
      </svg>
    ),
  },
  {
    name: 'Natación',
    categories: ['Sub 12', 'Sub 14', 'Sub 16', 'Sub 18'],
    description:
      'Pruebas de estilo libre, espalda, pecho y mariposa. Cronometraje electrónico profesional.',
    gradient: 'from-cyan-500 to-cyan-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" />
        <path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" />
      </svg>
    ),
  },
  {
    name: 'Atletismo',
    categories: ['Sub 12', 'Sub 14', 'Sub 16', 'Sub 18'],
    description:
      'Carreras de velocidad, medio fondo, relevos, salto largo y lanzamiento de bala.',
    gradient: 'from-violet-500 to-violet-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <path d="M4 20h16" />
        <path d="M6 16l4-4 2 2 4-6" />
        <circle cx="18" cy="6" r="2" />
      </svg>
    ),
  },
  {
    name: 'Futsal',
    categories: ['Sub 12', 'Sub 14', 'Sub 16'],
    description:
      'Fútbol sala en cancha techada con reglamento FIFA de futsal. Dinámico y emocionante.',
    gradient: 'from-red-500 to-red-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/30">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12h6" />
        <path d="M16 12h6" />
      </svg>
    ),
  },
];

export default function Deportes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sports-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sports-header', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.sports-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.sports-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="deportes"
      ref={sectionRef}
      className="bg-marathon-cream"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sports-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            DISCIPLINAS 2026
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            DEPORTES DEL TORNEO
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[700px] mx-auto">
            Ofrecemos una variedad de disciplinas deportivas para todas las edades y habilidades. Cada deporte cuenta con reglamento oficial, árbitros certificados y premios para los ganadores.
          </p>
        </div>

        {/* Sports Grid */}
        <div className="sports-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport, i) => (
            <div
              key={i}
              className="sports-card bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image Area */}
              <div
                className={`h-[180px] bg-gradient-to-br ${sport.gradient} flex items-center justify-center relative`}
              >
                {sport.icon}
                <span className="absolute bottom-4 left-4 font-montserrat font-black text-white text-xl tracking-wide">
                  {sport.name.toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {sport.categories.map((cat, j) => (
                    <span
                      key={j}
                      className="bg-marathon-red/10 text-marathon-red font-inter font-medium text-xs rounded-full px-3 py-1"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="font-inter text-marathon-gray text-sm leading-relaxed mb-4">
                  {sport.description}
                </p>

                <button className="font-inter font-semibold text-sm text-marathon-red flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Ver reglamento <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
