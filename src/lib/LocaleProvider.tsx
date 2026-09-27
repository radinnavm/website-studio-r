import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { getLocaleFromPathname } from './i18n'
import type { Locale } from './i18n'
import { getAlternateHref, toLocalizedPath } from './routeMap'

type LocaleContextValue = {
  locale: Locale
  isEn: boolean
  pathname: string
  /** Link to the equivalent page in the other language, or null if unknown. */
  alternateHref: string | null
  /** Whether the language switcher should be shown. */
  showSwitcher: boolean
  /** Convert a BG-style path to the current locale's path. */
  l: (bgPath: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const locale = getLocaleFromPathname(pathname)
  const alternateHref = getAlternateHref(pathname)

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      isEn: locale === 'en',
      pathname,
      alternateHref,
      showSwitcher: alternateHref !== null,
      l: (bgPath: string) => toLocalizedPath(locale, bgPath),
    }),
    [locale, pathname, alternateHref],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook shared across the app
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}
