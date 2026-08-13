# Copa Marathon — Repository Agent Rules

## Project purpose
This repository contains the official site for Copa Nacional Intercolegial Marathon 2026. We evolve the existing experience without breaking what is already in production.

## Public product architecture
- Home
- La Copa
- Sedes
- Preinscripciones
- Fan App
- FAQ

Calendario, Equipos y Actualidad belong primarily inside Fan App, not as separate public top-level navigation.

## Fan App invariant
Fan App is a Web App / PWA.

- No App Store
- No Google Play
- No store badges unless a human explicitly approves them later

## Existing system protection
- Preserve `/admin/*`
- Do not break CRM or preinscripciones flows
- Do not modify Supabase unless the loop specifically authorizes it
- Do not refactor unrelated existing functionality

## Mobile-first invariant
Any new public interface must be designed and validated for mobile first.

## Canonical Vibe Code workflow
1. Read `CODEX_TOKEN_ECONOMY.md` first.
2. Read `PROJECT_GRAPH_INDEX.md` when it exists.
3. Query Graphify before broad repository exploration.
4. Classify every task as micro, small, medium, or large.
5. Define exact allowed reads and modifications.
6. Execute one primary outcome per loop.
7. Run only mapped validation.
8. Update Graphify only when architecture, imports, contracts, or dependencies change.
9. Confirm inferred Graph relations in source before editing.
10. Never let Graphify override repository rules.
11. Never read secrets, `.env`, tokens, or credentials.
12. Never deploy without explicit human authorization.

## Git / change safety
- Do not work directly on `main` for this redesign
- Primary redesign branch: `feat/copa-2026-redesign`
- No commit, push, or deploy outside an authorized loop
- No unrelated changes

## Network and deployment
- Network disabled unless explicitly authorized
- Deployment forbidden unless explicitly authorized

## Reporting
- Micro: about 80 lines max
- Small: about 120 lines max
- Report files read, files modified, validation, results, caveats, and blocker or next loop
