import type { NormalizedContact } from '../src/lib/contact.ts'

export type EmailMeta = {
  ip: string
  userAgent: string
}

export type EmailAdapter = {
  readonly name: string
  send(submission: NormalizedContact, meta: EmailMeta): Promise<void>
}

const REQUEST_TIMEOUT_MS = 10_000

function renderPlainText(submission: NormalizedContact): string {
  return [
    'Ново запитване от сайта',
    '',
    `Име: ${submission.name}`,
    `Имейл: ${submission.email}`,
    `Телефон: ${submission.phone || '—'}`,
    `Тип проект: ${submission.projectType}`,
    `Бюджет: ${submission.budget ?? '—'}`,
    '',
    'Съобщение:',
    submission.message,
  ].join('\n')
}

/** Development / fallback adapter — logs the submission instead of sending it. */
const consoleAdapter: EmailAdapter = {
  name: 'console',
  async send(submission) {
    console.info('[contact] new submission', {
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      projectType: submission.projectType,
      budget: submission.budget,
      message: submission.message,
    })
  },
}

/**
 * Resend adapter using the public HTTP API (no SDK dependency).
 * Only active when EMAIL_PROVIDER=resend and the required env vars are set.
 */
function resendAdapter(apiKey: string, to: string, from: string): EmailAdapter {
  return {
    name: 'resend',
    async send(submission) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: submission.email,
          subject: `Ново запитване — ${submission.projectType}`,
          text: renderPlainText(submission),
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })

      if (!response.ok) {
        throw new Error(`Resend request failed with status ${response.status}`)
      }
    },
  }
}

function isResendConfigured(env: NodeJS.ProcessEnv): boolean {
  return Boolean(
    env.EMAIL_PROVIDER?.toLowerCase() === 'resend' &&
    env.RESEND_API_KEY &&
    env.CONTACT_TO_EMAIL &&
    env.CONTACT_FROM_EMAIL,
  )
}

/**
 * Selects an email adapter from environment variables.
 * Never contains credentials — those are injected via the environment only.
 */
export function createEmailAdapter(
  env: NodeJS.ProcessEnv = process.env,
): EmailAdapter {
  if (isResendConfigured(env)) {
    return resendAdapter(
      env.RESEND_API_KEY as string,
      env.CONTACT_TO_EMAIL as string,
      env.CONTACT_FROM_EMAIL as string,
    )
  }

  const provider = env.EMAIL_PROVIDER?.toLowerCase()
  if (provider && provider !== 'console') {
    console.warn(
      `[contact] email provider "${provider}" is not fully configured; falling back to console logging.`,
    )
  }

  return consoleAdapter
}

/**
 * Fails fast when the production server has no real email provider, so that
 * submissions are never silently logged (as PII) instead of delivered.
 * Local tools (`vite dev`/`vite preview`) are intentionally not affected.
 */
export function assertEmailConfigured(
  env: NodeJS.ProcessEnv = process.env,
): void {
  if (env.NODE_ENV !== 'production') return
  if (isResendConfigured(env)) return

  throw new Error(
    'Email delivery is not configured for production. Set EMAIL_PROVIDER=resend ' +
      'together with RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.',
  )
}
