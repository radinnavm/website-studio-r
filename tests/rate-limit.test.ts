import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkRateLimit } from '../server/rate-limit.ts'

test('allows up to 5 requests then blocks within the window', () => {
  const now = Date.now()
  for (let i = 0; i < 5; i += 1) {
    assert.equal(checkRateLimit('ip-a', now).allowed, true)
  }
  const blocked = checkRateLimit('ip-a', now)
  assert.equal(blocked.allowed, false)
  assert.ok(blocked.retryAfterSeconds > 0)
})

test('resets after the window elapses', () => {
  const now = Date.now()
  for (let i = 0; i < 5; i += 1) {
    checkRateLimit('ip-b', now)
  }
  assert.equal(checkRateLimit('ip-b', now).allowed, false)
  assert.equal(checkRateLimit('ip-b', now + 11 * 60 * 1000).allowed, true)
})

test('independent keys do not share a bucket', () => {
  const now = Date.now()
  for (let i = 0; i < 5; i += 1) {
    checkRateLimit('ip-c', now)
  }
  assert.equal(checkRateLimit('ip-d', now).allowed, true)
})
