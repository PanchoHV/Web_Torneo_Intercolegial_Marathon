import { Container } from '@/components/ui/container';

const BEBAS = '"Bebas Neue", sans-serif';

const chapters = [
  { href: '#que-es-la-copa', label: 'Qué es' },
  { href: '#formato', label: 'Formato' },
  { href: '#historia', label: 'Historia' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#reglamento', label: 'Reglamento' },
] as const;

export default function CopaChapterNav() {
  return (
    <section
      aria-label="Capítulos de La Copa"
      className="relative z-10 border-y border-[#DFD6C4] bg-[#F1ECE3]"
    >
      <Container className="w-full">
        <div className="overflow-x-auto py-3.5">
          <div className="mx-auto flex w-max items-center gap-x-5">
          <span
            className="shrink-0 text-[0.78rem] uppercase tracking-[0.26em] text-[#E21B2D]"
            style={{ fontFamily: BEBAS }}
          >
            Navega la Copa
          </span>

          <span aria-hidden="true" className="h-4 w-px shrink-0 bg-[#CDBFA6]" />

          <nav className="flex min-w-max items-center">
            {chapters.map((chapter, index) => (
              <span key={chapter.href} className="flex items-center">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-3 h-3 w-px bg-[#CDBFA6]"
                  />
                )}
                <a
                  href={chapter.href}
                  className="border-b-2 border-transparent pb-0.5 text-[0.95rem] uppercase tracking-[0.06em] text-[#062A4F] transition-colors duration-200 hover:border-[#E21B2D] hover:text-[#E21B2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E21B2D]"
                  style={{ fontFamily: BEBAS }}
                >
                  {chapter.label}
                </a>
              </span>
            ))}
          </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}
