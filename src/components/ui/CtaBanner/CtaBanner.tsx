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
  /** Opt-in decorative background visual. Kept off by default. */
  withVisual?: boolean
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
  withVisual = false,
}: CtaBannerProps) {
  const { locale, l } = useLocale()
  const t = ui[locale].ctaBanner
  const headingId = `${id}-heading`

  return (
    <Section id={id} tone="burgundy" aria-labelledby={headingId}>
      <Container>
        <div className={styles.stage}>
          {withVisual && <CtaVisual />}

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

/**
 * Discreet abstract background for the closing CTA — a fine dot matrix and
 * concentric rings in the inverse ink, kept low-contrast so the copy and the
 * call to action stay fully legible.
 */
function CtaVisual() {
  return (
    <svg
      className={styles.visual}
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="cta-visual-dots"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle className={styles.visualDot} cx="1.5" cy="1.5" r="1.5" />
        </pattern>
      </defs>

      <rect
        className={styles.visualDots}
        width="1200"
        height="480"
        fill="url(#cta-visual-dots)"
      />

      <circle className={styles.visualRing} cx="150" cy="430" r="300" />
      <circle className={styles.visualRing} cx="150" cy="430" r="210" />
      <circle className={styles.visualRingAccent} cx="150" cy="430" r="120" />
    </svg>
  )
}
