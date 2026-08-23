const FAQ_BACKGROUND_URL =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT Image 5 may 2026, 12_31_16 p.webp';

const faqItemClass =
  'group relative overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-[0_12px_32px_rgba(13,79,163,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(13,79,163,0.12)] open:bg-white';

const summaryClass =
  'flex cursor-pointer list-none items-start gap-3 px-4 py-4 text-left outline-none [&::-webkit-details-marker]:hidden sm:gap-4 sm:px-5 sm:py-5';

const questionClass =
  'min-w-0 flex-1 font-montserrat text-sm font-black uppercase leading-snug tracking-wide text-[#0d4fa3] sm:text-base lg:text-lg';

const numberClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d4fa3] text-sm font-black text-white shadow-[0_10px_22px_rgba(13,79,163,0.25)] sm:h-9 sm:w-9';

const chevronClass =
  'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#bcd1ef] bg-[#f8fbff] text-[#0d4fa3] transition-transform duration-300 group-open:rotate-180';

const answerClass =
  'space-y-4 border-t border-[#e6edf7] px-5 pb-5 pt-4 text-sm leading-7 text-[#5b6c84] sm:px-6 sm:text-base';

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-75"
        style={{ backgroundImage: `url("${FAQ_BACKGROUND_URL}")` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/58" />
      <div className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-marathon-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-marathon-blue/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-marathon-red/20 bg-white/80 px-5 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-marathon-red shadow-sm backdrop-blur-sm">
            CENTRO DE AYUDA
          </span>
          <h2 className="mt-5 text-center font-montserrat text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#0d4fa3] drop-shadow-[0_8px_18px_rgba(13,79,163,0.08)] sm:text-5xl lg:text-6xl">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[#5b6c84] sm:text-lg">
            Información clara sobre inscripción, categorías, documentación y condiciones generales del torneo.
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-[220px] items-center justify-center gap-3">
            <span className="h-px flex-1 bg-marathon-red/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-marathon-red shadow-[0_0_16px_rgba(240,40,53,0.35)]" />
            <span className="h-px flex-1 bg-marathon-red/45" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[32px] border border-[#dbe4f0] bg-white/90 p-4 shadow-[0_28px_80px_rgba(13,79,163,0.12)] backdrop-blur-sm sm:p-6 lg:p-7">
          <div className="grid gap-4">
            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>1</span>
                <span className={questionClass}>¿Qué es la Copa Nacional Intercolegial Marathon?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
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

            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>2</span>
                <span className={questionClass}>¿Cuál es el costo de inscripción por colegio?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
                <p>
                  Para los colegios privados, la inscripción tiene un costo de USD 170 por cada categoría inscrita, más IVA.
                </p>
                <p>
                  Los colegios fiscales y fiscomisionales no pagan costo de inscripción, como parte del enfoque inclusivo de la Copa Nacional Intercolegial Marathon.
                </p>
                <p>
                  Este modelo permite facilitar la participación de instituciones con distintas realidades, manteniendo al mismo tiempo una organización responsable, ordenada y sostenible para el desarrollo del torneo.
                </p>
              </div>
            </details>

            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>3</span>
                <span className={questionClass}>¿Cuántos jugadores puedo inscribir por equipo?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
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

            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>4</span>
                <span className={questionClass}>¿Qué documentación necesito para inscribir la nómina de jugadores?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
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

            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>5</span>
                <span className={questionClass}>¿Qué categorías podrán participar?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
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

            <details className={faqItemClass}>
              <div className="absolute left-0 top-4 h-10 w-1 rounded-full bg-gradient-to-b from-marathon-red to-[#0d4fa3]" />
              <summary className={summaryClass}>
                <span className={numberClass}>6</span>
                <span className={questionClass}>¿Cuándo inicia la Copa Nacional Intercolegial Marathon?</span>
                <span className={chevronClass}>
                  <span className="text-lg leading-none">⌄</span>
                </span>
              </summary>
              <div className={answerClass}>
                <p>
                  La Copa Nacional Intercolegial Marathon está planificada para iniciar su calendario general el 17 de agosto de 2026 y desarrollarse hasta el 12 de diciembre de 2026.
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
                    <div>Desde el 17 de agosto de 2026</div>
                  </div>
                  <div className="grid grid-cols-3 border-t border-marathon-blue/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-marathon-blue">Sierra y Amazonía</div>
                    <div>4 de mayo de 2026</div>
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
