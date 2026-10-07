import { CtaBanner } from '@/components/ui/CtaBanner'
import { PageHero } from '@/components/ui/PageHero'
import { ProseSection } from '@/components/ui/ProseSection'
import { about } from '@/lib/about'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'

export function AboutPage() {
  const { locale, l } = useLocale()
  const t = about[locale]
  const uiT = ui[locale]

  useSeo(getPageSeo('/za-nas', locale))

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
        image="/images/za-nas.jpg"
      />

      {t.sections.map((section) => (
        <ProseSection
          key={section.id}
          id={section.id}
          tone={section.tone}
          eyebrow={section.eyebrow}
          title={section.title}
          paragraphs={section.paragraphs}
          bullets={section.bullets}
        />
      ))}

      <CtaBanner
        id="about-cta"
        title={t.cta.title}
        lead={t.cta.lead}
        secondaryLabel={
          locale === 'en' ? 'Explore our services' : 'Разгледайте услугите'
        }
        secondaryHref="/uslugi"
      />
    </>
  )
}
