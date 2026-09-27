import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getHeadValues, getPageSeo } from '../src/lib/seoHead.ts'

test('BG head values', () => {
  const head = getHeadValues('/uslugi', 'bg', getPageSeo('/uslugi', 'bg'))
  assert.equal(head.lang, 'bg')
  assert.equal(head.canonical, 'https://www.websitestudior.bg/uslugi')
  assert.equal(head.robots, 'index, follow')
  assert.equal(head.ogLocale, 'bg_BG')
  assert.equal(head.hreflang.length, 3)
  assert.equal(head.hreflang[0].hreflang, 'bg-BG')
  assert.equal(head.hreflang[1].hreflang, 'en')
  assert.equal(
    head.hreflang[1].href,
    'https://www.websitestudior.bg/en/services',
  )
  assert.ok(head.jsonLd.some((x) => x.id === 'organization-website'))
  assert.ok(head.jsonLd.some((x) => x.id === 'breadcrumbs'))
})

test('EN head values', () => {
  const head = getHeadValues('/uslugi', 'en', getPageSeo('/uslugi', 'en'))
  assert.equal(head.lang, 'en')
  assert.equal(head.canonical, 'https://www.websitestudior.bg/en/services')
  assert.equal(head.ogLocale, 'en_US')
  assert.equal(head.title, 'Services | Website Studio R')
})

test('noindex privacy removes canonical/hreflang/jsonld', () => {
  const head = getHeadValues(
    '/politika-za-poveritelnost',
    'bg',
    getPageSeo('/politika-za-poveritelnost', 'bg'),
  )
  assert.equal(head.canonical, null)
  assert.equal(head.hreflang.length, 0)
  assert.equal(head.robots, 'noindex, nofollow')
  assert.equal(head.jsonLd.length, 0)
})

test('WebSite @id has no double slash', () => {
  const head = getHeadValues('/', 'bg', getPageSeo('/', 'bg'))
  const org = head.jsonLd.find((x) => x.id === 'organization-website')
  const graph = org?.data as Record<string, unknown>[]
  const website = graph?.find((g) => g['@type'] === 'WebSite')
  assert.equal(website?.['@id'], 'https://www.websitestudior.bg/#website')
})

test('404 head values are noindex', () => {
  const head = getHeadValues('/404', 'en', getPageSeo('/404', 'en'))
  assert.equal(head.robots, 'noindex, nofollow')
  assert.equal(head.canonical, null)
  assert.equal(head.hreflang.length, 0)
})
