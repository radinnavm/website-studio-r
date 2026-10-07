import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getServiceHref, getServices } from '@/lib/services'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './Services.module.css'

const copy: Localized<{ eyebrow: string }> = {
  bg: {
    eyebrow: 'Услуги',
  },
  en: {
    eyebrow: 'Services',
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
        <header className={styles.header}>
          <Eyebrow id="services-heading" className={styles.eyebrow}>
            {t.eyebrow}
          </Eyebrow>
        </header>

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
