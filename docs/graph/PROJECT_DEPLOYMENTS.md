# Copa Marathon — Deployment Rules and Record

## 1. Current deployment target

UNKNOWN / NOT VERIFIED

## 2. Deployment rules

- Deployment default: FORBIDDEN.
- Deployment requires explicit human authorization.
- A passing build does not authorize deployment.
- No agent may deploy, promote, change production traffic, or modify production infrastructure without an authorized deployment loop.

## 3. Deployment gates

### Pre-deploy

- approved scope
- required QA passed
- build passed when required
- Graph current for affected runtime
- no secrets
- rollback understood
- human authorization obtained

### Post-deploy

- health
- public contract
- core success path
- edge case
- regression
- deployment identifier
- rollback evidence/status

## 4. Deployment record

| Date | Environment | Deployment ID | Source commit | Status | Authorized by | Notes |
|---|---|---|---|---|---|---|

No redesign deployments recorded yet.
