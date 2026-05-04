import { MapPin } from 'lucide-react';

import type { Venue } from '@/lib/constants/venues';

type EcuadorVenueMapProps = {
  venues: Venue[];
  selectedVenueId: string;
  onSelectVenue: (venueId: string) => void;
};

type LabelPlacement = 'top' | 'right' | 'bottom' | 'left';

type VenuePoint = {
  left: string;
  top: string;
  placement: LabelPlacement;
};

/**
 * Coordenadas calibradas sobre el SVG continental:
 * public/images/ecuador-regiones-sedes.svg
 *
 * Importante:
 * El contenedor del mapa debe mantener aspect-[5/6], que coincide con
 * el viewBox del SVG 1000x1200. Si se cambia el aspect ratio, los pines
 * vuelven a desalinearse.
 */
const VENUE_POINTS: Record<string, VenuePoint> = {
  esmeraldas: {
    left: '29.5%',
    top: '15.7%',
    placement: 'right',
  },

  'manabi-manta': {
    left: '18.4%',
    top: '33.7%',
    placement: 'right',
  },

  'manabi-portoviejo': {
    left: '12.7%',
    top: '41.8%',
    placement: 'right',
  },

  'guayas-guayaquil': {
    left: '19.6%',
    top: '53%',
    placement: 'right',
  },

  'eloro-machala': {
    left: '23.8%',
    top: '73.4%',
    placement: 'top',
  },

   'pichincha-quito': {
    left: '44.7%',
    top: '28.8%',
    placement: 'right',
  },

  'imbabura-ibarra': {
    left: '47.2%',
    top: '19.7%',
    placement: 'right',
  },

  'tungurahua-ambato': {
    left: '42.0%',
    top: '44.1%',
    placement: 'right',
  },

  'azuay-cuenca': {
    left: '33.4%',
    top: '67.5%',
    placement: 'right',
  },

  'napo-tena': {
    left: '52.2%',
    top: '34.8%',
    placement: 'left',
  },
};

function normalizeVenueKey(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\/+/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getVenuePoint(venue: Venue): VenuePoint {
  const direct = VENUE_POINTS[venue.id];

  if (direct) {
    return direct;
  }

  const normalizedName = normalizeVenueKey(venue.displayName);
  const fromDisplayName = VENUE_POINTS[normalizedName];

  if (fromDisplayName) {
    return fromDisplayName;
  }

  const province = normalizeVenueKey(venue.province);
  const city = normalizeVenueKey(venue.city);
  const combined = `${province}-${city}`;
  const fromCombined = VENUE_POINTS[combined];

  if (fromCombined) {
    return fromCombined;
  }

  return {
    left: '50%',
    top: '50%',
    placement: 'right',
  };
}

function getRegionColor(region: Venue['region']) {
  if (region === 'Costa') return 'bg-[#19bfff] border-[#b8ecff]';
  if (region === 'Sierra') return 'bg-[#ff4d4f] border-[#ffd0d2]';
  return 'bg-[#4ade80] border-[#d4f8df]';
}

function getRegionDot(region: Venue['region']) {
  if (region === 'Costa') return 'bg-[#19bfff]';
  if (region === 'Sierra') return 'bg-[#ff4d4f]';
  return 'bg-[#4ade80]';
}

function getLabelPlacementClasses(placement: LabelPlacement) {
  if (placement === 'top') {
    return 'bottom-full left-1/2 mb-3 -translate-x-1/2';
  }

  if (placement === 'bottom') {
    return 'left-1/2 top-full mt-3 -translate-x-1/2';
  }

  if (placement === 'left') {
    return 'right-full top-1/2 mr-3 -translate-y-1/2';
  }

  return 'left-full top-1/2 ml-3 -translate-y-1/2';
}

export default function EcuadorVenueMap({
  venues,
  selectedVenueId,
  onSelectVenue,
}: EcuadorVenueMapProps) {
  return (
    <div className="relative rounded-[1.35rem] border border-white/75 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.26),transparent_32%),linear-gradient(135deg,rgba(4,34,67,0.92),rgba(6,58,92,0.82))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] sm:p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem]">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="absolute left-1 top-1 z-20 flex flex-wrap gap-2 sm:left-0 sm:top-0">
          {(['Costa', 'Sierra', 'Amazonía'] as const).map((region) => (
            <span
              key={region}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#062a4f]/75 px-2.5 py-1 text-[0.68rem] font-bold text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            >
              <span className={`h-2 w-2 rounded-full ${getRegionDot(region)}`} />
              {region}
            </span>
          ))}
        </div>

        <div className="relative mx-auto aspect-[5/6] min-h-[320px] max-h-[600px] w-full max-w-[500px] sm:min-h-[390px]">
          <img
            src="/images/ecuador-regiones-sedes.svg"
            alt="Mapa referencial de Ecuador por regiones"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_22px_42px_rgba(0,0,0,0.28)]"
            draggable={false}
          />

          {venues.map((venue) => {
            const point = getVenuePoint(venue);
            const isActive = venue.id === selectedVenueId;
            const labelClasses = getLabelPlacementClasses(point.placement);

            return (
              <button
                key={venue.id}
                type="button"
                aria-label={`Seleccionar sede ${venue.displayName}`}
                title={venue.displayName}
                onClick={() => onSelectVenue(venue.id)}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 hover:z-[85] focus-visible:z-[85] ${
                  isActive ? 'z-[85]' : 'z-30'
                }`}
                style={{
                  left: point.left,
                  top: point.top,
                }}
              >
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-200 sm:h-8 sm:w-8 ${
                    isActive
                      ? 'scale-125 border-white bg-marathon-red text-white ring-4 ring-white/35'
                      : `${getRegionColor(venue.region)} text-white hover:scale-110`
                  }`}
                >
                  <MapPin size={14} strokeWidth={3} />
                  {isActive && (
                    <span className="absolute inset-[-8px] rounded-full border border-white/70 opacity-80" />
                  )}
                </span>

                <span
                  className={`pointer-events-none absolute z-[100] w-[168px] rounded-xl border border-white/15 bg-[#062a4f]/95 px-3 py-2 text-left text-[0.68rem] leading-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.42)] backdrop-blur-md transition-opacity duration-200 ${
                    isActive ? 'hidden opacity-100 sm:block' : 'hidden opacity-0'
                  } ${labelClasses}`}
                >
                  <strong className="block text-[0.74rem] leading-snug">
                    {venue.displayName}
                  </strong>
                  <span className="mt-0.5 block text-white/72">
                    {venue.statusLabel}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-20 mt-3 rounded-2xl border border-white/10 bg-[#031b34]/72 px-3 py-2 text-xs leading-relaxed text-white/72">
          <strong className="text-white">Mapa regional referencial.</strong>{' '}
          Selecciona una sede para ver fechas, etapas y calendario correspondiente.
        </div>
      </div>
    </div>
  );
}
