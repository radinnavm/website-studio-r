import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { getHomeContent } from '@/lib/content'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'

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

  return (
    <Section id="why" tone="deep" aria-labelledby="why-heading">
      <Container>
        <header className={styles.header}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="why-heading" className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.intro}>{t.intro}</p>
        </header>

        <ul className={styles.grid}>
          {advantages.map((item) => (
            <li key={item.title} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
