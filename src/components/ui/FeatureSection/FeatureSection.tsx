import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './FeatureSection.module.css'

export type FeatureItem = {
  title: string
  description: string
}

type FeatureSectionProps = {
  items: FeatureItem[]
  eyebrow?: string
  index?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep' | 'surface'
}

/** Reusable grid of titled features / deliverables. */
export function FeatureSection({
  items,
  eyebrow,
  index,
  title,
  intro,
  id = 'features',
  tone = 'default',
}: FeatureSectionProps) {
  const { ref, visible } = useReveal<HTMLUListElement>()

  if (items.length === 0) return null

  const headingId = `${id}-heading`

  return (
    <Section
      id={id}
      tone={tone}
      aria-labelledby={title ? headingId : undefined}
    >
      <Container>
        {title && (
          <SectionHeader
            id={headingId}
            index={index}
            eyebrow={eyebrow}
            title={title}
            lead={intro}
          />
        )}

        <ul ref={ref} className={revealClass(styles.grid, visible)}>
          {items.map((item, position) => (
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
