import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { Localized } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleProvider'
import { getProjects } from '@/lib/portfolio'
import { ui } from '@/lib/ui'

import styles from './SelectedWork.module.css'

const title: Localized<string> = {
  bg: 'Работа, която говори вместо нас.',
  en: 'Work that speaks for itself.',
}

export function SelectedWork() {
  const { locale, l } = useLocale()
  const t = ui[locale].work
  const projects = getProjects(locale)

  return (
    <Section id="work" tone="deep" aria-labelledby="work-heading">
      <Container>
        <header className={styles.header}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="work-heading" className={styles.title}>
            {title[locale]}
          </h2>
        </header>

        <div className={styles.cases}>
          {projects.map((project) => {
            const href = l(`/portfolio/${project.slug}`)

            return (
              <article key={project.id} className={styles.case}>
                <Link
                  className={styles.media}
                  to={href}
                  aria-label={`${project.name}`}
                >
                  {project.image && (
                    <img
                      className={styles.image}
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      width={1280}
                      height={900}
                    />
                  )}
                </Link>

                <div className={styles.info}>
                  <p className={styles.meta}>
                    <span>{project.label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </p>

                  <h3 className={styles.name}>{project.name}</h3>
                  <p className={styles.summary}>{project.summary}</p>
                  <p className={styles.description}>{project.description}</p>

                  <ul className={styles.tags}>
                    {project.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={href}
                    variant="ghost"
                    withArrow
                    className={styles.cta}
                  >
                    {t.viewProject}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
