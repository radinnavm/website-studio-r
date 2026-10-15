/**
 * Contact form delivery target (client-only).
 *
 * A static host has no Node server, so the in-process `POST /api/contact` route
 * is only available during `vite dev` / `vite preview`. In production the form
 * posts to an external form service configured at build time via
 * `VITE_CONTACT_ENDPOINT` (for example Formspree, Web3Forms or Basin). When the
 * variable is unset the form falls back to `/api/contact`, so local development
 * and the existing Node server keep working unchanged.
 *
 * These values are compiled into the client bundle and are therefore public —
 * never put a secret here. Form-service endpoint/keys are designed to be public.
 */

import type { ContactFormValues } from './contact.ts'
import type { Locale } from './i18n.ts'

function readEnv(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : undefined
}

/** External endpoint when configured, otherwise the local `/api/contact`. */
export const contactEndpoint: string =
  readEnv(import.meta.env.VITE_CONTACT_ENDPOINT) ?? '/api/contact'

/**
 * Optional access key appended to the JSON body. Required by some services
 * (e.g. Web3Forms) and ignored by others (e.g. Formspree, which embeds the id
 * in the endpoint URL).
 */
export const contactAccessKey: string | undefined = readEnv(
  import.meta.env.VITE_CONTACT_ACCESS_KEY,
)

/** Whether submissions go to an external service (vs. the local dev API). */
export const isExternalContactEndpoint = contactEndpoint.startsWith('http')

/** JSON body sent to the configured endpoint. */
export function buildContactPayload(
  values: ContactFormValues,
  locale: Locale,
): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...values, locale }
  if (contactAccessKey) payload.access_key = contactAccessKey
  return payload
}
