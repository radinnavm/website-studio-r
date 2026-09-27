/**
 * Contact form contract shared by the client and the API.
 * Pure, environment-agnostic module — imported by both `src` and `server`.
 */

// Locale/Localized are defined locally to keep this module usable by both the
// bundler and the Node (nodenext) program without a cross-program import.
type Locale = 'bg' | 'en'
type Localized<T> = { bg: T; en: T }

export const projectTypeValues = [
  'business-site',
  'online-store',
  'landing',
  'web-design',
  'seo',
  'support',
  'other',
] as const

export type ProjectTypeValue = (typeof projectTypeValues)[number]

export const budgetValues = [
  'under-1000',
  '1000-2500',
  '2500-5000',
  '5000-plus',
  'unsure',
] as const

export type BudgetValue = (typeof budgetValues)[number]

const projectTypeLabels: Record<Locale, Record<ProjectTypeValue, string>> = {
  bg: {
    'business-site': 'Фирмен сайт',
    'online-store': 'Онлайн магазин',
    landing: 'Landing page',
    'web-design': 'Web design',
    seo: 'SEO',
    support: 'Поддръжка',
    other: 'Друго',
  },
  en: {
    'business-site': 'Business website',
    'online-store': 'Online store',
    landing: 'Landing page',
    'web-design': 'Web design',
    seo: 'SEO',
    support: 'Maintenance',
    other: 'Other',
  },
}

const budgetLabels: Record<Locale, Record<BudgetValue, string>> = {
  bg: {
    'under-1000': 'До 1 000 €',
    '1000-2500': '1 000 – 2 500 €',
    '2500-5000': '2 500 – 5 000 €',
    '5000-plus': '5 000 €+',
    unsure: 'Все още не съм сигурен/а',
  },
  en: {
    'under-1000': 'Up to €1,000',
    '1000-2500': '€1,000 – €2,500',
    '2500-5000': '€2,500 – €5,000',
    '5000-plus': '€5,000+',
    unsure: 'Not sure yet',
  },
}

export const projectTypeOptions: Localized<
  { value: ProjectTypeValue; label: string }[]
> = {
  bg: projectTypeValues.map((value) => ({
    value,
    label: projectTypeLabels.bg[value],
  })),
  en: projectTypeValues.map((value) => ({
    value,
    label: projectTypeLabels.en[value],
  })),
}

export const budgetOptions: Localized<{ value: BudgetValue; label: string }[]> =
  {
    bg: budgetValues.map((value) => ({ value, label: budgetLabels.bg[value] })),
    en: budgetValues.map((value) => ({ value, label: budgetLabels.en[value] })),
  }

export type ContactFormValues = {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  message: string
  consent: boolean
  /** Honeypot field. Must stay empty. */
  company: string
}

export type ContactField =
  'name' | 'email' | 'phone' | 'projectType' | 'budget' | 'message' | 'consent'

export type ContactErrors = Partial<Record<ContactField, string>>

export type NormalizedContact = {
  name: string
  email: string
  phone: string
  projectType: ProjectTypeValue
  budget: BudgetValue | null
  message: string
  consent: boolean
}

export const emptyContactValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
  consent: false,
  company: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// eslint-disable-next-line no-control-regex -- intentionally stripping control characters from user input
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g

const messages: Record<Locale, Record<string, string>> = {
  bg: {
    nameRequired: 'Моля, въведете име.',
    nameShort: 'Името трябва да е поне 2 символа.',
    nameLong: 'Името е твърде дълго.',
    emailRequired: 'Моля, въведете имейл.',
    emailInvalid: 'Въведете валиден имейл адрес.',
    phoneLong: 'Телефонният номер е твърде дълъг.',
    projectTypeRequired: 'Моля, изберете тип проект.',
    projectTypeInvalid: 'Невалиден тип проект.',
    budgetInvalid: 'Невалиден бюджет.',
    messageRequired: 'Моля, опишете накратко проекта.',
    messageShort: 'Опишете проекта с поне 10 символа.',
    messageLong: 'Съобщението е твърде дълго (максимум 2000 символа).',
    consentRequired: 'Моля, потвърдете съгласието за обработка на данните.',
  },
  en: {
    nameRequired: 'Please enter your name.',
    nameShort: 'The name must be at least 2 characters.',
    nameLong: 'The name is too long.',
    emailRequired: 'Please enter your email.',
    emailInvalid: 'Please enter a valid email address.',
    phoneLong: 'The phone number is too long.',
    projectTypeRequired: 'Please choose a project type.',
    projectTypeInvalid: 'Invalid project type.',
    budgetInvalid: 'Invalid budget.',
    messageRequired: 'Please describe your project briefly.',
    messageShort: 'Please describe your project in at least 10 characters.',
    messageLong: 'The message is too long (maximum 2000 characters).',
    consentRequired:
      'Please confirm your consent to the processing of your data.',
  },
}

/** Strips control characters and collapses whitespace. */
export function cleanText(value: string): string {
  return value.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim()
}

export function validateContact(
  values: ContactFormValues,
  locale: Locale = 'bg',
): ContactErrors {
  const m = messages[locale]
  const errors: ContactErrors = {}

  const name = cleanText(values.name)
  if (!name) {
    errors.name = m.nameRequired
  } else if (name.length < 2) {
    errors.name = m.nameShort
  } else if (name.length > 80) {
    errors.name = m.nameLong
  }

  const email = cleanText(values.email)
  if (!email) {
    errors.email = m.emailRequired
  } else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = m.emailInvalid
  }

  const phone = cleanText(values.phone)
  if (phone && phone.length > 40) {
    errors.phone = m.phoneLong
  }

  if (!values.projectType) {
    errors.projectType = m.projectTypeRequired
  } else if (
    !projectTypeValues.includes(values.projectType as ProjectTypeValue)
  ) {
    errors.projectType = m.projectTypeInvalid
  }

  if (values.budget && !budgetValues.includes(values.budget as BudgetValue)) {
    errors.budget = m.budgetInvalid
  }

  const message = cleanText(values.message)
  if (!message) {
    errors.message = m.messageRequired
  } else if (message.length < 10) {
    errors.message = m.messageShort
  } else if (message.length > 2000) {
    errors.message = m.messageLong
  }

  if (values.consent !== true) {
    errors.consent = m.consentRequired
  }

  return errors
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0
}

export function normalizeContact(values: ContactFormValues): NormalizedContact {
  return {
    name: cleanText(values.name),
    email: cleanText(values.email).toLowerCase(),
    phone: cleanText(values.phone),
    projectType: values.projectType as ProjectTypeValue,
    budget: values.budget ? (values.budget as BudgetValue) : null,
    message: cleanText(values.message),
    consent: values.consent === true,
  }
}
