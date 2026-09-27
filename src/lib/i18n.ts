/**
 * Locale primitives. Route/URL mapping lives in `routeMap.ts`.
 */

export type Locale = 'bg' | 'en'

export type Localized<T> = {
  bg: T
  en: T
}

export const htmlLang: Record<Locale, string> = {
  bg: 'bg',
  en: 'en',
}

export const ogLocale: Record<Locale, string> = {
  bg: 'bg_BG',
  en: 'en_US',
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'bg'
}
