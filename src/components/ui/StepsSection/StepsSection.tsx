import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { useLocale } from '@/lib/LocaleProvider'
import type { ProcessStep } from '@/lib/content'
import { ui } from '@/lib/ui'

import styles from './StepsSection.module.css'

type StepsSectionProps = {
  steps: ProcessStep[]
  eyebrow?: string
  title?: string
  intro?: string
  id?: string
  tone?: 'default' | 'deep'
}

/** Reusable numbered process section. */
export function StepsSection({
  steps,
  eyebrow,
  title,
  intro,
  id = 'process',
  tone = 'default',
}: StepsSectionProps) {
  const { locale } = useLocale()
  const t = ui[locale]

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
        <header className={styles.header}>
          <Eyebrow>{resolvedEyebrow}</Eyebrow>
          {title && (
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          )}
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        <ol className={styles.steps}>
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
