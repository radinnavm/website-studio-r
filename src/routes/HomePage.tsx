import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Process } from '@/components/home/Process'
import { WhyUs } from '@/components/home/WhyUs'
import { CtaSection } from '@/components/home/CtaSection'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'

export function HomePage() {
  const { locale } = useLocale()

  useSeo(getPageSeo('/', locale))

  return (
    <>
      <Hero />
      <Services />
      <SelectedWork />
      <Process />
      <WhyUs />
      <CtaSection />
    </>
  )
}
