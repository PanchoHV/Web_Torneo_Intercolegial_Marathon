import { Container } from '@/components/ui/container';

const R2_BASE = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/';

const WATERMARKS = {
  tactical: `${R2_BASE}optimized-tactical-xo-route.webp`,
  arrow: `${R2_BASE}optimized-flecha%20entre%20cortada.webp`,
} as const;

const features = [
  {
    id: 'live',
    title: 'Partidos en vivo',
    text: 'No te pierdas ni una jugada.',
    icon: `${R2_BASE}optimized-Icono%20Pelota.webp`,
  },
  {
    id: 'teams',
    title: 'Equipos',
    text: 'Encuentra a tu colegio y sigue su camino en la Copa.',
    icon: `${R2_BASE}optimized-Icono%20Jugadores.webp`,
  },
  {
    id: 'results',
    title: 'Resultados',
    text: 'Marcadores y jornadas actualizadas al instante.',
    icon: `${R2_BASE}optimized-Icono%20marcadores.webp`,
  },
  {
    id: 'photos',
    title: 'Fotos',
    text: 'Revive los mejores momentos dentro y fuera de la cancha.',
    icon: `${R2_BASE}optimized-Icono%20fotos.webp`,
  },
  {
    id: 'stories',
    title: 'Historias y noticias',
    text: 'Mantente cerca de todo lo que mueve la Copa.',
    icon: `${R2_BASE}optimized-Icono%20noticias.webp`,
  },
  {
    id: 'calendar',
    title: 'Calendario',
    text: 'Descubre lo que viene y prepárate para el próximo partido.',
    icon: `${R2_BASE}optimized-Icono%20Calendarios.webp`,
  },
] as const;

export default function FanAppFeaturesSection() {
  return (
    <section
      id="fan-app-features"
      aria-labelledby="fan-app-features-title"
      className="relative overflow-hidden py-[clamp(2.75rem,5vw,5rem)] text-[#062A4F]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={WATERMARKS.tactical}
          alt=""
          loading="lazy"
          className="absolute -left-[8%] top-[8%] w-[clamp(8rem,17vw,17rem)] -rotate-6 opacity-[0.09]"
        />
        <img
          src={WATERMARKS.arrow}
          alt=""
          loading="lazy"
          className="absolute -bottom-[6%] right-[6%] hidden w-[clamp(6rem,9vw,9rem)] rotate-[100deg] opacity-[0.10] lg:block"
        />
      </div>

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div aria-hidden="true" className="h-[3px] w-[clamp(2.75rem,5vw,4.5rem)] bg-[#E21B2D]" />

        <div className="mt-[clamp(1.5rem,2.6vw,2.5rem)] grid gap-[clamp(1rem,2.4vw,2.5rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <p className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#E21B2D]">
              Fan App
            </p>
            <h2
              id="fan-app-features-title"
              className="mt-3 max-w-[24ch] font-normal uppercase leading-[0.86] tracking-[-0.01em]"
              style={{
                fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                fontSize: 'clamp(2.35rem, 4.4vw, 4rem)',
              }}
            >
              Todo lo que vives en la Copa, en un solo lugar
            </h2>
          </div>

          <p className="max-w-[34rem] font-inter text-[0.95rem] leading-7 text-[#18344f]/80 lg:pb-2">
            Sigue cada partido, encuentra a tu equipo, revisa resultados y revive los mejores
            momentos desde la Fan App oficial de la Copa.
          </p>
        </div>

        <ul className="mt-[clamp(1.75rem,3.2vw,3rem)] grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.id}>
              <article className="group relative flex h-full items-start gap-4 overflow-hidden rounded-[18px] border border-[#062A4F]/12 bg-white/65 p-4 transition duration-200 hover:-translate-y-1 hover:border-[#062A4F]/25 hover:bg-white hover:shadow-[0_16px_34px_rgba(6,42,79,0.10)] sm:gap-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#E21B2D] transition-transform duration-300 group-hover:scale-x-100"
                />

                <img
                  src={feature.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
                />

                <div className="min-w-0">
                  <h3 className="font-montserrat text-[0.88rem] font-black uppercase leading-tight tracking-[0.06em]">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 font-inter text-[0.84rem] leading-6 text-[#18344f]/75">
                    {feature.text}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
