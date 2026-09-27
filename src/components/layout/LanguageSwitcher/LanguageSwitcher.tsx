import { Link } from 'react-router-dom'

import { htmlLang } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './LanguageSwitcher.module.css'

/**
 * BG ↔ EN switcher. The current language is shown as a non-interactive marker
 * with `aria-current`; the other language is the actual link to the equivalent
 * page. Hidden on unknown routes where no real equivalent exists.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, isEn, alternateHref, showSwitcher } = useLocale()
  const t = ui[locale]

  if (!showSwitcher || !alternateHref) return null

  const classes = [styles.switcher, className].filter(Boolean).join(' ')
  const currentCode = isEn ? 'EN' : 'BG'
  const targetCode = isEn ? 'BG' : 'EN'

  return (
    <span className={classes}>
      <span className={styles.active} aria-current="true">
        {currentCode}
      </span>
      <span className={styles.separator} aria-hidden="true">
        /
      </span>
      <Link
        className={styles.link}
        to={alternateHref}
        lang={htmlLang[locale]}
        aria-label={isEn ? t.switchToBg : t.switchToEn}
      >
        {targetCode}
      </Link>
    </span>
  )
}
