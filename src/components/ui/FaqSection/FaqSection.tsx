import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { useLocale } from '@/lib/LocaleProvider'
import type { FaqItem } from '@/lib/services'
import { ui } from '@/lib/ui'

import styles from './FaqSection.module.css'

type FaqSectionProps = {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep'
}

/** Reusable FAQ accordion built on native `details`/`summary` for a11y. */
export function FaqSection({
  items,
  eyebrow,
  title,
  intro,
  id = 'faq',
  tone = 'default',
}: FaqSectionProps) {
  const { locale } = useLocale()
  const t = ui[locale]

  if (items.length === 0) return null

  const resolvedEyebrow = eyebrow ?? t.faq.eyebrow
  const resolvedTitle = title ?? t.faq.title

  const headingId = `${id}-heading`

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <Container>
        <header className={styles.header}>
          <Eyebrow>{resolvedEyebrow}</Eyebrow>
          <h2 id={headingId} className={styles.title}>
            {resolvedTitle}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        <ul className={styles.list}>
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
