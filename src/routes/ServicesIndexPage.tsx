import { Link } from 'react-router-dom'

import { ServiceSection } from '@/components/services/ServiceSection'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { FaqSection } from '@/components/ui/FaqSection'
import { PageHero } from '@/components/ui/PageHero'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { getServiceHref, getServices } from '@/lib/services'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './ServicesIndexPage.module.css'

const copy: Localized<{
  home: string
  hero: { eyebrow: string; title: string; accent: string; lead: string }
  tocTitle: string
}> = {
  bg: {
    home: 'Начало',
    hero: {
      eyebrow: 'Услуги',
      title: 'Услуги за всеки етап от',
      accent: 'онлайн присъствието.',
      lead: 'От изработка на сайт и онлайн магазин до дизайн, SEO и поддръжка — покриваме целия процес, така че да работите с един партньор.',
    },
    tocTitle: 'Услуги на тази страница',
  },
  en: {
    home: 'Home',
    hero: {
      eyebrow: 'Services',
      title: 'Services for every stage of',
      accent: 'your online presence.',
      lead: 'From building a website or online store to design, SEO and maintenance, we cover the whole process so you work with one partner.',
    },
    tocTitle: 'Services on this page',
  },
}

export function ServicesIndexPage() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const services = getServices(locale)
  const faqItems = services.flatMap((service) => service.faq)
  const { ref, visible } = useReveal<HTMLUListElement>()

  useSeo(getPageSeo('/uslugi', locale))

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        accent={t.hero.accent}
        lead={t.hero.lead}
        breadcrumbs={[
          { label: t.home, href: l('/') },
          { label: t.hero.eyebrow },
        ]}
        image="/images/uslugi.jpg"
        aside={
          <nav aria-labelledby="services-toc-heading">
            <h2 id="services-toc-heading" className="visually-hidden">
              {t.tocTitle}
            </h2>

            <ul ref={ref} className={revealClass(styles.toc, visible)}>
              {services.map((service) => (
                <li key={service.id} className={styles.tocItem}>
                  <Link
                    className={styles.tocLink}
                    to={getServiceHref(locale, service)}
                  >
                    <span className={styles.tocIndex} aria-hidden="true">
                      {service.index}
                    </span>
                    <span className={styles.tocLabel}>{service.title}</span>
                    <span className={styles.tocArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {services.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}

      <FaqSection id="uslugi-faq" tone="surface" items={faqItems} />

      <CtaBanner withVisual />
    </>
  )
}
