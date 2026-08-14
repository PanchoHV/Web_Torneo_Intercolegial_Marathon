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

- `DONE`

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

- `DONE`

### M3 — Home

Objetivo:

- implementar Home aprobada
- mobile-first

Estado:

- `IN_PROGRESS`

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

### LOOP 2A — Visual System Audit

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

Outcome:

Add the public UI primitive layer for container, section, surface, labels, badges, and button extensions.

Status:

DONE

### LOOP 2D — Public Chrome Visual Foundation

Task size:

SMALL

Outcome:

Apply the design system to the shared public chrome: Navigation, Footer, and PublicLayout.

Status:

DONE

### LOOP 2E — Design System Integration QA

Task size:

SMALL

Outcome:

Validate the public design system and close M2 only when tokens, primitives, chrome, responsiveness, accessibility, build, and Graph remain stable.

Status:

DONE

### LOOP 3A — Home Architecture & Asset Design Gate

Task size:

SMALL

Outcome:

Map the current Home architecture, assets, data, and dependencies to prepare the exact implementation plan.

Status:

DONE

### LOOP 3B — Home Root Extraction + Cinematic 3D Hero

Task size:

SMALL

Outcome:

Extract Home into `HomePage.tsx` and rebuild the Hero as a cinematic, 3D-first Fan App lead surface.

Status:

DONE

### LOOP 3B-CLOSE — Hero Visual Lock + Checkpoint

Task size:

SMALL

Outcome:

Record the human-approved Hero/Header visual state as locked governance for future M3 loops.

Status:

DONE

Lock:

- Hero: HUMAN_VISUAL_APPROVED
- Header: HUMAN_VISUAL_APPROVED
- Hero composition: LOCKED
- Hero typography: LOCKED
- Hero artwork: REGISTERED_FULL_CANVAS_LAYERS
- Hero motion: GSAP_3D_DEPTH_APPROVED
- Pointer: MICRO_DEPTH
- Scroll: MACRO_DEPTH
- Mobile: REDUCED_MOTION / CENTERED_CONTENT

Protected future rule:

Hero/Header must not be modified by subsequent M3 loops without explicit human authorization or a dedicated corrective loop.

### LOOP 3C — Smart Copa Bar + Sponsor Boundary

Task size:

SMALL

Outcome:

Implement the next Home section boundary only after Hero/Header lock, without modifying the locked Hero/Header.

Status:

DONE

Source:

- Smart Copa Bar: MANUAL_CONFIG
- Current state: UPCOMING
- Sponsors: DEFERRED_PENDING_VERIFIED_DATA

### LOOP 3D — Sobre la Copa

Task size:

SMALL

Outcome:

Implement the next Home content section while preserving locked Hero/Header and the 3C broadcast boundary.

Status:

NOT_STARTED

## Current milestone

M3 — Home

## Next proposed milestone

3D — Sobre la Copa

## Next authorized milestone

NONE
