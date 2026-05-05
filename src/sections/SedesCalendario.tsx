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

// Fondo deportivo premium (R2)
const SEDES_BACKGROUND_URL =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT%20Image%205%20may%202026%2C%2012_07_13%20p.webp';

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
        className="relative overflow-hidden bg-[#04192e] py-[clamp(3rem,7vw,5rem)] text-white"
    >
        {/* Background image layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url(${SEDES_BACKGROUND_URL})` }}
        />
        {/* Dark overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-[#021d34]/80" />
        {/* Radial accent gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,111,235,0.28),transparent_40%)]"
        />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
        <div className="mx-auto max-w-[860px] text-center">
            <span className="relative z-10 inline-flex rounded-full bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-marathon-red">
            SEDES OFICIALES
          </span>
            <h2 className="relative z-10 mt-5 font-montserrat text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[0.02em]">
            Sedes y calendario por región
          </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85">
            La Copa Nacional Intercolegial Marathon se activa progresivamente por provincia y sede. Revisa las
            fechas clave de preinscripción, entrega de documentación e inicio estimado de partidos.
          </p>

            <div className="relative z-10 mt-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md">
            <CalendarDays size={16} />
              <span className="text-xs font-semibold sm:text-sm">Preinscripción nacional abierta desde el 4 de mayo de 2026.</span>
          </div>
            <p className="relative z-10 mt-3 text-xs text-white/65">
            Cada provincia tiene fechas específicas según su calendario regional y planificación deportiva.
          </p>
        </div>

          {/* Mini Metrics */}
          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-white/[0.1]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Sedes proyectadas</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><MapPin size={16} />10 sedes</p>
          </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-white/[0.1]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Regiones</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><Route size={16} />3 regiones</p>
          </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-white/[0.1]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Proceso</p>
            <p className="mt-1 flex items-center gap-2 text-base font-black"><Trophy size={16} />Camino a la final</p>
          </div>
            <div className="hidden rounded-[20px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-white/[0.1] md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Torneo</p>
              <p className="mt-1 flex items-center gap-2 text-base font-black"><Trophy size={16} />Nacional</p>
            </div>
        </div>

          {/* Filters and Counter */}
          <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
            {VENUE_REGION_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleRegionChange(opt)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  region === opt
                      ? 'bg-marathon-red text-white shadow-[0_10px_24px_rgba(237,28,36,0.28)]'
                      : 'border border-white/10 bg-white/[0.06] text-white/85 hover:bg-white/12'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

            <div className="text-sm font-semibold text-white/75">Mostrando {filtered.length} sedes</div>
        </div>

          {/* Main Content Grid */}
          <div className="relative z-10 mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(370px,0.92fr)]">
            {/* Left Panel - Map */}
            <article className="min-w-0 rounded-[30px] border border-white/10 bg-[#082f5c]/70 p-4 shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-5 lg:p-6">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">Mapa de sedes</p>
                  <h3 className="mt-1 font-montserrat text-xl font-black">Selecciona tu sede</h3>
              </div>
                <span className="w-fit rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80">Vista referencial</span>
            </div>

            <EcuadorVenueMap
              venues={filtered}
              selectedVenueId={selectedVenue?.id ?? selectedVenueId}
              onSelectVenue={setSelectedVenueId}
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {filtered.map((venue) => (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => setSelectedVenueId(venue.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedVenue?.id === venue.id
                      ? 'bg-marathon-red text-white shadow-[0_10px_24px_rgba(237,28,36,0.28)]'
                      : 'border border-white/10 bg-white/[0.06] text-white/85 hover:bg-white/15'
                  }`}
                >
                  {venue.displayName}
                </button>
              ))}
            </div>
          </article>

          {/* Right Panel - Detail Card */}
          <article className="min-w-0 rounded-[30px] border border-white/70 bg-[#f8fbff] p-5 text-[#062a4f] shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:p-6 lg:p-7">
            {selectedVenue ? (
              <>
                <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className="inline-flex max-w-full rounded-full bg-[#ecf2ff] px-2.5 py-1 text-xs font-bold text-marathon-blue">
                      {selectedVenue.statusLabel}
                    </span>
                    <h3 className="mt-2 break-words font-montserrat text-xl font-black">{selectedVenue.displayName}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#334155]">
                      {selectedVenue.region}
                    </p>
                  </div>
                  <div className="w-fit rounded-full border border-[#cbd5e1] bg-[#f1f5f9] px-3 py-1.5 text-xs font-bold text-[#334155]">
                    {selectedVenue.city}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="min-w-0 rounded-[18px] border border-[#e2e8f0] bg-[#fafbfc] p-4">
                    <p className="flex min-w-0 items-start gap-2 text-xs font-bold leading-snug text-[#334155]"><CalendarDays size={14} className="mt-0.5 shrink-0 text-[#1f6feb]" /> <span className="min-w-0 break-words">Inicio preinscripción</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.preRegistrationStart}</p>
                  </div>
                  <div className="min-w-0 rounded-[18px] border border-[#e2e8f0] bg-[#fafbfc] p-4">
                    <p className="flex min-w-0 items-start gap-2 text-xs font-bold leading-snug text-[#334155]"><Clock3 size={14} className="mt-0.5 shrink-0 text-[#ed1c24]" /> <span className="min-w-0 break-words">Límite preinscripción</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.preRegistrationDeadline}</p>
                  </div>
                  <div className="min-w-0 rounded-[18px] border border-[#e2e8f0] bg-[#fafbfc] p-4">
                    <p className="flex min-w-0 items-start gap-2 text-xs font-bold leading-snug text-[#334155]"><FileCheck2 size={14} className="mt-0.5 shrink-0 text-[#1f6feb]" /> <span className="min-w-0 break-words">Entrega documentación</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.documentationDeadline}</p>
                  </div>
                  <div className="min-w-0 rounded-[18px] border border-[#e2e8f0] bg-[#fafbfc] p-4">
                    <p className="flex min-w-0 items-start gap-2 text-xs font-bold leading-snug text-[#334155]"><UsersRound size={14} className="mt-0.5 shrink-0 text-[#f39c12]" /> <span className="min-w-0 break-words">Inicio estimado</span></p>
                    <p className="mt-1 font-bold">{selectedVenue.matchStart}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#334155]">Etapas</p>
                  <div className="mt-2 space-y-2">
                    {selectedVenue.stages.map((stage) => (
                      <div key={stage.label} className="grid gap-1 rounded-[14px] border border-[#e2e8f0] bg-[#f9fafc] px-4 py-3 sm:flex sm:items-center sm:gap-3">
                        <span
                          className={`hidden h-2.5 w-2.5 rounded-full sm:block ${
                            stage.status === 'active'
                              ? 'bg-marathon-red'
                              : stage.status === 'upcoming'
                                ? 'bg-marathon-blue'
                                : 'bg-[#64748b]'
                          }`}
                        />
                        <p className="text-sm font-bold">{stage.label}</p>
                        <p className="text-xs text-[#64748b] sm:ml-auto">{stage.dateLabel}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#334155]">Categorías proyectadas</p>
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

                <div className="mt-6 rounded-[18px] border border-amber-300/60 bg-amber-50/80 p-4 text-xs leading-relaxed text-amber-900/90">
                  {selectedVenue.note}
                </div>

                <button
                  onClick={() => navigate('/inscripciones')}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-marathon-red px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(226,27,45,0.26)] transition-all hover:scale-[1.02] hover:shadow-[0_16px_32px_rgba(226,27,45,0.32)]"
                >
                  Preinscribir colegio <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <p className="text-sm text-[#334155]">No hay sedes disponibles para el filtro seleccionado.</p>
            )}
          </article>
        </div>

        {/* Legal Note */}
        <div className="relative z-10 mx-auto mt-10 max-w-5xl text-center text-xs leading-relaxed text-white/60">
          Las fechas publicadas corresponden a la planificación inicial del torneo y pueden estar sujetas a ajustes por calendario escolar, disponibilidad de escenarios, logística deportiva, condiciones climáticas, seguridad, fuerza mayor o disposiciones de la organización. La preinscripción no representa todavía la confirmación definitiva de participación. La aceptación final dependerá de validación institucional, cupos disponibles, categorías habilitadas y cumplimiento de requisitos.
        </div>
      </div>
    </section>
  );
}
