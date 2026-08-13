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
- CAVEAT-002: Current Graph represents source HEAD `06342f8716dfd98849eb10d246cd2168566351e6` plus no product source changes from the redesign yet.
- CAVEAT-003: Target public routes documented in the architecture baseline are planned and not yet implemented.

## 7. Current operational state

- M0: DONE
- Gate 0: PASSED
- M1: NOT_STARTED
- Next proposed milestone: M1 — Application Foundation
- Next milestone requires explicit human authorization
- CONTROLLED_PROCESS_DEVIATION remains documented from LOOP 0D
