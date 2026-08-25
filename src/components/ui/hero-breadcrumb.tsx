import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { HERO_TYPE } from '@/lib/constants/hero-typography';

/**
 * Breadcrumb de los hero internos.
 *
 * El patron es el que ya tenian Sedes e Inscripciones hardcodeado. Los tonos
 * solo cambian porque cada hero pasa de fondo oscuro a papel en un breakpoint
 * distinto; la tipografia y el spacing son identicos en los cuatro.
 */
type HeroBreadcrumbTone = 'lg' | 'md' | 'paper';

const TONES: Record<HeroBreadcrumbTone, { list: string; separator: string; current: string }> = {
  lg: {
    list: 'text-white/70 lg:text-marathon-gray',
    separator: 'text-white/45 lg:text-marathon-gray/50',
    current: 'text-marathon-cream lg:text-marathon-navy',
  },
  md: {
    list: 'text-white/70 md:text-marathon-gray',
    separator: 'text-white/45 md:text-marathon-gray/50',
    current: 'text-marathon-cream md:text-marathon-navy',
  },
  paper: {
    list: 'text-marathon-gray',
    separator: 'text-marathon-gray/50',
    current: 'text-marathon-navy',
  },
};

function HeroBreadcrumb({
  page,
  tone = 'lg',
}: {
  /** Nombre de la pagina actual, ultimo nivel del breadcrumb. */
  page: string;
  /** Breakpoint en el que el hero pasa a fondo papel. */
  tone?: HeroBreadcrumbTone;
}) {
  const palette = TONES[tone];

  return (
    <nav aria-label="Ruta de navegación">
      <ol className={`flex items-center gap-2 ${HERO_TYPE.eyebrow} ${palette.list}`}>
        <li>
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-marathon-red focus-visible:text-marathon-red"
          >
            Inicio
          </Link>
        </li>
        <li aria-hidden="true" className={palette.separator}>
          <ChevronRight size={13} strokeWidth={3} />
        </li>
        <li aria-current="page" className={palette.current}>
          {page}
        </li>
      </ol>
    </nav>
  );
}

export { HeroBreadcrumb };
