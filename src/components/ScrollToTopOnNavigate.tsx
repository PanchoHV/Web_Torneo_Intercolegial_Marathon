import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Reinicia el scroll al cambiar de ruta.
 *
 * React Router conserva el desplazamiento entre navegaciones, así que al entrar
 * a una página desde un enlace del footer se aterrizaba en mitad —o al final—
 * del nuevo contenido. No confundir con `ScrollToTop`, que es el botón flotante
 * de volver arriba.
 */
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Un enlace con ancla ya tiene destino propio: no se le reinicia el scroll.
    if (hash) return;

    // `instant` es deliberado: el Home fija `scroll-behavior: smooth` en la raíz,
    // y sin esto el salto de página se vería como un scroll animado.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
