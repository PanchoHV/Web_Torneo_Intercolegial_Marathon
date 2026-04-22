import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function CTAFinal() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.cta-content', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] flex items-center justify-center gradient-cta sports-lines-pattern overflow-hidden"
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      <div className="cta-content relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-montserrat font-black text-marathon-blue uppercase tracking-[0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] mb-4">
          ¿LISTO PARA COMPETIR?
        </h2>
        <p className="font-inter text-marathon-blue/85 text-base sm:text-xl leading-relaxed mb-8 sm:mb-10">
          Inscribe a tu colegio hoy y asegura tu lugar en la Copa Nacional Marathon Intercolegial 2026. Los cupos son limitados.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/inscripciones')}
            className="w-full sm:w-auto justify-center bg-marathon-red text-white font-montserrat font-bold rounded-full px-7 sm:px-10 py-3.5 sm:py-4 shadow-button hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg"
          >
            Inscribir mi Colegio Ahora <ArrowRight size={20} />
          </button>
          <button
            onClick={() => handleNavClick('#comunicacion')}
            className="w-full sm:w-auto justify-center bg-marathon-green text-white font-montserrat font-bold rounded-full px-7 sm:px-10 py-3.5 sm:py-4 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 text-base sm:text-lg shadow-[0_12px_28px_rgba(7,150,105,0.28)]"
          >
            <MessageCircle size={20} /> Contactar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
