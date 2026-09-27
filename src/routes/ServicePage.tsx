import { Button } from '@/components/ui/Button'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { FaqSection } from '@/components/ui/FaqSection'
import { FeatureSection } from '@/components/ui/FeatureSection'
import { PageHero } from '@/components/ui/PageHero'
import { ProseSection } from '@/components/ui/ProseSection'
import { StepsSection } from '@/components/ui/StepsSection'
import { RelatedServices } from '@/components/services/RelatedServices'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { getServiceBySlug } from '@/lib/services'
import type { ServicePage as ServiceContent } from '@/lib/services'
import { ui } from '@/lib/ui'

import { NotFoundPage } from './NotFoundPage'

type ServicePageProps = {
  slug: string
}

export function ServicePage({ slug }: ServicePageProps) {
  const { locale } = useLocale()
  const service = getServiceBySlug(locale, slug)

  if (!service) return <NotFoundPage />

  return <ServiceView service={service} />
}

function ServiceView({ service }: { service: ServiceContent }) {
  const { locale, l } = useLocale()
  const t = ui[locale]

  useSeo(getPageSeo(`/${service.slug}`, locale))

  const relatedServices = service.related
    .map((slug) => getServiceBySlug(locale, slug))
    .filter((item): item is ServiceContent => Boolean(item))

  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        accent={service.hero.accent}
        lead={service.hero.lead}
        breadcrumbs={[
          { label: t.home, href: l('/') },
          { label: t.services, href: l('/uslugi') },
          { label: service.title },
        ]}
        actions={
          <>
            <Button href={l('/kontakt')} variant="primary" size="lg" withArrow>
              {t.servicePage.startProject}
            </Button>
            <Button href={l('/portfolio')} variant="secondary" size="lg">
              {t.servicePage.viewPortfolio}
            </Button>
          </>
        }
      />

      <ProseSection
        id={`${service.slug}-problem`}
        eyebrow={t.servicePage.problem}
        title={service.problem.heading}
        paragraphs={service.problem.paragraphs}
      />

      <FeatureSection
        id={`${service.slug}-deliverables`}
        tone="deep"
        eyebrow={t.servicePage.includes}
        title={t.servicePage.includesTitle}
        intro={service.deliverablesIntro}
        items={service.deliverables}
      />

      <StepsSection
        id={`${service.slug}-process`}
        eyebrow={t.servicePage.process}
        title={t.servicePage.processTitle}
        intro={service.processIntro}
        steps={service.process}
      />

      <FaqSection id={`${service.slug}-faq`} items={service.faq} />

      <RelatedServices
        services={relatedServices}
        id={`${service.slug}-related`}
      />

      <CtaBanner id={`${service.slug}-cta`} />
    </>
  )
}
