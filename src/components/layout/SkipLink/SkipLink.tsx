import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './SkipLink.module.css'

/** Keyboard-accessible skip link, localized to the current language. */
export function SkipLink() {
  const { locale } = useLocale()
  return (
    <a className={styles.skipLink} href="#main-content">
      {ui[locale].skipLink}
    </a>
  )
}
