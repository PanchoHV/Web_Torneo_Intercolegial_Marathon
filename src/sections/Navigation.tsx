import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

const navLinks = [
  { label: 'El Torneo', href: '#sobre-el-torneo' },
  { label: 'Sedes', href: '#sedes' },
  { label: 'Preinscripción', href: '/inscripciones' },
  { label: 'Tutoriales', href: '#tutoriales' },
  { label: 'Preguntas', href: '#faq' },
];

// Toggle temporal para ocultar/desactivar el acceso a tutoriales
const SHOW_TUTORIALS = false;

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ─── Scroll detection ─── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── Active section tracking (mejorado) ─── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = '';

      navLinks.forEach((link) => {
        if (!link.href.startsWith('#')) return;
        const el = document.querySelector(link.href);
        if (!el) return;
        const top = (el as HTMLElement).offsetTop;
        const height = (el as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = link.href;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── FIX 1: Bloquear scroll del body cuando menú está abierto ─── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ─── FIX 2: Cerrar con tecla Escape ─── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  /* ─── FIX 3: Cerrar al hacer click fuera del overlay ─── */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) {
        setMobileOpen(false);
      }
    },
    []
  );

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith('#')) {
      navigate(href);
      return;
    }
    // Si estamos en otra página, ir a home primero
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        style={{
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled
            ? 'bg-white/[0.92] backdrop-blur-xl border-b border-marathon-blue/10 shadow-[0_18px_44px_rgba(6,42,79,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-3 sm:px-6 lg:h-[72px] lg:px-8">
          {/* FIX 4: Logo sin recarga de página */}
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 rounded-full pr-3 transition-transform duration-200 hover:scale-[1.01]"
          >
            <img
              src="/marathon-logo.webp"
              alt="Copa Nacional Marathon Intercolegial 2026"
              className="h-11 w-auto drop-shadow-[0_10px_18px_rgba(6,42,79,0.16)] sm:h-[50px] lg:h-[58px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="hidden font-montserrat text-sm font-extrabold uppercase leading-tight tracking-[0.08em] text-marathon-navy sm:block lg:text-base">
              Copa Nacional
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isTutorialDisabled = link.href === '#tutoriales' && !SHOW_TUTORIALS;
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      if (isTutorialDisabled) return;
                      handleNavClick(link.href);
                    }}
                    aria-disabled={isTutorialDisabled}
                    className={`group relative rounded-full px-3 py-2 font-inter text-sm font-semibold transition-all duration-300 ${
                      activeSection === link.href
                        ? 'text-marathon-red'
                        : 'text-marathon-blue hover:text-marathon-red'
                    } ${isTutorialDisabled ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    {link.label}
                    {/* FIX 5: Indicador activo animado (punto flotante) */}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-marathon-red transition-all duration-300 ${
                        activeSection === link.href
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-0 group-hover:opacity-60 group-hover:scale-75'
                      }`}
                    />
                  </button>
                );
              })}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => navigate('/inscripciones')}
            className="hidden rounded-full bg-marathon-red px-6 py-2.5 font-montserrat text-sm font-bold text-white shadow-[0_16px_32px_rgba(226,27,45,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] lg:block"
          >
            Preinscribir mi Equipo
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-marathon-blue lg:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay con stagger animation */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 overflow-y-auto bg-white/98 backdrop-blur-sm transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-20">
          {navLinks.map((link, i) => {
            const isTutorialDisabled = link.href === '#tutoriales' && !SHOW_TUTORIALS;
            return (
              <button
                key={link.href}
                onClick={() => {
                  if (isTutorialDisabled) return;
                  handleNavClick(link.href);
                }}
                aria-disabled={isTutorialDisabled}
                style={{
                  transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms',
                }}
                className={`w-full max-w-[320px] rounded-2xl border border-marathon-blue/10 bg-marathon-cream/65 px-5 py-4 font-montserrat text-xl font-bold text-marathon-blue shadow-[0_12px_28px_rgba(6,42,79,0.04)] transition-all duration-500 hover:border-marathon-red/25 hover:text-marathon-red ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                } ${isTutorialDisabled ? 'pointer-events-none opacity-50' : ''}`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate('/inscripciones');
            }}
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60 + 100}ms` : '0ms',
            }}
            className={`mt-3 w-full max-w-[280px] rounded-full bg-marathon-red px-7 py-3 font-montserrat text-base font-bold text-white shadow-button transition-all duration-500 ${
              mobileOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            Preinscribir mi Equipo
          </button>
        </div>
      </div>
    </>
  );
}
