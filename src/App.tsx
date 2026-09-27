import { Navigate, Route, Routes } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink } from '@/components/layout/SkipLink'
import { LocaleProvider } from '@/lib/LocaleProvider'
import { enSlugRedirects } from '@/lib/routeMap'
import { getServices } from '@/lib/services'
import { AboutPage } from '@/routes/AboutPage'
import { CaseStudyPage } from '@/routes/CaseStudyPage'
import { ContactPage } from '@/routes/ContactPage'
import { HomePage } from '@/routes/HomePage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { PortfolioPage } from '@/routes/PortfolioPage'
import { PrivacyPage } from '@/routes/PrivacyPage'
import { ServicePage } from '@/routes/ServicePage'
import { ServicesIndexPage } from '@/routes/ServicesIndexPage'

const bgServices = getServices('bg')
const bgSlugs = bgServices.map((service) => service.slug)

export default function App() {
  return (
    <LocaleProvider>
      <ScrollToTop />
      <SkipLink />

      <Header />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/uslugi" element={<ServicesIndexPage />} />
          {bgSlugs.map((slug) => (
            <Route
              key={slug}
              path={`/${slug}`}
              element={<ServicePage slug={slug} />}
            />
          ))}
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="/za-nas" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/politika-za-poveritelnost" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/en" element={<HomePage />} />
          <Route path="/en/services" element={<ServicesIndexPage />} />
          {bgServices.map((service) => (
            <Route
              key={`en-${service.enSlug}`}
              path={`/en/services/${service.enSlug}`}
              element={<ServicePage slug={service.slug} />}
            />
          ))}
          {Object.entries(enSlugRedirects).map(([oldSlug, newSlug]) => (
            <Route
              key={`redir-${oldSlug}`}
              path={`/en/services/${oldSlug}`}
              element={<Navigate to={`/en/services/${newSlug}`} replace />}
            />
          ))}
          <Route path="/en/portfolio" element={<PortfolioPage />} />
          <Route path="/en/portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="/en/about" element={<AboutPage />} />
          <Route path="/en/contact" element={<ContactPage />} />
          <Route path="/en/privacy" element={<PrivacyPage />} />
          <Route path="/en/*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </LocaleProvider>
  )
}
