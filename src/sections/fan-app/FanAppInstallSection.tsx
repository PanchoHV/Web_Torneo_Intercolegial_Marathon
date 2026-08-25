import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

const R2_BASE = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/';

const WATERMARKS = {
  arrow: `${R2_BASE}optimized-flecha%20entre%20cortada.webp`,
  guide: `${R2_BASE}optimized-flecha.webp`,
} as const;

type DeviceId = 'iphone' | 'android';

const guides: Record<
  DeviceId,
  { label: string; browser: string; image: string; support: string; steps: string[] }
> = {
  iphone: {
    label: 'iPhone',
    browser: 'Safari',
    image: `${R2_BASE}optimized-Intalacio%CC%81n%20IOS.webp`,
    support:
      'Instálala en segundos desde Safari y entra a la Copa como si fuera una app en tu celular.',
    steps: [
      'Abre la Fan App en Safari',
      'Toca Compartir',
      'Elige «Agregar a pantalla de inicio»',
      'Toca «Agregar»',
    ],
  },
  android: {
    label: 'Android',
    browser: 'Chrome',
    image: `${R2_BASE}optimized-Instalacio%CC%81n%20Android.webp`,
    support:
      'Agrégala desde Chrome y ten toda la Copa disponible desde tu pantalla de inicio.',
    steps: [
      'Abre la Fan App en Chrome',
      'Abre el menú',
      'Elige «Instalar» o «Agregar a pantalla principal»',
      'Confirma',
    ],
  },
};

const deviceIds: DeviceId[] = ['iphone', 'android'];

export default function FanAppInstallSection() {
  const [device, setDevice] = useState<DeviceId>('iphone');
  const guide = guides[device];

  return (
    <section
      id="fan-app-install"
      aria-labelledby="fan-app-install-title"
      className="relative overflow-hidden py-[clamp(2.75rem,5vw,5rem)] text-[#062A4F]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={WATERMARKS.guide}
          alt=""
          loading="lazy"
          className="absolute -left-[7%] top-[42%] hidden w-[clamp(9rem,15vw,15rem)] opacity-[0.08] lg:block"
        />
        <img
          src={WATERMARKS.arrow}
          alt=""
          loading="lazy"
          className="absolute right-[3%] top-[12%] w-[clamp(5rem,11vw,11rem)] opacity-[0.11]"
        />
      </div>

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div aria-hidden="true" className="h-[3px] w-[clamp(2.75rem,5vw,4.5rem)] bg-[#E21B2D]" />

        <div className="mt-[clamp(1.5rem,2.6vw,2.5rem)] grid gap-[clamp(1rem,2.4vw,2.5rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <h2
            id="fan-app-install-title"
            className="max-w-[16ch] font-normal uppercase leading-[0.86] tracking-[-0.01em]"
            style={{
              fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
              fontSize: 'clamp(2.35rem, 4.4vw, 4rem)',
            }}
          >
            Lleva la Copa siempre contigo
          </h2>

          <p className="max-w-[34rem] font-inter text-[0.95rem] leading-7 text-[#18344f]/80 lg:pb-2">
            Agrega la Fan App a la pantalla de inicio de tu celular y entra al minuto a minuto
            de la Copa con un solo toque.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Elige tu dispositivo"
          className="mt-[clamp(1.75rem,3.2vw,2.75rem)] inline-flex w-full max-w-[24rem] gap-1 rounded-full border border-[#062A4F]/15 bg-white/70 p-1 sm:w-auto"
        >
          {deviceIds.map((id) => {
            const isActive = id === device;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`fan-app-install-tab-${id}`}
                aria-selected={isActive}
                aria-controls="fan-app-install-panel"
                onClick={() => setDevice(id)}
                className={`flex-1 rounded-full px-5 py-2.5 font-montserrat text-[0.72rem] font-black uppercase tracking-[0.12em] transition duration-200 sm:flex-none sm:px-8 sm:text-[0.78rem] ${
                  isActive
                    ? 'bg-[#062A4F] text-white shadow-[0_8px_18px_rgba(6,42,79,0.22)]'
                    : 'text-[#062A4F]/65 hover:text-[#062A4F]'
                }`}
              >
                {guides[id].label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="fan-app-install-panel"
          aria-labelledby={`fan-app-install-tab-${device}`}
          className="mt-[clamp(1.25rem,2.4vw,2rem)]"
        >
          <p className="max-w-[46rem] font-inter text-[0.95rem] leading-7 text-[#18344f]/85">
            {guide.support}
          </p>

          <div className="mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[68rem]">
            <div className="overflow-x-auto pb-1">
              {/* El arte trae mucho margen transparente arriba y abajo: se recorta
                  con object-cover para que la franja de pasos ocupe todo el bloque. */}
              <div className="min-w-[44rem]">
                <div className="aspect-[1448/490] w-full overflow-hidden">
                  <img
                    key={guide.image}
                    src={guide.image}
                    alt={`Pasos para agregar la Fan App a la pantalla de inicio en ${guide.label}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[center_45%]"
                  />
                </div>
              </div>
            </div>

            <p className="mt-1 font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#18344f]/50 sm:hidden">
              Desliza para ver los pasos
            </p>
          </div>

          {/* Las imagenes ya rotulan cada paso: el resumen solo aparece en mobile,
              donde la franja se ve por scroll horizontal y no cabe completa. */}
          <ol className="mt-[clamp(1.25rem,2.2vw,1.75rem)] grid gap-2 sm:hidden">
            {guide.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-2.5">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-[#E21B2D] font-montserrat text-[0.62rem] font-black text-white">
                  {index + 1}
                </span>
                <span className="font-inter text-[0.82rem] leading-6 text-[#18344f]/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-[clamp(1.5rem,2.6vw,2.25rem)]">
          <Button
            asChild
            variant="action"
            size="cta"
            className="h-12 rounded-[4px] px-6 font-montserrat text-xs font-black uppercase tracking-[0.07em] shadow-button"
          >
            <a href={FAN_APP_URL} {...EXTERNAL_LINK_PROPS}>
              Abrir Fan App
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
