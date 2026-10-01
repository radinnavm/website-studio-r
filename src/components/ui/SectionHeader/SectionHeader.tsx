import type { ReactNode } from 'react'

import { Eyebrow } from '@/components/ui/Eyebrow'
import { useReveal } from '@/lib/useReveal'

import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  title: string
  /** Editorial marker, e.g. "01". Renders "01 / Eyebrow". */
  index?: string
  eyebrow?: string
  lead?: string
  /** id applied to the h2 so sections can reference it via aria-labelledby. */
  id?: string
  /** Use a wider measure for long-form sections. */
  wide?: boolean
  className?: string
  children?: ReactNode
}

/** Shared editorial section header: marker, title, lead and optional actions. */
export function SectionHeader({
  title,
  index,
  eyebrow,
  lead,
  id,
  wide = false,
  className,
  children,
}: SectionHeaderProps) {
  const { ref, visible } = useReveal<HTMLElement>()
  const classes = [
    styles.header,
    wide && styles.wide,
    'reveal',
    visible && 'is-visible',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={ref} className={classes}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </header>
  )
}
