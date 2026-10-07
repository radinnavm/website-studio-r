import type { ReactNode } from 'react'

import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'

import { Breadcrumbs } from '../Breadcrumbs'
import type { BreadcrumbItem } from '../Breadcrumbs'

import styles from './PageHero.module.css'

type PageHeroProps = {
  eyebrow?: string
  index?: string
  title: string
  accent?: string
  lead?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: ReactNode
  meta?: string[]
  /** Optional secondary column, e.g. an on-page service index. */
  aside?: ReactNode
  /** Renders a cover image behind the hero (path under /public). */
  image?: string
}

/** Shared interior-page hero: breadcrumbs, eyebrow, H1, lead and actions. */
export function PageHero({
  eyebrow,
  index,
  title,
  accent,
  lead,
  breadcrumbs,
  actions,
  meta,
  aside,
  image,
}: PageHeroProps) {
  return (
    <section className={styles.hero} data-image={image ? 'true' : undefined}>
      {image && (
        <img
          className={styles.image}
          src={image}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
      )}

      <Container>
        <div
          className={styles.layout}
          data-has-aside={aside ? 'true' : undefined}
        >
          <div className={styles.inner}>
            {breadcrumbs && (
              <Breadcrumbs items={breadcrumbs} className={styles.breadcrumbs} />
            )}

            {eyebrow && (
              <Eyebrow className={styles.eyebrow} index={index}>
                {eyebrow}
              </Eyebrow>
            )}

            <h1 className={styles.title}>
              {title}
              {accent && <em> {accent}</em>}
            </h1>

            {lead && <p className={styles.lead}>{lead}</p>}

            {actions && <div className={styles.actions}>{actions}</div>}

            {meta && meta.length > 0 && (
              <ul className={styles.meta}>
                {meta.map((item) => (
                  <li key={item} className={styles.metaItem}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
      </Container>
    </section>
  )
}
