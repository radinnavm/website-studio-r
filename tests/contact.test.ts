import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  emptyContactValues,
  hasErrors,
  validateContact,
} from '../src/lib/contact.ts'

const valid = {
  ...emptyContactValues,
  name: 'Ivan',
  email: 'ivan@example.com',
  projectType: 'seo',
  message: 'A valid message with enough length.',
  consent: true,
}

test('validateContact BG reports required fields', () => {
  const errors = validateContact(emptyContactValues, 'bg')
  assert.ok(errors.name)
  assert.ok(errors.email)
  assert.ok(errors.projectType)
  assert.ok(errors.message)
  assert.ok(errors.consent)
})

test('validateContact EN uses English messages', () => {
  const errors = validateContact(emptyContactValues, 'en')
  assert.equal(errors.name, 'Please enter your name.')
  assert.equal(errors.email, 'Please enter your email.')
})

test('validateContact EN invalid email message', () => {
  const errors = validateContact({ ...valid, email: 'not-an-email' }, 'en')
  assert.equal(errors.email, 'Please enter a valid email address.')
})

test('validateContact accepts valid submission', () => {
  const errors = validateContact(valid, 'bg')
  assert.equal(hasErrors(errors), false)
})

test('validateContact rejects missing consent', () => {
  const errors = validateContact({ ...valid, consent: false }, 'bg')
  assert.ok(errors.consent)
})
