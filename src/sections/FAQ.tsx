import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Cuál es el costo de inscripción por colegio?',
    answer:
      'El costo de inscripción es de USD 35 por colegio, que incluye participación en hasta 3 disciplinas. Cada disciplina adicional tiene un costo de USD 10. El pago se realiza mediante transferencia bancaria o canales oficiales del torneo.',
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
      'Cada colegio tiene un grupo exclusivo de WhatsApp donde enviamos toda la comunicación oficial: cambios de horario, resultados, convocatorias y comunicados importantes. También enviamos emails a los delegados registrados.',
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
    <div className="bg-marathon-cream rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-inter font-semibold text-marathon-blue">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-marathon-gray shrink-0 transition-transform duration-400 ${
            isOpen ? 'rotate-180' : ''
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
        <div className="px-5 pb-5 font-inter text-marathon-gray leading-relaxed">
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
      className="bg-white"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
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
