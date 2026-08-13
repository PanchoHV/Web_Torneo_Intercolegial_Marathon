# Copa Marathon — QA Map

## 1. Existing QA capabilities

Based on `package.json`:

- `dev`
- `build`
- `lint`
- `preview`

No dedicated test script is currently available.

## 2. QA matrix

| Change type | Required validation |
|---|---|
| Governance/docs | `git diff --check`; JSON validation when applicable |
| Graph structural change | `graphify update .`; Graph validator |
| React component change | focused typecheck/check script if available; relevant build when necessary |
| Routing change | typecheck/check; build; route smoke; admin regression smoke |
| Supabase/data contract change | dedicated QA plan; human approval required; no automatic production action |
| Public UI change | mobile validation first; desktop validation; accessibility check appropriate to scope |
| Fan App CTA/PWA change | device-specific behavior check; Android Chrome; iPhone Safari; desktop where applicable |
| SEO change | metadata/schema validation; rendered HTML/indexability validation when system exists |
| Deployment | explicit authorization; health; public contract; core success case; regression; deployment ID |

## 3. Mobile priority

- Reference mobile viewport: `390px`
- Mobile-first QA must precede desktop acceptance for new public interface work.
- No scroll hijacking.
- Performance and accessibility outrank decorative motion.

## 4. Admin regression

Future routing/layout work affecting the application shell must validate that these routes still resolve according to existing contracts:

- `/admin/login`
- `/admin`
- `/admin/onboarding`
- `/admin/onboarding/:id`
- `/admin/mi-acceso`
- `/admin/usuarios`
- `/admin/auditoria`

No browser QA was run in this loop. This map is documentation only.

## 5. LOOP 1D technical QA evidence

- Source assertions: PASS
- Graph validator: PASS
- Lint: PASS
- Build: PASS
- Local HTTP smoke: PASS on `/`, `/la-copa`, `/sedes`, `/preinscripciones`, `/fan-app`, `/faq`, `/inscripciones`, `/admin/login`
- Browser runtime QA: not available in this environment; human visual acceptance remains pending
