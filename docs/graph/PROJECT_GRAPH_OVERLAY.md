# Copa Marathon — Curated Graph Overlay

## 1. Relationship to technical Graph

Graphify Graph = extracted technical facts.

Curated Overlay = approved operational and semantic truth.

If they disagree:

1. verify source;
2. verify current project state;
3. update stale source;
4. never silently assume Graph is correct.

## 2. Product boundaries

### Public website

Current:

- `/`
- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`
- `/inscripciones`

Target:

- `/`
- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`

### Admin runtime

Existing:

- `/admin/login`
- `/admin`
- `/admin/onboarding`
- `/admin/onboarding/:id`
- `/admin/mi-acceso`
- `/admin/usuarios`
- `/admin/auditoria`

Invariant:

Public redesign must not break admin runtime.

## 3. Fan App boundary

Fan App owns primarily:

- calendar
- teams
- live matches
- results
- minute-by-minute
- photos
- stories
- actualidad

Website owns primarily:

- official brand
- discovery
- SEO
- La Copa
- Sedes
- Preinscripciones
- FAQ
- gateway to Fan App

Fan App invariant:

- Web App / PWA
- No App Store
- No Google Play

## 4. Current milestone ownership

- M0: Governance / Graph / operational maps
- M1: Application Foundation
- M2: Design System
- M3: Home
- M4: Core Public Pages
- M5: Tournament Data / CMS
- M6: SEO Architecture
- M7: Analytics / Conversion
- M8: QA / Performance / Accessibility
- M9: Release

## 5. Human approval gates

Explicit human approval is required for:

- deployment
- Supabase schema changes
- new dependencies when not already authorized
- framework migration
- public contract changes
- production routing changes
- deleting existing functionality
- changes to `/admin/*` contracts
- changes that could affect CRM data
- external semantic/code services
- App Store / Play Store positioning
- starting the next milestone

## 6. Current caveats

- CAVEAT-001: The initial Graph baseline required `graphify update . --no-cluster` after `extract` did not materialize output. Current Graph validated successfully.
- CAVEAT-002: Current Graph represents the 1C public layout implementation and refreshed public route shells on top of the redesign baseline.
- CAVEAT-003: Target public routes documented in the architecture baseline are now implemented, including the shared `PublicLayout`.

## 7. Current operational state

- M0: DONE
- M1: IN_PROGRESS
- LOOP 1A: DONE
- LOOP 1B: DONE
- LOOP 1C: DONE
- Next loop: 1D — Foundation Integration QA
- Gate 0: PASSED
- Next milestone requires explicit human authorization
- CONTROLLED_PROCESS_DEVIATION remains documented from LOOP 0D

## 8. Current route contracts

- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`
- `/inscripciones` compatibility alias

Compatibility contract:

- `/inscripciones` remains operational.

`/preinscripciones` currently aliases the existing `InscripcionesPage`.
