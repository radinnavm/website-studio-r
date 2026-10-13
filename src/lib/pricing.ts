/**
 * Typed "Цени / Pricing" page content (BG + EN).
 */

import type { Localized } from './i18n.ts'

export type PricingPlan = {
  id: string
  name: string
  price: string
  currency: string
  description: string
  includes: string[]
  ctaLabel: string
}

export type PricingData = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; accent: string; lead: string }
  plans: PricingPlan[]
  support: { eyebrow: string; title: string; description: string }
  cta: { title: string; lead: string; primaryLabel: string }
}

export const pricing: Localized<PricingData> = {
  bg: {
    meta: {
      title: 'Цени — изработка на сайт и онлайн магазин | Website Studio R',
      description:
        'Ясни цени за изработка на фирмен сайт (600 €) и онлайн магазин (700 €) — индивидуален дизайн, административен панел и 3 месеца безплатна поддръжка след стартирането.',
    },
    hero: {
      eyebrow: 'Цени',
      title: 'Дигитални решения с',
      accent: 'ясна цена.',
      lead: 'Изработка на сайт или онлайн магазин с индивидуален дизайн, административен панел и грижа след стартирането.',
    },
    plans: [
      {
        id: 'firmen-sait',
        name: 'Фирмен сайт',
        price: '600',
        currency: '€',
        description:
          'Професионално онлайн присъствие, създадено около вашия бизнес.',
        includes: [
          'Индивидуален дизайн',
          'Основни страници според нуждите на бизнеса',
          'Адаптация за всички устройства',
          'Административен панел',
          'Основна SEO оптимизация',
          'Форма за контакт',
        ],
        ctaLabel: 'Започнете проект',
      },
      {
        id: 'online-magazin',
        name: 'Онлайн магазин',
        price: '700',
        currency: '€',
        description:
          'Онлайн магазин с всичко необходимо за представянето и управлението на вашите продукти.',
        includes: [
          'Индивидуален дизайн',
          'Продуктови страници и категории',
          'Количка и поръчки',
          'Административен панел',
          'Адаптация за всички устройства',
          'Основна SEO оптимизация',
        ],
        ctaLabel: 'Започнете проект',
      },
    ],
    support: {
      eyebrow: 'Включено във всеки проект',
      title: '03 месеца',
      description:
        'Безплатна техническа поддръжка след стартирането. За да започнете спокойно, с време да свикнете със сайта си и да получите съдействие при необходимост.',
    },
    cta: {
      title: 'Да поговорим за вашия проект.',
      lead: 'Разкажете ни какво искате да създадете. Ще уточним нуждите ви и ще ви предложим подходящо решение.',
      primaryLabel: 'Обсъдете проекта си',
    },
  },
  en: {
    meta: {
      title: 'Pricing | Website Studio R',
      description:
        'Clear pricing for a corporate website (€600) and an online store (€700) — custom design, an admin panel and three months of free support after launch.',
    },
    hero: {
      eyebrow: 'Pricing',
      title: 'Digital solutions with',
      accent: 'clear pricing.',
      lead: 'A website or online store with custom design, an admin panel and support that continues after launch.',
    },
    plans: [
      {
        id: 'firmen-sait',
        name: 'Corporate website',
        price: '600',
        currency: '€',
        description:
          'A professional online presence built around your business.',
        includes: [
          'Custom design',
          'Core pages tailored to your business',
          'Responsive on every device',
          'Admin panel',
          'Essential SEO setup',
          'Contact form',
        ],
        ctaLabel: 'Start a project',
      },
      {
        id: 'online-magazin',
        name: 'Online store',
        price: '700',
        currency: '€',
        description:
          'An online store with everything you need to present and manage your products.',
        includes: [
          'Custom design',
          'Product pages and categories',
          'Cart and orders',
          'Admin panel',
          'Responsive on every device',
          'Essential SEO setup',
        ],
        ctaLabel: 'Start a project',
      },
    ],
    support: {
      eyebrow: 'Included with every project',
      title: '03 months',
      description:
        'Free technical support after launch, so you can start with confidence, take your time to get comfortable with your website and get help whenever you need it.',
    },
    cta: {
      title: 'Let’s talk about your project.',
      lead: 'Tell us what you want to build. We will clarify your needs and recommend the right solution.',
      primaryLabel: 'Discuss your project',
    },
  },
}

export function getPricing(locale: keyof typeof pricing): PricingData {
  return pricing[locale]
}
