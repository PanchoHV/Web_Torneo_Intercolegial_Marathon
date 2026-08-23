import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Surface } from '@/components/ui/surface';
import { trackNavigationClick } from '@/lib/analytics/gtm';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

const navLinks = [
  { label: 'La Copa', href: '/la-copa' },
  { label: 'Sedes', href: '/sedes' },
  { label: 'Inscripciones', href: '/inscripciones' },
  // La Fan App es un producto externo: se abre fuera del router.
  { label: 'Fan App', href: FAN_APP_URL },
  { label: 'FAQ', href: '/faq' },
] as const;

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  const handleNavigate = useCallback(
    (href: string, navLocation: 'desktop' | 'mobile' | 'logo', navLabel: string) => {
      trackNavigationClick({
        nav_label: navLabel,
        nav_target: href,
        nav_location: navLocation,
      });
      setMobileOpen(false);

      // Los destinos absolutos (Fan App) viven fuera del sitio.
      if (/^https?:\/\//.test(href)) {
        window.open(href, EXTERNAL_LINK_PROPS.target, 'noopener,noreferrer');
        return;
      }

      navigate(href);
    },
    [navigate]
  );

  const handleLogoClick = useCallback(() => {
    handleNavigate('/', 'logo', 'Inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [handleNavigate]);

  return (
    <>
      <nav aria-label="Navegación principal" className="fixed inset-x-0 top-0 z-50">
        <Surface
          variant="stadium"
          className={`border-b border-white/10 text-white transition-shadow duration-300 ${
            scrolled ? 'shadow-elevated' : 'shadow-surface'
          }`}
        >
          <Container className="flex min-h-[var(--header-height)] items-center gap-4">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex min-w-0 items-center gap-3 rounded-lg p-1 text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Ir al inicio"
            >
              <img
                src="/marathon-logo.webp"
                alt="Copa Nacional Marathon Intercolegial 2026"
                className="h-12 w-auto shrink-0 sm:h-14 lg:h-16"
                onError={(event) => {
                  (event.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="hidden min-w-0 flex-col leading-tight sm:flex">
                <span className="font-montserrat text-[0.72rem] font-black uppercase tracking-[0.22em] text-white/75">
                  Copa Nacional
                </span>
                <span className="font-montserrat text-sm font-black uppercase tracking-[0.12em] text-white">
                  Marathon 2026
                </span>
              </span>
            </button>

            <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                return (
                  <Button
                    key={link.href}
                    type="button"
                    variant="ghost"
                    onClick={() => handleNavigate(link.href, 'desktop', link.label)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`h-11 rounded-lg px-4 font-inter text-sm font-semibold text-white/78 transition-colors hover:bg-white/10 hover:text-white ${
                      isActive ? 'bg-white/10 text-white' : ''
                    }`}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </div>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <Button
                type="button"
                variant="action"
                size="cta"
                onClick={() => handleNavigate(FAN_APP_URL, 'desktop', 'Abrir Fan App')}
                className="rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] shadow-button"
              >
                Abrir Fan App
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="ml-auto inline-flex h-touch-target w-touch-target items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-panel"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </Container>
        </Surface>
      </nav>

      <div
        id="mobile-navigation-panel"
        aria-hidden={!mobileOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setMobileOpen(false);
          }
        }}
        className={`fixed inset-x-0 top-[var(--header-height)] z-40 overflow-y-auto transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Surface variant="stadium" className="min-h-[calc(100vh-var(--header-height))] border-t border-white/10">
          <Container className="flex min-h-[inherit] flex-col py-6">
            <div className="flex items-center justify-between gap-3 pb-5">
              <div className="min-w-0">
                <p className="font-montserrat text-[0.72rem] font-black uppercase tracking-[0.22em] text-white/60">
                  Menú principal
                </p>
                <p className="mt-2 font-inter text-sm text-white/55">
                  Navegación oficial del torneo
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 font-inter text-xs text-white/55">
                Pulsa el icono para cerrar
              </span>
            </div>

            <div className="grid gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavigate(link.href, 'mobile', link.label)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-touch-target items-center justify-between rounded-lg border px-5 py-4 text-left font-montserrat text-lg font-black tracking-[0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                      isActive
                        ? 'border-white/20 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-white/45">→</span>
                  </button>
                );
              })}

              <Button
                type="button"
                variant="action"
                size="cta"
                onClick={() => handleNavigate(FAN_APP_URL, 'mobile', 'Abrir Fan App')}
                className="mt-3 w-full justify-center rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] shadow-button"
              >
                Abrir Fan App
              </Button>
            </div>
          </Container>
        </Surface>
      </div>
    </>
  );
}
