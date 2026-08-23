import type { MouseEvent } from 'react';

/**
 * Desplazamiento suave hacia un ancla de la propia página.
 *
 * El href nativo ya funciona sin JS; esto solo añade el suavizado cuando el
 * usuario no ha pedido reducir movimiento (`scroll-behavior` es `auto` a nivel
 * global, así que el salto sería seco).
 */
export function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);

  if (!target) return;

  event.preventDefault();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}
