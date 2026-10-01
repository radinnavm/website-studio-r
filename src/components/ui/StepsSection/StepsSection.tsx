import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLocale } from '@/lib/LocaleProvider'
import type { ProcessStep } from '@/lib/content'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './StepsSection.module.css'

type StepsSectionProps = {
  steps: ProcessStep[]
  eyebrow?: string
  index?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep' | 'surface'
}

/** Reusable numbered process section. */
export function StepsSection({
  steps,
  eyebrow,
  index,
  title,
  intro,
  id = 'process',
  tone = 'default',
}: StepsSectionProps) {
  const { locale } = useLocale()
  const t = ui[locale]
  const { ref, visible } = useReveal<HTMLOListElement>()

  if (steps.length === 0) return null

  const resolvedEyebrow = eyebrow ?? t.steps.eyebrow
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
            eyebrow={resolvedEyebrow}
            title={title}
            lead={intro}
          />
        )}

        <ol ref={ref} className={revealClass(styles.steps, visible)}>
          {steps.map((step) => (
            <li key={step.step} className={styles.step}>
              <span className={styles.stepIndex} aria-hidden="true">
                {step.step}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
