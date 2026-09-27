import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'

import styles from './ProseSection.module.css'

type ProseSectionProps = {
  title: string
  id: string
  eyebrow?: string
  paragraphs?: string[]
  bullets?: string[]
  tone?: 'default' | 'deep'
}

/** Reusable long-form text section used by service and case-study pages. */
export function ProseSection({
  title,
  id,
  eyebrow,
  paragraphs,
  bullets,
  tone = 'default',
}: ProseSectionProps) {
  const headingId = `${id}-heading`

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <Container>
        <div className={styles.inner}>
          <header className={styles.header}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          </header>

          {paragraphs?.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

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
      </Container>
    </Section>
  )
}
