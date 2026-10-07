/**
 * Locale-aware route mapping + known-route checks. Environment-agnostic module
 * used by both the client (LocaleProvider, SEO) and the server (soft-404
 * allowlist) and the build-time prerender.
 *
 * Services no longer have dedicated pages: every service is a section on the
 * services index (`/uslugi` in BG, `/en/services` in EN) addressed by an anchor.
 */

import { getLocaleFromPathname } from './i18n.ts'
import type { Locale } from './i18n.ts'
import { getProjects } from './portfolio.ts'
import { getServices } from './services.ts'
import type { ServicePage } from './services.ts'

const bgServices = getServices('bg')
const serviceBySlug = new Map<string, ServicePage>(
  bgServices.map((s) => [s.slug, s]),
)
const serviceByEnSlug = new Map<string, ServicePage>(
  bgServices.map((s) => [s.enSlug, s]),
)
const serviceByBgAnchor = new Map<string, ServicePage>(
  bgServices.map((s) => [s.anchor, s]),
)
const projectSlugs = new Set<string>(getProjects('bg').map((p) => p.slug))

const bgToEnStatic: Record<string, string> = {
  '/': '/en',
  '/uslugi': '/en/services',
  '/portfolio': '/en/portfolio',
  '/za-nas': '/en/about',
  '/kontakt': '/en/contact',
  '/politika-za-poveritelnost': '/en/privacy',
}

const enToBgStatic: Record<string, string> = {
  '/': '/',
  '/services': '/uslugi',
  '/portfolio': '/portfolio',
  '/about': '/za-nas',
  '/contact': '/kontakt',
  '/privacy': '/politika-za-poveritelnost',
}

function stripEn(pathname: string): string {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

function splitHash(value: string): { path: string; hash: string } {
  const at = value.indexOf('#')
  if (at === -1) return { path: value, hash: '' }
  return { path: value.slice(0, at), hash: value.slice(at + 1) }
}

/** Maps a BG-style path to the equivalent path for the given locale. */
export function toLocalizedPath(locale: Locale, bgPath: string): string {
  const { path, hash } = splitHash(bgPath)

  // Legacy BG service slug (e.g. /izrabotka-na-sait) → services index anchor.
  if (path !== '/uslugi') {
    const legacy = serviceBySlug.get(path.slice(1))
    if (legacy) {
      return locale === 'en'
        ? `/en/services#${legacy.enSlug}`
        : `/uslugi#${legacy.anchor}`
    }
  }

  if (locale === 'bg') return bgPath

  if (path === '/uslugi') {
    const service = serviceByBgAnchor.get(hash)
    return service ? `/en/services#${service.enSlug}` : '/en/services'
  }
  if (bgToEnStatic[path] !== undefined) return bgToEnStatic[path]
  if (path.startsWith('/portfolio/')) return '/en' + path
  // Unknown path — return unchanged so callers never generate a false route.
  return bgPath
}

/** Maps an EN path back to the canonical BG-style path. */
export function toBgPath(pathname: string): string {
  if (getLocaleFromPathname(pathname) === 'bg') return pathname
  const { path, hash } = splitHash(pathname)
  const stripped = stripEn(path)

  if (stripped === '/services') {
    const service = serviceByEnSlug.get(hash)
    return service ? `/uslugi#${service.anchor}` : '/uslugi'
  }
  if (enToBgStatic[stripped] !== undefined) return enToBgStatic[stripped]
  if (stripped.startsWith('/portfolio/')) return stripped
  if (stripped.startsWith('/services/')) {
    const slug = stripped.slice('/services/'.length)
    const service = serviceByEnSlug.get(slug) ?? serviceBySlug.get(slug)
    // Unknown service slugs stay unknown so they resolve to a real 404.
    return service ? `/uslugi#${service.anchor}` : stripped
  }
  return stripped || '/'
}

/** Whether a BG-style path maps to a real indexable page. */
export function isKnownBgRoute(bgPath: string): boolean {
  const { path } = splitHash(bgPath)
  if (path in bgToEnStatic) return true
  if (path.startsWith('/portfolio/')) {
    return projectSlugs.has(path.slice('/portfolio/'.length))
  }
  return false
}

/** Whether a full pathname maps to a real page (either locale). */
export function isKnownRoute(pathname: string): boolean {
  if (getLocaleFromPathname(pathname) === 'bg') {
    return isKnownBgRoute(pathname)
  }
  return isKnownBgRoute(toBgPath(pathname))
}

/** The other language's URL for the current page, or null if unknown. */
export function getAlternateHref(pathname: string): string | null {
  const locale = getLocaleFromPathname(pathname)
  const other: Locale = locale === 'bg' ? 'en' : 'bg'
  const bgPath = toBgPath(pathname)
  if (!isKnownBgRoute(bgPath)) return null
  return toLocalizedPath(other, bgPath)
}

/**
 * Returns a 301 redirect target for a legacy service route, mapping it to the
 * matching section anchor on the services index. Unknown paths return null.
 */
export function getServiceRedirect(pathname: string): string | null {
  if (getLocaleFromPathname(pathname) === 'en') {
    const stripped = stripEn(pathname)
    if (stripped.startsWith('/services/')) {
      const slug = stripped.slice('/services/'.length)
      const service = serviceByEnSlug.get(slug) ?? serviceBySlug.get(slug)
      return service ? `/en/services#${service.enSlug}` : null
    }
    return null
  }

  const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname
  const service = serviceBySlug.get(slug)
  return service ? `/uslugi#${service.anchor}` : null
}
