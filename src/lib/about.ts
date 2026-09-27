/**
 * Typed "За нас / About" page content (BG + EN).
 */

import type { Localized } from './i18n.ts'

export type Principle = {
  title: string
  description: string
}

export type AboutSection = {
  id: string
  eyebrow: string
  title: string
  paragraphs: string[]
  tone?: 'default' | 'deep'
}

export type AboutData = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; accent?: string; lead: string }
  sections: AboutSection[]
  principles: Principle[]
}

export const about: Localized<AboutData> = {
  bg: {
    meta: {
      title: 'Уеб студио | Website Studio R',
      description:
        'Website Studio R е уеб студио, което проектира и изработва фирмени сайтове и онлайн магазини за бизнеси в България — с ясна структура, индивидуален дизайн и дългосрочна поддръжка.',
    },
    hero: {
      eyebrow: 'За нас',
      title: 'Малко студио с',
      accent: 'внимание към детайла.',
      lead: 'Website Studio R е уеб студио, което работи с бизнеси в България. Проектираме и изработваме сайтове и онлайн магазини, които изглеждат добре и вършат работа.',
    },
    sections: [
      {
        id: 'what',
        eyebrow: 'Какво създаваме',
        title: 'Сайтове и онлайн магазини, които вършат работа.',
        paragraphs: [
          'Изработваме фирмени сайтове, онлайн магазини и landing страници — с индивидуален дизайн и техническа основа, върху която може да се надгражда.',
          'Работим и по web design, SEO и поддръжка, така че да покрием целия път на един онлайн проект — от първата концепция до развитието след старта.',
        ],
      },
      {
        id: 'for-whom',
        tone: 'deep',
        eyebrow: 'За кого работим',
        title: 'За бизнеси, които искат сайтът да работи.',
        paragraphs: [
          'Работим с малки и средни бизнеси в България — както нови, които тепърва изграждат онлайн присъствие, така и утвърдени, които искат да обновят или разширят сайта си.',
          'Подходящи сме за бизнеси, които търсят ясен процес, индивидуално отношение и дългосрочен партньор, а не готово решение от каталог.',
        ],
      },
      {
        id: 'approach',
        eyebrow: 'Подход',
        title: 'Започваме с бизнеса, не с кода.',
        paragraphs: [
          'Преди първия макет задаваме въпроси: какво продавате, на кого и какво трябва да направи посетителят. Ясната структура идва преди визуалния език.',
          'Дизайнът и разработката следват тази логика — така сайтът не е просто красив, а води до реално действие.',
          'Работим прозрачно и обясняваме решенията си на разбираем език. След старта оставаме на разположение за поддръжка и развитие.',
        ],
      },
    ],
    principles: [
      {
        title: 'Ясна структура',
        description:
          'Преди визуалния език подреждаме съдържанието и логиката на страниците.',
      },
      {
        title: 'Дизайн с характер',
        description:
          'Избягваме шаблоните и търсим визуален език, който подхожда на конкретния бранд.',
      },
      {
        title: 'Техническа основа',
        description:
          'Изграждаме сайтовете така, че да са бързи, сигурни и лесни за поддръжка.',
      },
      {
        title: 'Дългосрочно партньорство',
        description:
          'Не изчезваме след старта — помагаме за развитието на сайта във времето.',
      },
    ],
  },
  en: {
    meta: {
      title: 'About | Website Studio R',
      description:
        'Website Studio R is a web studio that designs and builds corporate websites and online stores for businesses in Bulgaria — with a clear structure, custom design and long-term support.',
    },
    hero: {
      eyebrow: 'About',
      title: 'A small studio with',
      accent: 'an eye for detail.',
      lead: 'Website Studio R is a web studio working with businesses in Bulgaria. We design and build websites and online stores that look good and do their job.',
    },
    sections: [
      {
        id: 'what',
        eyebrow: 'What we build',
        title: 'Websites and online stores that do the job.',
        paragraphs: [
          'We build corporate websites, online stores and landing pages — with custom design and a technical foundation you can build on.',
          'We also work on web design, SEO and maintenance, so we can cover the whole journey of an online project, from first concept to growth after launch.',
        ],
      },
      {
        id: 'for-whom',
        tone: 'deep',
        eyebrow: 'Who we work with',
        title: 'For businesses that want a website that works.',
        paragraphs: [
          'We work with small and medium businesses in Bulgaria — both new ones building an online presence and established ones looking to refresh or extend their website.',
          'We are a good fit for businesses that want a clear process, personal attention and a long-term partner, rather than an off-the-shelf solution.',
        ],
      },
      {
        id: 'approach',
        eyebrow: 'Approach',
        title: 'We start with the business, not the code.',
        paragraphs: [
          'Before the first mock-up we ask questions: what you sell, to whom and what the visitor should do. Clear structure comes before visual language.',
          'Design and development follow that logic, so the site is not just beautiful but leads to real action.',
          'We work transparently and explain our decisions in plain language. After launch we stay available for maintenance and growth.',
        ],
      },
    ],
    principles: [
      {
        title: 'Clear structure',
        description:
          'Before the visual language we organise the content and page logic.',
      },
      {
        title: 'Design with character',
        description:
          'We avoid templates and look for a visual language that suits the specific brand.',
      },
      {
        title: 'Technical foundation',
        description: 'We build sites to be fast, secure and easy to maintain.',
      },
      {
        title: 'Long-term partnership',
        description:
          'We do not disappear after launch — we help the site grow over time.',
      },
    ],
  },
}
