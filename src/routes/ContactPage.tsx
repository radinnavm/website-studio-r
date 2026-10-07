import { ContactForm } from '@/components/contact/ContactForm'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { getSite } from '@/config/site'
import { contactExpectations } from '@/lib/contactPage'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'

import styles from './ContactPage.module.css'

const copy: Localized<{
  hero: { eyebrow: string; title: string; accent: string; lead: string }
}> = {
  bg: {
    hero: {
      eyebrow: 'Контакти',
      title: 'Нека поговорим за',
      accent: 'вашия проект.',
      lead: 'Разкажете ни накратко за бизнеса и какво искате да постигнете. Ще прегледаме запитването и ще се свържем с вас, за да обсъдим следващите стъпки.',
    },
  },
  en: {
    hero: {
      eyebrow: 'Contact',
      title: 'Let’s talk about',
      accent: 'your project.',
      lead: 'Tell us briefly about your business and what you want to achieve. We will review your enquiry and get back to you to discuss next steps.',
    },
  },
}

export function ContactPage() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const uiT = ui[locale]
  const site = getSite(locale)
  const expectations = contactExpectations[locale]

  useSeo(getPageSeo('/kontakt', locale))

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        accent={t.hero.accent}
        lead={t.hero.lead}
        breadcrumbs={[
          { label: uiT.home, href: l('/') },
          { label: t.hero.eyebrow },
        ]}
        image="/images/kontakti.jpg"
      />

      <Section aria-labelledby="contact-form-heading">
        <Container>
          <div className={styles.layout}>
            <div className={styles.formColumn}>
              <h2 id="contact-form-heading" className={styles.heading}>
                {uiT.contactPage.formHeading}
              </h2>
              <ContactForm />
            </div>

            <aside
              className={styles.aside}
              aria-labelledby="contact-details-heading"
            >
              <div className={styles.block}>
                <h2
                  id="contact-details-heading"
                  className={styles.asideHeading}
                >
                  {uiT.contactPage.detailsHeading}
                </h2>
                <ul className={styles.details}>
                  <li className={styles.detail}>
                    <span className={styles.label}>
                      {uiT.contactPage.email}
                    </span>
                    <a className={styles.link} href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </li>
                  <li className={styles.detail}>
                    <span className={styles.label}>
                      {uiT.contactPage.phone}
                    </span>
                    <a className={styles.link} href={site.phoneHref}>
                      {site.phone}
                    </a>
                  </li>
                  <li className={styles.detail}>
                    <span className={styles.label}>
                      {uiT.contactPage.location}
                    </span>
                    <span className={styles.value}>
                      {site.address.city}, {site.address.country}
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.asideHeading}>
                  {uiT.contactPage.expectationsHeading}
                </h2>
                <ol className={styles.steps}>
                  {expectations.map((item) => (
                    <li key={item.title} className={styles.step}>
                      <span className={styles.stepTitle}>{item.title}</span>
                      <span className={styles.stepText}>
                        {item.description}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
