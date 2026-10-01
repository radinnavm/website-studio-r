import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './CtaBanner.module.css'

type CtaBannerProps = {
  eyebrow?: string
  index?: string
  title?: string
  lead?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  id?: string
}

/** Reusable closing call-to-action band used across interior pages. */
export function CtaBanner({
  eyebrow,
  index,
  title,
  lead,
  primaryLabel,
  primaryHref = '/kontakt',
  secondaryLabel,
  secondaryHref,
  id = 'cta',
}: CtaBannerProps) {
  const { locale, l } = useLocale()
  const t = ui[locale].ctaBanner
  const headingId = `${id}-heading`

  return (
    <Section id={id} tone="burgundy" aria-labelledby={headingId}>
      <Container>
        <div className={styles.stage}>
          <span className={styles.watermark} aria-hidden="true">
            R
          </span>

          <div className={styles.inner}>
            <Eyebrow className={styles.eyebrow} index={index}>
              {eyebrow ?? t.eyebrow}
            </Eyebrow>

            <h2 id={headingId} className={styles.title}>
              {title ?? t.title}
            </h2>

            <p className={styles.lead}>{lead ?? t.lead}</p>

            <div className={styles.actions}>
              <Button
                href={l(primaryHref)}
                variant="inverse"
                size="lg"
                withArrow
              >
                {primaryLabel ?? t.primary}
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button
                  href={l(secondaryHref)}
                  variant="outline-inverse"
                  size="lg"
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
