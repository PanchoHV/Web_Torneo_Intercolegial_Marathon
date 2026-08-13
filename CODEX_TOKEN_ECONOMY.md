# Copa Marathon Token Economy Policy

## Core principle
Graphify determines where to look.
Token Economy determines how much work and context is authorized.
Graphify never authorizes modifications.

## Task sizing
### MICRO
- 1 outcome
- 1 primary file
- 1-3 source files read max
- 1 QA file max
- one focused validation
- report about 80 lines max

### SMALL
- 1 narrow feature
- 2-6 relevant files
- 1-2 QA paths
- focused QA and build only when required
- report about 120 lines max

### MEDIUM
- affects architecture or contracts
- requires approved plan
- split into micro or small loops
- no one-shot implementation

### LARGE
- multiple milestones
- never do in one prompt

Default: prefer MICRO or SMALL.

## Context budget
- repository instructions first
- Graph query before broad exploration
- exact paths and exact symbols
- no recursive scans by default
- no giant generated context
- no long logs when focused output exists
- no secrets

## Modification budget
Graph impact does not authorize file modification.

Only paths explicitly declared in Allowed modifications may be changed.

## Correction attempts
- MICRO: max 2 focused correction attempts
- SMALL: max 3 focused correction attempts
- If still unresolved, stop and report the blocker

## Validation budget
Prefer focused typecheck, focused test, focused QA, build when required, and graph validation when graph changes.

## Graph policy
Use `graphify explain`, `graphify path`, `graphify affected`, and `graphify query` before broad exploration when Graph exists.
Update Graph only when files, imports, public interfaces, contracts, schemas, runtime behavior, or architecture change.
Do not update Graph for copy changes, comments, formatting, or temporary edits.

## Network policy
Network is denied by default and must be explicitly authorized.

## Deployment policy
Deployment is denied by default.
Build success does not authorize deployment.

## Security policy
Never read `.env`, `.env.*`, tokens, credentials, or secret-bearing logs.
Never send private code or data to external semantic services without explicit approval.
Prefer local Graphify processing.

## Reporting budget
Reports must be concise and evidence-oriented.
