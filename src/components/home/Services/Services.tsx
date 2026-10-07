import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getServiceHref, getServices } from '@/lib/services'
import { revealClass, useReveal } from '@/lib/useReveal'

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
  const { locale } = useLocale()
  const t = copy[locale]
  const services = getServices(locale)
  const { ref, visible } = useReveal<HTMLUListElement>()

  return (
    <Section id="services" aria-labelledby="services-heading">
      <Container>
        <SectionHeader
          id="services-heading"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.intro}
        />

        <ul ref={ref} className={revealClass(styles.list, visible)}>
          {services.map((service) => (
            <li key={service.id} className={styles.item}>
              <div className={styles.body}>
                <h3 className={styles.itemTitle}>
                  <Link
                    className={styles.itemLink}
                    to={getServiceHref(locale, service)}
                  >
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
