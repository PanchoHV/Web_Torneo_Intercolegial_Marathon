/**
 * Contrato tipografico unico de los hero internos.
 *
 * El master es CopaHeroSection: estos valores estan extraidos de ahi tal cual.
 * /la-copa, /sedes, /inscripciones y /fan-app consumen el mismo sistema para
 * que los titulares pertenezcan a la misma familia editorial.
 */
const HERO_DISPLAY_FONT = '"Bebas Neue", "Arial Narrow", sans-serif';

export const HERO_TYPE = {
  eyebrow: 'font-montserrat text-[0.7rem] font-black uppercase tracking-[0.18em]',
  title: 'font-normal uppercase leading-[0.84]',
  accent: 'font-normal uppercase leading-[0.94]',
  body: 'font-inter text-[15px] leading-[1.6] sm:text-[16px]',
  cta: 'font-montserrat text-[12px] font-black uppercase tracking-[0.08em]',
  // Rhythm vertical: eyebrow -> title -> accent -> body -> CTA.
  titleGap: 'mt-4',
  accentGap: 'mt-3 lg:mt-4',
  bodyGap: 'mt-5',
  ctaGap: 'mt-7',
} as const;

export const HERO_TITLE_STYLE = {
  fontFamily: HERO_DISPLAY_FONT,
  fontSize: 'clamp(3.1rem, 10.5vw, 7rem)',
} as const;

export const HERO_ACCENT_STYLE = {
  fontFamily: HERO_DISPLAY_FONT,
  fontSize: 'clamp(1.5rem, 5.4vw, 2.3rem)',
} as const;
