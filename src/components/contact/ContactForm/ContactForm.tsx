import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import {
  budgetOptions,
  emptyContactValues,
  hasErrors,
  projectTypeOptions,
  validateContact,
} from '@/lib/contact'
import type {
  ContactErrors,
  ContactField,
  ContactFormValues,
} from '@/lib/contact'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './ContactForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type ApiResponse = {
  ok?: boolean
  message?: string
  errors?: ContactErrors
}

const fieldOrder: ContactField[] = [
  'name',
  'email',
  'phone',
  'projectType',
  'budget',
  'message',
  'consent',
]

export function ContactForm() {
  const uid = useId()
  const { locale, l } = useLocale()
  const t = ui[locale].form
  const projectOptions = projectTypeOptions[locale]
  const budgetOptionsList = budgetOptions[locale]

  const [values, setValues] = useState<ContactFormValues>(emptyContactValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  function update(patch: Partial<ContactFormValues>) {
    setValues((prev) => ({ ...prev, ...patch }))
    if (status !== 'idle') setStatus('idle')
    setErrors((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(patch) as ContactField[]) {
        delete next[key]
      }
      return next
    })
  }

  function focusFirstError(nextErrors: ContactErrors) {
    const firstField = fieldOrder.find((field) => nextErrors[field])
    if (!firstField) return
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
      ?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateContact(values, locale)
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors)
      setStatus('idle')
      focusFirstError(nextErrors)
      return
    }

    setErrors({})
    setServerMessage('')
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      })
      const payload = (await response
        .json()
        .catch(() => null)) as ApiResponse | null

      if (response.ok && payload?.ok) {
        setValues(emptyContactValues)
        setStatus('success')
        window.requestAnimationFrame(() => successRef.current?.focus())
        return
      }

      if (response.status === 400 && payload?.errors) {
        setErrors(payload.errors)
        setStatus('idle')
        focusFirstError(payload.errors)
        return
      }

      setStatus('error')
      setServerMessage(t.serverError)
    } catch {
      setStatus('error')
      setServerMessage(t.networkError)
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={styles.success}
      >
        <p className={styles.successTitle}>{t.successTitle}</p>
        <p className={styles.successText}>{t.successText}</p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStatus('idle')}
        >
          {t.newInquiry}
        </Button>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-name`}>
            {t.name} <span aria-hidden="true">{t.required}</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            className={styles.input}
            value={values.name}
            onChange={(event) => update({ name: event.target.value })}
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
          {errors.name && (
            <p id={`${uid}-name-error`} className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-email`}>
            {t.email} <span aria-hidden="true">{t.required}</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            className={styles.input}
            value={values.email}
            onChange={(event) => update({ email: event.target.value })}
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          />
          {errors.email && (
            <p id={`${uid}-email-error`} className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-phone`}>
            {t.phone}
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            className={styles.input}
            value={values.phone}
            onChange={(event) => update({ phone: event.target.value })}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
          />
          {errors.phone && (
            <p id={`${uid}-phone-error`} className={styles.error}>
              {errors.phone}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-projectType`}>
            {t.projectType} <span aria-hidden="true">{t.required}</span>
          </label>
          <select
            id={`${uid}-projectType`}
            name="projectType"
            className={styles.select}
            value={values.projectType}
            onChange={(event) => update({ projectType: event.target.value })}
            required
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? `${uid}-projectType-error` : undefined
            }
          >
            <option value="">{t.choose}</option>
            {projectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id={`${uid}-projectType-error`} className={styles.error}>
              {errors.projectType}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${uid}-budget`}>
          {t.budget}
        </label>
        <select
          id={`${uid}-budget`}
          name="budget"
          className={styles.select}
          value={values.budget}
          onChange={(event) => update({ budget: event.target.value })}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? `${uid}-budget-error` : undefined}
        >
          <option value="">{t.choose}</option>
          {budgetOptionsList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p id={`${uid}-budget-error`} className={styles.error}>
            {errors.budget}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${uid}-message`}>
          {t.message} <span aria-hidden="true">{t.required}</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          className={styles.textarea}
          value={values.message}
          onChange={(event) => update({ message: event.target.value })}
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
        />
        {errors.message && (
          <p id={`${uid}-message-error`} className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.consentRow}>
          <label className={styles.checkbox} htmlFor={`${uid}-consent`}>
            <input
              id={`${uid}-consent`}
              name="consent"
              type="checkbox"
              className={styles.checkboxInput}
              checked={values.consent}
              onChange={(event) => update({ consent: event.target.checked })}
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={`${uid}-consent-link${
                errors.consent ? ` ${uid}-consent-error` : ''
              }`}
            />
            <span>{t.consent}</span>
          </label>
          <Link
            id={`${uid}-consent-link`}
            className={styles.consentLink}
            to={l('/politika-za-poveritelnost')}
          >
            {t.consentLink}
          </Link>
        </div>
        {errors.consent && (
          <p id={`${uid}-consent-error`} className={styles.error}>
            {errors.consent}
          </p>
        )}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update({ company: event.target.value })}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className={styles.formError}>
          {serverMessage}
        </p>
      )}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          withArrow
          disabled={isSubmitting}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  )
}
