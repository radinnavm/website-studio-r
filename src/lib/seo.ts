import { useEffect } from 'react'

import { site } from '@/config/site'
import { useLocale } from '@/lib/LocaleProvider'
import type { Locale } from '@/lib/i18n'
import { getHeadValues } from '@/lib/seoHead'
import type { PageSeo } from '@/lib/seoHead'

export type SeoConfig = PageSeo

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  )
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertAlternate(hreflang: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  )
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function removeLink(rel: string): void {
  document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)?.remove()
}

function removeAlternate(hreflang: string): void {
  document.head
    .querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${hreflang}"]`,
    )
    ?.remove()
}

function removeMeta(attr: 'name' | 'property', key: string): void {
  document.head
    .querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    ?.remove()
}

function upsertJsonLd(id: string, data: unknown): void {
  document.head
    .querySelector<HTMLScriptElement>(`script[data-seo-jsonld="${id}"]`)
    ?.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', id)
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

function removeJsonLd(id: string): void {
  document.head
    .querySelector<HTMLScriptElement>(`script[data-seo-jsonld="${id}"]`)
    ?.remove()
}

/**
 * Applies SEO metadata for the given locale using the shared head computation,
 * so the client matches the build-time prerendered HTML exactly.
 */
export function applySeo(config: SeoConfig, locale: Locale = 'bg'): void {
  const head = getHeadValues(config.path ?? '/', locale, config)

  document.title = head.title
  document.documentElement.lang = head.lang

  upsertMeta('name', 'description', head.description)
  upsertMeta('name', 'robots', head.robots)

  if (head.canonical) {
    upsertLink('canonical', head.canonical)
  } else {
    removeLink('canonical')
  }

  if (head.ogUrl) {
    upsertMeta('property', 'og:url', head.ogUrl)
  } else {
    removeMeta('property', 'og:url')
  }

  for (const hreflang of ['bg-BG', 'en', 'x-default']) removeAlternate(hreflang)
  for (const alternate of head.hreflang) {
    upsertAlternate(alternate.hreflang, alternate.href)
  }

  upsertMeta('property', 'og:type', head.ogType)
  upsertMeta('property', 'og:site_name', site.name)
  upsertMeta('property', 'og:locale', head.ogLocale)
  upsertMeta('property', 'og:title', head.ogTitle)
  upsertMeta('property', 'og:description', head.ogDescription)
  upsertMeta('property', 'og:image', head.ogImage)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('property', 'og:image:alt', head.ogImageAlt)

  upsertMeta('name', 'twitter:card', head.twitterCard)
  upsertMeta('name', 'twitter:title', head.twitterTitle)
  upsertMeta('name', 'twitter:description', head.twitterDescription)
  upsertMeta('name', 'twitter:image', head.twitterImage)

  // Locale-aware Organization/WebSite + BreadcrumbList JSON-LD.
  for (const id of ['organization-website', 'breadcrumbs']) removeJsonLd(id)
  for (const item of head.jsonLd) upsertJsonLd(item.id, item.data)
}

/** React hook wrapper around {@link applySeo}. */
export function useSeo(config: SeoConfig): void {
  const { locale } = useLocale()

  useEffect(() => {
    applySeo(config, locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.path,
    config.title,
    config.description,
    config.type,
    config.noIndex,
    config.image,
    locale,
  ])
}
