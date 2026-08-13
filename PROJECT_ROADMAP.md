# Copa Marathon 2026 — Project Roadmap

## Milestones

### M0 — Vibe Code Bootstrap

Objetivo:

- governance
- security
- Graph
- overlay
- QA map
- runtime map
- deployment map

Estado:

- `DONE`

### M1 — Application Foundation

Objetivo:

- nueva arquitectura de rutas
- layout global
- header
- footer
- page shells

Estado:

- `IN_PROGRESS`

### M2 — Design System

Objetivo:

- tokens
- typography
- spacing
- buttons
- cards
- motion primitives
- responsive standards

Estado:

- `NOT_STARTED`

### M3 — Home

Objetivo:

- implementar Home aprobada
- mobile-first

Estado:

- `NOT_STARTED`

### M4 — Core Public Pages

Dividir internamente posteriormente en loops:

- La Copa
- Sedes
- Preinscripciones
- Fan App
- FAQ

Estado:

- `NOT_STARTED`

### M5 — Tournament Data / CMS

Objetivo:

- centralizar configuración dinámica cuando sea aprobado:
  - regiones
  - estados
  - fechas
  - sedes
  - sponsors
  - FAQ

Estado:

- `NOT_STARTED`

### M6 — SEO Architecture

Objetivo:

- metadata
- structured data
- sitemap
- indexability
- SEO entities
- prerender strategy

Estado:

- `NOT_STARTED`

### M7 — Analytics / Conversion

Objetivo:

- Fan App CTA
- PWA events
- sponsor clicks
- navigation
- conversion tracking
- GA4 / GTM

Estado:

- `NOT_STARTED`

### M8 — QA / Performance / Accessibility

Objetivo:

- responsive QA
- mobile QA
- accessibility
- performance
- regression
- admin protection

Estado:

- `NOT_STARTED`

### M9 — Release

Objetivo:

- preview
- approval
- deployment
- live smoke
- rollback evidence

Estado:

- `NOT_STARTED`

## Current milestone

M2 — Design System

## Next authorized milestone

NONE

## Planned M1 execution loops

### LOOP 1A — Foundation Design Gate

Task size:

SMALL

Outcome:

Use Graph + source confirmation to define the exact routing/layout implementation plan and affected files.

No broad implementation.

Status:

DONE

### LOOP 1B — Public Route Shells

Task size:

SMALL

Outcome:

Introduce only the public route shells required for:

- `/`
- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`

while preserving current Admin contracts.

Status:

DONE

This loop was constrained by 1A.

### LOOP 1C — Public Layout Foundation

Task size:

SMALL

Outcome:

Introduce reusable public layout structure such as:

- PublicLayout
- Header shell
- Footer shell

using the smallest viable file set approved by Graph impact analysis.

Status:

DONE

### LOOP 1D — Foundation Integration QA

Task size:

SMALL

Outcome:

Validate routing, admin regression, mobile shell, build, and Graph freshness, then determine whether M1 can close.

Status:

DONE

### LOOP 2A — Design System Audit & Token Plan

Task size:

SMALL

Outcome:

Audit the current visual system and define the minimum exact token plan.

Status:

DONE

### LOOP 2B — Design Token Foundation

Task size:

SMALL

Outcome:

Establish the semantic CSS + Tailwind token foundation while preserving visual compatibility.

Status:

DONE

### LOOP 2C — Core UI Primitives

Task size:

SMALL

Status:

NOT_STARTED

### LOOP 2D — Public Chrome Visual Foundation

Task size:

SMALL

Status:

NOT_STARTED

### LOOP 2E — Design System Integration QA

Task size:

SMALL

Status:

NOT_STARTED

## Next authorized milestone

NONE

## Roadmap rule

A milestone can only move to `DONE` when its closure conditions are validated.
