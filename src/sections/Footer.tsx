import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Instagram, MessageCircle, MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

const tournamentLinks = [
  { label: 'Sobre el Torneo', href: '#sobre-el-torneo' },
  { label: 'Categorías', href: '/inscripciones' },
  { label: 'Preinscripción', href: '/inscripciones' },
  { label: 'Tutoriales', href: '#tutoriales' },
] as const;

const participantHubs = [
  { label: 'Costa', icon: MapPin },
  { label: 'Sierra y Amazonía', icon: MapPin },
  { label: 'Final Nacional', icon: Trophy },
] as const;

const officialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/593995307806?text=Hola%2C%20quiero%20unirme%20al%20canal%20oficial%20del%20Torneo%20Intercolegial%20Marathon.',
    icon: MessageCircle,
    color: 'hover:bg-green-500/20 hover:text-green-400',
  },
  {
    label: 'Facebook',
    href: '#',
    icon: ExternalLink,
    color: 'hover:bg-blue-500/20 hover:text-blue-400',
  },
  {
    label: 'Instagram',
    href: '#',
    icon: Instagram,
    color: 'hover:bg-pink-500/20 hover:text-pink-400',
  },
  {
    label: 'Linktree',
    href: '#',
    icon: ExternalLink,
    color: 'hover:bg-purple-500/20 hover:text-purple-400',
  },
] as const;

const trustStats = [
  { label: '600+ Equipos', icon: Trophy },
  { label: '12.000+ Jugadores', icon: Users },
  { label: '1.400+ Partidos', icon: Calendar },
] as const;

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    if (!href.startsWith('#')) {
      navigate(href);
      return;
    }

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
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#070f1d] text-white"
    >
      {/* Efecto de fondo sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-500 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16">
        <div
          className={`flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Brand Column - Logo Corregido */}
          <div className="flex max-w-[380px] items-start gap-4 lg:shrink-0">
            <div className="shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur-sm">
                <img
                  src="/marathon-logo.webp"
                  alt="Copa Nacional Marathon Intercolegial Ecuador 2026"
                  className="h-full w-full object-contain drop-shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-xl font-black text-white">M</span>';
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="font-montserrat text-base font-black uppercase leading-tight tracking-[0.04em] text-white">
                Copa Nacional Marathon Intercolegial Ecuador 2026
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-white/50">
                Competencia colegial de alcance nacional. Formando campeones dentro y fuera de la cancha.
              </p>
              
              {/* Badge de confianza rápida */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="font-inter text-[0.7rem] font-medium text-white/70">
                  Inscripciones 2026 abiertas
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Grid */}
          <nav className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
            <FooterColumn title="El Torneo" delay={100}>
              {tournamentLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative block text-left font-inter text-sm text-white/60 transition-all duration-300 hover:pl-1 hover:text-white"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              ))}
            </FooterColumn>

            <FooterColumn title="Sedes" delay={200}>
              {participantHubs.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2 font-inter text-sm text-white/60">
                    <Icon size={13} className="shrink-0 text-cyan-400/70" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </FooterColumn>

            <FooterColumn title="Canales Oficiales" delay={300}>
              <div className="flex flex-col gap-2">
                {officialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className={`group inline-flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-inter text-sm text-white/60 transition-all duration-300 ${link.color} -mx-2.5`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                        <Icon size={15} />
                      </span>
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </FooterColumn>
          </nav>
        </div>

        {/* Stats Bar - Glassmorphism */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md lg:justify-between lg:gap-8">
            {trustStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="font-montserrat text-lg font-bold tracking-tight text-white">
                      {stat.label.split(' ')[0]}
                    </div>
                    <div className="font-inter text-xs text-white/50">
                      {stat.label.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                  {index < trustStats.length - 1 && (
                    <div className="hidden h-8 w-px bg-white/10 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } lg:flex-row lg:justify-between`}
        >
          <span className="font-inter text-xs text-white/40">
            © 2026 Copa Nacional Marathon Intercolegial Ecuador
          </span>
          
          <div className="flex flex-col items-center gap-1 text-center font-inter text-xs text-white/30 lg:flex-row lg:gap-6 lg:text-left">
            <span>Organizado con respaldo de Fundación Marathon Sports Ecuador</span>
            <span className="hidden text-white/20 lg:inline">•</span>
            <span>Diseñado por Trei Creatividad Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ 
  title, 
  children, 
  delay = 0 
}: { 
  title: string; 
  children: ReactNode; 
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`min-w-[160px] transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <h4 className="mb-4 flex items-center gap-2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/90">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}