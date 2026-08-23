import { CalendarDays, MapPin, Navigation, Users } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import type { FeaturedVenue } from '@/lib/constants/sedesPage';

type VenueInfoSectionProps = {
  venue: FeaturedVenue;
};

/**
 * INFORMACIÓN ÚTIL de la sede seleccionada.
 *
 * Cards editoriales compactas sobre PAPER: borde fino, iconografía navy.
 * Un solo markup para las cuatro tarjetas — el contenido se deriva de la data.
 */
export default function VenueInfoSection({ venue }: VenueInfoSectionProps) {
  const cards = [
    {
      id: 'direccion',
      icon: Navigation,
      title: 'Dirección',
      // PENDIENTE: la dirección exacta por sede no está confirmada.
      content: venue.address ?? 'Dirección por confirmar con la organización.',
    },
    {
      id: 'ciudad',
      icon: MapPin,
      title: 'Ciudad',
      content: `${venue.city}, provincia de ${venue.province} · Región ${venue.region}`,
    },
    {
      id: 'fechas',
      icon: CalendarDays,
      title: 'Fechas',
      content: `Inscripción hasta el ${venue.preRegistrationDeadline}. Inicio de partidos: ${venue.matchStart}.`,
    },
    {
      id: 'categorias',
      icon: Users,
      title: 'Categorías',
      content: venue.categories.join(' · '),
    },
  ];

  return (
    // scroll-mt: el header global es fixed, sin ese margen el título quedaría debajo.
    <section
      id="venue-information"
      aria-labelledby="informacion-sede-title"
      className="relative scroll-mt-[calc(var(--header-height)+1.5rem)] py-[clamp(2rem,3.6vw,3.25rem)] text-marathon-navy"
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="blue">Información útil</SectionLabel>
        <h2
          id="informacion-sede-title"
          className="mt-3 font-normal uppercase leading-[0.9] text-marathon-navy"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: 'clamp(1.9rem, 2.9vw, 2.9rem)',
          }}
        >
          Información útil — {venue.city}
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Surface
                key={card.id}
                variant="paper"
                className="flex gap-3 rounded-[18px] border-marathon-border-subtle bg-white/70 p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-marathon-navy/15 bg-marathon-navy/[0.05] text-marathon-navy"
                >
                  <Icon size={17} strokeWidth={2.2} />
                </span>

                <div className="min-w-0">
                  <h3 className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.16em] text-marathon-navy">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[0.83rem] leading-6 text-marathon-gray">
                    {card.content}
                  </p>
                </div>
              </Surface>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
