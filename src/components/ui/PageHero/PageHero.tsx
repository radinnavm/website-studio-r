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
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
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
      </Container>
    </section>
  )
}
