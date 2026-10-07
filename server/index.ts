import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'

import { handleContact, isTrustProxyEnabled } from './contact-handler.ts'
import { assertEmailConfigured, createEmailAdapter } from './email.ts'
import type { EmailAdapter } from './email.ts'
import { getLocaleFromPathname } from '../src/lib/i18n.ts'
import { getServiceRedirect, isKnownRoute } from '../src/lib/routeMap.ts'

// `npm start` is the production entry point. Defaulting to production makes a
// fresh deployment fail fast on missing email config instead of silently
// logging submission PII. An operator can still override NODE_ENV explicitly.
process.env.NODE_ENV ??= 'production'

function parsePort(value: string | undefined): number {
  const parsed = Number(value ?? 3000)
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) return 3000
  return parsed
}

const port = parsePort(process.env.PORT)
const trustProxy = isTrustProxyEnabled(process.env)
const distDir = resolve(process.cwd(), 'dist')

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

function setSecurityHeaders(res: ServerResponse): void {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'DENY')
}

function sendText(res: ServerResponse, status: number, text: string): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(text)
}

/**
 * Appends a query string before any URL fragment so redirect targets like
 * `/uslugi#seo` keep the fragment intact (a fragment must be last).
 */
function withSearch(target: string, search: string): string {
  if (!search) return target
  const hashAt = target.indexOf('#')
  if (hashAt === -1) return `${target}${search}`
  return `${target.slice(0, hashAt)}${search}${target.slice(hashAt)}`
}

async function sendIndexHtml(res: ServerResponse): Promise<void> {
  try {
    const html = await readFile(join(distDir, 'index.html'))
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  } catch {
    // `dist` is missing or unreadable — respond instead of crashing.
    sendText(res, 503, 'Service Unavailable')
  }
}

async function serveHtmlFile(
  file: string,
  res: ServerResponse,
  status = 200,
): Promise<boolean> {
  try {
    const html = await readFile(file)
    res.statusCode = status
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
    return true
  } catch {
    return false
  }
}

async function serveRoute(
  pathname: string,
  res: ServerResponse,
): Promise<void> {
  if (isKnownRoute(pathname)) {
    const indexFile =
      pathname === '/'
        ? join(distDir, 'index.html')
        : join(distDir, pathname, 'index.html')
    if (await serveHtmlFile(indexFile, res, 200)) return
    await sendIndexHtml(res)
    return
  }

  // Unknown route — real 404 with a noindex page.
  const locale = getLocaleFromPathname(pathname)
  const notFoundFile =
    locale === 'en'
      ? join(distDir, 'en', '404.html')
      : join(distDir, '404.html')
  if (await serveHtmlFile(notFoundFile, res, 404)) return
  sendText(res, 404, 'Not Found')
}

async function serveStatic(
  pathname: string,
  res: ServerResponse,
): Promise<void> {
  const relative = pathname.replace(/^\/+/, '')
  const filePath = resolve(distDir, relative)

  if (filePath !== distDir && !filePath.startsWith(distDir + sep)) {
    sendText(res, 403, 'Forbidden')
    return
  }

  // Serve a real file (asset) if it exists.
  try {
    const info = await stat(filePath)
    if (!info.isDirectory()) {
      const data = await readFile(filePath)
      res.statusCode = 200
      res.setHeader(
        'Content-Type',
        contentTypes[extname(filePath).toLowerCase()] ??
          'application/octet-stream',
      )
      if (relative.startsWith('assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
      res.end(data)
      return
    }
  } catch {
    // Not a file — treat as a route below.
  }

  // Not a real file: it is either a known route (prerendered HTML) or unknown.
  await serveRoute(pathname, res)
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  emailAdapter: EmailAdapter,
): Promise<void> {
  setSecurityHeaders(res)

  let pathname: string
  let search = ''
  try {
    // Fixed base: only the pathname is needed and a bad Host header cannot
    // throw. Malformed URLs / percent-encoding are answered with 400.
    const url = new URL(req.url ?? '/', 'http://localhost')
    pathname = decodeURIComponent(url.pathname)
    search = url.search
  } catch {
    sendText(res, 400, 'Bad Request')
    return
  }

  if (pathname === '/api/contact') {
    await handleContact(req, res, { emailAdapter, trustProxy })
    return
  }

  // Canonical trailing-slash normalization (301), preserving the query string
  // and redirecting old EN service slugs straight to their new URL.
  if (
    pathname.length > 1 &&
    pathname.endsWith('/') &&
    extname(pathname) === ''
  ) {
    const normalized = pathname.replace(/\/+$/, '')
    const target = getServiceRedirect(normalized) ?? normalized
    res.statusCode = 301
    res.setHeader('Location', withSearch(target, search))
    res.end()
    return
  }

  const redirect = getServiceRedirect(pathname)
  if (redirect) {
    res.statusCode = 301
    res.setHeader('Location', withSearch(redirect, search))
    res.end()
    return
  }

  await serveStatic(pathname, res)
}

const emailAdapter: EmailAdapter = (() => {
  try {
    assertEmailConfigured(process.env)
    return createEmailAdapter(process.env)
  } catch (error) {
    console.error(
      `[server] ${error instanceof Error ? error.message : String(error)}`,
    )
    process.exit(1)
  }
})()

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  void handleRequest(req, res, emailAdapter).catch((error: unknown) => {
    console.error('[server] request failed', error)
    if (!res.headersSent) {
      sendText(res, 500, 'Internal Server Error')
    }
  })
})

server.listen(port, () => {
  console.log(
    `Website Studio R is running on http://localhost:${port} (serving ./dist)`,
  )
})

process.on('uncaughtException', (error) => {
  console.error('[server] uncaught exception', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('[server] unhandled rejection', reason)
  process.exit(1)
})
