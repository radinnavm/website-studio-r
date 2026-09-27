import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import { contactApiPlugin } from './server/vite.ts'
import { prerenderPlugin } from './server/prerender.ts'

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
    plugins: [react(), contactApiPlugin(), prerenderPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
