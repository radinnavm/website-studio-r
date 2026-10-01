import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { getPrivacy } from '@/lib/privacy'
import { useLocale } from '@/lib/LocaleProvider'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'

import styles from './PrivacyPage.module.css'

export function PrivacyPage() {
  const { locale, l } = useLocale()
  const t = getPrivacy(locale)
  const uiT = ui[locale]

  useSeo(getPageSeo('/politika-za-poveritelnost', locale))

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        index="01"
        title={t.hero.title}
        accent={t.hero.accent}
        lead={t.hero.lead}
        breadcrumbs={[
          { label: uiT.home, href: l('/') },
          { label: t.hero.eyebrow },
        ]}
      />

      <Section>
        <Container>
          <div className={styles.inner}>
            <p className={styles.notice} role="note">
              {t.notice}
            </p>

            {t.intro.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <div className={styles.sections}>
              {t.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2
                    id={`${section.id}-heading`}
                    className={styles.sectionTitle}
                  >
                    {section.title}
                  </h2>

                  {section.body.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {section.placeholders && section.placeholders.length > 0 && (
                    <div className={styles.todo}>
                      <p className={styles.todoLabel}>
                        {uiT.privacy.todoLabel}
                      </p>
                      <ul className={styles.todoList}>
                        {section.placeholders.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
