import type { ElementType, ReactNode } from 'react'

import styles from './Section.module.css'

type SectionTone = 'default' | 'deep' | 'surface' | 'inverse' | 'burgundy'
type SectionSize = 'default' | 'tight' | 'flush'

type SectionProps = {
  as?: ElementType
  id?: string
  tone?: SectionTone
  size?: SectionSize
  className?: string
  'aria-labelledby'?: string
  children: ReactNode
}

export function Section({
  as: Tag = 'section',
  id,
  tone = 'default',
  size = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  const classes = [styles.section, styles[tone], styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag id={id} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
