import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Route,
  UsersRound,
  MapPin,
  CalendarDays,
  FileCheck2,
  Trophy,
  Clock3,
  ArrowRight,
} from 'lucide-react';
import EcuadorVenueMap from '@/components/venues/EcuadorVenueMap';
import VENUES, { VENUE_REGION_OPTIONS, TOURNAMENT_CATEGORIES } from '@/lib/constants/venues';

export default function SedesCalendario() {
  const navigate = useNavigate();
  const [region, setRegion] = useState<typeof VENUE_REGION_OPTIONS[number]>('Todas');
  const [selectedVenueId, setSelectedVenueId] = useState(VENUES[0].id);

  const filtered = useMemo(() => {
    if (region === 'Todas') return VENUES;
    return VENUES.filter((v) => v.region === region);
  }, [region]);

  const selectedVenue = useMemo(() => {
    return filtered.find((v) => v.id === selectedVenueId) ?? filtered[0] ?? null;
  }, [filtered, selectedVenueId]);

  const handleRegionChange = (nextRegion: typeof VENUE_REGION_OPTIONS[number]) => {
    setRegion(nextRegion);

    if (nextRegion === 'Todas') {
      const currentVenue = VENUES.find((venue) => venue.id === selectedVenueId) ?? VENUES[0];
      setSelectedVenueId(currentVenue.id);
      return;
    }

    const firstVenueInRegion = VENUES.find((venue) => venue.region === nextRegion);
    if (firstVenueInRegion) {
      setSelectedVenueId(firstVenueInRegion.id);
    }
  };

  return (
    <section
      id="sedes"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#062a4f,_#0a2640)] py-[clamp(2.5rem,6vw,4.5rem)] text-white"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <span className="inline-flex rounded-full bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white/90">
            SEDES OFICIALES
          </span>
          <h2 className="mt-4 font-montserrat text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em]">
            Sedes y calendario por región
          </h2>
          <p className="mt-4 text-sm text-white/80">
            La Copa Nacional Intercolegial Marathon se activa progresivamente por provincia y sede. Revisa las
            fechas clave de preinscripción, entrega de documentación e inicio estimado de partidos.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 text-sm text-white/80">
            <CalendarDays size={16} />
            <span>Preinscripción nacional abierta desde el 4 de mayo de 2026.</span>
          </div>
          <p className="mt-3 text-xs text-white/70">
            Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/70">Sedes proyectadas</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><MapPin size={16} />10 sedes</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/70">Regiones</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><Route size={16} />3 regiones</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/70">Proceso</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><Trophy size={16} />Camino a la final</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {VENUE_REGION_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleRegionChange(opt)}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  region === opt
                    ? 'bg-white text-[#062a4f]'
                    : 'bg-white/8 text-white/80 hover:bg-white/12'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="text-sm text-white/80">Mostrando {filtered.length} sedes</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <article className="min-w-0 rounded-2xl border border-white/15 bg-white/8 p-3 shadow-[0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-md sm:p-4">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.1em] text-white/70">Mapa de sedes</p>
                <h3 className="font-montserrat text-lg font-black">Selecciona tu sede</h3>
              </div>
              <span className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">Vista referencial</span>
            </div>

            <EcuadorVenueMap
              venues={filtered}
              selectedVenueId={selectedVenue?.id ?? selectedVenueId}
              onSelectVenue={setSelectedVenueId}
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {filtered.map((venue) => (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => setSelectedVenueId(venue.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    selectedVenue?.id === venue.id
                      ? 'bg-marathon-red text-white'
                      : 'bg-white/10 text-white/85 hover:bg-white/15'
                  }`}
                >
                  {venue.displayName}
                </button>
              ))}
            </div>
          </article>

          <article className="min-w-0 rounded-2xl bg-white p-4 text-[#062a4f] shadow-[0_20px_50px_rgba(2,6,23,0.35)] sm:p-5">
            {selectedVenue ? (
              <>
                <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className="inline-flex max-w-full rounded-full bg-[#ecf2ff] px-2.5 py-1 text-xs font-bold text-marathon-blue">
                      {selectedVenue.statusLabel}
                    </span>
                    <h3 className="mt-2 break-words font-montserrat text-xl font-black">{selectedVenue.displayName}</h3>
                    <p className="mt-1 text-sm text-[#475569]">
                      {selectedVenue.region}
                    </p>
                  </div>
                  <div className="w-fit rounded-full border border-[#dbe5f2] px-3 py-1 text-xs font-semibold">
                    {selectedVenue.city}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div className="min-w-0 rounded-xl bg-[#f8fafc] p-3">
                    <p className="flex min-w-0 items-start gap-1 text-xs font-semibold leading-snug text-[#334155]"><CalendarDays size={13} className="mt-0.5 shrink-0" /> <span className="min-w-0 break-words">Inicio preinscripción</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.preRegistrationStart}</p>
                  </div>
                  <div className="min-w-0 rounded-xl bg-[#f8fafc] p-3">
                    <p className="flex min-w-0 items-start gap-1 text-xs font-semibold leading-snug text-[#334155]"><Clock3 size={13} className="mt-0.5 shrink-0" /> <span className="min-w-0 break-words">Límite preinscripción</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.preRegistrationDeadline}</p>
                  </div>
                  <div className="min-w-0 rounded-xl bg-[#f8fafc] p-3">
                    <p className="flex min-w-0 items-start gap-1 text-xs font-semibold leading-snug text-[#334155]"><FileCheck2 size={13} className="mt-0.5 shrink-0" /> <span className="min-w-0 break-words">Entrega documentación</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.documentationDeadline}</p>
                  </div>
                  <div className="min-w-0 rounded-xl bg-[#f8fafc] p-3">
                    <p className="flex min-w-0 items-start gap-1 text-xs font-semibold leading-snug text-[#334155]"><UsersRound size={13} className="mt-0.5 shrink-0" /> <span className="min-w-0 break-words">Inicio estimado</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.matchStart}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#334155]">Etapas</p>
                  <div className="mt-2 space-y-2">
                    {selectedVenue.stages.map((stage) => (
                      <div key={stage.label} className="grid gap-1 rounded-xl border border-[#e2e8f0] px-3 py-2 sm:flex sm:items-center sm:gap-2">
                        <span
                          className={`hidden h-2.5 w-2.5 rounded-full sm:block ${
                            stage.status === 'active'
                              ? 'bg-marathon-red'
                              : stage.status === 'upcoming'
                                ? 'bg-marathon-blue'
                                : 'bg-[#64748b]'
                          }`}
                        />
                        <p className="text-sm font-semibold">{stage.label}</p>
                        <p className="text-xs text-[#64748b] sm:ml-auto">{stage.dateLabel}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#334155]">Categorías proyectadas</p>
                    <p className="text-xs text-[#64748b]">{selectedVenue.categories.length} categorías</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TOURNAMENT_CATEGORIES.map((category) => (
                      <span key={category} className="rounded-full bg-[#ecf2ff] px-2 py-1 text-xs font-semibold text-marathon-blue">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                  {selectedVenue.note}
                </div>

                <button
                  onClick={() => navigate('/inscripciones')}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-marathon-red px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(226,27,45,0.26)] transition hover:scale-[1.01]"
                >
                  Preinscribir colegio <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <p className="text-sm text-[#334155]">No hay sedes disponibles para el filtro seleccionado.</p>
            )}
          </article>
        </div>

        <div className="mt-8 text-xs text-white/70">
          Las fechas publicadas corresponden a la planificación inicial del torneo y pueden estar sujetas a ajustes por calendario escolar, disponibilidad de escenarios, logística deportiva, condiciones climáticas, seguridad, fuerza mayor o disposiciones de la organización. La preinscripción no representa todavía la confirmación definitiva de participación. La aceptación final dependerá de validación institucional, cupos disponibles, categorías habilitadas y cumplimiento de requisitos.
        </div>
      </div>
    </section>
  );
}
