import type { ReactNode } from 'react'

import styles from './Eyebrow.module.css'

type EyebrowProps = {
  children: ReactNode
  /** Optional editorial marker, e.g. "01" — rendered as "01 / Label". */
  index?: string
  /** Renders a short rule before the label when no index is provided. */
  withRule?: boolean
  /** Element to render — use "span" inside links to keep valid HTML. */
  as?: 'p' | 'span'
  className?: string
}

export function Eyebrow({
  children,
  index,
  withRule = true,
  as = 'p',
  className,
}: EyebrowProps) {
  const classes = [styles.eyebrow, className].filter(Boolean).join(' ')
  const Tag = as

  return (
    <Tag className={classes}>
      {index ? (
        <>
          <span className={styles.index}>{index}</span>
          <span className={styles.slash} aria-hidden="true">
            /
          </span>
        </>
      ) : (
        withRule && <span className={styles.rule} aria-hidden="true" />
      )}
      <span>{children}</span>
    </Tag>
  )
}
