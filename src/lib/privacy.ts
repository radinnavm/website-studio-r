/**
 * Privacy policy template (BG + EN).
 *
 * IMPORTANT: This is a structured template, not legal advice and not a final
 * GDPR policy. Every `placeholders` entry marks information the site owner
 * must fill in or verify before publishing.
 */

import type { Localized } from './i18n.ts'

export type PrivacySection = {
  id: string
  title: string
  body: string[]
  placeholders?: string[]
}

export type PrivacyData = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; accent?: string; lead: string }
  notice: string
  intro: string[]
  sections: PrivacySection[]
}

export const privacy: Localized<PrivacyData> = {
  bg: {
    meta: {
      title: 'Политика за поверителност | Website Studio R',
      description:
        'Какви лични данни събира Website Studio R чрез формата за контакт, как ги обработва и какви са вашите права. Шаблон за преглед и допълване.',
    },
    hero: {
      eyebrow: 'Правна информация',
      title: 'Политика за',
      accent: 'поверителност.',
      lead: 'Информация за това какви лични данни събираме чрез формата за контакт и как ги обработваме.',
    },
    notice:
      'ВАЖНО: Този документ е шаблон и не представлява юридически съвет или окончателна GDPR политика. Текстът трябва да бъде прегледан и допълнен от собственика на сайта (или от юрист) преди публикуване. Местата, които изискват попълване, са обозначени изрично.',
    intro: [
      'Тази страница описва как се обработват личните данни, които ни предоставяте чрез формата за контакт на сайта.',
      'Събираме само данните, необходими за да отговорим на вашето запитване. Не продаваме и не предоставяме данните на трети страни за маркетингови цели.',
    ],
    sections: [
      {
        id: 'administrator',
        title: '1. Администратор на лични данни',
        body: [
          'Администратор на личните данни, събрани чрез този сайт, е собственикът на сайта:',
        ],
        placeholders: [
          'Юридическо или физическо лице — пълно наименование',
          'ЕИК / регистрационен номер',
          'Седалище и адрес на управление',
          'Имейл за връзка относно лични данни',
          'Телефон за връзка',
        ],
      },
      {
        id: 'data',
        title: '2. Какви данни събираме',
        body: [
          'Чрез формата за контакт събираме само данните, които ни предоставяте: име, имейл адрес, телефон (по избор), тип проект, бюджет (по избор) и съобщение.',
          'Не събираме чувствителни категории лични данни.',
        ],
      },
      {
        id: 'purpose',
        title: '3. За какво използваме данните',
        body: [
          'Използваме предоставените данни единствено за да отговорим на запитването и да обсъдим евентуален проект.',
          'Не използваме данните за автоматизирано вземане на решения или профилиране.',
        ],
      },
      {
        id: 'legal-basis',
        title: '4. Правно основание',
        body: [
          'Обработваме данните въз основа на вашето съгласие, което давате чрез отметката във формата за контакт.',
          'Можете да оттеглите съгласието си по всяко време, без това да засяга законосъобразността на обработването преди оттеглянето.',
        ],
      },
      {
        id: 'retention',
        title: '5. Срок на съхранение',
        body: [
          'Съхраняваме запитванията само толкова дълго, колкото е необходимо за комуникацията и за изпълнение на законови задължения.',
        ],
        placeholders: [
          'Конкретен срок за съхранение на запитванията (например 12 месеца)',
          'Срок за съхранение на данни, свързани със сключени договори',
        ],
      },
      {
        id: 'recipients',
        title: '6. Получатели и обработващи лични данни',
        body: [
          'Достъп до данните имат само лицата, които обработват запитванията. Данните може да се обработват от външни доставчици на услуги, свързани с работата на сайта.',
        ],
        placeholders: [
          'Доставчик на имейл услуги (например Resend, SendGrid)',
          'Доставчик на хостинг и инфраструктура',
          'Доставчик на аналитика (ако се използва)',
          'Други обработващи — избройте ги поименно',
        ],
      },
      {
        id: 'cookies',
        title: '7. Бисквитки и аналитика',
        body: [
          'Сайтът може да използва бисквитки или аналитични инструменти, за да разбира как се използва. Ако такива бъдат добавени, те трябва да бъдат описани тук и, където е необходимо, да изискват предварително съгласие.',
        ],
        placeholders: [
          'Списък на използваните бисквитки и тяхната цел',
          'Инструмент за аналитика (например Google Analytics) и настройки за съгласие',
        ],
      },
      {
        id: 'rights',
        title: '8. Вашите права',
        body: [
          'Имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост на данните и възражение.',
          'Имате право да подадете жалба до Комисията за защита на личните данни (КЗЛД).',
        ],
      },
      {
        id: 'changes',
        title: '9. Промени в политиката',
        body: [
          'Можем да актуализираме тази политика. Актуалната версия винаги е публикувана на тази страница.',
        ],
        placeholders: ['Дата на последна актуализация'],
      },
      {
        id: 'contact',
        title: '10. Контакт',
        body: [
          'За въпроси относно обработката на лични данни се свържете с нас на посочения имейл.',
        ],
        placeholders: ['Имейл за въпроси относно лични данни'],
      },
    ],
  },
  en: {
    meta: {
      title: 'Privacy Policy | Website Studio R',
      description:
        'What personal data Website Studio R collects through the contact form, how it is processed and what your rights are. A template for review and completion.',
    },
    hero: {
      eyebrow: 'Legal information',
      title: 'Privacy',
      accent: 'policy.',
      lead: 'Information about what personal data we collect through the contact form and how we process it.',
    },
    notice:
      'IMPORTANT: This document is a template and does not constitute legal advice or a final GDPR policy. The text must be reviewed and completed by the site owner (or a lawyer) before publication. The fields that require completion are clearly marked.',
    intro: [
      'This page describes how the personal data you provide through the contact form is processed.',
      'We only collect the data needed to respond to your enquiry. We do not sell or share your data with third parties for marketing purposes.',
    ],
    sections: [
      {
        id: 'administrator',
        title: '1. Data controller',
        body: [
          'The controller of the personal data collected through this website is the site owner:',
        ],
        placeholders: [
          'Legal or natural person — full name',
          'Company registration number',
          'Registered office and address',
          'Email for data protection enquiries',
          'Contact phone',
        ],
      },
      {
        id: 'data',
        title: '2. What data we collect',
        body: [
          'Through the contact form we collect only the data you provide: name, email address, phone (optional), project type, budget (optional) and message.',
          'We do not collect special categories of personal data.',
        ],
      },
      {
        id: 'purpose',
        title: '3. How we use the data',
        body: [
          'We use the provided data solely to respond to your enquiry and discuss a potential project.',
          'We do not use the data for automated decision-making or profiling.',
        ],
      },
      {
        id: 'legal-basis',
        title: '4. Legal basis',
        body: [
          'We process the data on the basis of your consent, given via the checkbox in the contact form.',
          'You may withdraw your consent at any time, without affecting the lawfulness of processing before withdrawal.',
        ],
      },
      {
        id: 'retention',
        title: '5. Retention period',
        body: [
          'We keep enquiries only as long as needed for communication and to meet legal obligations.',
        ],
        placeholders: [
          'Specific retention period for enquiries (e.g. 12 months)',
          'Retention period for data related to signed contracts',
        ],
      },
      {
        id: 'recipients',
        title: '6. Recipients and processors',
        body: [
          'Only the people handling enquiries have access to the data. The data may be processed by external service providers related to the running of the site.',
        ],
        placeholders: [
          'Email service provider (e.g. Resend, SendGrid)',
          'Hosting and infrastructure provider',
          'Analytics provider (if used)',
          'Other processors — list them',
        ],
      },
      {
        id: 'cookies',
        title: '7. Cookies and analytics',
        body: [
          'The website may use cookies or analytics tools to understand how it is used. If any are added, they must be described here and, where required, obtain prior consent.',
        ],
        placeholders: [
          'List of cookies used and their purpose',
          'Analytics tool (e.g. Google Analytics) and consent settings',
        ],
      },
      {
        id: 'rights',
        title: '8. Your rights',
        body: [
          'You have the right to access, rectify, erase, restrict processing, data portability and to object.',
          'You have the right to lodge a complaint with the Commission for Personal Data Protection (CPDP).',
        ],
      },
      {
        id: 'changes',
        title: '9. Changes to this policy',
        body: [
          'We may update this policy. The current version is always published on this page.',
        ],
        placeholders: ['Date of last update'],
      },
      {
        id: 'contact',
        title: '10. Contact',
        body: [
          'For questions about the processing of personal data, contact us at the email provided.',
        ],
        placeholders: ['Email for data protection enquiries'],
      },
    ],
  },
}

export function getPrivacy(locale: keyof typeof privacy): PrivacyData {
  return privacy[locale]
}
