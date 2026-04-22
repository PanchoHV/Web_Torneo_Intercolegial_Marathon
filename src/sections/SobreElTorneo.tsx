import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, BookOpen, Users, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Trophy,
    title: 'Competencia de Alto Nivel',
    description:
      'Más de 50 colegios participantes en disciplinas deportivas organizadas con estándares profesionales de arbitraje y logística.',
  },
  {
    icon: BookOpen,
    title: 'Formación Integral',
    description:
      'Promovemos el deporte como herramienta de educación. Nuestro torneo incluye charlas de liderazgo y valores para los participantes.',
  },
  {
    icon: Users,
    title: 'Comunidad Educativa',
    description:
      'Un espacio donde colegios, familias y estudiantes se unen alrededor del deporte escolar, creando lazos que trascienden la competencia.',
  },
  {
    icon: ClipboardList,
    title: 'Organización Profesional',
    description:
      'Sistema de inscripción digital, reglamentos claros, calendario estructurado y comunicación directa con cada colegio participante.',
  },
];

const stats = [
  { value: '50+', label: 'COLEGIOS' },
  { value: '12+', label: 'DISCIPLINAS' },
  { value: '3000+', label: 'ESTUDIANTES' },
  { value: '15', label: 'AÑOS' },
];

export default function SobreElTorneo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre-el-torneo"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-marathon-red/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-marathon-blue/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <span className="inline-block bg-white/85 border border-marathon-blue/10 text-marathon-blue font-inter font-semibold text-xs tracking-[0.1em] rounded-full px-5 py-2 mb-6 shadow-card">
            SOBRE NOSOTROS
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.9rem,4vw,3.15rem)] leading-[1.08] mb-6">
            MÁS QUE UN TORNEO, UNA EXPERIENCIA
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[760px] mx-auto">
            El Torneo Intercolegial Marathon reúne a los mejores colegios del país en una competencia que va más allá del deporte. Fomentamos valores, trabajo en equipo y excelencia académica a través del deporte escolar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="about-card bg-white/80 backdrop-blur-md border border-marathon-blue/10 rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl gradient-sports flex items-center justify-center mb-5 shadow-[0_10px_24px_rgba(226,27,45,0.22)]">
                <feature.icon size={26} className="text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-marathon-blue mb-3 tracking-[0.01em]">
                {feature.title}
              </h3>
              <p className="font-inter text-marathon-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="about-stats relative overflow-hidden gradient-institutional rounded-3xl p-8 sm:p-10 border border-white/20 shadow-[0_24px_60px_rgba(6,42,79,0.28)]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_45%)] pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="about-stat bg-white/10 rounded-xl py-5 px-3 border border-white/10">
                <div className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-inter font-medium text-sm text-white/90 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
