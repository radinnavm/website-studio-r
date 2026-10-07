import { Navigate, Route, Routes } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink } from '@/components/layout/SkipLink'
import { LocaleProvider } from '@/lib/LocaleProvider'
import { getServices } from '@/lib/services'
import { AboutPage } from '@/routes/AboutPage'
import { CaseStudyPage } from '@/routes/CaseStudyPage'
import { ContactPage } from '@/routes/ContactPage'
import { HomePage } from '@/routes/HomePage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { PortfolioPage } from '@/routes/PortfolioPage'
import { PrivacyPage } from '@/routes/PrivacyPage'
import { ServicesIndexPage } from '@/routes/ServicesIndexPage'

const bgServices = getServices('bg')

/**
 * Unique EN service paths (current + legacy slugs) → the anchor of the matching
 * section on `/en/services`. The BG service slugs are handled symmetrically.
 */
const enServiceRedirects = new Map<string, string>()
for (const service of bgServices) {
  enServiceRedirects.set(service.enSlug, service.enSlug)
  enServiceRedirects.set(service.slug, service.enSlug)
}

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
          {bgServices.map((service) => (
            <Route
              key={service.slug}
              path={`/${service.slug}`}
              element={<Navigate to={`/uslugi#${service.anchor}`} replace />}
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
          {[...enServiceRedirects].map(([slug, enAnchor]) => (
            <Route
              key={`en-service-${slug}`}
              path={`/en/services/${slug}`}
              element={<Navigate to={`/en/services#${enAnchor}`} replace />}
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
