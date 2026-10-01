import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getFeaturedProject, getProjects } from '@/lib/portfolio'
import { useSeo } from '@/lib/seo'
import { getPageSeo } from '@/lib/seoHead'
import { ui } from '@/lib/ui'
import { revealClass, useReveal } from '@/lib/useReveal'

import styles from './PortfolioPage.module.css'

const copy: Localized<{
  hero: { eyebrow: string; title: string; accent: string; lead: string }
  featured: string
  more: string
  collection: string
}> = {
  bg: {
    hero: {
      eyebrow: 'Портфолио',
      title: 'Проекти, които решават',
      accent: 'конкретен проблем.',
      lead: 'Всеки проект започва с ясна цел и завършва с решение, което работи за бизнеса. Ето част от работата ни.',
    },
    featured: 'Избран проект',
    more: 'Още проекти',
    collection: 'Колекция',
  },
  en: {
    hero: {
      eyebrow: 'Portfolio',
      title: 'Projects that solve',
      accent: 'a real problem.',
      lead: 'Every project starts with a clear goal and ends with a solution that works for the business. Here is some of our work.',
    },
    featured: 'Featured project',
    more: 'More projects',
    collection: 'Collection',
  },
}

export function PortfolioPage() {
  const { locale, l } = useLocale()
  const t = copy[locale]
  const uiT = ui[locale]
  const featuredProject = getFeaturedProject(locale)
  const collection = getProjects(locale).filter((project) => !project.featured)
  const { ref: featuredRef, visible: featuredVisible } =
    useReveal<HTMLElement>()
  const { ref: collectionRef, visible: collectionVisible } =
    useReveal<HTMLUListElement>()

  useSeo(getPageSeo('/portfolio', locale))

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

      {featuredProject && (
        <Section id="featured" tone="deep" aria-labelledby="featured-heading">
          <Container>
            <SectionHeader
              id="featured-heading"
              index="02"
              eyebrow={t.featured}
              title={featuredProject.name}
            />

            <article
              ref={featuredRef}
              className={revealClass(styles.featured, featuredVisible)}
            >
              <Link
                className={styles.media}
                to={l(`/portfolio/${featuredProject.slug}`)}
                aria-label={featuredProject.name}
              >
                {featuredProject.image ? (
                  <img
                    className={styles.image}
                    src={featuredProject.image}
                    alt={featuredProject.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={900}
                  />
                ) : (
                  <span className={styles.placeholder}>
                    {uiT.portfolio.preview}
                  </span>
                )}
              </Link>

              <div className={styles.info}>
                <p className={styles.meta}>
                  <span>{featuredProject.label}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredProject.year}</span>
                </p>

                <p className={styles.summary}>{featuredProject.summary}</p>
                <p className={styles.description}>
                  {featuredProject.description}
                </p>

                <ul className={styles.tags}>
                  {featuredProject.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <Button
                  href={l(`/portfolio/${featuredProject.slug}`)}
                  variant="ghost"
                  withArrow
                >
                  {uiT.work.viewProject}
                </Button>
              </div>
            </article>
          </Container>
        </Section>
      )}

      {collection.length > 0 && (
        <Section aria-labelledby="collection-heading">
          <Container>
            <SectionHeader
              id="collection-heading"
              index="03"
              eyebrow={t.more}
              title={t.collection}
            />

            <ul
              ref={collectionRef}
              className={revealClass(styles.grid, collectionVisible)}
            >
              {collection.map((project) => (
                <li key={project.id} className={styles.card}>
                  <Link
                    className={styles.cardLink}
                    to={l(`/portfolio/${project.slug}`)}
                  >
                    <span className={styles.cardMedia}>
                      {project.image ? (
                        <img
                          className={styles.image}
                          src={project.image}
                          alt={project.imageAlt}
                          loading="lazy"
                          width={1280}
                          height={900}
                        />
                      ) : (
                        <span className={styles.placeholder}>
                          {uiT.portfolio.preview}
                        </span>
                      )}
                    </span>
                    <span className={styles.cardBody}>
                      <span className={styles.meta}>
                        <span>{project.label}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </span>
                      <span className={styles.cardTitle}>{project.name}</span>
                      <span className={styles.cardText}>{project.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBanner index="04" />
    </>
  )
}
