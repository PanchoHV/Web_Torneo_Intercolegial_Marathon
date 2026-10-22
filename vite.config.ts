import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import {
  SEO_BY_PATH,
  buildBreadcrumbJsonLd,
  canonicalFor,
  type PublicSeoPath,
} from './src/components/seo/seoData'

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) {
    throw new Error(`prerenderPublicRoutes: no se encontró ${label} en dist/index.html`)
  }

  return html.replace(pattern, () => replacement)
}

function metaPattern(attribute: 'name' | 'property', key: string) {
  return new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`)
}

function renderRouteHtml(template: string, routePath: PublicSeoPath) {
  const seo = SEO_BY_PATH[routePath]
  const canonical = canonicalFor(routePath)
  const title = escapeAttribute(seo.title)
  const description = escapeAttribute(seo.description)

  let html = template
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${seo.title}</title>`, '<title>')
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`, 'canonical')

  const metas: Array<['name' | 'property', string, string]> = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', canonical],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ]

  for (const [attribute, key, content] of metas) {
    html = replaceOnce(html, metaPattern(attribute, key), `<meta ${attribute}="${key}" content="${content}" />`, `meta ${key}`)
  }

  const breadcrumb = buildBreadcrumbJsonLd(routePath)

  if (breadcrumb) {
    const json = JSON.stringify(breadcrumb).replace(/</g, '\\u003c')
    html = replaceOnce(
      html,
      /<\/head>/,
      `  <script type="application/ld+json" id="seo-breadcrumb">${json}</script>\n  </head>`,
      '</head>',
    )
  }

  return html
}

// Genera `dist/<ruta>/index.html` con el <head> propio de cada ruta pública para
// que los crawlers lo lean sin ejecutar JS. Vercel sirve primero el archivo
// estático y solo cae al rewrite SPA cuando no existe. `PublicRouteSeo` sigue
// corrigiendo el head al montar, con los mismos datos de `seoData.ts`.
function prerenderPublicRoutes(): Plugin {
  let outDir = ''

  return {
    name: 'prerender-public-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')

      for (const routePath of Object.keys(SEO_BY_PATH) as PublicSeoPath[]) {
        if (routePath === '/') continue

        const routeDir = path.join(outDir, routePath)
        fs.mkdirSync(routeDir, { recursive: true })
        fs.writeFileSync(path.join(routeDir, 'index.html'), renderRouteHtml(template, routePath))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react(), prerenderPublicRoutes()],
  server: {
    port: 3000,
    // Permite servir el dev server a través de un túnel ngrok para revisión
    // externa. Solo afecta a desarrollo; no cambia el build de producción.
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok-free.app',
      '.ngrok.app',
      '.ngrok.io',
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
