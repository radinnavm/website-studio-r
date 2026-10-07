/**
 * Environment-agnostic SEO head computation shared by the client (`useSeo`),
 * the build-time prerender and (indirectly) the server.
 */

import { getSite, ogImageAlt, site } from '../config/site.ts'
import { getHomeContent } from './content.ts'
import { htmlLang, ogLocale } from './i18n.ts'
import type { Locale } from './i18n.ts'
import { about } from './about.ts'
import { privacy } from './privacy.ts'
import { getProjectBySlug } from './portfolio.ts'
import { toLocalizedPath } from './routeMap.ts'
import { ui } from './ui.ts'
import { absoluteUrl } from './url.ts'

export type PageSeo = {
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
  noIndex?: boolean
  image?: string
}

export type HeadValues = {
  lang: string
  title: string
  description: string
  canonical: string | null
  robots: string
  ogType: string
  ogTitle: string
  ogDescription: string
  ogUrl: string | null
  ogLocale: string
  ogImage: string
  ogImageAlt: string
  hreflang: { hreflang: string; href: string }[]
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  jsonLd: { id: string; data: unknown }[]
}

const servicesIndexMeta: Record<
  Locale,
  { title: string; description: string }
> = {
  bg: {
    title:
      'Услуги за изработка на сайтове и онлайн магазини | Website Studio R',
    description:
      'Уеб услуги за изработка на сайтове и онлайн магазини, уеб дизайн, SEO оптимизация и поддръжка на сайт — от концепция до развитие.',
  },
  en: {
    title: 'Services | Website Studio R',
    description:
      'Services for building websites and online stores, web design, SEO and long-term maintenance — from concept to growth after launch.',
  },
}

const portfolioMeta: Record<Locale, { title: string; description: string }> = {
  bg: {
    title: 'Портфолио — изработка на сайтове | Website Studio R',
    description:
      'Портфолио с изработени сайтове и онлайн магазини — уеб дизайн, уеб разработка и custom development.',
  },
  en: {
    title: 'Portfolio | Website Studio R',
    description:
      'Selected projects — websites and online stores built with a focus on design, structure and technical reliability.',
  },
}

const contactMeta: Record<Locale, { title: string; description: string }> = {
  bg: {
    title: 'Контакти — изработка на сайт | Website Studio R',
    description:
      'Запитване и оферта за изработка на сайт или онлайн магазин. Свържете се с Website Studio R — ще обсъдим целите и обхвата.',
  },
  en: {
    title: 'Contact | Website Studio R',
    description:
      'Get in touch with Website Studio R to discuss your website or online store — goals, scope and next steps.',
  },
}

const notFoundMeta: Record<Locale, { title: string; description: string }> = {
  bg: {
    title: `Страницата не е намерена — ${site.name}`,
    description:
      'Възможно е адресът да е променен или страницата да е преместена.',
  },
  en: {
    title: `Page not found — ${site.name}`,
    description: 'The address may have changed or the page may have moved.',
  },
}

const caseSuffix: Record<Locale, string> = {
  bg: 'изработка на онлайн магазин',
  en: 'Project',
}

/** Returns the per-route SEO data for a BG-style path and locale. */
export function getPageSeo(bgPath: string, locale: Locale): PageSeo {
  if (bgPath === '/') {
    const m = getHomeContent(locale).meta
    return { path: '/', title: m.title, description: m.description }
  }
  if (bgPath === '/uslugi') {
    const m = servicesIndexMeta[locale]
    return { path: '/uslugi', title: m.title, description: m.description }
  }
  if (bgPath === '/portfolio') {
    const m = portfolioMeta[locale]
    return { path: '/portfolio', title: m.title, description: m.description }
  }
  if (bgPath === '/kontakt') {
    const m = contactMeta[locale]
    return { path: '/kontakt', title: m.title, description: m.description }
  }
  if (bgPath === '/za-nas') {
    const m = about[locale].meta
    return { path: '/za-nas', title: m.title, description: m.description }
  }
  if (bgPath === '/politika-za-poveritelnost') {
    const m = privacy[locale].meta
    return {
      path: bgPath,
      title: m.title,
      description: m.description,
      noIndex: true,
    }
  }
  if (bgPath.startsWith('/portfolio/')) {
    const project = getProjectBySlug(locale, bgPath.slice('/portfolio/'.length))
    if (project) {
      return {
        path: bgPath,
        title: `${project.name} — ${caseSuffix[locale]} | ${site.name}`,
        description: project.summary,
        type: 'article',
      }
    }
  }

  const nf = notFoundMeta[locale]
  return {
    path: bgPath,
    title: nf.title,
    description: nf.description,
    noIndex: true,
  }
}

function buildOrganizationWebSite(locale: Locale): Record<string, unknown>[] {
  const base = site.url.replace(/\/$/, '')
  const siteUrl = absoluteUrl(toLocalizedPath(locale, '/'))
  const siteBase = siteUrl.replace(/\/+$/, '')
  const address = getSite(locale).address

  return [
    {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: site.name,
      url: base,
      logo: absoluteUrl(site.ogImage),
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.city,
        addressCountry: 'BG',
      },
      areaServed: 'BG',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteBase}/#website`,
      url: siteUrl,
      name: site.name,
      inLanguage: htmlLang[locale],
      publisher: { '@id': `${base}/#organization` },
    },
  ]
}

function buildBreadcrumb(
  bgPath: string,
  locale: Locale,
): Record<string, unknown> | null {
  if (bgPath === '/') return null

  const labels = ui[locale]
  const items: { name: string; href?: string }[] = [
    { name: labels.home, href: '/' },
  ]

  if (bgPath === '/uslugi') {
    items.push({ name: labels.services })
  } else if (bgPath === '/portfolio') {
    items.push({ name: labels.portfolioLabel })
  } else if (bgPath === '/za-nas') {
    items.push({ name: labels.aboutLabel })
  } else if (bgPath === '/kontakt') {
    items.push({ name: labels.contactLabel })
  } else if (bgPath.startsWith('/portfolio/')) {
    const project = getProjectBySlug(locale, bgPath.slice('/portfolio/'.length))
    if (!project) return null
    items.push({ name: labels.portfolioLabel, href: '/portfolio' })
    items.push({ name: project.name })
  } else {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href
        ? { item: absoluteUrl(toLocalizedPath(locale, item.href)) }
        : {}),
    })),
  }
}

export function getHeadValues(
  bgPath: string,
  locale: Locale,
  seo: PageSeo,
): HeadValues {
  const localizedPath = toLocalizedPath(locale, bgPath)
  const canonical = seo.noIndex ? null : absoluteUrl(localizedPath)
  const image = seo.image ?? site.ogImage
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)
  const hreflang = seo.noIndex
    ? []
    : [
        { hreflang: 'bg-BG', href: absoluteUrl(toLocalizedPath('bg', bgPath)) },
        { hreflang: 'en', href: absoluteUrl(toLocalizedPath('en', bgPath)) },
        {
          hreflang: 'x-default',
          href: absoluteUrl(toLocalizedPath('bg', bgPath)),
        },
      ]

  const jsonLd: { id: string; data: unknown }[] = []
  if (!seo.noIndex) {
    jsonLd.push({
      id: 'organization-website',
      data: buildOrganizationWebSite(locale),
    })
    const breadcrumb = buildBreadcrumb(bgPath, locale)
    if (breadcrumb) jsonLd.push({ id: 'breadcrumbs', data: breadcrumb })
  }

  return {
    lang: htmlLang[locale],
    title: seo.title,
    description: seo.description,
    canonical,
    robots: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    ogType: seo.type ?? 'website',
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogUrl: canonical,
    ogLocale: ogLocale[locale],
    ogImage: imageUrl,
    ogImageAlt: ogImageAlt[locale],
    hreflang,
    twitterCard: 'summary_large_image',
    twitterTitle: seo.title,
    twitterDescription: seo.description,
    twitterImage: imageUrl,
    jsonLd,
  }
}
