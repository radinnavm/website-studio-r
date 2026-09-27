import { Link } from 'react-router-dom'

import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './Breadcrumbs.module.css'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Accessible breadcrumb trail. The matching BreadcrumbList structured data is
 * emitted by the shared SEO layer (`applySeo`), so it stays in sync with the
 * prerendered HTML.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const { locale } = useLocale()
  const classes = [styles.breadcrumbs, className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label={ui[locale].breadcrumbsAria}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {item.href && !isLast ? (
                <Link className={styles.link} to={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles.current}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
