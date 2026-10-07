import { toBgPath } from './routeMap'

/**
 * Whether a primary nav item should be marked active for the current path.
 * Works for both locales; "Услуги/Services" stays active on the services index
 * (including its in-page anchors) and "Портфолио/Portfolio" on every
 * case-study page.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  const path = toBgPath(pathname)

  if (href === '/uslugi') {
    return path.split('#')[0] === '/uslugi'
  }
  if (href === '/portfolio') {
    return path === '/portfolio' || path.startsWith('/portfolio/')
  }
  return path === href
}
