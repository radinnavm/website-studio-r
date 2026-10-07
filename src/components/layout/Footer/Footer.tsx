import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { contactHref, getPrimaryNav, getSite } from '@/config/site'
import { useLocale } from '@/lib/LocaleProvider'
import { getServiceHref, getServices } from '@/lib/services'
import { ui } from '@/lib/ui'

import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  const { locale, l } = useLocale()
  const t = ui[locale]
  const site = getSite(locale)
  const navItems = getPrimaryNav(locale)
  const services = getServices(locale)

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.logo}>
              Website Studio <span className={styles.logoMark}>R</span>
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className={styles.brandCta}>
              <Button href={l(contactHref)} variant="outline-inverse">
                {t.footer.cta}
              </Button>
            </div>
          </div>

          <nav className={styles.column} aria-label={t.footer.services}>
            <h2 className={styles.heading}>{t.footer.services}</h2>
            <ul className={styles.list}>
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    className={styles.link}
                    to={getServiceHref(locale, service)}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-label={t.footer.studio}>
            <h2 className={styles.heading}>{t.footer.studio}</h2>
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} to={l(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.column} ${styles.contact}`}>
            <h2 className={styles.heading}>{t.footer.contact}</h2>
            <ul className={styles.list}>
              <li>
                <a className={styles.link} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a className={styles.link} href={site.phoneHref}>
                  {site.phone}
                </a>
              </li>
              <li>
                <span className={styles.muted}>
                  {site.address.city}, {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <ul className={styles.legal}>
            <li>
              <Link
                className={styles.link}
                to={l('/politika-za-poveritelnost')}
              >
                {ui[locale].form.consentLink}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
