import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { contactHref, getPrimaryNav, site } from '@/config/site'
import { useLocale } from '@/lib/LocaleProvider'
import { isNavItemActive } from '@/lib/nav'
import { ui } from '@/lib/ui'

import { LanguageSwitcher } from '../LanguageSwitcher'
import styles from './MobileNav.module.css'

type MobileNavProps = {
  id: string
  open: boolean
  onClose: () => void
  returnFocusRef?: RefObject<HTMLElement | null>
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function MobileNav({
  id,
  open,
  onClose,
  returnFocusRef,
}: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const { locale, l } = useLocale()
  const t = ui[locale]
  const navItems = getPrimaryNav(locale)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusTarget = returnFocusRef?.current ?? null
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    main?.setAttribute('inert', '')
    footer?.setAttribute('inert', '')

    panel?.querySelector<HTMLElement>('button, a[href]')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panel) return

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return

      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
      const target = focusTarget ?? previouslyFocused
      target?.focus()
    }
  }, [open, returnFocusRef])

  if (!open) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className={styles.root}>
      <div className={styles.overlay} aria-hidden="true" onClick={onClose} />

      <div
        id={id}
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.navAria}
      >
        <Container className={styles.panelInner}>
          <div className={styles.panelTop}>
            <span className={styles.panelLogo}>
              Website Studio <span className={styles.panelMark}>R</span>
            </span>
            <button
              type="button"
              className={styles.close}
              aria-label={t.closeMenu}
              onClick={onClose}
            >
              <span className={styles.closeIcon} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t.mobileNavAria}>
            <ul className={styles.list}>
              {navItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      to={l(item.href)}
                      className={[styles.link, isActive && styles.linkActive]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className={styles.footer}>
            <LanguageSwitcher />

            <Button
              href={l(contactHref)}
              variant="primary"
              size="lg"
              withArrow
              onClick={onClose}
            >
              {t.footer.cta}
            </Button>

            <div className={styles.contact}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </Container>
      </div>
    </div>,
    document.body,
  )
}
