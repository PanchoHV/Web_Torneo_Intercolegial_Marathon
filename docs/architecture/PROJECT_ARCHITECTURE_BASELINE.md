# Copa Marathon 2026 — Architecture Baseline

## 1. Project intent

El proyecto evoluciona el sitio existente de Copa Nacional Intercolegial Marathon Ecuador 2026.

El sitio original fue construido principalmente para captación y preinscripciones.

El nuevo objetivo es convertir `copamarathon.com` en:

- sitio oficial del torneo;
- centro de operaciones digital;
- hub de marca;
- hub SEO;
- hub de descubrimiento;
- gateway hacia Fan App;
- entrada a preinscripciones por región.

La web no debe replicar innecesariamente las funciones operacionales de la Fan App.

## 2. Product ecosystem

### 2.1 CopaMarathon.com

Función:

- descubrimiento
- SEO
- marca
- información oficial
- sedes
- preinscripciones
- acceso a Fan App

### 2.2 Fan App / Pelotea

Función:

- partidos
- resultados
- minuto a minuto
- calendario
- equipos
- fotografías
- historias
- actualidad
- experiencia en vivo

### 2.3 Preinscripciones / CRM

Función:

- registro
- formularios
- documentos
- gestión administrativa
- instituciones participantes

### 2.4 Redes Sociales

Canales:

- Facebook
- Instagram
- TikTok

Función:

- alcance
- contenido
- comunidad
- tráfico al ecosistema

## 3. Public information architecture

Arquitectura pública objetivo de primer nivel:

- `/`
- `/la-copa`
- `/sedes`
- `/preinscripciones`
- `/fan-app`
- `/faq`

No crear como navegación principal:

- `/calendario`
- `/equipos`
- `/actualidad`

porque esas experiencias pertenecen principalmente a la Fan App.

## 4. La Copa internal architecture

`/la-copa` debe poder contener:

- `#que-es`
- `#formato`
- `#historia`
- `#categorias`
- `#reglamento`
- `#galeria`

Estas secciones pueden comenzar como contenido interno de una sola página.
No asumir rutas independientes todavía.

## 5. Sedes architecture

`/sedes` debe permitir conceptualmente:

- mapa general;
- filtro Costa;
- filtro Sierra;
- filtro Oriente;
- listado de sedes;
- información de cada sede.

Arquitectura futura prevista:

- `/sedes/:slug` como `PLANNED`

## 6. Preinscripciones architecture

`/preinscripciones` debe trabajar por región.

Estados aprobados actuales:

- Costa: cerradas
- Sierra: próximamente
- Oriente: próximamente

Los estados deben evolucionar hacia configuración basada en datos y no quedar permanentemente hardcoded.

El sistema existente de CRM/preinscripciones debe preservarse durante la evolución.

## 7. Fan App architecture

`/fan-app` funciona como gateway a la Fan App.

Invariant:

Fan App = Web App / PWA.

No:

- App Store
- Google Play
- badges de tiendas
- descargas nativas ficticias

CTA principal:

- Abrir Fan App

CTA secundaria cuando aplique:

- Instalar PWA

La página debe poder explicar instalación:

- Android / Chrome
- iPhone / Safari

sin afirmar capacidades técnicas no verificadas.

## 8. FAQ architecture

`/faq` categorías previstas:

- La Copa
- Sedes
- Preinscripciones
- Fan App

Debe funcionar como contenido indexable y sistema de ayuda.

## 9. SEO architecture - planned

Arquitectura `PLANNED`:

- `/regiones/:slug`
- `/colegios/:slug`
- `/categorias/:slug`
- `/sedes/:slug`
- `/destacados/:slug`

Objetivo:

crear páginas indexables y reutilizables para entidades estratégicas de la Copa.

Estas páginas no necesariamente aparecen en navegación principal.

## 10. Home architecture

Orden conceptual aprobado del Home:

1. Header / navegación
2. Hero
3. CTA principal Fan App / PWA
4. Smart Copa Bar
5. Auspiciantes
6. Sobre el torneo
7. Sedes + hitos / calendario resumido
8. Fan App
9. Actualidad / contenido destacado preview
10. FAQ preview
11. Footer

## 11. Design direction

Mobile-first obligatorio.

Viewport de diseño prioritario:

- `390px`

Desktop después.

Dirección visual:

- Sports Editorial
- Broadcast
- Marathon

Tres materiales de interfaz:

### STADIUM

- hero
- fotografía
- video
- emoción
- Fan App

### PAPER

- calendario resumido
- regiones
- historia
- documentos
- contenido editorial

### SCOREBOARD

- datos
- estados
- fechas
- estadísticas
- CTAs funcionales

Evitar:

- estética SaaS genérica
- glassmorphism excesivo
- gradientes IA genéricos
- animación decorativa sin propósito

## 12. Motion principles

Desktop puede usar:

- GSAP
- ScrollTrigger
- Lenis
- parallax moderado
- sticky storytelling
- reveal
- image masks

Mobile:

- scroll nativo prioritario
- microinteracciones
- animaciones ligeras
- sin scroll hijacking

Performance y comprensión tienen prioridad sobre espectáculo.

## 13. Existing system to preserve

Existente:

- React + TypeScript + Vite
- React Router
- Tailwind
- Supabase
- GSAP
- Lenis
- Admin existente
- CRM / preinscripciones existentes

No decidir todavía migración a otro framework.

La arquitectura actual se evoluciona incrementalmente.

## 14. Data / CMS direction - planned

Supabase podrá evolucionar también como CMS operativo del torneo.

Entidades candidatas:

- `tournament_settings`
- `regions`
- `venues`
- `sponsors`
- `faqs`
- `featured_content`
- `tournament_milestones`
- `seo_entities`

Son modelos candidatos.
No afirmar que existen.
No crear tablas.
No modificar Supabase.

## 15. SEO direction - planned

Objetivos:

- URLs indexables
- metadata por página
- canonical
- Open Graph
- breadcrumbs
- structured data
- `sitemap.xml`
- `robots.txt`

`prerender` / `SSR` / `SSG` deberá evaluarse técnicamente antes de implementación.
No tomar todavía decisión irreversible de framework.
