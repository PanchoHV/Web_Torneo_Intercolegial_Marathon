import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type EventStatus = 'past' | 'current' | 'future';

type CalendarEvent = {
  date: string;
  title: string;
  description: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};

const events: CalendarEvent[] = [
  {
    date: '15 MAR - 30 JUN',
    title: 'Período de Preinscripciones',
    description: 'Preinscribe a tu colegio y registra a todos tus jugadores antes del cierre.',
    startMonth: 3,
    startDay: 15,
    endMonth: 6,
    endDay: 30,
  },
  {
    date: '05 JUL',
    title: 'Publicación de Grupos',
    description: 'Conoce los grupos, calendario de partidos y sedes asignadas para cada deporte.',
    startMonth: 7,
    startDay: 5,
    endMonth: 7,
    endDay: 5,
  },
  {
    date: '15 JUL',
    title: 'Inauguración del Torneo',
    description: 'Ceremonia de apertura en el Coliseo Marathon. Todos los colegios participantes.',
    startMonth: 7,
    startDay: 15,
    endMonth: 7,
    endDay: 15,
  },
  {
    date: '15 JUL - 30 AGO',
    title: 'Fase de Grupos',
    description: 'Competencia regular donde cada equipo juega contra todos en su grupo.',
    startMonth: 7,
    startDay: 15,
    endMonth: 8,
    endDay: 30,
  },
  {
    date: '01 SEP - 15 SEP',
    title: 'Fase Eliminatoria',
    description: 'Los mejores equipos avanzan a cuartos, semis y la gran final.',
    startMonth: 9,
    startDay: 1,
    endMonth: 9,
    endDay: 15,
  },
  {
    date: '20 SEP',
    title: 'Clausura y Premiación',
    description: 'Ceremonia de premiación con trofeos, medallas y reconocimientos especiales.',
    startMonth: 9,
    startDay: 20,
    endMonth: 9,
    endDay: 20,
  },
];

const getDateAt = (year: number, month: number, day: number, atEnd = false) =>
  new Date(year, month - 1, day, atEnd ? 23 : 0, atEnd ? 59 : 0, atEnd ? 59 : 0, atEnd ? 999 : 0);

export default function Calendario() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eventsWithStatus = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();

    return events.map((event) => {
      const startDate = getDateAt(year, event.startMonth, event.startDay);
      const endDate = getDateAt(year, event.endMonth, event.endDay, true);

      let status: EventStatus = 'future';
      if (now > endDate) status = 'past';
      else if (now >= startDate && now <= endDate) status = 'current';

      return { ...event, status };
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.calendario-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.calendario-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.calendario-event',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.calendario-timeline', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="calendario"
      ref={sectionRef}
      className="bg-marathon-cream"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="calendario-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            CRONOGRAMA 2026
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            FECHAS IMPORTANTES
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed max-w-[700px] mx-auto">
            Marca estas fechas en tu calendario. Cumplir con los plazos garantiza la participación de tu colegio sin contratiempos.
          </p>
        </div>

        {/* Timeline */}
        <div className="calendario-timeline max-w-[800px] mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-marathon-red/30 lg:-translate-x-px" />

          <div className="space-y-8">
            {eventsWithStatus.map((event, i) => (
              <div
                key={i}
                className={`calendario-event relative flex items-start gap-6 lg:gap-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-6 lg:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-6 z-10 ${
                    event.status === 'current'
                      ? 'bg-marathon-red pulse-dot'
                      : event.status === 'past'
                      ? 'bg-marathon-green'
                      : 'bg-marathon-gray'
                  }`}
                />

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />

                {/* Card */}
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:px-10">
                  <div className="bg-white rounded-2xl p-5 shadow-card">
                    <span className="font-inter font-bold text-sm text-marathon-red">
                      {event.date}
                    </span>
                    <h3 className="font-montserrat font-bold text-marathon-blue mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="font-inter text-marathon-gray text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
