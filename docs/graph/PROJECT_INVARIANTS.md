# Copa Marathon — Project Invariants

## Product invariants

| ID | Regla | Razón |
|---|---|---|
| INV-P01 | La navegación pública principal es Home, La Copa, Sedes, Preinscripciones, Fan App y FAQ. | Mantiene una arquitectura pública clara. |
| INV-P02 | Calendario, Equipos y Actualidad no son actualmente páginas principales independientes. | Evita duplicar experiencias que pertenecen a Fan App. |
| INV-P03 | Fan App concentra experiencia live, calendario, equipos y actualidad. | Centraliza la experiencia en vivo. |
| INV-P04 | La web no debe duplicar innecesariamente Pelotea. | Reduce fricción y redundancia de producto. |

## Fan App invariants

| ID | Regla | Razón |
|---|---|---|
| INV-F01 | Fan App es Web App / PWA. | Define el canal de distribución correcto. |
| INV-F02 | No usar App Store o Google Play sin futura aprobación humana explícita. | Evita comunicar una distribución no prevista. |
| INV-F03 | CTA primaria: Abrir Fan App. | Mantiene el gateway principal coherente. |

## Existing system invariants

| ID | Regla | Razón |
|---|---|---|
| INV-E01 | El área `/admin/*` existente debe preservarse. | Protege operación administrativa actual. |
| INV-E02 | Preinscripciones y CRM existentes no pueden romperse por el redesign. | Evita regresiones en captación y gestión. |
| INV-E03 | No modificar Supabase, schema o migrations salvo loop específico autorizado. | Reduce riesgo sobre datos y operación. |
| INV-E04 | No reemplazar framework o routing de forma implícita. | Mantiene la evolución incremental. |

## UX invariants

| ID | Regla | Razón |
|---|---|---|
| INV-U01 | Mobile-first. | El canal principal de uso debe priorizar móvil. |
| INV-U02 | `390px` es viewport de referencia inicial. | Alinea diseño y QA inicial. |
| INV-U03 | No secuestrar scroll mobile. | Preserva usabilidad y accesibilidad. |
| INV-U04 | Performance y accesibilidad tienen prioridad sobre motion decorativo. | Mantiene claridad y calidad de experiencia. |

## Content/data invariants

| ID | Regla | Razón |
|---|---|---|
| INV-D01 | Fechas y estados regionales deben tender hacia una única fuente de verdad. | Evita inconsistencias editoriales. |
| INV-D02 | No repetir fechas hardcoded en múltiples módulos cuando se implemente el nuevo sistema. | Reduce mantenimiento y drift. |
| INV-D03 | Costa, Sierra y Oriente deben soportar estados independientes. | Refleja la operación regional real. |

## SEO invariants

| ID | Regla | Razón |
|---|---|---|
| INV-S01 | Contenido público estratégico debe ser indexable. | Soporta descubrimiento y crecimiento orgánico. |
| INV-S02 | Las páginas SEO planned no deben alterar la navegación principal sin aprobación. | Evita expansión desordenada de la navegación. |

## Safety invariants

| ID | Regla | Razón |
|---|---|---|
| INV-X01 | No secrets. | Protege credenciales y datos sensibles. |
| INV-X02 | No `.env`. | Evita exponer configuración privada. |
| INV-X03 | No network por defecto. | Reduce riesgo y mantiene el trabajo local. |
| INV-X04 | No deployment sin autorización humana explícita. | Preserva control operativo. |
| INV-X05 | No cambios fuera del allowed modification scope. | Mantiene disciplina del loop. |
