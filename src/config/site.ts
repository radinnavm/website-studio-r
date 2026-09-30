/**
 * Central site configuration.
 * Update these values to re-brand or point the site at a new domain.
 */

import type { Localized, Locale } from '../lib/i18n.ts'

export const site = {
  name: 'Website Studio R',
  shortName: 'Studio R',
  url: 'https://www.websitestudior.bg',
  email: 'websitestudior@gmail.com',
  phone: '+359885167089',
  phoneHref: 'tel:+359885167089',
  ogImage: '/og-image.png',
} as const

const siteCopy: Localized<{ tagline: string; description: string }> = {
  bg: {
    tagline: 'Изработка на сайтове и онлайн магазини за бизнеси в България.',
    description:
      'Website Studio R изработва модерни сайтове и онлайн магазини за бизнеси в България — стратегия, дизайн, разработка, SEO и дългосрочна поддръжка.',
  },
  en: {
    tagline: 'Custom websites and online stores for businesses in Bulgaria.',
    description:
      'Website Studio R builds modern websites and online stores for businesses in Bulgaria — strategy, design, development, SEO and long-term support.',
  },
}

const addressCopy: Localized<{ city: string; country: string }> = {
  bg: { city: 'София', country: 'България' },
  en: { city: 'Sofia', country: 'Bulgaria' },
}

export const ogImageAlt: Localized<string> = {
  bg: 'Website Studio R — изработка на сайтове и онлайн магазини за бизнеси в България',
  en: 'Website Studio R — custom websites and online stores for businesses in Bulgaria',
}

export type Site = typeof site & {
  tagline: string
  description: string
  address: { city: string; country: string }
}

export function getSite(locale: Locale): Site {
  return {
    ...site,
    tagline: siteCopy[locale].tagline,
    description: siteCopy[locale].description,
    address: addressCopy[locale],
  }
}

export type NavItem = {
  label: string
  /** BG-style path; localize with `useLocale().l()` when rendering. */
  href: string
}

export const primaryNav: Localized<NavItem[]> = {
  bg: [
    { label: 'Услуги', href: '/uslugi' },
    { label: 'Портфолио', href: '/portfolio' },
    { label: 'За нас', href: '/za-nas' },
    { label: 'Контакти', href: '/kontakt' },
  ],
  en: [
    { label: 'Services', href: '/uslugi' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/za-nas' },
    { label: 'Contact', href: '/kontakt' },
  ],
}

export function getPrimaryNav(locale: Locale): NavItem[] {
  return primaryNav[locale]
}

/** Primary conversion target — BG-style path, localize with `useLocale().l()`. */
export const contactHref = '/kontakt'
