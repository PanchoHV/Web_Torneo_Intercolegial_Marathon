import { useMemo } from 'react';

import { Container } from '@/components/ui/container';
import { textures } from '@/lib/assets/textures';
import { SectionLabel } from '@/components/ui/section-label';
import { Surface } from '@/components/ui/surface';
import { VENUES } from '@/lib/constants/venues';

const MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

/** "4 de mayo de 2026" → Date. Devuelve null si el formato no calza. */
function parseVenueDate(value: string) {
  const match = /^(\d{1,2}) de ([a-záéíóú]+) de (\d{4})$/i.exec(value.trim());

  if (!match) return null;

  const month = MONTHS[match[2].toLowerCase()];

  if (month === undefined) return null;

  return new Date(Number(match[3]), month, Number(match[1]));
}

type Milestone = { id: string; label: string; date: string; note: string };

/**
 * FECHAS CLAVE.
 *
 * Los hitos NO se hardcodean: se derivan del calendario real de VENUES, así
 * que si una sede mueve su fecha el bloque se actualiza solo. Se muestran los
 * extremos del calendario nacional porque cada sede tiene el suyo propio.
 */
export default function RegistrationKeyDatesSection() {
  const milestones = useMemo<Milestone[]>(() => {
    const pick = (
      field: 'preRegistrationStart' | 'preRegistrationDeadline' | 'matchStart',
      edge: 'min' | 'max'
    ) => {
      const dated = VENUES.map((venue) => ({ raw: venue[field], date: parseVenueDate(venue[field]) }))
        .filter((entry): entry is { raw: string; date: Date } => entry.date !== null)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      if (dated.length === 0) return null;

      return edge === 'min' ? dated[0] : dated[dated.length - 1];
    };

    const entries: Array<Milestone | null> = [
      (() => {
        const value = pick('preRegistrationStart', 'min');
        return value
          ? {
              id: 'apertura',
              label: 'Apertura de inscripciones',
              date: value.raw,
              note: 'Inicio del periodo nacional.',
            }
          : null;
      })(),
      (() => {
        const value = pick('preRegistrationDeadline', 'min');
        return value
          ? {
              id: 'primer-cierre',
              label: 'Primer cierre por sede',
              date: value.raw,
              note: 'La sede con el calendario más temprano.',
            }
          : null;
      })(),
      (() => {
        const value = pick('matchStart', 'min');
        return value
          ? {
              id: 'inicio-partidos',
              label: 'Inicio de partidos',
              date: value.raw,
              note: 'Arranque de la primera sede en competencia.',
            }
          : null;
      })(),
      (() => {
        const value = pick('preRegistrationDeadline', 'max');
        return value
          ? {
              id: 'ultimo-cierre',
              label: 'Último cierre por sede',
              date: value.raw,
              note: 'Fin del periodo de inscripción a nivel nacional.',
            }
          : null;
      })(),
    ];

    return entries.filter((entry): entry is Milestone => entry !== null);
  }, []);

  if (milestones.length === 0) return null;

  return (
    <section
      id="registration-key-dates"
      aria-labelledby="registration-key-dates-title"
      className="relative overflow-hidden py-[clamp(2.5rem,4.5vw,4rem)] text-marathon-navy"
    >
      {/* Refuerzo de timeline. Fuera de la fila de tarjetas: nunca cruza
          fechas, labels ni iconos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
        <img
          src={textures.copaStamp}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -left-16 -top-8 w-[clamp(120px,16vw,250px)] rotate-[12deg] opacity-[0.05] md:-left-14 md:-top-10 md:opacity-[0.06]"
        />
      </div>
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="blue">Fechas clave</SectionLabel>
        <h2
          id="registration-key-dates-title"
          className="mt-3 font-normal uppercase leading-[0.9] text-marathon-navy"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
          }}
        >
          Fechas clave
        </h2>

        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone) => (
            <li key={milestone.id}>
              <Surface
                variant="paper"
                className="h-full rounded-2xl border-marathon-navy/10 bg-white/75 p-5"
              >
                <div aria-hidden="true" className="h-[3px] w-10 rounded-full bg-marathon-red/70" />
                <p
                  className="mt-3 font-normal uppercase leading-[0.95] text-marathon-navy"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                    fontSize: 'clamp(1.4rem, 1.9vw, 1.9rem)',
                  }}
                >
                  {milestone.date}
                </p>
                <h3 className="mt-2 font-montserrat text-[0.68rem] font-black uppercase tracking-[0.14em] text-marathon-navy">
                  {milestone.label}
                </h3>
                <p className="mt-1.5 text-[0.82rem] leading-6 text-marathon-gray">
                  {milestone.note}
                </p>
              </Surface>
            </li>
          ))}
        </ol>

        <p className="mt-5 max-w-[52rem] text-[0.8rem] leading-6 text-marathon-gray/85">
          Cada sede tiene su propio calendario. Consulta las fechas exactas de tu
          ciudad en la página de sedes.
        </p>
      </Container>
    </section>
  );
}
