import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { textures } from '@/lib/assets/textures';

gsap.registerPlugin(ScrollTrigger);

const BEBAS = '"Bebas Neue", sans-serif';

const NAVY = '#062A4F';
const RED = '#E21B2D';

const R2 = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev';
/** Varios archivos originales tienen espacios en el nombre; hay que codificarlos. */
const file = (name: string) => `${R2}/${encodeURIComponent(name)}`;

/* -------------------------------------------------------------------------- */
/* Contenido                                                                   */
/* -------------------------------------------------------------------------- */

const milestones = [
  {
    year: '2025',
    title: ['Todo empieza', 'en la cancha'],
    text: 'El primer partido marcó el inicio de una nueva forma de vivir el fútbol colegial: representar los colores del colegio y competir dentro de una Copa nacional.',
    image: file('optimized-primer partido.webp'),
    alt: 'Jugadores durante el primer partido de la Copa, formando barrera en un tiro libre.',
    position: 'center 40%',
  },
  {
    year: '2025',
    title: ['Del primer partido', 'al campeón nacional'],
    text: 'La primera edición encontró a sus campeones y convirtió la competencia en una experiencia compartida por jugadores, entrenadores, colegios y familias.',
    image: file('optimized-torneo 2025.webp'),
    alt: 'Jugadoras campeonas de la primera edición celebrando con el trofeo de la Copa.',
    position: 'center 35%',
  },
  {
    year: '2026',
    title: ['Un nuevo', 'capítulo'],
    text: 'El sorteo de grupos abre nuevos recorridos, nuevos cruces y una nueva edición. La historia de la Copa vuelve a ponerse en juego.',
    image: file('optimized-sorteo_2026.webp'),
    alt: 'Sorteo de grupos de la edición 2026 de la Copa.',
    position: 'center 45%',
  },
] as const;

/**
 * Iconografía de la matriz de escala (R2).
 * La asignación icono↔métrica es provisional: se ajusta cuando el set final esté cerrado.
 */
const SCALE_ICONS = {
  teams: file('optimized-jugadores icon.webp'),
  matches: file('optimized-Cancha Icon.webp'),
  cities: file('optimized-colegios icon.webp'),
  /** Lockup completo (marca + palabra), va sin cifra: ocupa la celda entera. */
  fifaPlay: file('optimized-icon FIFA.webp'),
} as const;

/**
 * Matriz de escala. Solo datos validados por el proyecto.
 * La cuarta celda no es una cifra: es el lockup de FIFA Play, tal como en la referencia.
 */
const scaleMetrics = [
  { key: 'teams', value: 600, label: 'Equipos', icon: SCALE_ICONS.teams },
  { key: 'matches', value: 1200, label: 'Partidos', icon: SCALE_ICONS.matches },
  { key: 'cities', value: 10, label: 'Ciudades', icon: SCALE_ICONS.cities },
  { key: 'fifaPlay', lockup: SCALE_ICONS.fifaPlay, label: 'FIFA Play' },
] as const;

/** Iconografía oficial de categorías (R2). */
const CATEGORY_ICONS = {
  sub13: file('optimized-Sub 13.webp'),
  sub15: file('optimized-Sub 15.webp'),
  sub17: file('optimized-Sub 17.webp'),
  masculino: file('optimized-Masculino.webp'),
  femenino: file('optimized-Femenino.webp'),
} as const;

const categories = [
  { label: 'Sub 13', icon: CATEGORY_ICONS.sub13 },
  { label: 'Sub 15', icon: CATEGORY_ICONS.sub15 },
  { label: 'Sub 17', icon: CATEGORY_ICONS.sub17 },
  { label: 'Masculino', icon: CATEGORY_ICONS.masculino },
  { label: 'Femenino', icon: CATEGORY_ICONS.femenino },
] as const;

/** Ilustración del panel de reglamento: tablilla táctica y silbato en una sola pieza. */
const RULES_ART = file('optimized-silbato y tabla.webp');

/** TODO(contenido): destino oficial del reglamento pendiente de validación. Placeholder consciente. */
const RULES_HREF = '#reglamento';

/* -------------------------------------------------------------------------- */

/** Separador de miles explícito: `Intl` en es-* no agrupa números de 4 dígitos. */
const formatCount = (value: number) => {
  const rounded = Math.round(value);
  return `+${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const panelClass =
  'relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0A2A50] px-[clamp(1.5rem,3vw,2.75rem)] py-[clamp(1.75rem,3vw,2.5rem)] text-white';

function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="flex items-center gap-3 text-[clamp(1.9rem,3vw,2.6rem)] font-normal uppercase leading-[0.95] text-white"
      style={{ fontFamily: BEBAS }}
    >
      {children}
      <img
        src={textures.brushPlus}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={26}
        height={26}
        className="mt-1 h-[22px] w-[22px] shrink-0 object-contain"
      />
    </h3>
  );
}

export default function CopaHistorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Sin motion: los valores finales ya están en el DOM, no hay nada que restaurar.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-copa-reveal]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      });

      gsap.from('[data-copa-rail]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.85,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 74%', once: true },
      });

      gsap.from('[data-copa-node]', {
        opacity: 0,
        scale: 0.4,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.09,
        delay: 0.25,
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 74%', once: true },
      });

      section.querySelectorAll<HTMLElement>('[data-count-target]').forEach((counter) => {
        const target = Number(counter.dataset.countTarget);
        if (!Number.isFinite(target)) return;

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            const state = { value: 0 };
            counter.textContent = formatCount(0);
            gsap.to(state, {
              value: target,
              duration: 1.2,
              ease: 'power3.out',
              onUpdate: () => {
                counter.textContent = formatCount(state.value);
              },
              onComplete: () => {
                counter.textContent = formatCount(target);
              },
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="relative isolate overflow-hidden bg-[#F1ECE3] py-[clamp(3rem,6vw,5rem)] text-[#062A4F]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-60 mix-blend-multiply"
        style={{ backgroundImage: `url(${textures.paperBackground})` }}
      />

      <div className="mx-auto w-full max-w-[1560px] px-[clamp(1.5rem,4vw,4.5rem)]">
        {/* ------------------------------------------------ FILA SUPERIOR */}
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(210px,0.85fr)_minmax(0,2.5fr)_minmax(300px,1.2fr)] lg:gap-x-12">
          {/* A. Intro */}
          <div className="relative" data-copa-reveal>
            <h2
              className="text-[clamp(2.6rem,4vw,3.9rem)] font-normal uppercase leading-[0.86]"
              style={{ fontFamily: BEBAS }}
            >
              Historia
              <br />y escala
            </h2>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-16 bg-[#E21B2D]" />
            <p className="mt-5 max-w-[26ch] text-[0.95rem] leading-[1.55] text-[#062A4F]/85">
              La Copa comenzó en 2025. Desde entonces, cada partido, cada campeón y cada nueva
              edición ha ido construyendo una historia que apenas empieza a crecer.
            </p>

            <img
              src={textures.tacticalRoute}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none mt-8 hidden h-[110px] w-auto object-contain opacity-70 mix-blend-multiply lg:block"
            />
          </div>

          {/* B. Timeline */}
          <div className="relative" data-copa-reveal>
            {/* Años, alineados sobre el nodo de cada hito. */}
            <div className="hidden grid-cols-3 md:grid">
              {milestones.map((item, index) => (
                <span
                  key={`${item.year}-${index}`}
                  className="text-center text-[clamp(1.15rem,1.6vw,1.5rem)] font-normal leading-none tracking-[0.02em]"
                  style={{ fontFamily: BEBAS, color: RED }}
                >
                  {item.year}
                </span>
              ))}
            </div>

            {/* Riel horizontal con los tres nodos. */}
            <div aria-hidden="true" className="relative mt-3 hidden h-px w-full md:block">
              <span
                data-copa-rail
                className="absolute inset-0 block"
                style={{ backgroundColor: `${NAVY}66` }}
              />
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  data-copa-node
                  className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${(index * 100) / 3}%`, backgroundColor: NAVY }}
                />
              ))}
            </div>

            {/* Hitos */}
            <ol className="mt-0 grid gap-10 md:grid-cols-3 md:gap-0">
              {milestones.map((item) => (
                <li
                  key={item.title.join(' ')}
                  className="group relative pl-6 md:flex md:border-l md:pl-0 md:pt-7"
                  style={{ borderColor: `${NAVY}33` }}
                >
                  {/* Nodo y riel verticales en mobile/tablet estrecho. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-px md:hidden"
                    style={{ backgroundColor: `${NAVY}33` }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[6px] h-[9px] w-[9px] -translate-x-1/2 rounded-full md:hidden"
                    style={{ backgroundColor: NAVY }}
                  />

                  <div className="flex w-full flex-col md:px-[clamp(0.75rem,1.6vw,1.5rem)]">
                    <span
                      className="text-[1.25rem] font-normal leading-none md:hidden"
                      style={{ fontFamily: BEBAS, color: RED }}
                    >
                      {item.year}
                    </span>

                    <h3
                      className="mt-1 text-[clamp(1.1rem,1.5vw,1.4rem)] font-normal uppercase leading-[1.02] md:mt-0 md:text-center"
                      style={{ fontFamily: BEBAS }}
                    >
                      {item.title[0]}
                      <br />
                      {item.title[1]}
                    </h3>

                    <p className="mt-2.5 text-[0.82rem] leading-[1.5] text-[#062A4F]/80 md:text-center">
                      {item.text}
                    </p>

                    <div className="mt-auto overflow-hidden rounded-[3px] pt-4">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full rounded-[3px] object-cover transition-transform duration-[240ms] ease-out will-change-transform group-hover:-translate-y-[2px] group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
                        style={{ objectPosition: item.position }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* C. Escala */}
          <div
            className="lg:border-l lg:pl-[clamp(1.5rem,2.5vw,2.75rem)]"
            style={{ borderColor: `${NAVY}33` }}
            data-copa-reveal
          >
            <h3 className="sr-only">Escala de la Copa</h3>

            <dl className="grid grid-cols-2">
              {scaleMetrics.map((metric, index) => {
                const cellStyle = {
                  borderRight: index % 2 === 0 ? `1px solid ${NAVY}4D` : undefined,
                  borderBottom: index < 2 ? `1px solid ${NAVY}4D` : undefined,
                  paddingRight: index % 2 === 0 ? 'clamp(0.75rem,1.5vw,1.5rem)' : undefined,
                  paddingLeft: index % 2 === 1 ? 'clamp(0.75rem,1.5vw,1.5rem)' : undefined,
                };
                const cellClass =
                  'flex items-center gap-3 px-1 py-[clamp(1rem,1.8vw,1.75rem)] first:pt-0 [&:nth-child(2)]:pt-0';

                // Celda de marca: el lockup ya contiene su propia palabra, va sin cifra ni label.
                if ('lockup' in metric) {
                  return (
                    <div key={metric.key} className={`${cellClass} justify-center`} style={cellStyle}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd className="m-0">
                        <img
                          src={metric.lockup}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          width={150}
                          height={150}
                          className="h-[clamp(52px,5vw,84px)] w-auto object-contain"
                        />
                      </dd>
                    </div>
                  );
                }

                return (
                  <div key={metric.key} className={cellClass} style={cellStyle}>
                    <img
                      src={metric.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      width={52}
                      height={52}
                      className="h-[clamp(34px,3.2vw,52px)] w-[clamp(34px,3.2vw,52px)] shrink-0 object-contain"
                    />

                    <div className="min-w-0">
                      <dd
                        data-count-target={metric.value}
                        className="m-0 text-[clamp(1.7rem,2.6vw,2.6rem)] font-normal leading-[0.9]"
                        style={{ fontFamily: BEBAS }}
                      >
                        {formatCount(metric.value)}
                      </dd>
                      <dt
                        className="mt-0.5 text-[clamp(0.68rem,0.85vw,0.86rem)] font-normal uppercase leading-none tracking-[0.04em]"
                        style={{ fontFamily: BEBAS }}
                      >
                        {metric.label}
                      </dt>
                    </div>
                  </div>
                );
              })}
            </dl>

            {/* TODO(contenido): nota al pie provisional, sujeta a validación de las cifras. */}
            <p className="mt-4 text-right text-[0.68rem] leading-tight text-[#062A4F]/55">
              Cifras en proceso de validación.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------ FILA INFERIOR */}
        <div className="mt-[clamp(2rem,4vw,3.25rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] lg:grid-cols-2">
          {/* Categorías */}
          <div id="categorias" className={`${panelClass} scroll-mt-24`}>
            <PanelTitle>Categorías</PanelTitle>
            <p className="mt-2 text-[0.9rem] leading-[1.5] text-white/70">
              Categorías oficiales para la edición 2026.
            </p>

            <ul className="mt-[clamp(1.25rem,2.2vw,2rem)] grid grid-cols-2 gap-[clamp(0.5rem,0.9vw,0.85rem)] sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => (
                <li
                  key={category.label}
                  className="flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-[10px] border border-white/18 bg-white/[0.03] px-2 py-4 transition-[background-color,border-color,transform] duration-200 ease-out hover:border-white/35 hover:bg-white/[0.06] hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <img
                    src={category.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <span
                    className="text-center text-[clamp(1rem,1.15vw,1.25rem)] font-normal uppercase leading-none tracking-[0.02em]"
                    style={{ fontFamily: BEBAS }}
                  >
                    {category.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* TODO(contenido): copy provisional — pendiente de validación contra el reglamento oficial. */}
            <p className="mt-[clamp(1.25rem,2vw,1.75rem)] flex items-start gap-2 text-[0.8rem] leading-[1.45] text-white/60">
              <Info size={15} aria-hidden="true" className="mt-[2px] shrink-0" />
              Cada colegio puede inscribir equipos en las categorías disponibles según la rama.
            </p>
          </div>

          {/* Reglamento */}
          <div id="reglamento" className={`${panelClass} scroll-mt-24`}>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.62fr)] md:items-end">
              <div>
                <PanelTitle>Reglamento</PanelTitle>
                <p className="mt-3 max-w-[46ch] text-[0.9rem] leading-[1.55] text-white/78">
                  El reglamento oficial establece las normas de juego, inscripción, conducta y
                  sanciones que garantizan la transparencia y el juego limpio en todas las fases del
                  torneo.
                </p>

                <a
                  href={RULES_HREF}
                  className="mt-[clamp(1.5rem,2.6vw,2.25rem)] inline-flex items-center gap-3 rounded-[7px] bg-[#E21B2D] px-6 py-3.5 text-[0.82rem] font-bold uppercase tracking-[0.09em] text-white transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#c41626] hover:shadow-[0_10px_22px_rgba(226,27,45,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
                >
                  Consultar reglamento
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <img
                src={RULES_ART}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={300}
                height={300}
                className="mx-auto w-[min(240px,70%)] max-w-none object-contain md:mx-0 md:mb-[-0.75rem] md:ml-auto md:w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
