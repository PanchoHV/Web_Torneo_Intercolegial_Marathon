import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import { VENUE_FAQ_ITEMS } from '@/lib/constants/sedesPage';

/**
 * Franja compacta de FAQ acotada a dudas de sedes.
 *
 * No es un segundo sistema de FAQ: reutiliza el patrón <details> ya usado en
 * el home y enlaza al FAQ global para el resto de preguntas.
 */
export default function VenueFaqSection() {
  return (
    <section
      id="faq-sedes"
      aria-labelledby="faq-sedes-title"
      className="relative py-[clamp(2rem,3.6vw,3.25rem)] text-marathon-navy"
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel tone="blue">Preguntas frecuentes</SectionLabel>
            <h2
              id="faq-sedes-title"
              className="mt-3 font-normal uppercase leading-[0.9] text-marathon-navy"
              style={{
                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                fontSize: 'clamp(1.9rem, 2.9vw, 2.9rem)',
              }}
            >
              Preguntas frecuentes
            </h2>
          </div>

          <Link
            to="/faq"
            className="group inline-flex items-center gap-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.12em] text-marathon-navy transition-colors duration-200 hover:text-marathon-red"
          >
            Ver todas las preguntas
            <span
              aria-hidden="true"
              className="text-marathon-red transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <Surface
          variant="paper"
          className="mt-5 overflow-hidden rounded-[22px] border-marathon-border-subtle bg-white/70"
        >
          {VENUE_FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group border-b border-marathon-border-subtle last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 outline-none transition-colors duration-200 hover:bg-marathon-navy/[0.035] focus-visible:bg-marathon-navy/[0.05] [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 font-montserrat text-[0.8rem] font-black uppercase leading-snug tracking-[0.06em] text-marathon-navy">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-navy/15 bg-marathon-navy/[0.04] text-marathon-navy transition-transform duration-200 group-open:rotate-180"
                >
                  <ChevronDown size={16} strokeWidth={2.4} />
                </span>
              </summary>

              <p className="max-w-[62ch] px-5 pb-4 text-[0.88rem] leading-7 text-marathon-gray">
                {item.answer}
              </p>
            </details>
          ))}
        </Surface>
      </Container>
    </section>
  );
}
