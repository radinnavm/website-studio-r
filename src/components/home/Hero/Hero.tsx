import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { contactHref } from '@/config/site'
import { getHomeContent } from '@/lib/content'
import { useLocale } from '@/lib/LocaleProvider'

import styles from './Hero.module.css'

export function Hero() {
  const { locale, l } = useLocale()
  const { hero } = getHomeContent(locale)

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <img
        className={styles.image}
        src="/images/full-hero.jpg"
        alt={hero.imageAlt}
        width={1600}
        height={900}
        fetchPriority="high"
        decoding="async"
      />

      <Container className={styles.content}>
        <div className={styles.copy}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 id="hero-heading" className={styles.title}>
            {hero.title}
            {hero.accent && (
              <>
                {' '}
                <em>{hero.accent}</em>
              </>
            )}
            {!hero.accent?.endsWith('.') && '.'}
          </h1>

          <div className={styles.support}>
            <p className={styles.lead}>{hero.lead}</p>

            <div className={styles.actions}>
              <Button
                href={l(contactHref)}
                variant="primary"
                size="lg"
                withArrow
              >
                {hero.primary}
              </Button>
              <Button href={l('/portfolio')} variant="secondary" size="lg">
                {hero.secondary}
              </Button>
            </div>
          </div>
        </div>

        <ul className={styles.meta}>
          {hero.meta.map((item) => (
            <li key={item} className={styles.metaItem}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
