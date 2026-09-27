import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { contactHref, getSite } from '@/config/site'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { ui } from '@/lib/ui'

import styles from './CtaSection.module.css'

const copy: Localized<{
  eyebrow: string
  title: string
  lead: string
  primary: string
}> = {
  bg: {
    eyebrow: 'Контакт',
    title: 'Имате идея за нов сайт?',
    lead: 'Разкажете ни какво искате да постигнете — ще обсъдим целите, обхвата и следващите стъпки.',
    primary: 'Разкажете ни за проекта',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Have an idea for a new website?',
    lead: 'Tell us what you want to achieve — we will discuss goals, scope and next steps.',
    primary: 'Tell us about your project',
  },
}

export function CtaSection() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const site = getSite(locale)

  return (
    <Section id="contact" tone="inverse" aria-labelledby="contact-heading">
      <Container>
        <div className={styles.inner}>
          <Eyebrow className={styles.eyebrow}>{t.eyebrow}</Eyebrow>

          <h2 id="contact-heading" className={styles.title}>
            {t.title}
          </h2>

          <p className={styles.lead}>{t.lead}</p>

          <div className={styles.actions}>
            <Button href={l(contactHref)} variant="inverse" size="lg" withArrow>
              {t.primary}
            </Button>
            <Button href={site.phoneHref} variant="outline-inverse" size="lg">
              {site.phone}
            </Button>
          </div>

          <ul className={styles.details}>
            <li>
              <span className={styles.detailLabel}>
                {ui[locale].contactPage.email}
              </span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span className={styles.detailLabel}>
                {ui[locale].contactPage.location}
              </span>
              <span>
                {site.address.city}, {site.address.country}
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  )
}
