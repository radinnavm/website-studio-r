import type { ReactNode } from 'react'

import type { ServiceVisualVariant } from './serviceVisuals'
import styles from './ServiceVisual.module.css'

type ServiceVisualProps = {
  variant: ServiceVisualVariant
  className?: string
}

const renderers: Record<ServiceVisualVariant, () => ReactNode> = {
  website: WebsiteMockup,
  ecommerce: EcommerceMockup,
  'web-design': WebDesignMockup,
  seo: SeoMockup,
  support: SupportMockup,
}

/**
 * Decorative, in-palette website / UI mockups rendered with CSS and SVG.
 * Purely presentational — hidden from assistive technology.
 */
export function ServiceVisual({ variant, className }: ServiceVisualProps) {
  const Render = renderers[variant]
  const classes = [styles.visual, className].filter(Boolean).join(' ')

  return (
    <figure className={classes} data-variant={variant} aria-hidden="true">
      <div className={styles.frame}>
        <Render />
      </div>
    </figure>
  )
}

function WebsiteMockup() {
  return (
    <>
      <div className={styles.chrome}>
        <span className={styles.url} />
      </div>

      <div className={styles.page}>
        <div className={styles.topbar}>
          <span className={styles.brand} />
          <span className={styles.nav}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.topAction} />
        </div>

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.headingXl} />
            <span className={styles.headingLg} />
            <span className={styles.copyLine} />
            <span className={styles.copyLineShort} />
            <span className={styles.action} />
          </div>

          <div className={styles.heroMedia}>
            <span className={styles.mediaCaption} />
          </div>
        </div>
      </div>
    </>
  )
}

function EcommerceMockup() {
  return (
    <>
      <div className={styles.chrome}>
        <span className={styles.url} />
      </div>

      <div className={styles.page}>
        <div className={styles.topbar}>
          <span className={styles.brand} />
          <span className={styles.search} />
          <span className={styles.cart} />
        </div>

        <div className={styles.product}>
          <div className={styles.productMedia} />

          <div className={styles.productInfo}>
            <span className={styles.headingSm} />
            <span className={styles.price} />
            <span className={styles.swatches}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.action} />
            <span className={styles.copyLine} />
            <span className={styles.copyLineShort} />
          </div>
        </div>

        <div className={styles.thumbs}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  )
}

function WebDesignMockup() {
  return (
    <div className={styles.board}>
      <span className={styles.boardLabel} />

      <div className={styles.palette}>
        <i className={styles.swatchIvory} />
        <i className={styles.swatchTaupe} />
        <i className={styles.swatchEspresso} />
        <i className={styles.swatchBurgundy} />
      </div>

      <div className={styles.specimen}>
        <span className={styles.glyph}>Aa</span>
        <span className={styles.scale}>
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className={styles.components}>
        <span className={styles.pillSolid} />
        <span className={styles.pillGhost} />
        <span className={styles.field} />
      </div>

      <div className={styles.cards}>
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function SeoMockup() {
  return (
    <div className={styles.analytics}>
      <div className={styles.analyticsHead}>
        <span className={styles.analyticsTitle} />
        <span className={styles.tabs}>
          <i className={styles.tabActive} />
          <i />
          <i />
        </span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricValue} />
          <span className={styles.metricDelta} />
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue} />
          <span className={styles.metricDelta} />
        </div>
      </div>

      <svg
        className={styles.chart}
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path
          className={styles.chartGrid}
          d="M0 30H320M0 60H320M0 90H320M80 0V120M160 0V120M240 0V120"
        />
        <path
          className={styles.chartArea}
          d="M0 92L40 78L80 84L120 58L160 64L200 40L240 46L280 24L320 30V120H0Z"
        />
        <path
          className={styles.chartLine}
          d="M0 92L40 78L80 84L120 58L160 64L200 40L240 46L280 24L320 30"
        />
        <circle className={styles.chartDot} cx="280" cy="24" r="4" />
      </svg>

      <div className={styles.bars}>
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

function SupportMockup() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashHead}>
        <span className={styles.dashTitle} />
        <span className={styles.status}>
          <i />
        </span>
      </div>

      <div className={styles.dashCards}>
        <div className={styles.dashCard}>
          <span className={styles.dashValue} />
          <span className={styles.dashLabel} />
        </div>
        <div className={styles.dashCard}>
          <span className={styles.dashValue} />
          <span className={styles.dashLabel} />
        </div>
        <div className={styles.dashCard}>
          <span className={styles.dashValue} />
          <span className={styles.dashLabel} />
        </div>
      </div>

      <svg
        className={styles.sparkline}
        viewBox="0 0 320 60"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path
          className={styles.sparkLine}
          d="M0 40L40 36L80 42L120 24L160 30L200 18L240 26L280 14L320 20"
        />
      </svg>

      <ul className={styles.log}>
        <li>
          <i />
          <span />
        </li>
        <li>
          <i />
          <span />
        </li>
        <li>
          <i />
          <span />
        </li>
      </ul>
    </div>
  )
}
