import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import { VENUE_QUICK_ACCESS } from '@/lib/constants/sedesPage';

/**
 * ACCESO RÁPIDO: calendario y Fan App.
 *
 * La Fan App es PWA/Web App: se enlaza la ruta interna, sin botones de tiendas.
 */
export default function VenueQuickAccessSection() {
  return (
    <section
      id="acceso-rapido-sedes"
      aria-labelledby="acceso-rapido-sedes-title"
      className="relative py-[clamp(2rem,3.6vw,3.25rem)] text-marathon-navy"
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="red">Acceso rápido</SectionLabel>
        <h2 id="acceso-rapido-sedes-title" className="sr-only">
          Acceso rápido
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {VENUE_QUICK_ACCESS.map((panel) => (
            <Surface
              key={panel.id}
              variant="paper"
              className="flex flex-col rounded-[22px] border-marathon-border-subtle bg-white/70 p-[clamp(1.25rem,2vw,1.75rem)]"
            >
              <h3
                className="font-normal uppercase leading-[0.92] text-marathon-navy"
                style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(1.6rem, 2.3vw, 2.3rem)',
                }}
              >
                {panel.title}
              </h3>

              <p className="mt-3 max-w-[42ch] flex-1 text-[0.9rem] leading-7 text-marathon-gray">
                {panel.description}
              </p>

              <Link
                to={panel.to}
                className="group mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-marathon-navy px-5 py-2.5 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-marathon-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red"
              >
                {panel.ctaLabel}
                <ArrowRight
                  size={14}
                  strokeWidth={2.8}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Surface>
          ))}
        </div>
      </Container>
    </section>
  );
}
