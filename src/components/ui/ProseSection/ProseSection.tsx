import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './ProseSection.module.css'

type ProseSectionProps = {
  title: string
  id: string
  eyebrow?: string
  index?: string
  paragraphs?: string[]
  bullets?: string[]
  quote?: string
  tone?: 'default' | 'deep' | 'surface'
}

/** Reusable long-form text section used by service and case-study pages. */
export function ProseSection({
  title,
  id,
  eyebrow,
  index,
  paragraphs,
  bullets,
  quote,
  tone = 'default',
}: ProseSectionProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const headingId = `${id}-heading`

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <Container>
        <div className={styles.inner}>
          <SectionHeader
            id={headingId}
            index={index}
            eyebrow={eyebrow}
            title={title}
          />

          <div ref={ref} className={revealClass(styles.body, visible)}>
            {paragraphs?.map((paragraph, position) => (
              <p
                key={position}
                className={position === 0 ? styles.lead : styles.paragraph}
              >
                {paragraph}
              </p>
            ))}

            {quote && <blockquote className={styles.quote}>{quote}</blockquote>}

            {bullets && bullets.length > 0 && (
              <ul className={styles.bullets}>
                {bullets.map((bullet) => (
                  <li key={bullet} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
