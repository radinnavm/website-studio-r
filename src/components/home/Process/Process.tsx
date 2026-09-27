import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { getHomeContent } from '@/lib/content'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './Process.module.css'

const title: Localized<string> = {
  bg: 'От идея до стартиране — в четири ясни стъпки.',
  en: 'From idea to launch — in four clear steps.',
}

export function Process() {
  const { locale } = useLocale()
  const t = ui[locale].steps
  const { processSteps } = getHomeContent(locale)

  return (
    <Section id="process" aria-labelledby="process-heading">
      <Container>
        <header className={styles.header}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="process-heading" className={styles.title}>
            {title[locale]}
          </h2>
        </header>

        <ol className={styles.steps}>
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
      </Container>
    </Section>
  )
}
