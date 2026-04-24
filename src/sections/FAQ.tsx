import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Cuál es el costo de preinscripción por colegio?',
    answer:
      'El costo de preinscripción es de USD 35 por colegio, que incluye participación en hasta 3 disciplinas. Cada disciplina adicional tiene un costo de USD 10. El pago se realiza mediante transferencia bancaria o canales oficiales del torneo.',
  },
  {
    question: '¿Cuántos jugadores puedo inscribir por equipo?',
    answer:
      'El límite es de 20 jugadores por equipo en fútbol, 12 en baloncesto, 15 en vóley, 10 en natación y 8 en atletismo. Todos los jugadores deben estar matriculados en el colegio representado.',
  },
  {
    question: '¿Qué documentos necesito para inscribir a un jugador?',
    answer:
      'Cada jugador necesita: (1) Foto tamaño pasaporte digital, (2) Certificado médico vigente, (3) Constancia de estudios del colegio, (4) Autorización firmada por el padre o apoderado.',
  },
  {
    question: '¿Puedo modificar mi lista de jugadores después de inscribirlos?',
    answer:
      'Sí, existe un período de modificaciones del 1 al 10 de julio. Después de esa fecha, la lista queda cerrada y no se permiten cambios para garantizar la integridad de la competencia.',
  },
  {
    question: '¿Dónde se juegan los partidos?',
    answer:
      'Las sedes del torneo están distribuidas en Ecuador y se confirman por ciudad, deporte y grupo. Cada colegio recibe su sede oficial junto con el calendario de competencia.',
  },
  {
    question: '¿Cómo recibo la comunicación oficial del torneo?',
    answer:
      'La comunicación oficial se comparte por el canal oficial del torneo y por correo a los delegados registrados. Allí recibirás novedades, avisos importantes, resultados, convocatorias y comunicados del equipo organizador.',
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${
        isOpen
          ? 'border-marathon-red/18 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8F8_100%)] shadow-[0_20px_42px_rgba(226,27,45,0.08)]'
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
