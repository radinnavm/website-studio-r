import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { contactHref } from '@/config/site'
import { useLocale } from '@/lib/LocaleProvider'
import { getPricing } from '@/lib/pricing'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './PricingPage.module.css'

export function PricingPage() {
  const { locale, l } = useLocale()
  const t = getPricing(locale)
  const uiT = ui[locale]
  const { ref, visible } = useReveal<HTMLDivElement>()

  useSeo(getPageSeo('/tseni', locale))

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
      />

      <Section aria-labelledby="pricing-plans-heading">
        <Container>
          <h2 id="pricing-plans-heading" className="visually-hidden">
            {t.hero.eyebrow}
          </h2>

          <div ref={ref} className={revealClass(styles.plans, visible)}>
            {t.plans.map((plan) => (
              <article
                key={plan.id}
                className={styles.plan}
                aria-labelledby={`${plan.id}-heading`}
              >
                <header className={styles.planHead}>
                  <h3 id={`${plan.id}-heading`} className={styles.planName}>
                    {plan.name}
                  </h3>
                  <p className={styles.price}>
                    <span className={styles.priceValue}>{plan.price}</span>
                    <span className={styles.priceCurrency}>
                      {plan.currency}
                    </span>
                  </p>
                </header>

                <p className={styles.planDescription}>{plan.description}</p>

                <ul className={styles.includes}>
                  {plan.includes.map((item) => (
                    <li key={item} className={styles.include}>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={styles.planAction}>
                  <Button href={l(contactHref)} variant="primary" withArrow>
                    {plan.ctaLabel}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="pricing-support-heading">
        <Container>
          <div className={styles.support}>
            <div className={styles.supportMark}>
              <Eyebrow>{t.support.eyebrow}</Eyebrow>
              <h2 id="pricing-support-heading" className={styles.supportTitle}>
                {t.support.title}
              </h2>
            </div>
            <p className={styles.supportText}>{t.support.description}</p>
          </div>
        </Container>
      </Section>

      <CtaBanner
        id="pricing-cta"
        title={t.cta.title}
        lead={t.cta.lead}
        primaryLabel={t.cta.primaryLabel}
      />
    </>
  )
}
