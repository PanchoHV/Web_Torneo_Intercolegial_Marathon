import { useState, useEffect, useRef } from 'react';
const faqs = [
  {
    question: '¿Cuál es el costo de preinscripción por colegio?',
    answer: `La preinscripción para colegios privados en la Copa Nacional Intercolegial Marathon tiene un costo de
USD 170 por cada categoría inscrita (más IVA).
Los colegios fiscales y fiscomisionales no pagan costo de preinscripción.`,
  },
  {
    question: '¿Cuántos jugadores puedo inscribir por equipo?',
    answer: `Fútbol 9 (F9): hasta 20 jugadores por equipo
Fútbol 11 (F11): hasta 25 jugadores por equipo
  {
    question: '¿Cómo recibo la comunicación oficial del torneo?',
  },
  {
    question: '¿Qué documentación necesito para inscribir la nómina de jugadores?',
    answer: `Para registrar la nómina oficial de un equipo en la Copa Nacional Intercolegial Marathon, el colegio debe presentar:
    answer:

function AccordionItem({
  },
  {
    question: '¿Qué es la Copa Marathon Ecuador 2026?',
    answer: `La Copa Marathon Ecuador 2026 es un torneo nacional intercolegial de fútbol que reúne a instituciones educativas de distintas regiones del país. El torneo está planteado con participación de equipos de la Costa, Sierra y Amazonía, en categorías masculinas y femeninas seleccionadas.
  question,
  answer,
  },
  {
    question: '¿De qué fecha a qué fecha se desarrollará el torneo?',
    answer: `La Copa Marathon Ecuador 2026 está prevista para desarrollarse desde el 27 de julio de 2026 hasta el 30 de enero de 2027.
  isOpen,
  onClick,
  },
  {
    question: '¿Cuándo inician los torneos en Costa, Sierra y Amazonía?',
    answer: `En la Región Costa, las inscripciones están previstas desde el 4 de mayo de 2026 y los partidos iniciarían desde el 27 de julio de 2026, dependiendo de la sede.
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  },
  {
    question: '¿Qué categorías participarán en la Copa Marathon?',
    answer: `La planificación contempla las siguientes categorías:
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
  },
  {
    question: '¿Las fechas y sedes están confirmadas definitivamente?',
    answer: `Las fechas, sedes y categorías forman parte de la planificación técnica inicial, pero no deben entenderse como definitivas hasta su confirmación oficial.
    <div
      className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${
        isOpen
          ? 'border-marathon-red/18 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8F8_100%)] shadow-[0_20px_42px_rgba(226,27,45,0.08)]'
  },
];
          : 'border-marathon-blue/8 bg-marathon-cream shadow-[0_12px_30px_rgba(6,42,79,0.04)]'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full cursor-pointer flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-inter font-semibold text-marathon-blue sm:text-[1.02rem]">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-all duration-400 ${
            isOpen ? 'rotate-180 text-marathon-red' : 'text-marathon-gray'
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5 font-inter leading-relaxed text-marathon-gray">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.faq-list', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="preguntas"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(248,251,255,0.9),rgba(255,255,255,0))]" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="faq-header text-center mb-16">
          <span className="inline-block bg-marathon-red/10 text-marathon-red font-inter font-semibold text-xs tracking-[0.08em] rounded-full px-5 py-2 mb-6">
            AYUDA
          </span>
          <h2 className="font-montserrat font-extrabold text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-6">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="font-inter text-marathon-gray text-lg leading-relaxed">
            Resolvemos las dudas más comunes de entrenadores y delegados deportivos.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-list flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
