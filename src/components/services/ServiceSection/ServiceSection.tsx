import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { useLocale } from '@/lib/LocaleProvider'
import { getServiceAnchor } from '@/lib/services'
import type { ServicePage } from '@/lib/services'
import { revealClass, useReveal } from '@/lib/useReveal'

import { getServicePhoto, getServiceVisual } from './serviceVisuals'
import { ServiceVisual } from './ServiceVisual'
import styles from './ServiceSection.module.css'

type ServiceSectionProps = {
  service: ServicePage
}

/**
 * A single service presented inline on the services index page. The outer
 * `<section>` carries the scroll anchor so `/uslugi#anchor` lands on the start
 * of the service, offset for the sticky header via `scroll-margin-top`.
 */
export function ServiceSection({ service }: ServiceSectionProps) {
  const { locale } = useLocale()
  const { ref, visible } = useReveal<HTMLDivElement>()

  const anchor = getServiceAnchor(locale, service)
  const headingId = `${anchor}-heading`
  const visual = getServiceVisual(service.id)
  const photo = getServicePhoto(service.id)
  const hasVisual = Boolean(photo || visual)
  /* Even-indexed services lead with the visual on desktop; on mobile the
     text always comes first via source order. */
  const flipped = Number(service.index) % 2 === 0

  return (
    <section
      id={anchor}
      className={styles.service}
      aria-labelledby={headingId}
      data-service={service.slug}
    >
      <Section tone="surface" size="tight" className={styles.intro}>
        <Container>
          <div
            ref={ref}
            className={revealClass(styles.grid, visible)}
            data-flip={flipped && hasVisual ? 'true' : undefined}
          >
            <div className={styles.inner}>
              <div className={styles.heading}>
                <span className={styles.marker} aria-hidden="true">
                  <span className={styles.markerIndex}>{service.index}</span>
                  <span className={styles.markerRule} />
                </span>

                <h2 id={headingId} className={styles.title}>
                  {service.hero.title}
                </h2>
              </div>

              <p className={styles.lead}>{service.hero.lead}</p>
            </div>

            {photo ? (
              <figure className={styles.figure} aria-hidden="true">
                <span className={styles.photoWrap}>
                  <img
                    className={styles.photo}
                    src={photo}
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </figure>
            ) : (
              visual && (
                <ServiceVisual variant={visual} className={styles.figure} />
              )
            )}
          </div>
        </Container>
      </Section>
    </section>
  )
}
