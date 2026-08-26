/**
 * Capa de CONTENIDO de la página /inscripciones.
 *
 * Frontera CMS: las secciones de `src/sections/inscripciones/` no hardcodean
 * copy. El formulario y su validación NO se describen aquí — su contrato vive
 * en `@/lib/validations/registrationSchema` y es la fuente de verdad.
 *
 * TODO(cms): estos bloques son candidatos de la colección `tournament_settings`
 * / `faqs` del mini CMS (M5).
 */

/**
 * Capas del Hero de /inscripciones (R2).
 *
 * `paper` y `stadium` son mitades complementarias del MISMO lienzo 2172x724:
 * comparten el borde rasgado, así que deben montarse con idéntico encuadre
 * (mismo object-fit y object-position) o la unión deja de calzar.
 *
 * `team`, `tactical` y `brush` son WebP con alpha y se posicionan por encima
 * o por debajo según el orden de profundidad definido en la sección.
 */
export const REGISTRATION_HERO_LAYERS = {
  paper: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-hero Inscripciones 1.webp'
  ),
  stadium: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-hero inscripciones 2.webp'
  ),
  team: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-equipo.webp'
  ),
  tactical: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-elemento tactico.webp'
  ),
  brush: encodeURI(
    'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-manchon rojo.webp'
  ),
} as const;

/** Iconografía oficial de la guía. Cada asset YA incluye su círculo navy. */
const GUIDE_ICON = (name: string) =>
  encodeURI(`https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/${name}`);

/**
 * Pasos de la guía.
 *
 * IMPORTANTE: reflejan el formulario REAL, que es de un solo envío y agrupa
 * los campos en estos cuatro bloques. No describen un stepper multipágina.
 */
export const REGISTRATION_GUIDE_STEPS = [
  {
    id: 'institucion',
    icon: GUIDE_ICON('optimized-User Icon.webp'),
    number: '01',
    title: 'Datos de tu institución',
    description:
      'Nombre completo del colegio, dirección y tipo de institución (privado o público).',
  },
  {
    id: 'responsable',
    icon: GUIDE_ICON('optimized-Geo Icon.webp'),
    number: '02',
    title: 'Datos del responsable',
    description:
      'Persona encargada, su cargo, cédula, correo y celular de contacto.',
  },
  {
    id: 'ciudad-categorias',
    icon: GUIDE_ICON('optimized-Docs icon.webp'),
    number: '03',
    title: 'Ciudad y categorías',
    description:
      'Selecciona la sede donde competirá tu colegio y las categorías que vas a inscribir.',
  },
  {
    id: 'enviar',
    icon: GUIDE_ICON('optimized-Check Icon.webp'),
    number: '04',
    title: 'Revisa y envía',
    description:
      'Acepta el uso de datos, completa la verificación de seguridad y envía el formulario.',
  },
] as const;

/**
 * FAQ específica de inscripciones.
 *
 * Las respuestas 01, 02, 03, 04 y 06 se derivan del comportamiento REAL del
 * formulario auditado. La 05 queda marcada porque la política de corrección
 * posterior no está confirmada por la organización.
 */
export const REGISTRATION_FAQ_ITEMS = [
  {
    question: '¿Cuándo están abiertas las inscripciones Copa Marathon por región?',
    answer:
      'Las inscripciones de la Copa Marathon 2026 se gestionan según el calendario de cada región. Consulta el estado publicado en esta página para saber cuáles están abiertas, cerradas o próximas a habilitarse.',
  },
  {
    question: '¿Qué necesito para inscribir a mi colegio?',
    answer:
      'Para inscribir a tu colegio en la Copa Marathon necesitas completar el formulario con los datos de la institución, la persona responsable, la ciudad sede y al menos una categoría disponible.',
  },
  {
    question: '¿Puedo enviar la inscripción si mi ciudad está cerrada?',
    answer:
      'No. Cuando una ciudad tiene cerradas las inscripciones de la Copa Marathon, el formulario informa ese estado y no permite completar el envío para esa sede.',
  },
  {
    question: '¿Cómo sé si mi inscripción fue recibida?',
    answer:
      'Cuando el formulario de inscripción de la Copa Marathon se envía correctamente, verás una confirmación en pantalla con el número de registro y la fecha de envío.',
  },
  {
    question: '¿Qué ocurre si el formulario muestra un error?',
    answer:
      'Si el formulario de inscripción muestra un error, revisa los campos indicados y completa la información requerida antes de volver a enviarlo. Los datos ingresados permanecen disponibles mientras corriges el formulario.',
  },
  {
    question: '¿Qué sucede después de enviar la inscripción?',
    answer:
      'Después de completar correctamente la inscripción a la Copa Marathon verás la confirmación de tu registro. Conserva esa información y revisa los canales oficiales del torneo para conocer los siguientes pasos.',
  },
  {
    question: '¿Qué hago si las inscripciones de mi región todavía no están abiertas?',
    answer:
      'Consulta el estado de inscripciones de la Copa Marathon para tu región en esta misma página. Allí podrás verificar si el proceso está abierto, cerrado o próximo a habilitarse.',
  },
  {
    question: '¿Puedo registrar otro colegio después de completar una inscripción?',
    answer:
      'Sí. Después de completar correctamente una inscripción de la Copa Marathon puedes volver al formulario mediante la opción “Registrar otro colegio” e iniciar un nuevo registro.',
  },
] as const;

/** Texto introductorio del FAQ en /inscripciones. */
export const REGISTRATION_FAQ_DESCRIPTION =
  'Resuelve tus dudas sobre el proceso de inscripción, los datos requeridos y qué ocurre después de enviar el formulario.';
