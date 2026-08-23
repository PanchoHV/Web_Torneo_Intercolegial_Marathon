import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import VENUES from '@/lib/constants/venues';

type PreviewRegion = {
  title: 'Costa' | 'Sierra' | 'Oriente';
  sourceRegion: 'Costa' | 'Sierra' | 'Amazonía';
  mapSrc: string;
  stadiumSrc: string;
  accent: string;
};

const PREVIEW_REGIONS: PreviewRegion[] = [
  {
    title: 'Costa',
    sourceRegion: 'Costa',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_Costa.webp',
    stadiumSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Estadio_costa.webp',
    accent: 'bg-cyan-300',
  },
  {
    title: 'Sierra',
    sourceRegion: 'Sierra',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_Sierra.webp',
    stadiumSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Estadio%20Sierra.webp',
    accent: 'bg-sky-300',
  },
  {
    title: 'Oriente',
    sourceRegion: 'Amazonía',
    mapSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Map_oriente.webp',
    stadiumSrc: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Estadio%20Oriente.webp',
    accent: 'bg-emerald-300',
  },
];

function getRegionVenues(sourceRegion: PreviewRegion['sourceRegion']) {
  return VENUES.filter((venue) => venue.region === sourceRegion);
}

function formatVenueLine(sourceRegion: PreviewRegion['sourceRegion']) {
  const venues = getRegionVenues(sourceRegion);
  const names = venues.slice(0, 3).map((venue) => venue.city);
  const extra = venues.length - names.length;
  return extra > 0 ? `${names.join(' · ')} +${extra}` : names.join(' · ');
}

export default function VenuesByRegionSection() {
  return (
    <section
      id="sedes-preview"
      className="relative overflow-hidden bg-[#efe4d2] py-[clamp(2.75rem,4.6vw,4.25rem)] text-marathon-navy"
    >
      <style>
        {`
          #sedes-preview .sedes-preview-layout {
            display: grid;
            gap: clamp(1.25rem, 2.5vw, 2.5rem);
          }

          #sedes-preview .sedes-preview-cards {
            display: grid;
            gap: 1rem;
          }

          #sedes-preview .poster-card {
            transform-origin: 50% 12%;
            will-change: transform;
            transition:
              transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          @media (hover: hover) and (pointer: fine) {
            #sedes-preview .poster-card:hover {
              animation: sedes-poster-sway 900ms ease-in-out 1;
              box-shadow: 0 24px 50px rgba(6, 34, 77, 0.14);
            }
          }

          @keyframes sedes-poster-sway {
            0% {
              transform: translateY(0) rotate(0deg) translateX(0);
            }

            20% {
              transform: translateY(-5px) rotate(-1.15deg) translateX(-3px);
            }

            48% {
              transform: translateY(-6px) rotate(1.1deg) translateX(3px);
            }

            72% {
              transform: translateY(-4px) rotate(-0.7deg) translateX(-1px);
            }

            100% {
              transform: translateY(0) rotate(0deg) translateX(0);
            }
          }

          @media (min-width: 768px) {
            #sedes-preview .sedes-preview-cards {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (min-width: 1280px) {
            #sedes-preview .sedes-preview-layout {
              grid-template-columns: clamp(13rem, 15vw, 15.5rem) minmax(0, 1fr);
              gap: clamp(1.75rem, 3vw, 3rem);
            }

            #sedes-preview .sedes-preview-cards {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 1.25rem;
            }
          }
        `}
      </style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,34,77,0.12),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(6,34,77,0.16)_0.7px,transparent_0.7px)] [background-size:18px_18px]"
      />

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="sedes-preview-layout items-start">
          <div className="max-w-[16rem] pt-0.5">
            <p className="font-montserrat text-[11px] font-black uppercase tracking-[0.28em] text-marathon-red">
              SEDES
            </p>
            <h2
              className="mt-3 font-normal uppercase leading-[0.85] text-marathon-navy"
              style={{
                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                fontSize: 'clamp(2.4rem, 3.3vw, 3.3rem)',
              }}
            >
              <span className="block">POR REGIÓN</span>
            </h2>
            <p className="mt-3 max-w-[15rem] text-[0.88rem] leading-6 text-marathon-navy/82">
              Partidos, emociones y talento en las mejores sedes del país.
            </p>

            <Link
              to="/sedes"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-marathon-navy/25 px-3.5 py-2 text-[0.7rem] font-black uppercase tracking-[0.14em] text-marathon-navy transition-transform hover:scale-[1.02] motion-reduce:transition-none"
            >
              Ver todas las sedes <ArrowRight size={14} />
            </Link>
          </div>
          <div className="sedes-preview-cards">
            {PREVIEW_REGIONS.map((region) => {
              const venueLine = formatVenueLine(region.sourceRegion);

              return (
                <article
                  key={region.title}
                  className="poster-card group relative overflow-hidden rounded-[18px] border border-marathon-navy/10 bg-[#07182f] shadow-[0_14px_32px_rgba(6,34,77,0.1)] motion-reduce:transform-none motion-reduce:transition-none"
                  style={{ height: '196px' }}
                >
                  <img
                    src={region.stadiumSrc}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,15,30,0.06)_0%,rgba(3,15,30,0.18)_34%,rgba(3,15,30,0.38)_58%,rgba(3,15,30,0.88)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_0%,transparent_48%,rgba(255,255,255,0.04)_100%)]" />

                  <div
                    className={`absolute right-3 top-3 opacity-95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.28)] ${
                      region.title === 'Oriente' ? 'h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]' : 'h-[60px] w-[60px] sm:h-[68px] sm:w-[68px]'
                    }`}
                  >
                    <img
                      src={region.mapSrc}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className={`absolute left-0 top-0 h-full w-1 ${region.accent}`} />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-[1.15rem]">
                    <p
                      className="text-[9px] font-black uppercase tracking-[0.24em] text-[#fbf7ef]/85"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
                    >
                      REGIÓN
                    </p>
                    <h3
                      className="mt-0.5 max-w-[11rem] font-normal uppercase leading-[0.82] text-[#fbf7ef]"
                      style={{
                        fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                        fontSize: 'clamp(2.15rem, 3.1vw, 3rem)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                      }}
                    >
                      {region.title}
                    </h3>
                    <p
                      className="mt-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#d8a84b]"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
                    >
                      Sedes disponibles
                    </p>
                    <p
                      className="mt-1.5 flex max-w-[14rem] items-start gap-1.5 text-[0.84rem] leading-[1.35] text-[#fff8ef]"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
                    >
                      <MapPin size={13} className="mt-[2px] shrink-0 text-[#d8a84b]" />
                      {venueLine}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
