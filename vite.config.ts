import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'

import { contactApiPlugin } from './server/vite.ts'
import { getRoutePreloadImages, prerenderPlugin } from './server/prerender.ts'
import { toBgPath } from './src/lib/routeMap.ts'

/**
 * In dev the SPA shell is shared across routes, so the prerender cannot scope
 * the hero preload. This mirrors `routePreloadImages` on the dev server so a
 * hard load of any page starts fetching its hero image with the JS bundle.
 */
function heroPreloadPlugin(): Plugin {
  return {
    name: 'hero-preload',
    apply: 'serve',
    transformIndexHtml(html, ctx) {
      // `ctx.path` is always `/index.html` in dev; the real request URL lives
      // in `originalUrl`, so prefer it when present.
      const requestPath = ctx.originalUrl
        ? new URL(ctx.originalUrl, 'http://localhost').pathname
        : ctx.path
      const images = getRoutePreloadImages(toBgPath(requestPath))
      if (images.length === 0) return html

      return {
        html,
        tags: images.map((href) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'image', href, fetchpriority: 'high' },
          injectTo: 'head' as const,
        })),
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_-prefixed vars to the client; load all of them into
  // process.env so the server-side contact handler can use email config in dev.
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of [
    'NODE_ENV',
    'EMAIL_PROVIDER',
    'RESEND_API_KEY',
    'CONTACT_TO_EMAIL',
    'CONTACT_FROM_EMAIL',
  ]) {
    if (env[key] !== undefined && process.env[key] === undefined) {
      process.env[key] = env[key]
    }
  }

  return {
    plugins: [
      react(),
      contactApiPlugin(),
      heroPreloadPlugin(),
      prerenderPlugin(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
