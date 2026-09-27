import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { useLocale } from '@/lib/LocaleProvider'
import { toBgPath } from '@/lib/routeMap'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'

import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  const { locale, l } = useLocale()
  const { pathname } = useLocation()
  const t = ui[locale].notFound

  useSeo(getPageSeo(toBgPath(pathname), locale))

  return (
    <Section aria-labelledby="notfound-title">
      <Container>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 id="notfound-title" className={styles.title}>
            {t.title}
          </h1>
          <p className={styles.text}>{t.text}</p>
          <Button href={l('/')} variant="primary" withArrow>
            {t.backHome}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
