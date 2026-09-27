import type { IncomingMessage, ServerResponse } from 'node:http'

import {
  hasErrors,
  normalizeContact,
  validateContact,
} from '../src/lib/contact.ts'
import type { ContactErrors, ContactFormValues } from '../src/lib/contact.ts'
import type { Locale } from '../src/lib/i18n.ts'

import type { EmailAdapter } from './email.ts'
import { checkRateLimit } from './rate-limit.ts'

const MAX_BODY_BYTES = 16 * 1024

export type ContactHandlerConfig = {
  emailAdapter: EmailAdapter
  /**
   * Trust the `X-Forwarded-For` header for client IP detection. Only enable
   * behind a reverse proxy you control; otherwise the header is spoofable.
   */
  trustProxy: boolean
}

/** Reads `TRUST_PROXY` (1/true/yes) — disabled by default. */
export function isTrustProxyEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  const value = env.TRUST_PROXY?.toLowerCase()
  return value === '1' || value === 'true' || value === 'yes'
}

function sendJson(
  res: ServerResponse,
  status: number,
  payload: unknown,
  headers: Record<string, string> = {},
): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }
  res.end(JSON.stringify(payload))
}

/**
 * Reads the request body, rejecting bodies above `MAX_BODY_BYTES` without
 * destroying the socket, so a proper `413` response can still be written.
 */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0
    let tooLarge = false
    const chunks: Buffer[] = []

    req.on('data', (chunk: Buffer) => {
      if (tooLarge) return
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        tooLarge = true
        return
      }
      chunks.push(chunk)
    })

    req.on('end', () => {
      if (tooLarge) {
        reject(new Error('payload-too-large'))
        return
      }
      resolve(Buffer.concat(chunks).toString('utf8'))
    })

    req.on('error', reject)
  })
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function toLocale(value: unknown): Locale {
  return value === 'en' ? 'en' : 'bg'
}

function clientIp(req: IncomingMessage, trustProxy: boolean): string {
  if (trustProxy) {
    const forwarded = req.headers['x-forwarded-for']
    const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
    const first = value?.split(',')[0]?.trim()
    if (first) return first
  }
  return req.socket.remoteAddress ?? 'unknown'
}

function toFormValues(input: Record<string, unknown>): ContactFormValues {
  return {
    name: asString(input.name),
    email: asString(input.email),
    phone: asString(input.phone),
    projectType: asString(input.projectType),
    budget: asString(input.budget),
    message: asString(input.message),
    consent: input.consent === true,
    company: asString(input.company),
  }
}

/**
 * Handles `POST /api/contact`. Validates and normalizes input, applies a
 * honeypot, then — only for valid submissions — a rate limit before delegating
 * delivery to the email adapter. Invalid submissions do not consume the
 * rate-limit quota, so honest users fixing their form are not locked out.
 * Never returns internal error details.
 */
export async function handleContact(
  req: IncomingMessage,
  res: ServerResponse,
  { emailAdapter, trustProxy }: ContactHandlerConfig,
): Promise<void> {
  if (req.method !== 'POST') {
    sendJson(
      res,
      405,
      { ok: false, message: 'Методът не е разрешен.' },
      { Allow: 'POST' },
    )
    return
  }

  const contentType = asString(req.headers['content-type']).toLowerCase()
  if (!contentType.includes('application/json')) {
    sendJson(res, 415, { ok: false, message: 'Неподдържан формат.' })
    return
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(await readBody(req))
  } catch (error) {
    if (error instanceof Error && error.message === 'payload-too-large') {
      sendJson(res, 413, { ok: false, message: 'Заявката е твърде голяма.' })
      return
    }
    sendJson(res, 400, { ok: false, message: 'Невалидна заявка.' })
    return
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    sendJson(res, 400, { ok: false, message: 'Невалидна заявка.' })
    return
  }

  const values = toFormValues(parsed as Record<string, unknown>)

  // Honeypot: pretend success but never deliver, so bots learn nothing.
  if (values.company.trim() !== '') {
    console.warn('[contact] honeypot triggered; dropping submission')
    sendJson(res, 200, { ok: true, message: 'Благодарим ви.' })
    return
  }

  const locale = toLocale((parsed as Record<string, unknown>).locale)
  const errors: ContactErrors = validateContact(values, locale)
  if (hasErrors(errors)) {
    sendJson(res, 400, {
      ok: false,
      message: 'Моля, проверете полетата.',
      errors,
    })
    return
  }

  // Rate limit only real, valid submissions (i.e. actual email sends).
  const { allowed, retryAfterSeconds } = checkRateLimit(
    clientIp(req, trustProxy),
  )
  if (!allowed) {
    sendJson(
      res,
      429,
      { ok: false, message: 'Твърде много заявки. Опитайте отново по-късно.' },
      { 'Retry-After': String(retryAfterSeconds) },
    )
    return
  }

  try {
    await emailAdapter.send(normalizeContact(values), {
      ip: clientIp(req, trustProxy),
      userAgent: asString(req.headers['user-agent']),
    })
    sendJson(res, 200, {
      ok: true,
      message:
        'Благодарим ви. Получихме вашето запитване и ще се свържем с вас.',
    })
  } catch (error) {
    console.error('[contact] failed to deliver submission', error)
    sendJson(res, 500, {
      ok: false,
      message: 'Възникна проблем при изпращането. Опитайте отново.',
    })
  }
}
