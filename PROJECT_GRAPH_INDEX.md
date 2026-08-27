# Copa Marathon — Project Graph Index

## 1. Purpose

Graphify Graph = technical navigation, dependency map, and impact analysis.

It is not business truth, not authorization to edit, and not a replacement for source code or QA.

## 2. Graph baseline

- Repository: `PanchoHV/Web_Torneo_Intercolegial_Marathon`
- Branch: `feat/copa-2026-redesign`
- Source HEAD: `10c73ad35829dd6dbff74af8e6d391f568977d61`
- Graphify version: `0.9.11`
- Extraction mode: `code-only`, `no-cluster`, local
- M0 milestone refresh command: `graphify update . --no-cluster`
- Last refresh: M3 loop `3D` (structural files added under `src/sections/copa/` and `src/sections/home/`)
- Refresh status: `PASS`
- Query logging: disabled
- External semantic services: disabled

## 3. Graph statistics

- Node count: `1092`
- Edge count: `2265`
- Critical entrypoints:
  - `src/main.tsx` - FOUND
  - `src/App.tsx` - FOUND

## 4. Graph artifacts

### Shared / candidate for versioning

- `graphify-out/graph.json`
- `graphify-out/manifest.json`

### Local / ignored

- `graphify-out/cache/`
- `graphify-out/.graphify_root`

## 5. Critical entrypoints

Verified entrypoints:

- `src/main.tsx`
- `src/App.tsx`

## 6. Graph usage rule

Before broad repository exploration:

1. Read `AGENTS.md`
2. Read `CODEX_TOKEN_ECONOMY.md`
3. Read `PROJECT_GRAPH_INDEX.md`
4. Query Graphify
5. Open only relevant source files

Canonical principle:

Graphify is a navigation aid, not a scope authority.

## 7. Approved query patterns

Available in Graphify `0.9.11`:

- `graphify explain "<node-id>"`
- `graphify path "<source-id>" "<target-id>"`
- `graphify affected "<node-id>" --depth 2`
- `graphify query "<focused question>" --budget 800`

## 8. Graph update policy

Run `graphify update .` when:

- a new structural file is created;
- imports or dependencies change;
- public interfaces change;
- contracts change;
- schema changes;
- runtime changes;
- architecture changes;
- a milestone completes.

Do not update Graph for:

- copy changes
- comments
- formatting
- purely visual text
- temporary edits

Full rebuild requires deliberate approval.

## 9. Milestone refresh note

The Graph is code-oriented.

Governance-only documentation changes do not automatically mean the product source Graph is stale.

Graph must still be updated at milestone closure and after structural code changes according to policy.

## 10. Technical SEO closeout context

Technical SEO on-site is closed for the five canonical public routes. `public/sitemap.xml`
uses truthful `lastmod` values only for meaningful visible, SEO metadata, or route-level
structural changes. This closeout changes no imports, runtime contracts, or dependencies, so a
Graphify update is not required; graph validation remains the required check.
