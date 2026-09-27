import type { ReactNode } from 'react'

import styles from './Eyebrow.module.css'

type EyebrowProps = {
  children: ReactNode
  /** Renders a short rule before the label for editorial framing. */
  withRule?: boolean
  /** Element to render — use "span" inside links to keep valid HTML. */
  as?: 'p' | 'span'
  className?: string
}

export function Eyebrow({
  children,
  withRule = true,
  as = 'p',
  className,
}: EyebrowProps) {
  const classes = [styles.eyebrow, className].filter(Boolean).join(' ')
  const Tag = as

  return (
    <Tag className={classes}>
      {withRule && <span className={styles.rule} aria-hidden="true" />}
      <span>{children}</span>
    </Tag>
  )
}
