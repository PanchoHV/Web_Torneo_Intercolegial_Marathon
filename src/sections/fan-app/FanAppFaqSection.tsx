import FaqSection, { type FaqItem } from '@/sections/home/FaqSection';

/**
 * Contenido verificado contra la Fan App real (rutas /results, /divisions,
 * /teams, /statistics): acceso libre sin registro, buscadores de equipo y de
 * sede, y tabla general + goleadores en Estadisticas. No se prometen funciones
 * que no esten confirmadas en el producto.
 */
const fanAppFaqItems: FaqItem[] = [
  {
    question: '¿Necesito descargar la Fan App?',
    answer:
      'No. Puedes abrir la Fan App directamente desde el navegador de tu celular. Si quieres tenerla siempre a mano, puedes agregarla a tu pantalla de inicio en pocos pasos.',
  },
  {
    question: '¿La Fan App es gratuita?',
    answer:
      'Sí. Puedes acceder a la Fan App de la Copa y consultar la información disponible del torneo sin costo y sin crear una cuenta.',
  },
  {
    question: '¿Cómo la agrego a la pantalla de inicio?',
    answer:
      'En iPhone, abre la Fan App en Safari, toca Compartir y selecciona «Agregar a pantalla de inicio». En Android, ábrela en Chrome, entra al menú del navegador y elige «Instalar» o «Agregar a pantalla principal». La Fan App quedará disponible junto a tus otras aplicaciones.',
  },
  {
    question: '¿Qué puedo consultar en la Fan App?',
    answer:
      'Desde la Fan App puedes acceder a las principales secciones del torneo: Partidos, Sedes, Estadísticas y Equipos, además de la información destacada disponible desde Inicio.',
  },
  {
    question: '¿Dónde puedo ver los próximos partidos?',
    answer:
      'Entra a la sección Partidos. Allí puedes filtrar por fecha y por sede, y consultar los encuentros disponibles con su horario y la cancha asignada para cada jornada.',
  },
  {
    question: '¿Cómo encuentro a mi colegio o equipo?',
    answer:
      'Entra a Equipos y usa el buscador para localizar a tu institución dentro de la información disponible del torneo. Los equipos aparecen identificados por categoría.',
  },
  {
    question: '¿Dónde encuentro las sedes de los partidos?',
    answer:
      'Desde la sección Sedes puedes buscar por nombre y consultar los escenarios disponibles con la información publicada para cada ciudad del torneo.',
  },
  {
    question: '¿Qué información aparece en Estadísticas?',
    answer:
      'En Estadísticas puedes revisar la tabla general por sede y categoría, junto al listado de goleadores, con los datos que se van publicando durante el torneo.',
  },
];

export default function FanAppFaqSection() {
  return (
    <FaqSection
      id="faq-fan-app"
      inheritBackground
      items={fanAppFaqItems}
      description="Cómo abrir la Fan App, cómo dejarla en tu pantalla de inicio y qué puedes consultar en cada sección del torneo."
    />
  );
}
