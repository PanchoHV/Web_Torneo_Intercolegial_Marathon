import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Calendar,
  ExternalLink,
  Instagram,
  LayoutDashboard,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Surface } from '@/components/ui/surface';

const tournamentLinks = [
  { label: 'La Copa', href: '/la-copa' },
  { label: 'Sedes', href: '/sedes' },
  { label: 'Preinscripciones', href: '/preinscripciones' },
  { label: 'Fan App', href: '/fan-app' },
  { label: 'FAQ', href: '/faq' },
] as const;

const participantHubs = [
  { label: 'Costa', icon: MapPin },
  { label: 'Sierra y Amazonía', icon: MapPin },
  { label: 'Final Nacional', icon: Trophy },
] as const;

const officialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/593989655352?text=Hola%2C%20quiero%20unirme%20al%20canal%20oficial%20del%20Torneo%20Intercolegial%20Marathon.',
    icon: MessageCircle,
    color: 'hover:bg-green-500/20 hover:text-green-300',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/Copa-Nacional-Intercolegial-Marathon-61575560775997/',
    icon: ExternalLink,
    color: 'hover:bg-blue-500/20 hover:text-blue-300',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/copamarathonec/',
    icon: Instagram,
    color: 'hover:bg-pink-500/20 hover:text-pink-300',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@copamarathonec',
    icon: ExternalLink,
    color: 'hover:bg-purple-500/20 hover:text-purple-300',
  },
  {
    label: 'Flickr',
    href: 'https://www.flickr.com/photos/203541641@N03/albums/',
    iconUrl: '/images/mailing/flickr.png',
    color: 'hover:bg-sky-500/20 hover:text-sky-300',
  },
] as const;

const trustStats = [
  { label: '600+ Equipos', icon: Trophy },
  { label: '12.000+ Jugadores', icon: Users },
  { label: '1.400+ Partidos', icon: Calendar },
] as const;

export default function Footer() {
  const navigate = useNavigate();
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
      { threshold: 0.08 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-marathon-surface-stadium text-marathon-text-on-dark"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.04)_75%,transparent_75%,transparent)] bg-[length:52px_52px] opacity-10" />

      <Container className="relative py-12 sm:py-16">
        <div
          className={`grid gap-10 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          } lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]`}
        >
          <div className="grid gap-6">
            <div className="grid gap-5 rounded-2xl border border-white/10 bg-marathon-surface-stadium-raised p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
                  <img
                    src="/marathon-logo.webp"
                    alt="Copa Nacional Marathon Intercolegial Ecuador 2026"
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      const target = event.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML =
                        '<span class="text-xl font-black text-white">M</span>';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-montserrat text-base font-black uppercase leading-tight tracking-[0.08em] text-white sm:text-lg">
                    Copa Nacional Marathon Intercolegial Ecuador 2026
                  </h3>
                  <p className="mt-2 max-w-xl font-inter text-sm leading-relaxed text-white/68">
                    Competencia colegial de alcance nacional. Formando campeones dentro y fuera de
                    la cancha.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {trustStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-marathon-action-primary text-white shadow-button">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-montserrat text-sm font-black text-white">
                          {stat.label.split(' ')[0]}
                        </div>
                        <div className="font-inter text-xs text-white/55">
                          {stat.label.split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-marathon-surface-stadium-raised p-5 sm:p-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-marathon-action-primary text-white shadow-button">
                  <ShieldCheck size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-montserrat text-sm font-black uppercase tracking-[0.08em] text-white">
                    Equipo interno
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    Acceso seguro al CRM de onboarding.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/admin/login')}
                className="w-full justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-montserrat text-sm font-black uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white"
              >
                <LayoutDashboard size={17} />
                Acceso CRM
              </Button>
            </div>
          </div>

          <div className="grid gap-8">
            <nav aria-label="Navegación secundaria" className="grid gap-8 sm:grid-cols-3">
              <FooterColumn title="El Torneo" delay={80}>
                {tournamentLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="group -mx-3 flex min-h-11 items-center rounded-lg px-3 text-left font-inter text-sm text-white/70 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-marathon-gold transition-all duration-300 group-hover:w-full" />
                    </span>
                  </button>
                ))}
              </FooterColumn>

              <FooterColumn title="Sedes" delay={140}>
                {participantHubs.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-h-11 items-center gap-2 font-inter text-sm text-white/70"
                    >
                      <Icon size={13} className="shrink-0 text-marathon-gold/80" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </FooterColumn>

              <FooterColumn title="Canales Oficiales" delay={200}>
                <div className="flex flex-col gap-2">
                  {officialLinks.map((link) => {
                    const Icon = 'icon' in link ? link.icon : null;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`group -mx-2.5 inline-flex min-h-11 items-center gap-2.5 rounded-lg px-2.5 py-2 font-inter text-sm text-white/70 transition-colors ${link.color}`}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                          {'iconUrl' in link ? (
                            <img src={link.iconUrl} alt="" className="h-5 w-5 object-contain" />
                          ) : (
                            Icon && <Icon size={15} />
                          )}
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

            <Surface
              variant="stadium"
              className="border border-white/10 bg-marathon-surface-stadium-raised"
            >
              <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="font-montserrat text-xs font-black uppercase tracking-[0.22em] text-marathon-gold">
                    VIVE LA COPA EN TODO MOMENTO
                  </p>
                  <p className="mt-2 max-w-2xl font-inter text-sm leading-relaxed text-white/68">
                    Sigue partidos, resultados y actualidad desde la Fan App con una experiencia
                    móvil pensada para el torneo.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="action"
                  size="cta"
                  onClick={() => navigate('/fan-app')}
                  className="w-full justify-center rounded-lg px-6 font-montserrat text-sm font-black uppercase tracking-[0.08em] shadow-button lg:w-auto"
                >
                  Abrir Fan App
                </Button>
              </div>
            </Surface>
          </div>
        </div>

        <div
          className={`mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } lg:flex-row lg:items-center lg:justify-between`}
        >
          <span className="font-inter text-xs text-white/42">
            © 2026 Copa Nacional Marathon Intercolegial Ecuador
          </span>

          <div className="flex flex-col items-start gap-1 text-left font-inter text-xs text-white/34 lg:flex-row lg:items-center lg:gap-6">
            <span>Organizado con respaldo de Fundación Marathon Sports Ecuador</span>
            <span className="hidden text-white/20 lg:inline">•</span>
            <span>Diseñado por Trei Creatividad Digital</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  delay = 0,
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
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`min-w-0 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <h4 className="mb-4 flex items-center gap-2 font-montserrat text-[0.75rem] font-black uppercase tracking-[0.2em] text-white/88">
        <span className="h-1.5 w-1.5 rounded-full bg-marathon-gold" />
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
