# Copa Marathon — Project Graph Index

## 1. Purpose

Graphify Graph = technical navigation, dependency map, and impact analysis.

It is not business truth, not authorization to edit, and not a replacement for source code or QA.

## 2. Graph baseline

- Repository: `PanchoHV/Web_Torneo_Intercolegial_Marathon`
- Branch: `feat/copa-2026-redesign`
- Source HEAD: `06342f8716dfd98849eb10d246cd2168566351e6`
- Graphify version: `0.9.11`
- Extraction mode: `code-only`, `no-cluster`, local
- M0 milestone refresh command: `graphify update . --no-cluster`
- Refresh status: `PASS`
- Query logging: disabled
- External semantic services: disabled

## 3. Graph statistics

- Node count: `973`
- Edge count: `2007`
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
