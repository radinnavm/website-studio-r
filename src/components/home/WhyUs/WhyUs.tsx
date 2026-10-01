import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getHomeContent } from '@/lib/content'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './WhyUs.module.css'

const copy: Localized<{ eyebrow: string; title: string; intro: string }> = {
  bg: {
    eyebrow: 'Позициониране',
    title: 'Сайтове и онлайн магазини, изградени върху стабилна основа.',
    intro:
      'Работим с фирмени сайтове, онлайн магазини и разработка по поръчка — с адаптивен дизайн, архитектура, готова за SEO, и поддръжка след старта.',
  },
  en: {
    eyebrow: 'Positioning',
    title: 'Websites and online stores built on a stable foundation.',
    intro:
      'We work with corporate websites, online stores and custom development — with responsive design, an SEO-ready architecture and support after launch.',
  },
}

export function WhyUs() {
  const { locale } = useLocale()
  const t = copy[locale]
  const { advantages } = getHomeContent(locale)
  const { ref, visible } = useReveal<HTMLUListElement>()

  return (
    <Section id="why" tone="deep" aria-labelledby="why-heading">
      <Container>
        <SectionHeader
          id="why-heading"
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.intro}
        />

        <ul ref={ref} className={revealClass(styles.grid, visible)}>
          {advantages.map((item, position) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.itemIndex} aria-hidden="true">
                {String(position + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
