import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { getServices } from '@/lib/services'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './ServicesIndexPage.module.css'

const copy: Localized<{
  home: string
  hero: { eyebrow: string; title: string; accent: string; lead: string }
  heading: string
  more: string
}> = {
  bg: {
    home: 'Начало',
    hero: {
      eyebrow: 'Услуги',
      title: 'Услуги за всеки етап от',
      accent: 'онлайн присъствието.',
      lead: 'От изработка на сайт и онлайн магазин до дизайн, SEO и поддръжка — покриваме целия процес, така че да работите с един партньор.',
    },
    heading: 'Всички услуги',
    more: 'Научете повече',
  },
  en: {
    home: 'Home',
    hero: {
      eyebrow: 'Services',
      title: 'Services for every stage of',
      accent: 'your online presence.',
      lead: 'From building a website or online store to design, SEO and maintenance, we cover the whole process so you work with one partner.',
    },
    heading: 'All services',
    more: 'Learn more',
  },
}

export function ServicesIndexPage() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const services = getServices(locale)
  const { ref, visible } = useReveal<HTMLUListElement>()

  useSeo(getPageSeo('/uslugi', locale))

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        index="01"
        title={t.hero.title}
        accent={t.hero.accent}
        lead={t.hero.lead}
        breadcrumbs={[
          { label: t.home, href: l('/') },
          { label: t.hero.eyebrow },
        ]}
      />

      <Section aria-labelledby="services-index-heading">
        <Container>
          <h2 id="services-index-heading" className="visually-hidden">
            {t.heading}
          </h2>

          <ul ref={ref} className={revealClass(styles.list, visible)}>
            {services.map((service) => (
              <li key={service.id} className={styles.item}>
                <span className={styles.index} aria-hidden="true">
                  {service.index}
                </span>

                <div className={styles.body}>
                  <h3 className={styles.title}>
                    <Link
                      className={styles.titleLink}
                      to={l(`/${service.slug}`)}
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className={styles.text}>{service.summary}</p>
                  <ul className={styles.points}>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  className={styles.more}
                  to={l(`/${service.slug}`)}
                  aria-label={`${t.more} ${
                    locale === 'en' ? 'about' : 'за'
                  } ${service.title}`}
                >
                  <Eyebrow as="span" withRule={false}>
                    {t.more}
                  </Eyebrow>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner />
    </>
  )
}
