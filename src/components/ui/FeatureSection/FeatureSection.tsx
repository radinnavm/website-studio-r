import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'

import styles from './FeatureSection.module.css'

export type FeatureItem = {
  title: string
  description: string
}

type FeatureSectionProps = {
  items: FeatureItem[]
  eyebrow?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep'
}

/** Reusable grid of titled features / deliverables. */
export function FeatureSection({
  items,
  eyebrow,
  title,
  intro,
  id = 'features',
  tone = 'default',
}: FeatureSectionProps) {
  if (items.length === 0) return null

  const headingId = `${id}-heading`

  return (
    <Section
      id={id}
      tone={tone}
      aria-labelledby={title ? headingId : undefined}
    >
      <Container>
        <header className={styles.header}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          )}
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        <ul className={styles.grid}>
          {items.map((item) => (
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
