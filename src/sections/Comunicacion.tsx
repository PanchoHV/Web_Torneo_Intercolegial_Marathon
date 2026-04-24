import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BellRing, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: 'Canal oficial',
    description: 'Un solo punto de comunicación para anuncios y avisos del torneo.',
    icon: BellRing,
  },
  {
    title: 'Seguro',
    description: 'Información centralizada y compartida únicamente por el equipo organizador.',
    icon: ShieldCheck,
  },
  {
    title: 'Novedades y sorpresas',
    description: 'Recibe primero actualizaciones, dinámicas especiales y próximos hitos del torneo.',
    icon: Sparkles,
  },
] as const;

const officialChannelUrl =
  'https://wa.me/593995307806?text=Hola%2C%20quiero%20unirme%20al%20canal%20oficial%20del%20Torneo%20Intercolegial%20Marathon.';
const whatsappLogo =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-WP_ICon.webp';

const webBackground =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT%20Image%2024%20abr%202026,%2003_33_29%20p.webp';
const mobileBackground =
  'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-Whatsapp_Mobile.webp';

export default function Comunicacion() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.comunidad-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.comunidad-header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.comunidad-card',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.comunidad-grid', start: 'top 84%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comunicacion"
      ref={sectionRef}
      className="bg-white py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-marathon-blue shadow-[0_30px_60px_rgba(6,42,79,0.18)]">
          <div className="relative">
            <img
              src={mobileBackground}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover sm:hidden"
            />
            <img
              src={webBackground}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 hidden h-full w-full object-cover sm:block"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,42,79,0.9)_0%,rgba(6,42,79,0.72)_42%,rgba(6,42,79,0.92)_100%)] sm:bg-[linear-gradient(90deg,rgba(6,42,79,0.96)_0%,rgba(6,42,79,0.8)_42%,rgba(6,42,79,0.52)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:44px_44px] opacity-10" />
            <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.06fr_0.94fr] lg:items-end lg:p-10">
              <div className="comunidad-header max-w-[620px] rounded-[1.75rem] border border-white/14 bg-[linear-gradient(180deg,rgba(6,42,79,0.7),rgba(6,42,79,0.56))] p-5 shadow-[0_24px_50px_rgba(6,42,79,0.26)] backdrop-blur-md sm:p-6">
                <span className="inline-flex rounded-full border border-white/24 bg-white/14 px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white">
                  COMUNIDAD OFICIAL
                </span>
                <h2 className="mt-5 font-montserrat text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.02] tracking-[0.02em] text-white">
                  Únete al Canal Oficial del Torneo
                </h2>
                <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#7aa8c3] sm:text-lg">
                  Mantente al día con información oficial del torneo, novedades, avisos
                  importantes y sorpresas preparadas para los colegios participantes.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={officialChannelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-marathon-blue shadow-[0_16px_30px_rgba(255,255,255,0.18)] transition-all duration-200 hover:-translate-y-0.5 sm:px-5"
                  >
                    <img
                      src={whatsappLogo}
                      alt=""
                      aria-hidden="true"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    Unirme al canal oficial
                    <ArrowRight size={16} />
                  </a>
                  <span className="rounded-full border border-white/24 bg-white/12 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white">
                    Seguro y oficial
                  </span>
                </div>
              </div>

              <div className="comunidad-grid grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="comunidad-card rounded-[1.4rem] border border-white/18 bg-[linear-gradient(180deg,rgba(6,42,79,0.42),rgba(6,42,79,0.28))] p-4 backdrop-blur-md shadow-[0_18px_34px_rgba(6,42,79,0.16)]"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14 text-white">
                        <Icon size={20} />
                      </div>
                      <h3 className="mt-4 font-montserrat text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#7aa8c3]">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
