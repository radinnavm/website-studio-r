import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLocale } from '@/lib/LocaleProvider'
import type { ServicePage } from '@/lib/services'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './RelatedServices.module.css'

type RelatedServicesProps = {
  services: ServicePage[]
  id?: string
  index?: string
}

/** Compact editorial list linking a service page to related services. */
export function RelatedServices({
  services,
  id = 'related',
  index,
}: RelatedServicesProps) {
  const { locale, l } = useLocale()
  const t = ui[locale].related
  const { ref, visible } = useReveal<HTMLUListElement>()

  if (services.length === 0) return null

  const headingId = `${id}-heading`

  return (
    <Section id={id} aria-labelledby={headingId}>
      <Container>
        <SectionHeader
          id={headingId}
          index={index}
          eyebrow={t.eyebrow}
          title={t.title}
        />

        <ul ref={ref} className={revealClass(styles.list, visible)}>
          {services.map((service) => (
            <li key={service.id} className={styles.item}>
              <Link className={styles.link} to={l(`/${service.slug}`)}>
                <span className={styles.index} aria-hidden="true">
                  {service.index}
                </span>
                <span className={styles.body}>
                  <span className={styles.itemTitle}>{service.title}</span>
                  <span className={styles.itemText}>{service.summary}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
