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

/**
 * Pasos de la guía.
 *
 * IMPORTANTE: reflejan el formulario REAL, que es de un solo envío y agrupa
 * los campos en estos cuatro bloques. No describen un stepper multipágina.
 */
export const REGISTRATION_GUIDE_STEPS = [
  {
    id: 'institucion',
    number: '01',
    title: 'Datos de tu institución',
    description:
      'Nombre completo del colegio, dirección y tipo de institución (privado o público).',
  },
  {
    id: 'responsable',
    number: '02',
    title: 'Datos del responsable',
    description:
      'Persona encargada, su cargo, cédula, correo y celular de contacto.',
  },
  {
    id: 'ciudad-categorias',
    number: '03',
    title: 'Ciudad y categorías',
    description:
      'Selecciona la sede donde competirá tu colegio y las categorías que vas a inscribir.',
  },
  {
    id: 'enviar',
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
    question: '¿Cuándo abren las inscripciones por región?',
    answer:
      'Cada región tiene su propio calendario. Consulta el bloque de estado por región en esta misma página para ver cuál está abierta, cuál cerró y cuál abre próximamente.',
  },
  {
    question: '¿Qué información necesito para inscribir a mi institución?',
    answer:
      'Nombre y dirección del colegio, tipo de institución, y los datos de la persona responsable: nombre, cargo, cédula de 10 dígitos, correo y celular de 10 dígitos. También debes elegir la ciudad sede y al menos una categoría.',
  },
  {
    question: '¿Puedo guardar el formulario y continuar después?',
    answer:
      'No. El formulario se completa y se envía en una sola sesión; no guarda avances parciales. Ten los datos a mano antes de empezar.',
  },
  {
    question: '¿Cómo sé si mi inscripción fue recibida?',
    answer:
      'Al enviarla correctamente verás en pantalla una confirmación con el número de registro y la fecha. Si algo falla, el formulario muestra el error sin perder lo que ya escribiste.',
  },
  {
    // PENDIENTE de política oficial: no se afirma ningún procedimiento.
    question: '¿Puedo corregir información después de enviarla?',
    answer:
      'El procedimiento de corrección será informado por la organización. Si detectas un error en los datos enviados, contacta al equipo de la Copa por los canales oficiales.',
  },
  {
    question: '¿Qué sucede después de completar la inscripción?',
    answer:
      'El equipo del torneo revisa la información y contacta a la persona responsable para continuar con la documentación y el contrato oficial del torneo.',
  },
] as const;

/** Texto introductorio del FAQ en /inscripciones. */
export const REGISTRATION_FAQ_DESCRIPTION =
  'Resuelve tus dudas sobre el proceso de inscripción, los datos requeridos y qué ocurre después de enviar el formulario.';
