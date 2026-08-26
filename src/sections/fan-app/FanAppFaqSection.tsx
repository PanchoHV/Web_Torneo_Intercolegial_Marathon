import FaqSection, { type FaqItem } from '@/sections/home/FaqSection';

/**
 * Contenido verificado contra la Fan App real (rutas /results, /divisions,
 * /teams, /statistics): acceso libre sin registro, buscadores de equipo y de
 * sede, y tabla general + goleadores en Estadisticas. No se prometen funciones
 * que no esten confirmadas en el producto.
 */
const fanAppFaqItems: FaqItem[] = [
  {
    question: '¿Tengo que descargar la Fan App Copa Marathon?',
    answer:
      'No. Puedes abrir la Fan App Copa Marathon directamente desde el navegador de tu celular. Si quieres tenerla siempre disponible, también puedes agregarla a la pantalla de inicio.',
  },
  {
    question: '¿La Fan App de Copa Marathon es gratuita?',
    answer:
      'Sí. Puedes acceder gratuitamente a la Fan App Copa Marathon y consultar la información disponible del torneo sin necesidad de crear una cuenta.',
  },
  {
    question: '¿Cómo agrego la Fan App a la pantalla de inicio?',
    answer:
      'En iPhone, abre la Fan App Copa Marathon en Safari y selecciona «Agregar a pantalla de inicio». En Android, ábrela en Chrome y elige «Instalar» o «Agregar a pantalla principal».',
  },
  {
    question: '¿Qué puedo consultar en la Fan App Copa Marathon?',
    answer:
      'Desde la Fan App Copa Marathon puedes consultar Partidos, Sedes, Estadísticas y Equipos, además de la información destacada disponible desde el inicio de la aplicación.',
  },
  {
    question: '¿Dónde veo los partidos de la Copa Marathon?',
    answer:
      'Abre la sección Partidos de la Fan App Copa Marathon para consultar los encuentros disponibles, filtrar por fecha y sede y revisar la información publicada de cada jornada.',
  },
  {
    question: '¿Cómo encuentro a mi colegio o equipo en la Fan App?',
    answer:
      'Entra a la sección Equipos de la Fan App Copa Marathon y usa el buscador para localizar tu institución dentro de la información disponible del torneo. Los equipos se identifican por categoría.',
  },
  {
    question: '¿Dónde consulto las sedes de la Copa Marathon?',
    answer:
      'Desde la sección Sedes de la Fan App Copa Marathon puedes buscar escenarios por nombre y consultar la información disponible de las ciudades donde se desarrolla el torneo.',
  },
  {
    question: '¿Dónde veo estadísticas de la Copa Marathon?',
    answer:
      'En la sección Estadísticas de la Fan App Copa Marathon puedes consultar la tabla general por sede y categoría, además del listado de goleadores con los datos publicados durante el torneo.',
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
