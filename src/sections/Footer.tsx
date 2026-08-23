import { Link } from 'react-router';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

const BEBAS = '"Bebas Neue", sans-serif';

/** Arte de cierre. El nombre original lleva espacio: hay que codificarlo. */
const CTA_ART =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-jugador%20de%20espaldas.webp';

/** Contacto comercial del estudio que desarrolla el sitio. */
const TREI_WHATSAPP =
  'https://wa.me/593963576242?text=Hola%2C%20quisiera%20conocer%20los%20servicios%20de%20Trei%20Creatividad%20Digital.';

/** Iconografía social oficial (R2). El icono de X espera a que se valide el perfil. */
const SOCIAL_ICONS = {
  facebook:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Icon%20Facebook.webp',
  instagram:
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Icon%20Instagram.webp',
  tiktok: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Icon%20TikTok.webp',
  youtube: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Icon%20Youtube.webp',
  x: 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Icon%20X.webp',
} as const;

/* -------------------------------------------------------------------------- */
/* Datos                                                                       */
/* -------------------------------------------------------------------------- */

/** Rutas internas: todas existen en el router público. */
const navigationLinks = [
  { label: 'La Copa', to: '/la-copa' },
  { label: 'Sedes', to: '/sedes' },
  { label: 'Inscripciones', to: '/inscripciones' },
  { label: 'Fan App', to: FAN_APP_URL, external: true },
  { label: 'FAQ', to: '/faq' },
] as const;

/**
 * Solo recursos con destino real verificado.
 * Reglamento, Calendario y Noticias no tienen destino todavía: no se listan.
 */
const resourceLinks = [
  {
    label: 'Galería',
    href: 'https://www.flickr.com/photos/203541641@N03/albums/',
  },
  {
    label: 'Contacto',
    href: 'https://wa.me/593989655352?text=Hola%2C%20quiero%20unirme%20al%20canal%20oficial%20del%20Torneo%20Intercolegial%20Marathon.',
  },
] as const;

/**
 * Solo redes con perfil real verificado. Los href no cambian: vienen del Footer anterior.
 * WhatsApp y Flickr salen de esta fila — sus destinos ya viven en Recursos (Contacto y Galería).
 */
const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/Copa-Nacional-Intercolegial-Marathon-61575560775997/',
    icon: SOCIAL_ICONS.facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/copamarathonec/',
    icon: SOCIAL_ICONS.instagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@copamarathonec',
    icon: SOCIAL_ICONS.tiktok,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@copamarathonec',
    icon: SOCIAL_ICONS.youtube,
  },
] as const;

const columnTitleClass =
  'text-[0.82rem] font-normal uppercase tracking-[0.18em] text-[#E21B2D]';

const linkClass =
  'inline-block text-[0.9rem] leading-none text-white/72 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const shellClass = 'mx-auto w-full max-w-[1500px] px-[clamp(1.5rem,5vw,5rem)]';

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* ------------------------------------------------- NIVEL A · CTA */}
      <section
        aria-label="Vive la Copa"
        className="relative isolate flex min-h-[clamp(170px,11.5vw,215px)] items-center overflow-hidden bg-[#062A4F]"
      >
        <img
          src={CTA_ART}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[22%_center] sm:object-[15%_center] lg:object-[left_center]"
        />
        {/* Gradiente navy suave: solo lo necesario para que el texto lea. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,42,79,0.55)_0%,rgba(6,42,79,0.2)_22%,rgba(6,42,79,0.78)_52%,rgba(6,42,79,0.92)_100%)]"
        />

        <div className={`${shellClass} py-[clamp(1.5rem,2.4vw,1.875rem)]`}>
          <div className="grid items-center gap-[clamp(1.25rem,2.4vw,2.5rem)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)_auto]">
            <span aria-hidden="true" className="hidden lg:block" />

            <div className="lg:text-center">
              <p
                className="text-[clamp(2.75rem,4vw,4.5rem)] font-normal uppercase leading-[0.85] tracking-[0.01em] text-[#F4F8FC]"
                style={{ fontFamily: BEBAS }}
              >
                Vive la Copa
              </p>
              <p className="mt-2 text-[clamp(0.7rem,1vw,0.86rem)] font-bold uppercase leading-snug tracking-[0.1em] text-white/80">
                Desde sus reglas, sus categorías y su historia.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={FAN_APP_URL}
                {...EXTERNAL_LINK_PROPS}
                className="inline-flex items-center justify-center gap-3 rounded-[7px] bg-[#E21B2D] px-7 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white transition-[background-color,transform] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#c41626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
              >
                Abrir en Fan App
                <span aria-hidden="true">→</span>
              </a>
              <Link
                to="/inscripciones"
                className="inline-flex items-center justify-center gap-3 rounded-[7px] border border-white/45 px-7 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-[2px] hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
              >
                Ir a inscripciones
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------- NIVEL B · Institucional */}
      <div className="border-t border-white/10 bg-[linear-gradient(180deg,#062A4F_0%,#041D36_100%)]">
        <div className={`${shellClass} py-[clamp(1.625rem,2.4vw,2.25rem)]`}>
          <div className="grid gap-[clamp(1.5rem,2.2vw,2rem)] md:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.1fr)]">
            {/* Marca */}
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/marathon-logo.webp"
                  alt="Copa Nacional Intercolegial Marathon Ecuador"
                  loading="lazy"
                  decoding="async"
                  className="h-[clamp(66px,5.4vw,84px)] w-auto shrink-0 object-contain"
                />
                <p className="max-w-[30ch] text-[0.86rem] leading-[1.5] text-white/70">
                  Competencia colegial de alcance nacional. Formando campeones dentro y fuera de la
                  cancha.
                </p>
              </div>

              <ul className="mt-3 flex flex-wrap items-center gap-3">
                {socialLinks.map(({ label, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center -ml-[9px] opacity-90 transition-[opacity,transform] duration-200 ease-out hover:-translate-y-[1px] hover:scale-[1.04] hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <img
                        src={icon}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={26}
                        className="h-auto w-[26px] object-contain"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navegación */}
            <nav aria-label="Navegación del sitio">
              <p className={columnTitleClass} style={{ fontFamily: BEBAS }}>
                Navegación
              </p>
              <ul className="mt-3.5 flex flex-col gap-3">
                {navigationLinks.map((link) => (
                  <li key={link.to}>
                    {'external' in link && link.external ? (
                      <a href={link.to} className={linkClass} {...EXTERNAL_LINK_PROPS}>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Recursos */}
            <nav aria-label="Recursos oficiales">
              <p className={columnTitleClass} style={{ fontFamily: BEBAS }}>
                Recursos
              </p>
              <ul className="mt-3.5 flex flex-col gap-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Acceso interno: href heredado tal cual del Footer anterior. */}
            <div className="border-t border-white/12 pt-5 lg:border-l lg:border-t-0 lg:pl-[clamp(1.25rem,2vw,2rem)] lg:pt-0">
              <p
                className="text-[0.8rem] font-normal uppercase tracking-[0.16em] text-white/55"
                style={{ fontFamily: BEBAS }}
              >
                Acceso equipo interno
              </p>
              <p className="mt-2 max-w-[32ch] text-[0.82rem] leading-[1.5] text-white/55">
                Acceso seguro a las herramientas de gestión y onboarding del torneo.
              </p>
              <Link
                to="/admin/login"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2.5 rounded-[7px] border border-white/20 bg-white/[0.04] px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/80 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-[1px] hover:border-white/35 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
              >
                Acceder al CRM
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------------- NIVEL C · Legales */}
        <div className="border-t border-white/10">
          <div
            className={`${shellClass} flex flex-col gap-2 py-4 text-[0.72rem] leading-relaxed text-white/45 lg:flex-row lg:items-center lg:justify-between lg:gap-6`}
          >
            <span>
              © 2026 Copa Nacional Intercolegial Marathon Ecuador. Todos los derechos reservados.
            </span>
            <span className="lg:text-center">
              Organizado con respaldo de Fundación Marathon Sports Ecuador
            </span>
            <span>
              Desarrollado por{' '}
              <a
                href={TREI_WHATSAPP}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white/60 underline decoration-white/25 underline-offset-[3px] transition-colors duration-200 hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Trei Creatividad Digital
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
