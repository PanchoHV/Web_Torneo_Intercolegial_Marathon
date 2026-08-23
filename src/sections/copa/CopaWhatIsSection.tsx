import { Shield, TrendingUp, Users } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { textures } from '@/lib/assets/textures';

const RED = '#E21B2D';
const BEBAS = '"Bebas Neue", sans-serif';

const pillars = [
  {
    icon: Shield,
    title: ['COMPETENCIA', 'NACIONAL'],
    text: 'Un torneo con alcance en todo el país que reúne a colegios públicos y privados en igualdad de condiciones.',
  },
  {
    icon: Users,
    title: ['HISTORIAS QUE', 'UNEN COLEGIOS'],
    text: 'Cada partido es una oportunidad para crear lazos, compartir valores y construir recuerdos inolvidables.',
  },
  {
    icon: TrendingUp,
    title: ['CAMINO AL ALTO', 'RENDIMIENTO'],
    text: 'Impulsamos el desarrollo de jóvenes talentos y los acompañamos en su crecimiento deportivo y personal.',
  },
] as const;

/** Asterisco editorial de 4 puntas usado como acento junto al título. */
function StarAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={RED}
    >
      <path d="M12 0c.6 5.7 2.1 8.1 6.4 9.4L24 12l-5.6 2.6C14.1 15.9 12.6 18.3 12 24c-.6-5.7-2.1-8.1-6.4-9.4L0 12l5.6-2.6C9.9 8.1 11.4 5.7 12 0Z" />
    </svg>
  );
}

export default function CopaWhatIsSection() {
  return (
    <section
      id="que-es-la-copa"
      className="relative isolate overflow-hidden bg-[#F1ECE3] py-[clamp(3.5rem,7vw,5.75rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-60 mix-blend-multiply"
        style={{ backgroundImage: `url(${textures.paperBackground})` }}
      />

      {/* Sello oficial en relieve, cortado por el borde derecho como en la gráfica. */}
      <img
        src={textures.copaStamp}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 hidden h-[280px] w-[280px] -translate-y-1/2 object-contain opacity-[0.12] mix-blend-multiply xl:block"
      />

      <Container className="w-full">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div className="max-w-[30rem]">
            <h2
              className="flex items-start gap-3 text-[clamp(2.1rem,4.2vw,3.15rem)] font-normal uppercase leading-[0.92] text-[#062A4F]"
              style={{ fontFamily: BEBAS }}
            >
              ¿Qué es la Copa?
              <StarAccent className="mt-1 h-5 w-5 shrink-0" />
            </h2>

            <span
              aria-hidden="true"
              className="mt-3 block h-[3px] w-14 bg-[#E21B2D]"
            />

            <div
              className="mt-6 space-y-4 text-[0.95rem] leading-[1.75] text-[#5D6B7C]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <p>
                Somos mucho más que un torneo. Somos el punto de encuentro de
                miles de jóvenes que viven el fútbol con pasión y valores.
              </p>
              <p>
                Promovemos la formación integral dentro y fuera de la cancha,
                fortaleciendo la amistad, el juego limpio y el sentido de
                pertenencia.
              </p>
              <p>
                Con presencia nacional y una organización de primer nivel, la
                Copa es el escenario donde el talento escolar se transforma en
                experiencias que marcan para siempre.
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <li
                  key={pillar.title.join(' ')}
                  className="flex flex-col border border-[#DFD6C4] bg-[#F7F4EE] p-6"
                >
                  <Icon
                    size={30}
                    strokeWidth={1.6}
                    className="text-[#062A4F]"
                    aria-hidden="true"
                  />

                  <h3
                    className="mt-5 text-[1.22rem] font-normal uppercase leading-[1.06] tracking-[0.01em] text-[#062A4F]"
                    style={{ fontFamily: BEBAS }}
                  >
                    {pillar.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  <p
                    className="mt-4 text-[0.86rem] leading-[1.7] text-[#5D6B7C]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {pillar.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
