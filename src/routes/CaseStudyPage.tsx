import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { FeatureSection } from '@/components/ui/FeatureSection'
import { PageHero } from '@/components/ui/PageHero'
import { ProseSection } from '@/components/ui/ProseSection'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getProjectBySlug } from '@/lib/portfolio'
import type { CaseStudy, Project } from '@/lib/portfolio'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'

import { NotFoundPage } from './NotFoundPage'
import styles from './CaseStudyPage.module.css'

const copy: Localized<{
  overview: { eyebrow: string; title: string }
  challenge: { eyebrow: string; title: string }
  approach: { eyebrow: string; title: string }
  role: { eyebrow: string; title: string }
  responsive: { eyebrow: string; title: string }
  technology: { eyebrow: string; title: string }
  features: { eyebrow: string; title: string }
  decisions: { eyebrow: string; title: string }
  discuss: string
}> = {
  bg: {
    overview: { eyebrow: 'Преглед', title: 'Какво представлява проектът' },
    challenge: { eyebrow: 'Предизвикателство', title: 'Целта на проекта' },
    approach: { eyebrow: 'Подход', title: 'Как е структуриран' },
    role: { eyebrow: 'Роля', title: 'Ролята на Website Studio R' },
    responsive: { eyebrow: 'Адаптивност', title: 'Адаптивна реализация' },
    technology: { eyebrow: 'Технологии', title: 'Стек на проекта' },
    features: { eyebrow: 'Функционалности', title: 'Какво включва проектът' },
    decisions: {
      eyebrow: 'Технически решения',
      title: 'Интересни решения в проекта',
    },
    discuss: 'Обсъдете подобен проект',
  },
  en: {
    overview: { eyebrow: 'Overview', title: 'What the project is' },
    challenge: { eyebrow: 'Challenge', title: 'The goal of the project' },
    approach: { eyebrow: 'Approach', title: 'How it was structured' },
    role: { eyebrow: 'Role', title: 'The role of Website Studio R' },
    responsive: { eyebrow: 'Responsive', title: 'Responsive implementation' },
    technology: { eyebrow: 'Technology', title: 'Project stack' },
    features: { eyebrow: 'Features', title: 'What the project includes' },
    decisions: {
      eyebrow: 'Technical decisions',
      title: 'Interesting decisions in the project',
    },
    discuss: 'Discuss a similar project',
  },
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const { locale } = useLocale()
  const project = slug ? getProjectBySlug(locale, slug) : undefined

  if (!project || !project.caseStudy) return <NotFoundPage />

  return <CaseStudyView project={project} study={project.caseStudy} />
}

function CaseStudyView({
  project,
  study,
}: {
  project: Project
  study: CaseStudy
}) {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const uiT = ui[locale]

  useSeo(getPageSeo(`/portfolio/${project.slug}`, locale))

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        lead={project.summary}
        breadcrumbs={[
          { label: uiT.home, href: l('/') },
          { label: uiT.portfolioLabel, href: l('/portfolio') },
          { label: project.name },
        ]}
        meta={[project.label, project.category, project.year]}
        actions={
          <Button href={l('/kontakt')} variant="primary" size="lg" withArrow>
            {t.discuss}
          </Button>
        }
      />

      <Section id="visual" size="tight" aria-labelledby="visual-heading">
        <Container>
          <h2 id="visual-heading" className="visually-hidden">
            {t.overview.title}
          </h2>
          <figure className={styles.figure}>
            {project.image ? (
              <img
                className={styles.image}
                src={project.image}
                alt={project.imageAlt}
                width={1280}
                height={900}
              />
            ) : (
              <div className={styles.placeholder}>{uiT.portfolio.preview}</div>
            )}
            <figcaption className={styles.caption}>
              {project.imageAlt}
            </figcaption>
          </figure>
        </Container>
      </Section>

      <ProseSection
        id="overview"
        eyebrow={t.overview.eyebrow}
        title={t.overview.title}
        paragraphs={study.overview}
      />

      <ProseSection
        id="challenge"
        tone="deep"
        eyebrow={t.challenge.eyebrow}
        title={t.challenge.title}
        paragraphs={study.challenge}
      />

      <ProseSection
        id="approach"
        eyebrow={t.approach.eyebrow}
        title={t.approach.title}
        paragraphs={study.approach}
      />

      <ProseSection
        id="role"
        tone="deep"
        eyebrow={t.role.eyebrow}
        title={t.role.title}
        paragraphs={study.role}
      />

      <ProseSection
        id="responsive"
        eyebrow={t.responsive.eyebrow}
        title={t.responsive.title}
        paragraphs={study.responsive}
      />

      <Section id="technology" tone="deep" aria-labelledby="technology-heading">
        <Container>
          <SectionHeader
            id="technology-heading"
            eyebrow={t.technology.eyebrow}
            title={t.technology.title}
          />

          <ul className={styles.techList}>
            {project.technologies.map((technology) => (
              <li key={technology} className={styles.tech}>
                {technology}
              </li>
            ))}
          </ul>

          <p className={styles.note}>{study.note}</p>
        </Container>
      </Section>

      <ProseSection
        id="features"
        eyebrow={t.features.eyebrow}
        title={t.features.title}
        bullets={study.features}
      />

      <FeatureSection
        id="decisions"
        tone="deep"
        eyebrow={t.decisions.eyebrow}
        title={t.decisions.title}
        items={study.technicalDecisions.map((decision) => ({
          title: decision.title,
          description: decision.body,
        }))}
      />

      <CtaBanner id="case-cta" title={uiT.ctaBanner.title} />
    </>
  )
}
