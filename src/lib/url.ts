import { site } from '../config/site.ts'

/** Converts a site-relative path to an absolute URL. Environment-agnostic. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}
