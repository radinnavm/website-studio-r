import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { contactHref, getPrimaryNav } from '@/config/site'
import { useLocale } from '@/lib/LocaleProvider'
import { isNavItemActive } from '@/lib/nav'
import { ui } from '@/lib/ui'

import { LanguageSwitcher } from '../LanguageSwitcher'
import { MobileNav } from '../MobileNav'
import styles from './Header.module.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const { pathname } = useLocation()
  const { locale, l } = useLocale()
  const t = ui[locale]
  const navItems = getPrimaryNav(locale)

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to={l('/')} className={styles.logo} aria-label={t.brandAria}>
          <span className={styles.logoText}>Website Studio</span>
          <span className={styles.logoMark} aria-hidden="true">
            R
          </span>
        </Link>

        <nav className={styles.nav} aria-label={t.navAria}>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    to={l(item.href)}
                    className={[
                      styles.navLink,
                      isActive && styles.navLinkActive,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher className={styles.lang} />

          <Button
            href={l(contactHref)}
            variant="primary"
            className={styles.cta}
          >
            {t.footer.cta}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
            aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={styles.menuBar} aria-hidden="true" />
            <span className={styles.menuBar} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileNav
        id="mobile-navigation"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        returnFocusRef={toggleRef}
      />
    </header>
  )
}
