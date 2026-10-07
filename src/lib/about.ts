/**
 * Typed "За нас / About" page content (BG + EN).
 */

import type { Localized } from './i18n.ts'

export type AboutSection = {
  id: string
  eyebrow?: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  tone?: 'default' | 'deep'
}

export type AboutData = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; accent?: string; lead: string }
  sections: AboutSection[]
  cta: { title: string; lead: string }
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
      title: 'Ясна стратегия. Силен дизайн.',
      accent: 'Добра разработка.',
      lead: 'Website Studio R създава сайтове за бизнеси, които искат да изглеждат професионално, да се отличават и да бъдат по-лесно откриваеми онлайн.',
    },
    sections: [
      {
        id: 'what',
        title: 'Какво правим',
        paragraphs: [
          'Подхождаме към всеки проект индивидуално — започваме от целите на бизнеса, аудиторията и начина, по който сайтът трябва да работи, а не просто от дизайна.',
          'Съчетаваме уеб дизайн, разработка, SEO основа и техническа прецизност, за да създаваме сайтове, които са красиви, бързи и удобни за използване.',
          'Работим по:',
        ],
        bullets: [
          'фирмени сайтове',
          'онлайн магазини',
          'web design и редизайн',
          'SEO оптимизация',
          'техническа поддръжка',
        ],
      },
      {
        id: 'approach',
        tone: 'deep',
        title: 'Нашият подход',
        paragraphs: [
          'Вярваме, че добрият сайт трябва да има причина зад всяко решение — от структурата и типографията до скоростта и начина, по който потребителят стига до действие.',
          'Затова процесът ни започва с разбиране на бизнеса и завършва със сайт, който е готов да работи за него.',
        ],
      },
    ],
    cta: {
      title: 'Имате идея за проект?',
      lead: 'Разкажете ни за нея и ще обсъдим как можем да я превърнем в силно онлайн присъствие.',
    },
  },
  en: {
    meta: {
      title: 'About | Website Studio R',
      description:
        'Website Studio R is a web studio that designs and builds corporate websites and online stores for businesses in Bulgaria — with a clear structure, custom design and long-term support.',
    },
    hero: {
      eyebrow: 'About',
      title: 'Clear strategy. Strong design.',
      accent: 'Solid development.',
      lead: 'Website Studio R builds websites for businesses that want to look professional, stand out and be easier to find online.',
    },
    sections: [
      {
        id: 'what',
        title: 'What we do',
        paragraphs: [
          'We approach every project individually — we start from the goals of the business, the audience and the way the website needs to work, not just from the design.',
          'We combine web design, development, an SEO foundation and technical precision to create websites that are beautiful, fast and easy to use.',
          'We work on:',
        ],
        bullets: [
          'corporate websites',
          'online stores',
          'web design and redesign',
          'SEO optimisation',
          'technical support',
        ],
      },
      {
        id: 'approach',
        tone: 'deep',
        title: 'Our approach',
        paragraphs: [
          'We believe a good website should have a reason behind every decision — from structure and typography to speed and the way the user reaches action.',
          'That is why our process starts with understanding the business and ends with a website that is ready to work for it.',
        ],
      },
    ],
    cta: {
      title: 'Have an idea for a project?',
      lead: 'Tell us about it and we will discuss how we can turn it into a strong online presence.',
    },
  },
}
