import { Award, Map, Network, Trophy, Users, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { textures } from '@/lib/assets/textures';

const BEBAS = '"Bebas Neue", sans-serif';
const INTER = 'Inter, sans-serif';
const GOLD = '#D8A84B';


type FormatStep = {
  icon: LucideIcon;
  label: string;
  text: string;
  highlight?: boolean;
};

const steps: readonly FormatStep[] = [
  {
    icon: Map,
    label: 'Regiones',
    text: 'Participan colegios de todas las regiones del país en un sistema organizado por zonas.',
  },
  {
    icon: Users,
    label: 'Fase de grupos',
    text: 'Los equipos compiten dentro de su grupo en partidos de ida o ida y vuelta.',
  },
  {
    icon: Network,
    label: 'Cruces',
    text: 'Los mejores avanzan a la fase eliminatoria con cruces que definen a los clasificados.',
  },
  {
    icon: Trophy,
    label: 'Finales',
    text: 'Las finales se disputan en sedes destacadas con la emoción de grandes definiciones.',
  },
  {
    icon: Award,
    label: 'La Copa',
    text: 'El campeón levanta el trofeo que representa el esfuerzo, la unidad y el orgullo intercolegial.',
    highlight: true,
  },
] as const;

function StarAccent({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="#E21B2D">
      <path d="M12 0c.6 5.7 2.1 8.1 6.4 9.4L24 12l-5.6 2.6C14.1 15.9 12.6 18.3 12 24c-.6-5.7-2.1-8.1-6.4-9.4L0 12l5.6-2.6C9.9 8.1 11.4 5.7 12 0Z" />
    </svg>
  );
}

export default function CopaFormatSection() {
  return (
    <section
      id="formato"
      className="relative isolate overflow-hidden bg-[#0A2A4F] py-[clamp(3.5rem,7vw,5.5rem)] text-white"
    >
      {/* Pizarra táctica: dos instancias posicionadas en vez de un tile,
          para que las marcas lean dispersas y no en cuadrícula. */}
      <img
        src={textures.tacticalRoute}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -left-24 -top-16 -z-10 w-[420px] max-w-none opacity-[0.14]"
      />
      <img
        src={textures.tacticalRoute}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-20 -right-24 -z-10 w-[420px] max-w-none -scale-x-100 opacity-[0.12]"
      />

      <Container className="w-full">
        {/* Titular centrado con estrellas y reglas laterales */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
          <StarAccent className="h-4 w-4 shrink-0" />
          <h2
            className="text-center text-[clamp(1.85rem,3.6vw,2.9rem)] font-normal uppercase leading-none tracking-[0.02em]"
            style={{ fontFamily: BEBAS }}
          >
            Formato del torneo
          </h2>
          <StarAccent className="h-4 w-4 shrink-0" />
          <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
        </div>

        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.label}
                className="relative flex flex-col items-center px-2 text-center"
              >
                {/* Conector punteado hacia el siguiente paso (solo desktop) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-[74px] hidden items-center lg:flex"
                    style={{
                      left: 'calc(50% + 48px)',
                      right: 'calc(-50% + 48px)',
                    }}
                  >
                    <span
                      className="h-px flex-1"
                      style={{
                        backgroundImage: `repeating-linear-gradient(to right, ${GOLD}80 0 6px, transparent 6px 12px)`,
                      }}
                    />
                    <svg
                      viewBox="0 0 8 8"
                      className="h-2 w-2 shrink-0"
                      fill={GOLD}
                      aria-hidden="true"
                    >
                      <path d="M0 0l8 4-8 4z" />
                    </svg>
                  </span>
                )}

                <span
                  className="text-[1.05rem] uppercase leading-none tracking-[0.14em]"
                  style={{ fontFamily: BEBAS, color: GOLD }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={`mt-3 flex h-[76px] w-[76px] items-center justify-center rounded-full border ${
                    step.highlight
                      ? 'border-[#D8A84B] bg-[#D8A84B]/12'
                      : 'border-[#D8A84B]/45'
                  }`}
                >
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    style={{ color: step.highlight ? GOLD : '#FFFFFF' }}
                  />
                </span>

                <h3
                  className="mt-5 text-[1.15rem] font-normal uppercase leading-tight tracking-[0.04em]"
                  style={{ fontFamily: BEBAS }}
                >
                  {step.label}
                </h3>

                <p
                  className="mt-2 max-w-[15rem] text-[0.82rem] leading-[1.65] text-white/62"
                  style={{ fontFamily: INTER }}
                >
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
