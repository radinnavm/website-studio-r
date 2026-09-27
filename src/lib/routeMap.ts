/**
 * Locale-aware route mapping + known-route checks. Environment-agnostic module
 * used by both the client (LocaleProvider, SEO) and the server (soft-404
 * allowlist) and the build-time prerender.
 */

import { getLocaleFromPathname } from './i18n.ts'
import type { Locale } from './i18n.ts'
import { getProjects } from './portfolio.ts'
import { getServices } from './services.ts'

const bgServices = getServices('bg')
const serviceEnSlug = new Map<string, string>(
  bgServices.map((s) => [s.slug, s.enSlug]),
)
const serviceBgSlug = new Map<string, string>(
  bgServices.map((s) => [s.enSlug, s.slug]),
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

/** Maps a BG-style path to the equivalent path for the given locale. */
export function toLocalizedPath(locale: Locale, bgPath: string): string {
  if (locale === 'bg') return bgPath
  if (bgToEnStatic[bgPath] !== undefined) return bgToEnStatic[bgPath]
  if (bgPath.startsWith('/portfolio/')) return '/en' + bgPath
  const enSlug = serviceEnSlug.get(bgPath.slice(1))
  if (enSlug) return `/en/services/${enSlug}`
  // Unknown path — return unchanged so callers never generate a false route.
  return bgPath
}

/** Maps an EN path back to the canonical BG-style path. */
export function toBgPath(pathname: string): string {
  if (getLocaleFromPathname(pathname) === 'bg') return pathname
  const stripped = stripEn(pathname)
  if (enToBgStatic[stripped] !== undefined) return enToBgStatic[stripped]
  if (stripped.startsWith('/portfolio/')) return stripped
  if (stripped.startsWith('/services/')) {
    const enSlug = stripped.slice('/services/'.length)
    const bgSlug = serviceBgSlug.get(enSlug)
    return bgSlug ? `/${bgSlug}` : `/${enSlug}`
  }
  return stripped || '/'
}

/** Whether a BG-style path maps to a real indexable page. */
export function isKnownBgRoute(bgPath: string): boolean {
  if (bgPath in bgToEnStatic) return true
  if (bgPath.startsWith('/portfolio/')) {
    return projectSlugs.has(bgPath.slice('/portfolio/'.length))
  }
  if (bgPath.startsWith('/')) {
    return serviceEnSlug.has(bgPath.slice(1))
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

/** Old EN service slugs → natural EN slugs (permanent redirects). */
export const enSlugRedirects: Record<string, string> = {
  'izrabotka-na-sait': 'website-development',
  'izrabotka-na-online-magazin': 'online-store-development',
  poddrazhka: 'maintenance',
}

/** Returns a 301 redirect target for an old EN service slug, if any. */
export function getServiceRedirect(pathname: string): string | null {
  if (getLocaleFromPathname(pathname) !== 'en') return null
  const stripped = stripEn(pathname)
  if (stripped.startsWith('/services/')) {
    const slug = stripped.slice('/services/'.length)
    const target = enSlugRedirects[slug]
    if (target) return `/en/services/${target}`
  }
  return null
}
