import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MapPin,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import VENUES, { VENUE_REGION_OPTIONS, TOURNAMENT_CATEGORIES } from '@/lib/constants/venues';

export default function SedesCalendario() {
  const navigate = useNavigate();
  const [region, setRegion] = useState<typeof VENUE_REGION_OPTIONS[number]>('Todas');

  const filtered = useMemo(() => {
    if (region === 'Todas') return VENUES;
    return VENUES.filter((v) => v.region === region);
  }, [region]);

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
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {VENUE_REGION_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setRegion(opt)}
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

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <article
              key={v.id}
              className="rounded-2xl bg-white text-[#062a4f] p-4 shadow-[0_12px_30px_rgba(2,6,23,0.4)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span className="rounded-full bg-[#062a4f] px-3 py-1 text-xs font-black text-white">{v.region}</span>
                    <span className="text-sm font-semibold">{v.displayName}</span>
                  </div>
                  <div className="mt-2 text-xs text-[#334155]">{v.statusLabel} • {v.side}</div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold">
                    <MapPin size={14} /> {v.city}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-[#f8fafc] p-3">
                  <div className="text-xs font-semibold text-[#0f172a]">Inicio preinscripción</div>
                  <div className="mt-1 font-bold text-sm">{v.preRegistrationStart}</div>
                </div>
                <div className="rounded-lg bg-[#f8fafc] p-3">
                  <div className="text-xs font-semibold text-[#0f172a]">Límite preinscripción</div>
                  <div className="mt-1 font-bold text-sm">{v.preRegistrationDeadline}</div>
                </div>
                <div className="rounded-lg bg-[#f8fafc] p-3">
                  <div className="text-xs font-semibold text-[#0f172a]">Entrega documentación</div>
                  <div className="mt-1 font-bold text-sm">{v.documentationDeadline}</div>
                </div>
                <div className="rounded-lg bg-[#f8fafc] p-3">
                  <div className="text-xs font-semibold text-[#0f172a]">Inicio estimado</div>
                  <div className="mt-1 font-bold text-sm">{v.matchStart}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#334155]">Categorías proyectadas</div>
                  <div className="text-xs text-[#475569]">{v.categories.length} categorías</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TOURNAMENT_CATEGORIES.map((c) => (
                    <span key={c} className="rounded-full bg-[#eef2ff] px-2 py-1 text-xs font-medium">{c}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold text-[#334155]">Etapas</div>
                <div className="mt-2 flex items-center gap-2">
                  {v.stages.map((s) => (
                    <div key={s.label} className="flex-1 text-xs">
                      <div className="font-semibold text-sm">{s.label}</div>
                      <div className="text-[#475569]">{s.dateLabel}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs text-[#64748b]">{v.note}</div>
                <button
                  onClick={() => navigate('/inscripciones')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#062a4f] px-4 py-2 text-sm font-bold text-white"
                >
                  <ArrowRight size={16} /> Preinscribir colegio
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-xs text-white/70">
          Las fechas publicadas corresponden a la planificación inicial del torneo y pueden estar sujetas a ajustes por calendario escolar, disponibilidad de escenarios, logística deportiva, condiciones climáticas, seguridad, fuerza mayor o disposiciones de la organización. La preinscripción no representa todavía la confirmación definitiva de participación.
        </div>
      </div>
    </section>
  );
}
