import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getHomeContent } from '@/lib/content'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './Process.module.css'

const title: Localized<string> = {
  bg: 'От идея до стартиране — в четири ясни стъпки.',
  en: 'From idea to launch — in four clear steps.',
}

const adapt: Localized<string> = {
  bg: 'Подходът се адаптира според проекта.',
  en: 'The approach adapts to the project.',
}

const projectTags: Localized<string[]> = {
  bg: ['Фирмен сайт', 'Онлайн магазин', 'Редизайн', 'SEO', 'Поддръжка'],
  en: ['Corporate website', 'Online store', 'Redesign', 'SEO', 'Maintenance'],
}

export function Process() {
  const { locale } = useLocale()
  const t = ui[locale].steps
  const { processSteps } = getHomeContent(locale)
  const { ref, visible } = useReveal<HTMLOListElement>()
  const { ref: adaptRef, visible: adaptVisible } = useReveal<HTMLDivElement>()

  return (
    <Section id="process" aria-labelledby="process-heading">
      <Container>
        <SectionHeader
          id="process-heading"
          index="03"
          eyebrow={t.eyebrow}
          title={title[locale]}
        />

        <ol ref={ref} className={revealClass(styles.steps, visible)}>
          {processSteps.map((step) => (
            <li key={step.step} className={styles.step}>
              <span className={styles.stepIndex} aria-hidden="true">
                {step.step}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </li>
          ))}
        </ol>

        <div ref={adaptRef} className={revealClass(styles.adapt, adaptVisible)}>
          <p className={styles.adaptText}>{adapt[locale]}</p>
          <ul className={styles.tags}>
            {projectTags[locale].map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
