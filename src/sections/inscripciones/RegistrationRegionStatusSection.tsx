import { useState } from "react";

import { ArrowRight, BadgeCheck, Bell, ChevronDown, Lock } from "lucide-react";

import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { trackCtaClick } from '@/lib/analytics/gtm';

import { Container } from "@/components/ui/container";
import { textures } from "@/lib/assets/textures";
import { SectionLabel } from "@/components/ui/section-label";
import {
  REGISTRATION_STATUS,
  type RegionRegistration,
  type RegistrationStatus,
} from "@/lib/constants/regionStatus";

type RegistrationRegionStatusSectionProps = {
  /**
   * Contrato preparado para el subloop de notificaciones. Mientras no exista
   * backend el CTA queda deshabilitado y este handler no se invoca.
   */
  onNotify?: (regionId: string) => void;
};

/** Copy seguro para el detalle de una región cerrada: no afirma fechas. */
const CLOSED_DETAILS =
  "Las inscripciones para esta región se encuentran cerradas. Consulta los canales oficiales para futuras novedades.";

type StatusTheme = {
  badge: string;
  badgeTone: string;
  icon: typeof Lock;
  card: string;
  iconWrap: string;
  headline: string;
  body: string;
  map: string;
  /** Borde y halo al pasar el cursor o al recibir foco de teclado. */
  hover: string;
};

/**
 * La diferencia entre estados se lee sin depender del color: cambia el icono,
 * el texto del badge y el titular. El color solo refuerza.
 */
const STATUS_THEME: Record<RegistrationStatus, StatusTheme> = {
  closed: {
    badge: "Cerrada",
    badgeTone: "border-white/15 bg-white/[0.06] text-white/60",
    icon: Lock,
    card: "border-white/[0.07] bg-[#04203c]",
    // El candado va en rojo Marathon: comunica el bloqueo sin teñir la card.
    iconWrap: "border-marathon-red/35 bg-marathon-red/10 text-marathon-red",
    headline: "text-white/70",
    body: "text-white/45",
    map: "opacity-[0.07]",
    hover:
      "hover:border-marathon-red/35 focus-within:border-marathon-red/35 hover:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(226,27,45,0.14)] focus-within:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(226,27,45,0.14)]",
  },
  upcoming: {
    badge: "Próximamente",
    badgeTone: "border-marathon-gold/40 bg-marathon-gold/10 text-marathon-gold",
    icon: Bell,
    card: "border-white/[0.12] bg-white/[0.055]",
    iconWrap: "border-marathon-gold/30 bg-marathon-gold/10 text-marathon-gold",
    headline: "text-marathon-cream",
    body: "text-white/70",
    map: "opacity-[0.13]",
    hover:
      "hover:border-marathon-gold/40 focus-within:border-marathon-gold/40 hover:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(216,168,75,0.16)] focus-within:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(216,168,75,0.16)]",
  },
  open: {
    badge: "Inscripciones abiertas",
    badgeTone:
      "border-marathon-green/45 bg-marathon-green/15 text-marathon-green",
    icon: BadgeCheck,
    card: "border-marathon-green/[0.30] bg-white/[0.075]",
    iconWrap:
      "border-marathon-green/40 bg-marathon-green/15 text-marathon-green",
    headline: "text-white",
    body: "text-white/75",
    map: "opacity-[0.16]",
    hover:
      "hover:border-marathon-green/45 focus-within:border-marathon-green/45 hover:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(7,150,105,0.2)] focus-within:shadow-[0_16px_40px_rgba(2,17,35,0.45),0_0_0_1px_rgba(7,150,105,0.2)]",
  },
};

/**
 * Estado de inscripciones por región en /inscripciones.
 *
 * Módulo compacto de resumen: no repite el peso del Home ni del Hero. Comparte
 * data y contrato de estado con el Home a través de `regionStatus`, pero su
 * composición es propia — tres tarjetas densas de una sola altura.
 */
export default function RegistrationRegionStatusSection({
  onNotify,
}: RegistrationRegionStatusSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="estado-de-inscripciones"
      aria-labelledby="estado-de-inscripciones-title"
      className="group/module relative overflow-hidden bg-marathon-navy py-[clamp(2.25rem,3.4vw,3.25rem)] text-white"
    >
      {/*
        Identidad de marca del módulo. Va en su propia capa al fondo (z-0) para
        que nunca compita con las tarjetas ni con el copy: la identidad por
        región la siguen dando los fondos regionales de cada card.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        {/*
          Sello Copa como marca de agua de impresión. El asset es navy sobre
          claro, así que se invierte a blanco puro para leerse sobre el Navy.
        */}
        <img
          src={textures.copaStamp}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -right-14 -top-16 w-[clamp(150px,20vw,320px)] rotate-[-16deg] opacity-[0.08] [filter:brightness(0)_invert(1)] sm:-right-10 sm:-top-12"
        />

        {/*
          Chevrons: empujan la composición desde la esquina inferior derecha,
          saliendo parcialmente del contenedor. Se ocultan en móvil para no
          amontonar decoración sobre las tarjetas apiladas.
        */}
        <img
          src={textures.chevronsRed}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -bottom-6 -right-16 hidden w-[clamp(110px,12vw,190px)] opacity-[0.26] transition-transform duration-300 ease-out group-hover/module:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/module:translate-x-0 md:block"
        />
      </div>

      <Container className="relative z-10 w-full" style={{ maxWidth: "88rem" }}>
        <SectionLabel tone="red">Estado de inscripciones</SectionLabel>
        <h2
          id="estado-de-inscripciones-title"
          className="mt-2.5 font-normal uppercase leading-[0.92] text-marathon-cream"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: "clamp(2.1rem, 3.4vw, 3.2rem)",
          }}
        >
          Revisa el estado de tu región
        </h2>

        <div className="mt-6 grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {REGISTRATION_STATUS.map((region) => (
            <RegionCard
              key={region.id}
              region={region}
              isExpanded={expandedId === region.id}
              onToggleDetails={() =>
                setExpandedId((current) =>
                  current === region.id ? null : region.id,
                )
              }
              onNotify={onNotify}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

type RegionCardProps = {
  region: RegionRegistration;
  isExpanded: boolean;
  onToggleDetails: () => void;
  onNotify?: (regionId: string) => void;
};

/** Una sola tarjeta para los tres estados: lo único que cambia es el tema. */
function RegionCard({
  region,
  isExpanded,
  onToggleDetails,
  onNotify,
}: RegionCardProps) {
  const theme = STATUS_THEME[region.status];
  const Icon = theme.icon;
  const badgeLabel = region.availabilityLabel ?? theme.badge;

  return (
    <article
      className={`group relative flex min-h-[268px] flex-col overflow-hidden rounded-2xl border p-5 transition-[transform,border-color,box-shadow] duration-[240ms] ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 ${theme.card} ${theme.hover}`}
    >
      {/*
        Atmósfera regional: el mismo mapa del Home, ampliado y difuminado, que
        entra al pasar el cursor o al enfocar un CTA con teclado. Es ambiente,
        nunca protagonista — se queda detrás de todo el contenido.
      */}
      <img
        src={region.mapSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -right-10 -top-6 h-[150%] w-auto scale-125 object-contain opacity-0 blur-[6px] transition-opacity duration-[280ms] ease-out group-hover:opacity-[0.18] group-focus-within:opacity-[0.18]"
      />

      {/* Silueta regional como marca de agua: identifica sin competir. */}
      <img
        src={region.mapSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute -right-4 bottom-2 h-24 w-auto object-contain ${theme.map}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <h3
          className="font-normal uppercase leading-none text-marathon-cream"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: "clamp(1.5rem, 1.9vw, 1.9rem)",
          }}
        >
          {region.region}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 font-montserrat text-[0.58rem] font-black uppercase tracking-[0.12em] ${theme.badgeTone}`}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col items-center text-center">
        <span
          aria-hidden="true"
          className={`flex h-12 w-12 items-center justify-center rounded-full border ${theme.iconWrap}`}
        >
          <Icon size={21} strokeWidth={2.1} />
        </span>

        <p
          className={`mt-3 font-normal uppercase leading-[0.98] ${theme.headline}`}
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: "clamp(1.15rem, 1.45vw, 1.45rem)",
          }}
        >
          {region.headline}
        </p>

        <p
          className={`mt-2 max-w-[30ch] text-[0.82rem] leading-6 ${theme.body}`}
        >
          {region.description}
        </p>

        <div className="mt-auto w-full space-y-2 pt-4">
          {region.status === "closed" && (
            <button
              type="button"
              onClick={onToggleDetails}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-1.5 font-montserrat text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-red [&:hover_svg]:translate-x-[2px]"
            >
              Ver detalles
              <ChevronDown
                size={13}
                strokeWidth={2.6}
                aria-hidden="true"
                className={`transition-transform duration-200 ease-out motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {region.status === "upcoming" && (
            <NotifyAction
              label="Notificarme"
              regionId={region.id}
              onNotify={onNotify}
            />
          )}

          {region.status === "open" && (
            <a
              href="#registration-form"
              onClick={(event) => {
                trackCtaClick({
                  cta_name: 'inscribir_institucion',
                  cta_location: `registration_region_${region.id}`,
                  destination: '#registration-form',
                });
                scrollToAnchor(event, "registration-form");
              }}
              className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-marathon-red font-montserrat text-[0.64rem] font-black uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-[#c41626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Inscribir mi institución
              <ArrowRight
                size={13}
                strokeWidth={2.8}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          )}

          {/* Acción secundaria de captura de interés. Mismo mecanismo para
              todas las regiones: solo cambia la etiqueta según el estado. */}
          {region.status !== "upcoming" && (
            <NotifyAction
              label={
                region.status === "closed"
                  ? "Avísame de la próxima convocatoria"
                  : "Recibir novedades"
              }
              regionId={region.id}
              onNotify={onNotify}
              variant="ghost"
            />
          )}
        </div>
      </div>

      {isExpanded && region.status === "closed" && (
        <p className="relative mt-3 border-t border-white/10 pt-3 text-left text-[0.78rem] leading-6 text-white/55">
          {CLOSED_DETAILS}
        </p>
      )}

      {/* La línea de fecha solo aparece si la data la trae: nunca un placeholder. */}
      {(region.closingDate || region.openingDate) && (
        <p className="relative mt-3 border-t border-white/10 pt-3 text-left font-montserrat text-[0.58rem] font-black uppercase tracking-[0.12em] text-white/45">
          {region.closingDate
            ? `Cierre: ${region.closingDate}`
            : `Apertura: ${region.openingDate}`}
        </p>
      )}
    </article>
  );
}

type NotifyActionProps = {
  label: string;
  regionId: string;
  onNotify?: (regionId: string) => void;
  variant?: "solid" | "ghost";
};

/**
 * Acción de captura de interés, una sola para todas las regiones.
 *
 * Todavía no existe backend de notificaciones: sin `onNotify` el botón queda
 * deshabilitado con su helper, en vez de abrir un flujo que fallaría o —peor—
 * fingir un éxito que no ocurrió.
 */
function NotifyAction({
  label,
  regionId,
  onNotify,
  variant = "solid",
}: NotifyActionProps) {
  const disabled = !onNotify;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={onNotify ? () => onNotify(regionId) : undefined}
        className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-montserrat text-[0.6rem] font-black uppercase leading-tight tracking-[0.1em] transition-[background-color,border-color,opacity] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marathon-gold motion-reduce:transition-none [&:hover_svg]:translate-x-[1px] ${
          variant === "solid"
            ? "border border-marathon-gold/45 bg-marathon-gold/10 text-marathon-gold enabled:hover:border-marathon-gold/70 enabled:hover:bg-marathon-gold/20"
            : "border border-white/15 bg-transparent text-white/70 enabled:hover:border-white/35 enabled:hover:text-white"
        }`}
      >
        <Bell
          size={12}
          strokeWidth={2.6}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
        />
        {label}
      </button>
      {disabled && (
        // "Próximamente" se confundiría con el estado de la región: sobre una
        // card abierta parecería que la sede abre pronto. El helper nombra la
        // función, no la región.
        <span className="font-montserrat text-[0.55rem] font-black uppercase tracking-[0.14em] text-white/40">
          Avisos en preparación
        </span>
      )}
    </div>
  );
}
