import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { SEGURO_PATH } from '@/lib/constants/seguroPage';

/**
 * Acceso al seguro estudiantil desde el Home.
 *
 * Es una franja, no una sección: un solo mensaje y un solo botón, para que no
 * compita con los CTA del hero ni con el estado de inscripciones que la precede.
 */
export default function InsuranceBannerSection() {
  return (
    <section
      id="seguro-home"
      aria-labelledby="seguro-home-title"
      className="relative overflow-hidden bg-[#07182f] py-5 text-white sm:py-6"
    >
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-marathon-red" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(216,168,75,0.14),transparent_42%)]"
      />

      <Container className="relative w-full" style={{ maxWidth: '88rem' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex items-start gap-3.5 md:items-center">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-marathon-gold/40 bg-marathon-gold/15 text-marathon-gold"
            >
              <ShieldCheck size={22} />
            </span>
            <div>
              <h2
                id="seguro-home-title"
                className="font-normal uppercase leading-[0.95] text-white"
                style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                }}
              >
                Seguro estudiantil para jugadores
              </h2>
              <p className="mt-1 text-[0.88rem] leading-6 text-white/75">
                Qué hacer ante un accidente, clínicas en convenio y documentos del seguro.
              </p>
            </div>
          </div>

          <Link
            to={SEGURO_PATH}
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-marathon-red px-5 font-montserrat text-[12px] font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(226,27,45,0.28)] transition-transform hover:scale-[1.02] motion-reduce:transition-none"
          >
            Ver seguro y documentos <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
