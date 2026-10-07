import { useMemo, useState, type ReactNode } from 'react';

import {
  Ambulance,
  ChevronDown,
  CircleAlert,
  ClipboardList,
  Clock,
  Download,
  FileText,
  Hospital,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import { HeroBreadcrumb } from '@/components/ui/hero-breadcrumb';
import { SectionLabel } from '@/components/ui/section-label';
import { textures } from '@/lib/assets/textures';
import { HERO_ACCENT_STYLE, HERO_TITLE_STYLE, HERO_TYPE } from '@/lib/constants/hero-typography';
import {
  CLAIM_NOTICE_DAYS,
  CLINIC_CITIES,
  CLINIC_COUNT,
  COVERAGE_FACTS,
  COVERAGES,
  DOWNLOADS,
  EMERGENCY_STEPS,
  EXCLUSIONS,
  INSURER,
  REFUND_DOCUMENTS,
  REFUND_STEPS,
  SEGURO_FAQ_ITEMS,
  type Clinic,
  type ClinicRegion,
} from '@/lib/constants/seguroPage';
import FaqSection from '@/sections/home/FaqSection';

const HISPANA_LOGO_SRC =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Logo-hispana-transparente-1.webp';

/** Dimensiones reales del asset: reservan el espacio y evitan saltos al cargar. */
const HISPANA_LOGO_SIZE = { width: 284, height: 97 } as const;

const BEBAS = '"Bebas Neue", "Arial Narrow", sans-serif';

/** El header global es fixed: sin este margen las anclas quedarían debajo. */
const ANCHOR_OFFSET = 'scroll-mt-[calc(var(--header-height)+1rem)]';

const SECTION_PADDING = 'py-[clamp(2.25rem,4vw,3.5rem)]';

const PRIMARY_CTA =
  'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-marathon-red px-5 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(226,27,45,0.28)] transition-transform hover:scale-[1.02] motion-reduce:transition-none';

const SECONDARY_CTA =
  'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-marathon-navy/25 px-5 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-marathon-navy transition-transform hover:scale-[1.02] motion-reduce:transition-none';

const CLINIC_REGIONS: ClinicRegion[] = ['Costa', 'Sierra'];

/** Primera ciudad de cada región: es la que queda seleccionada al cambiar de región. */
function firstCityOf(region: ClinicRegion) {
  return CLINIC_CITIES.find((item) => item.region === region)?.city ?? '';
}

function SectionTitle({
  id,
  onDark = false,
  children,
}: {
  id: string;
  onDark?: boolean;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className={`mt-3 font-normal uppercase leading-[0.9] ${onDark ? 'text-white' : 'text-marathon-navy'}`}
      style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
    >
      {children}
    </h2>
  );
}

function StepNumber({ value, onDark = false }: { value: number; onDark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[1.25rem] leading-none ${
        onDark ? 'bg-marathon-red text-white' : 'bg-marathon-navy text-white'
      }`}
      style={{ fontFamily: BEBAS }}
    >
      {value}
    </span>
  );
}

function mapsHref(clinic: Clinic, city: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinic.name}, ${city}, Ecuador`)}`;
}

function ClinicCard({ clinic, city }: { clinic: Clinic; city: string }) {
  return (
    <li className="flex flex-col rounded-[18px] border border-marathon-navy/10 bg-white/80 p-4 shadow-[0_8px_22px_rgba(6,34,77,0.06)]">
      <h4 className="font-montserrat text-[0.86rem] font-extrabold leading-snug text-marathon-navy">
        {clinic.name}
      </h4>
      {clinic.note && (
        <p className="mt-1.5 inline-flex items-center gap-1.5 self-start rounded-full bg-marathon-red/10 px-2.5 py-1 text-[0.7rem] font-bold text-marathon-red">
          <CircleAlert size={12} aria-hidden="true" />
          {clinic.note}
        </p>
      )}
      <p className="mt-2 flex items-start gap-1.5 text-[0.83rem] leading-[1.45] text-marathon-gray">
        <MapPin size={14} aria-hidden="true" className="mt-[3px] shrink-0 text-marathon-blue" />
        {clinic.address}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {clinic.phones.map((item) => (
          <a
            key={item.tel}
            href={`tel:${item.tel}`}
            aria-label={`Llamar a ${clinic.name}: ${item.label}`}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-marathon-navy px-3.5 text-[0.8rem] font-bold text-white"
          >
            <Phone size={13} aria-hidden="true" />
            {item.label}
          </a>
        ))}
        <a
          href={mapsHref(clinic, city)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-marathon-navy/20 px-3.5 text-[0.8rem] font-bold text-marathon-navy"
        >
          <Navigation size={13} aria-hidden="true" />
          Cómo llegar
        </a>
      </div>
    </li>
  );
}

function ClinicsSection() {
  // Siempre hay una región y una ciudad elegidas: se muestra una ciudad a la
  // vez para que quien busca una clínica no tenga que recorrer todo el listado.
  const [region, setRegion] = useState<ClinicRegion>('Costa');
  const [city, setCity] = useState(() => firstCityOf('Costa'));

  const cityOptions = useMemo(
    () => CLINIC_CITIES.filter((item) => item.region === region),
    [region]
  );
  const selectedCity = cityOptions.find((item) => item.city === city) ?? cityOptions[0];

  return (
    <section
      id="clinicas"
      aria-labelledby="seguro-clinicas-title"
      className={`relative ${ANCHOR_OFFSET} ${SECTION_PADDING}`}
    >
      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <SectionLabel tone="blue">Red de atención</SectionLabel>
        <SectionTitle id="seguro-clinicas-title">Clínicas en convenio</SectionTitle>
        <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-7 text-marathon-gray">
          {CLINIC_COUNT} clínicas en {CLINIC_CITIES.length} ciudades atienden emergencias por
          accidente con crédito hospitalario. Elige tu región y tu ciudad; toca un teléfono para
          llamar.
        </p>

        <div className="mt-5 flex flex-col gap-3 rounded-[18px] border border-marathon-navy/10 bg-white/85 p-3.5 sm:flex-row sm:items-center sm:gap-4">
          <div role="group" aria-label="Elegir región" className="flex gap-2">
            {CLINIC_REGIONS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={region === option}
                onClick={() => {
                  setRegion(option);
                  setCity(firstCityOf(option));
                }}
                className={`h-11 flex-1 rounded-full px-5 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.12em] sm:flex-none ${
                  region === option
                    ? 'bg-marathon-navy text-white'
                    : 'border border-marathon-navy/20 text-marathon-navy'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="flex flex-1 items-center gap-2.5 sm:max-w-[22rem]">
            <span className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.16em] text-marathon-navy">
              Ciudad
            </span>
            {/* Select nativo (en el teléfono abre el selector del sistema) sin la
                flecha del navegador: el ícono y el chevron son propios. */}
            <span className="relative block w-full">
              <MapPin
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-marathon-red"
              />
              <select
                value={selectedCity.city}
                onChange={(event) => setCity(event.target.value)}
                className="h-11 w-full cursor-pointer appearance-none rounded-full border border-marathon-navy/20 bg-white pl-10 pr-11 font-montserrat text-[0.86rem] font-extrabold text-marathon-navy shadow-[0_4px_14px_rgba(6,34,77,0.06)] transition-colors hover:border-marathon-navy/45 focus-visible:border-marathon-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marathon-navy/25"
              >
                {cityOptions.map((item) => (
                  <option key={item.city} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-marathon-navy text-white"
              >
                <ChevronDown size={16} />
              </span>
            </span>
          </label>
        </div>

        <div className="mt-6" aria-live="polite">
          <div className="flex items-center gap-2.5">
            <h3
              className="font-normal uppercase leading-none text-marathon-navy"
              style={{ fontFamily: BEBAS, fontSize: '1.7rem' }}
            >
              {selectedCity.city}
            </h3>
            <span className="rounded-full border border-marathon-navy/15 px-2.5 py-1 font-montserrat text-[0.6rem] font-black uppercase tracking-[0.14em] text-marathon-gray">
              {selectedCity.clinics.length === 1
                ? '1 clínica'
                : `${selectedCity.clinics.length} clínicas`}
            </span>
            {selectedCity.isVenue && (
              <span className="rounded-full bg-marathon-red px-2.5 py-1 font-montserrat text-[0.6rem] font-black uppercase tracking-[0.14em] text-white">
                Sede
              </span>
            )}
          </div>
          <ul className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {selectedCity.clinics.map((clinic) => (
              <ClinicCard key={clinic.name} clinic={clinic} city={selectedCity.city} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/**
 * Página /seguro-estudiantil.
 *
 * Header y Footer los aporta PublicLayout. El orden sigue la urgencia de quien
 * llega: qué hacer ya, a dónde ir, qué cubre, cómo pedir un reembolso y, al
 * final, los documentos.
 */
export default function SeguroPage() {
  return (
    <div
      data-page="seguro"
      className="relative text-marathon-navy"
      style={{
        backgroundColor: '#F4F8FC',
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 18%), url('${textures.paperBackground}')`,
        backgroundRepeat: 'repeat, repeat',
        backgroundPosition: 'center top, center top',
        backgroundSize: 'auto, 700px auto',
      }}
    >
      {/* ── Hero ── */}
      <section
        aria-labelledby="seguro-hero-title"
        className="relative pb-[clamp(2rem,4vw,3.25rem)] pt-[calc(var(--header-height)+clamp(1.5rem,3vw,2.75rem))]"
      >
        <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12">
            <div className="max-w-[38rem]">
              <HeroBreadcrumb page="Seguro estudiantil" tone="paper" />
              <h1
                id="seguro-hero-title"
                className={`${HERO_TYPE.titleGap} ${HERO_TYPE.title} text-marathon-navy`}
                style={HERO_TITLE_STYLE}
              >
                Seguro estudiantil
              </h1>
              <p
                className={`${HERO_TYPE.accentGap} ${HERO_TYPE.accent} text-marathon-red`}
                style={HERO_ACCENT_STYLE}
              >
                Cada jugador entra protegido a la cancha
              </p>
              <p className={`${HERO_TYPE.bodyGap} ${HERO_TYPE.body} text-marathon-gray`}>
                Los jugadores de la Copa Marathon 2026 cuentan con un seguro de accidentes de{' '}
                {INSURER.name}. Aquí encuentras qué hacer ante un accidente, las clínicas en
                convenio y los documentos para tus trámites.
              </p>
              <div className={`${HERO_TYPE.ctaGap} flex flex-col gap-3 sm:flex-row`}>
                <a href="#emergencia" className={PRIMARY_CTA}>
                  <Ambulance size={16} aria-hidden="true" />
                  Qué hacer en un accidente
                </a>
                <a href="#clinicas" className={SECONDARY_CTA}>
                  <Hospital size={16} aria-hidden="true" />
                  Ver clínicas
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3 lg:justify-end">
                <span className="font-montserrat text-[0.62rem] font-black uppercase tracking-[0.18em] text-marathon-gray">
                  Con el respaldo de
                </span>
                <img
                  src={HISPANA_LOGO_SRC}
                  alt="Hispana de Seguros y Reaseguros"
                  width={HISPANA_LOGO_SIZE.width}
                  height={HISPANA_LOGO_SIZE.height}
                  decoding="async"
                  className="h-11 w-auto sm:h-12"
                />
              </div>
              <aside
                aria-label="Línea de atención de la aseguradora"
                className="relative overflow-hidden rounded-[22px] bg-[#07182f] p-5 text-white shadow-[0_18px_40px_rgba(6,34,77,0.22)] sm:p-6"
              >
                <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-marathon-red" />
                <p className="flex items-center gap-2 font-montserrat text-[0.66rem] font-black uppercase tracking-[0.2em] text-marathon-gold">
                  <ShieldCheck size={15} aria-hidden="true" />
                  Atención de reclamos
                </p>
                <p className="mt-3 text-[0.9rem] leading-6 text-white/80">
                  Línea de {INSURER.name} para emergencias y reclamos por accidente.
                </p>
                <a
                  href={`tel:${INSURER.pbxTel}`}
                  className="mt-4 flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-marathon-red px-5 text-white"
                >
                  <Phone size={18} aria-hidden="true" />
                  <span
                    style={{
                      fontFamily: BEBAS,
                      fontSize: '1.7rem',
                      lineHeight: 1,
                    }}
                  >
                    {INSURER.pbxLabel}
                  </span>
                </a>
                <p className="mt-3 text-center text-[0.78rem] text-white/65">
                  También {INSURER.tollFreeLabel}
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* ── En caso de accidente ── */}
      <section
        id="emergencia"
        aria-labelledby="seguro-emergencia-title"
        className={`relative overflow-hidden bg-[#062a4f] text-white ${ANCHOR_OFFSET} ${SECTION_PADDING}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,27,45,0.18),transparent_38%)]"
        />
        <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
          <SectionLabel tone="gold">En caso de accidente</SectionLabel>
          <SectionTitle id="seguro-emergencia-title" onDark>
            Qué hacer, paso a paso
          </SectionTitle>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {EMERGENCY_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[18px] border border-white/12 bg-white/[0.06] p-4 sm:p-5"
              >
                <StepNumber value={index + 1} onDark />
                <h3 className="mt-3 font-montserrat text-[0.9rem] font-extrabold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.86rem] leading-6 text-white/75">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#clinicas" className={PRIMARY_CTA}>
              <Hospital size={16} aria-hidden="true" />
              Buscar la clínica más cercana
            </a>
            <p className="text-[0.84rem] leading-6 text-white/70">
              Si la emergencia es grave, llama primero al{' '}
              <strong className="text-white">911</strong>.
            </p>
          </div>
        </Container>
      </section>

      <ClinicsSection />

      {/* ── Coberturas ── */}
      <section
        id="coberturas"
        aria-labelledby="seguro-coberturas-title"
        className={`relative ${ANCHOR_OFFSET} ${SECTION_PADDING}`}
      >
        <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
          <SectionLabel>Coberturas</SectionLabel>
          <SectionTitle id="seguro-coberturas-title">Qué cubre el seguro</SectionTitle>
          <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-7 text-marathon-gray">
            Montos máximos por jugador, en dólares, para accidentes ocurridos durante el campeonato.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {COVERAGES.map((item) => (
              <li
                key={item.label}
                className="rounded-[18px] border border-marathon-navy/10 bg-white/80 p-4 sm:p-5"
              >
                <p
                  className="font-normal leading-none text-marathon-navy"
                  style={{
                    fontFamily: BEBAS,
                    fontSize: 'clamp(2rem, 6vw, 2.9rem)',
                  }}
                >
                  {item.amount}
                </p>
                <p className="mt-2 font-montserrat text-[0.78rem] font-extrabold leading-snug text-marathon-navy">
                  {item.label}
                </p>
                {'note' in item && (
                  <p className="mt-1 text-[0.76rem] leading-5 text-marathon-gray">{item.note}</p>
                )}
              </li>
            ))}
          </ul>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COVERAGE_FACTS.map((fact) => (
              <div key={fact.title} className="rounded-[18px] bg-marathon-navy/[0.05] p-4">
                <dt className="font-montserrat text-[0.66rem] font-black uppercase tracking-[0.16em] text-marathon-navy">
                  {fact.title}
                </dt>
                <dd className="mt-1.5 text-[0.84rem] leading-6 text-marathon-gray">{fact.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 rounded-[18px] border border-marathon-red/20 bg-marathon-red/[0.05] p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.16em] text-marathon-red">
              <CircleAlert size={15} aria-hidden="true" />
              Qué no cubre
            </h3>
            <ul className="mt-3 grid gap-x-8 gap-y-2 text-[0.86rem] leading-6 text-marathon-navy/85 md:grid-cols-2">
              {EXCLUSIONS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-marathon-red"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Reembolso ── */}
      <section
        id="reembolso"
        aria-labelledby="seguro-reembolso-title"
        className={`relative ${ANCHOR_OFFSET} ${SECTION_PADDING}`}
      >
        <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
          <SectionLabel tone="blue">Reembolsos</SectionLabel>
          <SectionTitle id="seguro-reembolso-title">Cómo pedir un reembolso</SectionTitle>
          <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-7 text-marathon-gray">
            Si pagaste gastos médicos por un accidente, puedes pedir que te los devuelvan.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="rounded-[20px] border border-marathon-navy/10 bg-white/80 p-5">
              <p className="flex items-center gap-2 rounded-2xl bg-marathon-gold/15 px-3.5 py-2.5 text-[0.84rem] font-bold leading-5 text-marathon-navy">
                <Clock size={16} aria-hidden="true" className="shrink-0" />
                Tienes {CLAIM_NOTICE_DAYS} días desde el accidente para avisar.
              </p>
              <ol className="mt-5 flex flex-col gap-4">
                {REFUND_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <StepNumber value={index + 1} />
                    <div>
                      <h3 className="font-montserrat text-[0.86rem] font-extrabold text-marathon-navy">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-[0.84rem] leading-6 text-marathon-gray">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={`mailto:${INSURER.claimsEmail}`}
                className="mt-5 flex min-h-[46px] items-center justify-center gap-2 break-all rounded-full bg-marathon-navy px-4 py-2 text-center text-[0.8rem] font-bold text-white"
              >
                <Mail size={15} aria-hidden="true" className="shrink-0" />
                {INSURER.claimsEmail}
              </a>
            </div>

            <div className="rounded-[20px] border border-marathon-navy/10 bg-white/80 p-5">
              <h3 className="flex items-center gap-2 font-montserrat text-[0.7rem] font-black uppercase tracking-[0.16em] text-marathon-navy">
                <ClipboardList size={15} aria-hidden="true" />
                Documentos que debes reunir
              </h3>
              <ol className="mt-4 flex flex-col gap-2.5">
                {REFUND_DOCUMENTS.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.86rem] leading-6 text-marathon-navy/85"
                  >
                    <span
                      aria-hidden="true"
                      className="w-5 shrink-0 text-right text-marathon-red"
                      style={{
                        fontFamily: BEBAS,
                        fontSize: '1.1rem',
                        lineHeight: '1.5rem',
                      }}
                    >
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[0.78rem] leading-5 text-marathon-gray">
                Guarda siempre las facturas originales: sin ellas no se puede tramitar el pago.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Documentos ── */}
      <section
        id="documentos"
        aria-labelledby="seguro-documentos-title"
        className={`relative ${ANCHOR_OFFSET} ${SECTION_PADDING}`}
      >
        <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
          <SectionLabel>Descargas</SectionLabel>
          <SectionTitle id="seguro-documentos-title">Documentos y formularios</SectionTitle>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {DOWNLOADS.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-col rounded-[20px] border border-marathon-navy/10 bg-white/85 p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-marathon-navy text-white"
                >
                  <FileText size={20} />
                </span>
                <h3 className="mt-4 font-montserrat text-[0.95rem] font-extrabold leading-snug text-marathon-navy">
                  {doc.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[0.84rem] leading-6 text-marathon-gray">
                  {doc.description}
                </p>
                {doc.href ? (
                  <a href={doc.href} download={doc.filename} className={`${PRIMARY_CTA} mt-4`}>
                    <Download size={15} aria-hidden="true" />
                    Descargar PDF
                  </a>
                ) : (
                  <span className="mt-4 inline-flex min-h-[46px] items-center justify-center rounded-full border border-dashed border-marathon-navy/30 px-5 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-marathon-gray">
                    Disponible pronto
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-marathon-navy/10 pt-5 text-center text-[0.78rem] leading-5 text-marathon-gray">
            Esta página es un resumen informativo. La cobertura se rige por las condiciones de la
            póliza emitida por {INSURER.name}, que prevalecen ante cualquier diferencia. Más
            información en{' '}
            <a
              href={INSURER.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-marathon-blue underline"
            >
              hispanadeseguros.com
            </a>
            .
          </p>
        </Container>
      </section>

      <FaqSection
        id="faq-seguro"
        inheritBackground
        items={[...SEGURO_FAQ_ITEMS]}
        description="Respuestas rápidas sobre el seguro de accidentes de los jugadores de la Copa."
      />
    </div>
  );
}
