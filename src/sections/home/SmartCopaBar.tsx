import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { StatusBadge } from '@/components/ui/status-badge';
import { Surface } from '@/components/ui/surface';
import { trackCtaClick } from '@/lib/analytics/gtm';
import { EXTERNAL_LINK_PROPS, FAN_APP_URL } from '@/lib/constants/links';

type CopaBarState = 'upcoming' | 'match-day' | 'live' | 'completed';

type CopaBarConfig = {
  state: CopaBarState;
  eyebrow: string;
  primaryLead: string;
  primaryDate: string;
  secondary: string;
  ctaLabel: string;
  ctaRoute: string;
  secondaryCue: string;
  secondaryRoute: string;
  milestoneIsoDate: string;
};

const COPA_BAR_CONFIG: CopaBarConfig = {
  state: 'upcoming',
  eyebrow: 'PRÓXIMA ETAPA',
  primaryLead: 'LA COPA ARRANCA EL',
  primaryDate: '24 DE AGOSTO',
  secondary: 'Prepárate para seguir cada historia, jugada y momento del torneo.',
  ctaLabel: 'ABRIR FAN APP',
  ctaRoute: FAN_APP_URL,
  secondaryCue: 'Ver sedes',
  secondaryRoute: '/sedes',
  milestoneIsoDate: '2026-08-24',
};

const stateLabels: Record<CopaBarState, string> = {
  upcoming: 'Próxima etapa',
  'match-day': 'Hoy juega la Copa',
  live: 'En vivo',
  completed: 'Jornada finalizada',
};

export default function SmartCopaBar() {
  const config = COPA_BAR_CONFIG;

  const handleCtaClick = () => {
    trackCtaClick({
      cta_name: 'abrir_fan_app',
      cta_location: 'smart_copa_bar',
      destination: config.ctaRoute,
    });
  };

  return (
    <section
      aria-labelledby="smart-copa-bar-title"
      className="relative overflow-hidden bg-[#020817] py-4 text-marathon-text-on-dark md:py-5"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marathon-action-secondary/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(0,80,164,0.22)_0%,rgba(2,8,23,0)_42%),repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_42px)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <Surface
          variant="scoreboard"
          className="group relative overflow-hidden border-x-0 border-y border-white/14 bg-[#041631] shadow-[0_18px_44px_rgba(0,0,0,0.28)] md:border-x"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-marathon-action-primary"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left animate-[scoreboard-rule_850ms_cubic-bezier(0.2,0,0,1)_both] bg-gradient-to-r from-marathon-action-primary via-white/45 to-transparent motion-reduce:animate-none"
            aria-hidden="true"
          />

          <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(10rem,0.55fr)_minmax(0,1.45fr)_auto] md:items-center md:gap-6 md:px-7 md:py-6">
            <div className="flex flex-col gap-3">
              <StatusBadge
                variant="upcoming"
                className="border-white/16 bg-white/8 text-marathon-gold"
              >
                <span
                  className="mr-2 h-1.5 w-1.5 rounded-full bg-marathon-gold"
                  aria-hidden="true"
                />
                {config.eyebrow}
              </StatusBadge>
              <p className="font-montserrat text-[0.68rem] font-black uppercase tracking-[0.24em] text-white/48">
                Estado oficial: {stateLabels[config.state]}
              </p>
            </div>

            <div className="min-w-0">
              <h2
                id="smart-copa-bar-title"
                className="font-montserrat text-[clamp(1.55rem,7vw,2.25rem)] font-black uppercase leading-[0.98] tracking-[-0.035em] text-white md:text-[clamp(1.75rem,2.65vw,2.75rem)]"
              >
                {config.primaryLead}{' '}
                <time
                  dateTime={config.milestoneIsoDate}
                  className="text-marathon-action-primary"
                >
                  {config.primaryDate}
                </time>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/74 md:text-base">
                {config.secondary}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Button
                asChild
                variant="action"
                size="cta"
                className="min-w-[220px] rounded-none font-montserrat text-sm font-black uppercase tracking-[0.08em]"
              >
                <a href={config.ctaRoute} {...EXTERNAL_LINK_PROPS} onClick={handleCtaClick}>
                  {config.ctaLabel}
                </a>
              </Button>
              <Link
                to={config.secondaryRoute}
                className="font-montserrat text-xs font-black uppercase tracking-[0.16em] text-white/62 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041631]"
              >
                {config.secondaryCue}
              </Link>
            </div>
          </div>
        </Surface>
      </Container>

      <style>{`
        @keyframes scoreboard-rule {
          from {
            transform: scaleX(0);
            opacity: 0.45;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
