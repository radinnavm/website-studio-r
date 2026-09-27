import { toBgPath } from './routeMap'
import { getServices } from './services'

const serviceSlugs = getServices('bg').map((service) => service.slug)

/**
 * Whether a primary nav item should be marked active for the current path.
 * Works for both locales; "Услуги/Services" stays active on every service page
 * and "Портфолио/Portfolio" on every case-study page.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  const path = toBgPath(pathname)

  if (href === '/uslugi') {
    return (
      path === '/uslugi' || serviceSlugs.some((slug) => path === `/${slug}`)
    )
  }
  if (href === '/portfolio') {
    return path === '/portfolio' || path.startsWith('/portfolio/')
  }
  return path === href
}
