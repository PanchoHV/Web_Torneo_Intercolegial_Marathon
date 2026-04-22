import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';

const navLinks = [
  { label: 'El Torneo', href: '#sobre-el-torneo' },
  { label: 'Inscripciones', href: '/inscripciones' },
  { label: 'Tutoriales', href: '#tutoriales' },
  { label: 'Comunicación', href: '#comunicacion' },
  { label: 'Preguntas', href: '#preguntas' },
];

export default function Navigation() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    navLinks.forEach((link) => {
      if (!link.href.startsWith('#')) return;
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith('#')) {
      navigate(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all [transition-duration:400ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
          scrolled
            ? 'bg-white/[0.9] backdrop-blur-xl border-b border-marathon-blue/10 shadow-[0_16px_40px_rgba(6,42,79,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-[60px] lg:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/marathon-logo.webp"
              alt="Copa Nacional Marathon Intercolegial 2026"
              className="h-11 sm:h-[50px] lg:h-[58px] w-auto drop-shadow-[0_10px_18px_rgba(6,42,79,0.16)]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="hidden sm:block font-montserrat font-extrabold text-sm lg:text-base leading-tight text-marathon-navy uppercase tracking-[0.08em]">
              Copa Nacional
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-inter font-semibold text-sm transition-colors duration-300 hover:text-marathon-red ${
                  activeSection === link.href ? 'text-marathon-red' : 'text-marathon-blue'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => navigate('/inscripciones')}
            className="hidden lg:block bg-marathon-red text-white font-montserrat font-bold text-sm rounded-full px-6 py-2.5 shadow-button hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300"
          >
            Inscribir mi Equipo
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-marathon-blue"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-white transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-6 px-4 py-20">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-montserrat font-bold text-xl text-marathon-blue hover:text-marathon-red transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/inscripciones')}
            className="mt-3 w-full max-w-[280px] bg-marathon-red text-white font-montserrat font-bold text-base rounded-full px-7 py-3 shadow-button"
          >
            Inscribir mi Equipo
          </button>
        </div>
      </div>
    </>
  );
}
