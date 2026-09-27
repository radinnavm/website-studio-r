import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getServices } from '@/lib/services'

import styles from './Services.module.css'

const copy: Localized<{ eyebrow: string; title: string; intro: string }> = {
  bg: {
    eyebrow: 'Услуги',
    title: 'Всичко необходимо за един силен онлайн проект.',
    intro:
      'От първата концепция до дългосрочната поддръжка — покриваме целия процес, така че да работите с един партньор.',
  },
  en: {
    eyebrow: 'Services',
    title: 'Everything you need for a strong online project.',
    intro:
      'From the first concept to long-term maintenance, we cover the whole process so you work with one partner.',
  },
}

export function Services() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const services = getServices(locale)

  return (
    <Section id="services" aria-labelledby="services-heading">
      <Container>
        <header className={styles.header}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="services-heading" className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.intro}>{t.intro}</p>
        </header>

        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service.id} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {service.index}
              </span>
              <div className={styles.body}>
                <h3 className={styles.itemTitle}>
                  <Link className={styles.itemLink} to={l(`/${service.slug}`)}>
                    {service.title}
                  </Link>
                </h3>
                <p className={styles.itemText}>{service.summary}</p>
              </div>
              <ul className={styles.points}>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
