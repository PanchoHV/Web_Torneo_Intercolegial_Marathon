export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#f7efe5_0%,#fffaf4_42%,#ffffff_100%)] py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(6,42,79,0.03)_0%,transparent_35%,rgba(250,65,30,0.04)_100%)]" />
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 px-5 py-10 shadow-[0_26px_60px_rgba(6,42,79,0.08)] backdrop-blur-md sm:px-8 lg:px-12">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-marathon-red/15 bg-marathon-red/8 px-5 py-2 text-xs font-semibold tracking-[0.14em] text-marathon-red shadow-sm">
              CENTRO DE AYUDA
            </span>
            <h2 className="mt-5 font-montserrat text-[clamp(1.95rem,4vw,3.15rem)] font-extrabold uppercase leading-[1.02] tracking-[0.03em] text-marathon-blue">
              Preguntas Frecuentes
            </h2>
            <p className="mx-auto mt-4 max-w-[760px] text-base leading-relaxed text-marathon-gray sm:text-lg">
              Información clara sobre inscripción, categorías, documentación y condiciones generales del torneo.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    1
                  </span>
                  <span>¿Qué es la Copa Nacional Intercolegial Marathon?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  La Copa Nacional Intercolegial Marathon es un torneo de fútbol escolar que reúne a colegios de distintas regiones del país en una experiencia deportiva, formativa y competitiva.
                </p>
                <p>
                  El torneo busca promover la sana competencia, el trabajo en equipo, la disciplina, la inclusión y el orgullo de representar a cada institución educativa.
                </p>
                <p>
                  Además de los partidos, la Copa busca convertirse en un espacio de integración para estudiantes, entrenadores, familias y comunidades educativas.
                </p>
              </div>
            </details>

            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    2
                  </span>
                  <span>¿Cuál es el costo de preinscripción por colegio?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  Para los colegios privados, la preinscripción tiene un costo de USD 170 por cada categoría inscrita, más IVA.
                </p>
                <p>
                  Los colegios fiscales y fiscomisionales no pagan costo de preinscripción, como parte del enfoque inclusivo de la Copa Nacional Intercolegial Marathon.
                </p>
                <p>
                  Este modelo permite facilitar la participación de instituciones con distintas realidades, manteniendo al mismo tiempo una organización responsable, ordenada y sostenible para el desarrollo del torneo.
                </p>
              </div>
            </details>

            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    3
                  </span>
                  <span>¿Cuántos jugadores puedo inscribir por equipo?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  Cada equipo podrá inscribir su nómina de jugadores según la modalidad de competencia correspondiente:
                </p>
                <div className="overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white shadow-[0_10px_24px_rgba(6,42,79,0.05)]">
                  <div className="grid grid-cols-2 bg-[linear-gradient(135deg,rgba(6,42,79,0.96),rgba(0,80,164,0.92))] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    <div>Modalidad</div>
                    <div>M&aacute;ximo de jugadores por equipo</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Fútbol 9, F9</div>
                    <div>Hasta 20 jugadores</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Fútbol 11, F11</div>
                    <div>Hasta 25 jugadores</div>
                  </div>
                </div>
                <p>
                  Estos cupos se manejan de acuerdo con el reglamento oficial de la Copa Nacional Intercolegial Marathon.
                </p>
              </div>
            </details>

            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    4
                  </span>
                  <span>¿Qué documentación necesito para inscribir la nómina de jugadores?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  Para registrar la nómina oficial de un equipo, el colegio deberá presentar la siguiente documentación:
                </p>
                <div className="overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white shadow-[0_10px_24px_rgba(6,42,79,0.05)]">
                  <div className="grid grid-cols-2 bg-[linear-gradient(135deg,rgba(6,42,79,0.96),rgba(0,80,164,0.92))] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    <div>Documento</div>
                    <div>Descripción</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Listado oficial de estudiantes</div>
                    <div>Debe incluir la matrícula de todos los jugadores inscritos.</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Carta de participación</div>
                    <div>Debe estar firmada por la autoridad correspondiente del colegio.</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Copia de cédula</div>
                    <div>Se requiere copia de la cédula de identidad de cada estudiante jugador.</div>
                  </div>
                </div>
                <p>
                  Esta documentación permite validar la participación de los estudiantes y asegurar que cada equipo compita de forma ordenada y transparente.
                </p>
              </div>
            </details>

            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    5
                  </span>
                  <span>¿Qué categorías podrán participar?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  La planificación contempla categorías masculinas y femeninas, según la sede y la modalidad habilitada por la organización.
                </p>
                <div className="overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white shadow-[0_10px_24px_rgba(6,42,79,0.05)]">
                  <div className="grid grid-cols-2 bg-[linear-gradient(135deg,rgba(6,42,79,0.96),rgba(0,80,164,0.92))] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    <div>Rama</div>
                    <div>Categorías</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Masculina</div>
                    <div>Sub 13, Sub 15 y Sub 17</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Femenina</div>
                    <div>Sub 15 y Sub 17</div>
                  </div>
                </div>
                <p>
                  La apertura final de cada categoría dependerá de la sede, la cantidad de equipos inscritos, la disponibilidad operativa y la planificación oficial del torneo.
                </p>
              </div>
            </details>

            <details className="group rounded-[1.5rem] border border-marathon-blue/10 bg-white/90 p-5 shadow-[0_14px_36px_rgba(6,42,79,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(6,42,79,0.1)] open:bg-white">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 outline-none">
                <span className="flex min-w-0 items-start gap-3 font-montserrat text-lg font-extrabold uppercase tracking-[0.02em] text-marathon-blue sm:text-xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marathon-blue text-xs font-black text-white shadow-[0_10px_22px_rgba(6,42,79,0.2)]">
                    6
                  </span>
                  <span>¿Cuándo inicia la Copa Nacional Intercolegial Marathon?</span>
                </span>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marathon-blue/10 bg-marathon-cream text-marathon-blue transition-transform duration-200 group-open:rotate-180">
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-marathon-blue/8 pt-4 text-sm leading-relaxed text-marathon-gray sm:text-[0.98rem]">
                <p>
                  La Copa Nacional Intercolegial Marathon está planificada para iniciar su calendario general el 27 de julio de 2026 y desarrollarse hasta el 30 de enero de 2027.
                </p>
                <p>
                  El inicio puede variar según la región y la sede:
                </p>
                <div className="overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white shadow-[0_10px_24px_rgba(6,42,79,0.05)]">
                  <div className="grid grid-cols-3 bg-[linear-gradient(135deg,rgba(6,42,79,0.96),rgba(0,80,164,0.92))] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    <div>Región</div>
                    <div>Inicio de inscripciones</div>
                    <div>Inicio estimado de partidos</div>
                  </div>
                  <div className="grid grid-cols-3 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Costa</div>
                    <div>4 de mayo de 2026</div>
                    <div>Desde el 27 de julio de 2026</div>
                  </div>
                  <div className="grid grid-cols-3 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Sierra y Amazonía</div>
                    <div>7 de septiembre de 2026</div>
                    <div>Desde el 12 de octubre de 2026</div>
                  </div>
                </div>
                <p>
                  Estas fechas corresponden a la planificación inicial del torneo y podrían ajustarse por razones de fuerza mayor, calendario escolar, condiciones climáticas, disponibilidad de escenarios deportivos, seguridad, logística operativa o disposiciones de la organización.
                </p>
                <p>
                  Cualquier cambio será comunicado oportunamente por los canales oficiales de la Copa Nacional Intercolegial Marathon.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
