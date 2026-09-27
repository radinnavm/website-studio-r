/**
 * Typed homepage content (process + positioning).
 * Service and portfolio content lives in `services.ts` and `portfolio.ts`.
 */

import type { Localized } from './i18n.ts'

export type ProcessStep = {
  step: string
  title: string
  description: string
}

export type Advantage = {
  title: string
  description: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  accent: string
  lead: string
  meta: string[]
  primary: string
  secondary: string
}

export type HomeContent = {
  meta: { title: string; description: string }
  hero: HeroContent
  processSteps: ProcessStep[]
  advantages: Advantage[]
}

export const homeContent: Localized<HomeContent> = {
  bg: {
    meta: {
      title: 'Изработка на сайтове и онлайн магазини | Website Studio R',
      description:
        'Изработка на сайт и онлайн магазин за бизнеси в България — уеб дизайн, уеб разработка, SEO оптимизация и дългосрочна поддръжка. Website Studio R.',
    },
    hero: {
      eyebrow: 'Уеб студио за бизнеси в България',
      title: 'Изработка на сайтове и онлайн магазини',
      accent: 'за вашия бизнес.',
      lead: 'Website Studio R изработва фирмени сайтове и онлайн магазини с ясен уеб дизайн и уеб разработка — бързи, адаптивни и с техническа основа, която представя бизнеса ви добре.',
      meta: ['Изработка на сайт', 'Онлайн магазин', 'Уеб дизайн'],
      primary: 'Започнете проект',
      secondary: 'Вижте портфолиото',
    },
    processSteps: [
      {
        step: '01',
        title: 'Запознаване с проекта',
        description:
          'Разбираме бизнеса, целите и аудиторията. Изясняваме какво трябва да постигне сайтът, преди да предложим решение.',
      },
      {
        step: '02',
        title: 'Структура и дизайн',
        description:
          'Подреждаме съдържанието и създаваме визуална система, която предава характера на бранда и води до действие.',
      },
      {
        step: '03',
        title: 'Разработка',
        description:
          'Изграждаме сайта с модерни технологии — бърз, сигурен, адаптивен и готов за растеж.',
      },
      {
        step: '04',
        title: 'Стартиране и поддръжка',
        description:
          'Тестваме, оптимизираме и публикуваме. Оставаме на разположение за поддръжка и развитие.',
      },
    ],
    advantages: [
      {
        title: 'Изработка по поръчка',
        description:
          'Без готови шаблони — решението е съобразено с целите и мащаба на конкретния бизнес.',
      },
      {
        title: 'Адаптивен дизайн',
        description:
          'Коректно изживяване на всеки екран — от телефон до голям монитор.',
      },
      {
        title: 'Архитектура, готова за SEO',
        description:
          'Семантична структура и техническа основа, изградени с мисъл за търсене.',
      },
      {
        title: 'Скорост и производителност',
        description:
          'Бързо зареждане и оптимизирани Core Web Vitals за по-добро изживяване.',
      },
      {
        title: 'Модерни технологии',
        description:
          'React, TypeScript и съвременен tooling за надежден и поддържаем код.',
      },
      {
        title: 'Дългосрочна поддръжка',
        description:
          'Партньорство след старта — развитие, поддръжка и нови възможности.',
      },
    ],
  },
  en: {
    meta: {
      title: 'Website Studio R — Websites and online stores',
      description:
        'Website Studio R builds modern websites and online stores for businesses in Bulgaria — strategy, design, development, SEO and long-term support.',
    },
    hero: {
      eyebrow: 'A web studio for businesses in Bulgaria',
      title: 'Websites that turn a business',
      accent: 'into a brand',
      lead: 'Website Studio R designs and builds websites and online stores that look premium, work flawlessly and bring real results for your business.',
      meta: [
        'Web studio · Bulgaria',
        'Custom development',
        'SEO-ready architecture',
      ],
      primary: 'Start a project',
      secondary: 'See our work',
    },
    processSteps: [
      {
        step: '01',
        title: 'Project discovery',
        description:
          'We get to know your business, goals and audience, and clarify what the site needs to achieve before proposing a solution.',
      },
      {
        step: '02',
        title: 'Structure & design',
        description:
          'We organise the content and create a visual system that conveys the character of the brand and drives action.',
      },
      {
        step: '03',
        title: 'Development',
        description:
          'We build the site with modern technology — fast, secure, responsive and ready to grow.',
      },
      {
        step: '04',
        title: 'Launch & support',
        description:
          'We test, optimise and publish, then stay available for support and further development.',
      },
    ],
    advantages: [
      {
        title: 'Custom development',
        description:
          'No off-the-shelf templates — every solution is tailored to the goals and scale of your business.',
      },
      {
        title: 'Responsive design',
        description:
          'A consistent experience on every screen, from phone to large monitor.',
      },
      {
        title: 'SEO-ready architecture',
        description:
          'Semantic structure and a technical foundation built with search in mind.',
      },
      {
        title: 'Speed & performance',
        description:
          'Fast loading and optimised Core Web Vitals for a better experience.',
      },
      {
        title: 'Modern technology',
        description:
          'React, TypeScript and modern tooling for reliable, maintainable code.',
      },
      {
        title: 'Long-term support',
        description:
          'Partnership after launch — growth, maintenance and new possibilities.',
      },
    ],
  },
}

export function getHomeContent(locale: keyof typeof homeContent): HomeContent {
  return homeContent[locale]
}
