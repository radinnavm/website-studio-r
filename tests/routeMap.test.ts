import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  getAlternateHref,
  isKnownBgRoute,
  isKnownRoute,
  toBgPath,
  toLocalizedPath,
} from '../src/lib/routeMap.ts'

test('toLocalizedPath keeps BG path for bg locale', () => {
  assert.equal(toLocalizedPath('bg', '/uslugi'), '/uslugi')
  assert.equal(
    toLocalizedPath('bg', '/izrabotka-na-sait'),
    '/izrabotka-na-sait',
  )
})

test('toLocalizedPath maps EN static routes', () => {
  assert.equal(toLocalizedPath('en', '/'), '/en')
  assert.equal(toLocalizedPath('en', '/uslugi'), '/en/services')
  assert.equal(toLocalizedPath('en', '/portfolio'), '/en/portfolio')
  assert.equal(toLocalizedPath('en', '/za-nas'), '/en/about')
  assert.equal(toLocalizedPath('en', '/kontakt'), '/en/contact')
  assert.equal(
    toLocalizedPath('en', '/politika-za-poveritelnost'),
    '/en/privacy',
  )
})

test('toLocalizedPath maps EN service slugs', () => {
  assert.equal(
    toLocalizedPath('en', '/izrabotka-na-sait'),
    '/en/services/website-development',
  )
  assert.equal(
    toLocalizedPath('en', '/izrabotka-na-online-magazin'),
    '/en/services/online-store-development',
  )
  assert.equal(toLocalizedPath('en', '/poddrazhka'), '/en/services/maintenance')
  assert.equal(toLocalizedPath('en', '/seo'), '/en/services/seo')
  assert.equal(toLocalizedPath('en', '/web-design'), '/en/services/web-design')
})

test('toLocalizedPath maps EN portfolio detail', () => {
  assert.equal(
    toLocalizedPath('en', '/portfolio/maison-elise'),
    '/en/portfolio/maison-elise',
  )
})

test('toBgPath maps EN back to BG', () => {
  assert.equal(toBgPath('/en'), '/')
  assert.equal(toBgPath('/en/services'), '/uslugi')
  assert.equal(toBgPath('/en/about'), '/za-nas')
  assert.equal(
    toBgPath('/en/services/website-development'),
    '/izrabotka-na-sait',
  )
  assert.equal(
    toBgPath('/en/portfolio/maison-elise'),
    '/portfolio/maison-elise',
  )
})

test('getAlternateHref returns equivalents for known routes', () => {
  assert.equal(getAlternateHref('/'), '/en')
  assert.equal(getAlternateHref('/uslugi'), '/en/services')
  assert.equal(
    getAlternateHref('/izrabotka-na-sait'),
    '/en/services/website-development',
  )
  assert.equal(
    getAlternateHref('/en/services/website-development'),
    '/izrabotka-na-sait',
  )
  assert.equal(getAlternateHref('/en'), '/')
})

test('getAlternateHref returns null for unknown routes', () => {
  assert.equal(getAlternateHref('/nonexistent'), null)
  assert.equal(getAlternateHref('/en/nonexistent'), null)
})

test('isKnownBgRoute / isKnownRoute', () => {
  assert.equal(isKnownBgRoute('/uslugi'), true)
  assert.equal(isKnownBgRoute('/izrabotka-na-sait'), true)
  assert.equal(isKnownBgRoute('/portfolio/maison-elise'), true)
  assert.equal(isKnownBgRoute('/nonexistent'), false)

  assert.equal(isKnownRoute('/uslugi'), true)
  assert.equal(isKnownRoute('/en/services/website-development'), true)
  assert.equal(isKnownRoute('/en/about'), true)
  assert.equal(isKnownRoute('/nonexistent'), false)
  assert.equal(isKnownRoute('/en/nonexistent'), false)
})
