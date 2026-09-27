/**
 * Contact page content (BG + EN) — kept separate from the form schema.
 */

import type { Localized } from './i18n.ts'

export type ContactExpectation = {
  title: string
  description: string
}

export const contactExpectations: Localized<ContactExpectation[]> = {
  bg: [
    {
      title: 'Отговор на запитването',
      description:
        'Преглеждаме запитването и се свързваме с вас, за да изясним целите.',
    },
    {
      title: 'Обсъждане на нуждите',
      description:
        'Обсъждаме обхвата, сроковете и бюджета в рамките на кратък разговор.',
    },
    {
      title: 'Оферта според проекта',
      description: 'Получавате ясно предложение с обхват и следващи стъпки.',
    },
  ],
  en: [
    {
      title: 'Response to your enquiry',
      description:
        'We review your enquiry and get back to you to clarify your goals.',
    },
    {
      title: 'Discussing your needs',
      description: 'We discuss scope, timeline and budget in a short call.',
    },
    {
      title: 'A proposal tailored to the project',
      description: 'You receive a clear proposal with scope and next steps.',
    },
  ],
}
