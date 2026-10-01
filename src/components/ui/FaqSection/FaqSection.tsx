import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLocale } from '@/lib/LocaleProvider'
import type { FaqItem } from '@/lib/services'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './FaqSection.module.css'

type FaqSectionProps = {
  items: FaqItem[]
  eyebrow?: string
  index?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep' | 'surface'
}

/** Reusable FAQ accordion built on native `details`/`summary` for a11y. */
export function FaqSection({
  items,
  eyebrow,
  index,
  title,
  intro,
  id = 'faq',
  tone = 'default',
}: FaqSectionProps) {
  const { locale } = useLocale()
  const t = ui[locale]
  const { ref, visible } = useReveal<HTMLUListElement>()

  if (items.length === 0) return null

  const resolvedEyebrow = eyebrow ?? t.faq.eyebrow
  const resolvedTitle = title ?? t.faq.title
  const headingId = `${id}-heading`

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeader
          id={headingId}
          index={index}
          eyebrow={resolvedEyebrow}
          title={resolvedTitle}
          lead={intro}
        />

        <ul ref={ref} className={revealClass(styles.list, visible)}>
          {items.map((item) => (
            <li key={item.question} className={styles.item}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
