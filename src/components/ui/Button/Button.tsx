import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

import styles from './Button.module.css'

type ButtonVariant =
  'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse'
type ButtonSize = 'md' | 'lg'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  withArrow?: boolean
  children: ReactNode
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

export type ButtonProps = AnchorProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    children,
    href,
    ...rest
  } = props

  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {withArrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  )

  if (typeof href === 'string') {
    const isInternal = href.startsWith('/') && !href.startsWith('//')

    if (isInternal) {
      return (
        <Link
          to={href}
          className={classes}
          {...(rest as Omit<LinkProps, 'to'>)}
        >
          {content}
        </Link>
      )
    }

    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
