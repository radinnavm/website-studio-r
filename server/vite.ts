import type { Connect, Plugin } from 'vite'

import { handleContact, isTrustProxyEnabled } from './contact-handler.ts'
import type { ContactHandlerConfig } from './contact-handler.ts'
import { createEmailAdapter } from './email.ts'

const API_PATH = '/api/contact'

function contactMiddleware(
  config: ContactHandlerConfig,
): Connect.NextHandleFunction {
  return (req, res, next) => {
    const pathname = (req.url ?? '').split('?')[0]
    if (pathname !== API_PATH) {
      next()
      return
    }
    void handleContact(req, res, config)
  }
}

function createConfig(): ContactHandlerConfig {
  return {
    emailAdapter: createEmailAdapter(process.env),
    trustProxy: isTrustProxyEnabled(process.env),
  }
}

/**
 * Serves `POST /api/contact` during `vite dev` and `vite preview`, so the
 * contact form works locally without a separate backend process.
 */
export function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(contactMiddleware(createConfig()))
    },
    configurePreviewServer(server) {
      server.middlewares.use(contactMiddleware(createConfig()))
    },
  }
}
