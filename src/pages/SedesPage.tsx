import { useCallback, useMemo, useState } from 'react';

import { textures } from '@/lib/assets/textures';
import {
  DEFAULT_FEATURED_VENUE_ID,
  FALLBACK_FEATURED_CONTENT,
  FEATURED_VENUE_CONTENT,
  VENUE_FAQ_DESCRIPTION,
  VENUE_FAQ_ITEMS,
  type FeaturedVenue,
} from '@/lib/constants/sedesPage';
import { VENUES } from '@/lib/constants/venues';
import FaqSection from '@/sections/home/FaqSection';
import FeaturedVenueSection from '@/sections/sedes/FeaturedVenueSection';
import SedesExplorerSection from '@/sections/sedes/SedesExplorerSection';
import SedesHeroSection from '@/sections/sedes/SedesHeroSection';
import VenueInfoSection from '@/sections/sedes/VenueInfoSection';

/**
 * Página /sedes.
 *
 * Header y Footer los aporta PublicLayout — aquí no se replica markup global.
 *
 * La página es el único dueño de `selectedVenueId`: el mapa, el listado, la
 * sede destacada y la información útil leen de ese mismo estado, así que
 * seleccionar un marcador o una fila actualiza todo el bloque inferior.
 *
 * El calendario del torneo vive dentro de la Fan App, así que /sedes no monta
 * un módulo de acceso rápido propio.
 */
export default function SedesPage() {
  const [selectedVenueId, setSelectedVenueId] = useState(DEFAULT_FEATURED_VENUE_ID);

  const handleSelectVenue = useCallback((venueId: string) => {
    setSelectedVenueId(venueId);
  }, []);

  const featuredVenue = useMemo<FeaturedVenue>(() => {
    const venue = VENUES.find((item) => item.id === selectedVenueId) ?? VENUES[0];
    const editorial = FEATURED_VENUE_CONTENT[venue.id] ?? FALLBACK_FEATURED_CONTENT;

    return { ...venue, ...editorial };
  }, [selectedVenueId]);

  return (
    <div
      data-page="sedes"
      className="relative text-marathon-navy"
      style={{
        backgroundColor: '#F4F8FC',
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 18%), url('${textures.paperBackground}')`,
        backgroundRepeat: 'repeat, repeat',
        backgroundPosition: 'center top, center top',
        backgroundSize: 'auto, 700px auto',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,27,45,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,80,164,0.05),transparent_26%)]"
      />

      <div className="relative">
        <SedesHeroSection />

        <SedesExplorerSection
          venues={VENUES}
          selectedVenueId={selectedVenueId}
          onSelectVenue={handleSelectVenue}
        />

        <FeaturedVenueSection venue={featuredVenue} />

        <VenueInfoSection venue={featuredVenue} />

        {/* Presentación del Home, contenido propio de Sedes. */}
        <FaqSection
          id="faq-sedes"
          items={[...VENUE_FAQ_ITEMS]}
          description={VENUE_FAQ_DESCRIPTION}
        />
      </div>
    </div>
  );
}
