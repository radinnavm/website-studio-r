import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  indexableBgRoutes,
  prerenderHead,
  renderSitemap,
} from '../server/prerender.ts'
import { getHeadValues, getPageSeo } from '../src/lib/seoHead.ts'

const shell = `<!doctype html>
<html lang="bg">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <meta name="theme-color" content="#F7F4EF" />
    <meta
      name="description"
      content="Generic fallback description"
    />
    <meta
      property="og:title"
      content="Generic OG title"
    />
    <meta
      property="og:description"
      content="Generic OG description"
    />
    <meta
      property="og:image"
      content="https://websitestudior.com/og-image.png"
    />
    <meta
      name="twitter:title"
      content="Generic twitter title"
    />
    <meta
      name="twitter:description"
      content="Generic twitter description"
    />
    <meta
      name="twitter:image"
      content="https://websitestudior.com/og-image.png"
    />
    <title>Generic title</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-test.js"></script>
  </body>
</html>`

function count(html: string, re: RegExp): number {
  return (html.match(re) || []).length
}

function render(bgPath: string, locale: 'bg' | 'en') {
  return prerenderHead(
    shell,
    getHeadValues(bgPath, locale, getPageSeo(bgPath, locale)),
  )
}

test('prerendered EN service page has singleton metadata', () => {
  const html = render('/izrabotka-na-sait', 'en')
  assert.equal(count(html, /<meta name="description"/g), 1)
  assert.equal(count(html, /<meta property="og:title"/g), 1)
  assert.equal(count(html, /<meta property="og:description"/g), 1)
  assert.equal(count(html, /<meta property="og:image"/g), 1)
  assert.equal(count(html, /<meta name="twitter:title"/g), 1)
  assert.equal(count(html, /<meta name="twitter:description"/g), 1)
  assert.equal(count(html, /<meta name="twitter:image"/g), 1)
  assert.equal(count(html, /<link rel="canonical"/g), 1)
  assert.equal(count(html, /<link rel="alternate"/g), 3)
  assert.match(
    html,
    /<meta name="description" content="Representative websites/,
  )
})

test('prerendered BG service page has singleton metadata and BG title', () => {
  const html = render('/izrabotka-na-sait', 'bg')
  assert.equal(count(html, /<meta name="description"/g), 1)
  assert.equal(count(html, /<meta property="og:title"/g), 1)
  assert.equal(count(html, /<link rel="canonical"/g), 1)
  assert.equal(count(html, /<link rel="alternate"/g), 3)
  assert.match(html, /<html lang="bg"/)
  assert.match(html, /<title>Изработка на сайт \| Website Studio R<\/title>/)
})

test('prerendered noindex privacy page has no canonical/hreflang', () => {
  const html = render('/politika-za-poveritelnost', 'bg')
  assert.equal(count(html, /<link rel="canonical"/g), 0)
  assert.equal(count(html, /<link rel="alternate"/g), 0)
  assert.equal(
    count(html, /<meta name="robots" content="noindex, nofollow"/g),
    1,
  )
  assert.equal(count(html, /data-seo-jsonld/g), 0)
})

test('prerendered 404 page has no canonical/hreflang', () => {
  const html = render('/404', 'en')
  assert.equal(count(html, /<link rel="canonical"/g), 0)
  assert.equal(count(html, /<link rel="alternate"/g), 0)
  assert.equal(
    count(html, /<meta name="robots" content="noindex, nofollow"/g),
    1,
  )
})

test('sitemap includes all indexable BG+EN routes and excludes privacy/404', () => {
  const bgRoutes = indexableBgRoutes()
  const sitemap = renderSitemap(bgRoutes)
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert.equal(locs.length, bgRoutes.length * 2)
  for (const bg of bgRoutes) {
    assert.ok(locs.includes(`https://websitestudior.com${bg}`))
  }
  assert.ok(!sitemap.includes('politika-za-poveritelnost'))
  assert.ok(!sitemap.includes('/404'))
  assert.ok(sitemap.includes('hreflang="bg-BG"'))
  assert.ok(sitemap.includes('hreflang="en"'))
  assert.ok(sitemap.includes('hreflang="x-default"'))
})
