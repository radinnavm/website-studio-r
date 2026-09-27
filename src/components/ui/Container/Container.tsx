import type { ElementType, ReactNode } from 'react'

import styles from './Container.module.css'

type ContainerSize = 'default' | 'narrow' | 'wide'

type ContainerProps = {
  as?: ElementType
  size?: ContainerSize
  className?: string
  children: ReactNode
}

export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
}: ContainerProps) {
  const classes = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
