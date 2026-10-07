import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

import type { Plugin } from 'vite'

import { site } from '../src/config/site.ts'
import type { Locale } from '../src/lib/i18n.ts'
import { getProjects } from '../src/lib/portfolio.ts'
import { toLocalizedPath } from '../src/lib/routeMap.ts'
import { getHeadValues, getPageSeo } from '../src/lib/seoHead.ts'
import type { HeadValues } from '../src/lib/seoHead.ts'
import { absoluteUrl } from '../src/lib/url.ts'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/** Renders the route-specific head meta/link/script tags. */
export function renderHeadTags(head: HeadValues): string {
  const parts: string[] = []
  parts.push(
    `<meta name="description" content="${escapeHtml(head.description)}">`,
  )
  parts.push(`<meta name="robots" content="${head.robots}">`)
  if (head.canonical) {
    parts.push(`<link rel="canonical" href="${escapeHtml(head.canonical)}">`)
  }
  for (const alternate of head.hreflang) {
    parts.push(
      `<link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}">`,
    )
  }
  parts.push(`<meta property="og:type" content="${head.ogType}">`)
  parts.push(
    `<meta property="og:site_name" content="${escapeHtml(site.name)}">`,
  )
  parts.push(`<meta property="og:locale" content="${head.ogLocale}">`)
  parts.push(`<meta property="og:title" content="${escapeHtml(head.ogTitle)}">`)
  parts.push(
    `<meta property="og:description" content="${escapeHtml(head.ogDescription)}">`,
  )
  if (head.ogUrl) {
    parts.push(`<meta property="og:url" content="${escapeHtml(head.ogUrl)}">`)
  }
  parts.push(`<meta property="og:image" content="${escapeHtml(head.ogImage)}">`)
  parts.push(`<meta property="og:image:width" content="1200">`)
  parts.push(`<meta property="og:image:height" content="630">`)
  parts.push(
    `<meta property="og:image:alt" content="${escapeHtml(head.ogImageAlt)}">`,
  )
  parts.push(`<meta name="twitter:card" content="${head.twitterCard}">`)
  parts.push(
    `<meta name="twitter:title" content="${escapeHtml(head.twitterTitle)}">`,
  )
  parts.push(
    `<meta name="twitter:description" content="${escapeHtml(head.twitterDescription)}">`,
  )
  parts.push(
    `<meta name="twitter:image" content="${escapeHtml(head.twitterImage)}">`,
  )
  for (const item of head.jsonLd) {
    parts.push(
      `<script type="application/ld+json" data-seo-jsonld="${item.id}">${escapeJson(item.data)}</script>`,
    )
  }
  return parts.join('')
}

/**
 * Injects the computed head metadata into the built SPA shell, removing any
 * existing managed tags first. Stripping is whitespace/newline tolerant.
 */
export function prerenderHead(shell: string, head: HeadValues): string {
  let html = shell
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${head.lang}"`)
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(head.title)}</title>`,
  )

  // Remove all managed meta tags regardless of formatting.
  html = html.replace(/<meta\b[\s\S]*?>/g, (tag) => {
    if (/name=["']description["']/.test(tag)) return ''
    if (/name=["']robots["']/.test(tag)) return ''
    if (/property=["']og:[^"']*["']/.test(tag)) return ''
    if (/name=["']twitter:[^"']*["']/.test(tag)) return ''
    return tag
  })

  // Remove canonical + hreflang alternates.
  html = html.replace(/<link\b[\s\S]*?>/g, (tag) => {
    if (/rel=["']canonical["']/.test(tag)) return ''
    if (/rel=["']alternate["']/.test(tag)) return ''
    return tag
  })

  // Remove existing JSON-LD blocks.
  html = html.replace(
    /<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/g,
    '',
  )

  return html.replace('</head>', renderHeadTags(head) + '</head>')
}

export function renderSitemap(bgIndexable: string[]): string {
  const urls: string[] = []
  for (const bgPath of bgIndexable) {
    for (const locale of ['bg', 'en'] as const) {
      const loc = absoluteUrl(toLocalizedPath(locale, bgPath))
      const bgAlt = absoluteUrl(toLocalizedPath('bg', bgPath))
      const enAlt = absoluteUrl(toLocalizedPath('en', bgPath))
      urls.push(
        `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="bg-BG" href="${bgAlt}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enAlt}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${bgAlt}"/>\n  </url>`,
      )
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

export function indexableBgRoutes(): string[] {
  return [
    '/',
    '/uslugi',
    '/portfolio',
    '/za-nas',
    '/kontakt',
    ...getProjects('bg').map((project) => `/portfolio/${project.slug}`),
  ]
}

/**
 * Build-time prerender: writes a per-route HTML file with the correct,
 * locale-aware SEO metadata, plus a generated sitemap.xml.
 */
export function prerenderPlugin(): Plugin {
  return {
    name: 'prerender',
    async closeBundle() {
      const distDir = resolve(process.cwd(), 'dist')
      const shell = await readFile(join(distDir, 'index.html'), 'utf8')

      const bgIndexable = indexableBgRoutes()
      const bgAll = [...bgIndexable, '/politika-za-poveritelnost']

      const routes: { path: string; bgPath: string; locale: Locale }[] = []
      for (const bgPath of bgAll) {
        routes.push({ path: bgPath, bgPath, locale: 'bg' })
        routes.push({
          path: toLocalizedPath('en', bgPath),
          bgPath,
          locale: 'en',
        })
      }

      for (const route of routes) {
        const head = getHeadValues(
          route.bgPath,
          route.locale,
          getPageSeo(route.bgPath, route.locale),
        )
        const html = prerenderHead(shell, head)
        const out =
          route.path === '/'
            ? join(distDir, 'index.html')
            : join(distDir, route.path, 'index.html')
        await mkdir(dirname(out), { recursive: true })
        await writeFile(out, html)
      }

      // noindex 404 pages for both locales.
      const bg404 = prerenderHead(
        shell,
        getHeadValues('/404', 'bg', getPageSeo('/404', 'bg')),
      )
      await writeFile(join(distDir, '404.html'), bg404)

      const en404 = prerenderHead(
        shell,
        getHeadValues('/404', 'en', getPageSeo('/404', 'en')),
      )
      await mkdir(join(distDir, 'en'), { recursive: true })
      await writeFile(join(distDir, 'en', '404.html'), en404)

      // Generated sitemap (indexable only, mutual hreflang).
      await writeFile(join(distDir, 'sitemap.xml'), renderSitemap(bgIndexable))
    },
  }
}
