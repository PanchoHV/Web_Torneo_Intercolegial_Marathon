# Copa Marathon — Runtime Map

## 1. Current verified runtime

- Frontend: React
- Language: TypeScript
- Build tool: Vite
- Entry: `src/main.tsx`
- Application root: `src/App.tsx`
- Routing: React Router
- Browser runtime: `BrowserRouter`
- Admin auth/provider: `AdminAuthProvider`

## 2. Current routes

### CURRENT

- `/`
- `/inscripciones`
- `/admin/login`
- `/admin`
- `/admin/onboarding`
- `/admin/onboarding/:id`
- `/admin/mi-acceso`
- `/admin/usuarios`
- `/admin/auditoria`
- `* -> /`

### PLANNED

- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`
- `/regiones/:slug`
- `/colegios/:slug`
- `/categorias/:slug`
- `/sedes/:slug`
- `/destacados/:slug`

## 3. Protected runtime

- `/admin/*` must remain operational.
- CRM / preinscriptions must remain operational.
- Supabase schema changes require a dedicated authorized loop.
- Existing routing and framework should evolve incrementally.

## 4. External / data systems

- Supabase: existing backend/service integration.
- Fan App: external Web App / PWA / Pelotea boundary.
- Social: Facebook, Instagram, TikTok.
- Hosting / deployment target: UNKNOWN / NOT VERIFIED.

## 5. Verified service points

- `src/lib/auth/adminAuth.tsx` uses Supabase session state and admin profile loading.
- `src/services/admin/auth.ts` uses Supabase auth and the `admin_users` table.
- `src/services/admin/functionClient.ts` uses Supabase auth session plus function URLs from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

## 6. Runtime notes

- Public landing page is composed in `src/App.tsx`.
- Admin runtime is protected by `ProtectedAdminRoute` and `AdminLayout`.
- Runtime evidence is verified from source and Graph; no `.env` values were read.
