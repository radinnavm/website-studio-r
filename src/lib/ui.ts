import type { Localized } from './i18n.ts'

/**
 * Shared component-level strings. Page-specific copy lives in the content
 * modules (services, portfolio, about, ...) as `Localized` data.
 */
export type UiStrings = {
  skipLink: string
  home: string
  services: string
  portfolioLabel: string
  aboutLabel: string
  contactLabel: string
  switchToEn: string
  switchToBg: string
  brandAria: string
  navAria: string
  mobileNavAria: string
  openMenu: string
  closeMenu: string
  breadcrumbsAria: string
  faq: { eyebrow: string; title: string }
  steps: { eyebrow: string }
  related: { eyebrow: string; title: string }
  ctaBanner: { eyebrow: string; title: string; lead: string; primary: string }
  footer: {
    services: string
    studio: string
    contact: string
    cta: string
    rights: string
  }
  form: {
    name: string
    email: string
    phone: string
    projectType: string
    budget: string
    message: string
    consent: string
    consentLink: string
    choose: string
    submit: string
    submitting: string
    newInquiry: string
    successTitle: string
    successText: string
    serverError: string
    networkError: string
    required: string
  }
  contactPage: {
    formHeading: string
    detailsHeading: string
    expectationsHeading: string
    email: string
    phone: string
    location: string
  }
  servicePage: {
    startProject: string
    viewPortfolio: string
    problem: string
    includes: string
    includesTitle: string
    process: string
    processTitle: string
  }
  work: { eyebrow: string; viewProject: string }
  portfolio: { preview: string }
  notFound: { title: string; text: string; backHome: string }
  about: { principles: string; principlesTitle: string }
  privacy: { todoLabel: string }
}

export const ui: Localized<UiStrings> = {
  bg: {
    skipLink: 'Към съдържанието',
    home: 'Начало',
    services: 'Услуги',
    portfolioLabel: 'Портфолио',
    aboutLabel: 'За нас',
    contactLabel: 'Контакти',
    switchToEn: 'Преминете към английски',
    switchToBg: 'Преминете към български',
    brandAria: 'Website Studio R — начало',
    navAria: 'Основна навигация',
    mobileNavAria: 'Мобилна навигация',
    openMenu: 'Отвори менюто',
    closeMenu: 'Затвори менюто',
    breadcrumbsAria: 'Навигационна пътека',
    faq: { eyebrow: 'Въпроси', title: 'Често задавани въпроси' },
    steps: { eyebrow: 'Процес' },
    related: {
      eyebrow: 'Свързани услуги',
      title: 'Други услуги, които може да са ви полезни',
    },
    ctaBanner: {
      eyebrow: 'Следваща стъпка',
      title: 'Имате проект, който искате да превърнем в реален сайт?',
      lead: 'Разкажете ни за проекта си — ще се свържем с вас, за да обсъдим целите, обхвата и следващите стъпки.',
      primary: 'Разкажете ни за проекта',
    },
    footer: {
      services: 'Услуги',
      studio: 'Студио',
      contact: 'Контакт',
      cta: 'Започнете проект',
      rights: 'Всички права запазени.',
    },
    form: {
      name: 'Име',
      email: 'Имейл',
      phone: 'Телефон',
      projectType: 'Тип проект',
      budget: 'Бюджет',
      message: 'Съобщение',
      consent:
        'Съгласявам се предоставените от мен данни да бъдат използвани за обработване на запитването ми.',
      consentLink: 'Политика за поверителност',
      choose: 'Изберете…',
      submit: 'Изпратете запитване',
      submitting: 'Изпращане…',
      newInquiry: 'Изпратете ново запитване',
      successTitle: 'Благодарим ви.',
      successText: 'Получихме вашето запитване и ще се свържем с вас.',
      serverError: 'Възникна проблем при изпращането. Опитайте отново.',
      networkError:
        'Възникна проблем с връзката. Проверете интернет връзката и опитайте отново.',
      required: '*',
    },
    contactPage: {
      formHeading: 'Изпратете запитване',
      detailsHeading: 'Данни за връзка',
      expectationsHeading: 'Какво да очаквате',
      email: 'Имейл',
      phone: 'Телефон',
      location: 'Локация',
    },
    servicePage: {
      startProject: 'Започнете проект',
      viewPortfolio: 'Вижте портфолиото',
      problem: 'Проблемът',
      includes: 'Какво включва',
      includesTitle: 'Какво получавате',
      process: 'Процес',
      processTitle: 'Как работим',
    },
    work: { eyebrow: 'Избрани проекти', viewProject: 'Вижте проекта' },
    portfolio: { preview: 'Визуализация на проекта' },
    notFound: {
      title: 'Тази страница не е намерена.',
      text: 'Възможно е адресът да е променен или страницата да е преместена.',
      backHome: 'Обратно към началото',
    },
    about: { principles: 'Принципи', principlesTitle: 'На какво държим' },
    privacy: { todoLabel: 'За попълване от собственика' },
  },
  en: {
    skipLink: 'Skip to content',
    home: 'Home',
    services: 'Services',
    portfolioLabel: 'Portfolio',
    aboutLabel: 'About',
    contactLabel: 'Contact',
    switchToEn: 'Switch to English',
    switchToBg: 'Switch to Bulgarian',
    brandAria: 'Website Studio R — home',
    navAria: 'Main navigation',
    mobileNavAria: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    breadcrumbsAria: 'Breadcrumb',
    faq: { eyebrow: 'FAQs', title: 'Frequently asked questions' },
    steps: { eyebrow: 'Process' },
    related: {
      eyebrow: 'Related services',
      title: 'Other services that may be useful to you',
    },
    ctaBanner: {
      eyebrow: 'Next step',
      title: 'Have a project you would like us to turn into a real website?',
      lead: 'Tell us about your project and we will get back to you to discuss goals, scope and next steps.',
      primary: 'Tell us about your project',
    },
    footer: {
      services: 'Services',
      studio: 'Studio',
      contact: 'Contact',
      cta: 'Start a project',
      rights: 'All rights reserved.',
    },
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project type',
      budget: 'Budget',
      message: 'Message',
      consent:
        'I agree that the data I provide will be used to process my enquiry.',
      consentLink: 'Privacy Policy',
      choose: 'Select…',
      submit: 'Send enquiry',
      submitting: 'Sending…',
      newInquiry: 'Send a new enquiry',
      successTitle: 'Thank you.',
      successText: 'We have received your enquiry and will get back to you.',
      serverError: 'Something went wrong while sending. Please try again.',
      networkError:
        'There was a connection problem. Check your connection and try again.',
      required: '*',
    },
    contactPage: {
      formHeading: 'Send an enquiry',
      detailsHeading: 'Contact details',
      expectationsHeading: 'What to expect',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
    servicePage: {
      startProject: 'Start a project',
      viewPortfolio: 'See our work',
      problem: 'The problem',
      includes: "What's included",
      includesTitle: 'What you get',
      process: 'Process',
      processTitle: 'How we work',
    },
    work: { eyebrow: 'Selected work', viewProject: 'View project' },
    portfolio: { preview: 'Project preview' },
    notFound: {
      title: 'This page could not be found.',
      text: 'The address may have changed or the page may have moved.',
      backHome: 'Back to home',
    },
    about: { principles: 'Principles', principlesTitle: 'What we value' },
    privacy: { todoLabel: 'To be completed by the owner' },
  },
}
