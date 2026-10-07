import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Route scroll manager.
 *
 * - On a normal route change it resets scroll to the top. On the initial mount
 *   the page is left untouched so keyboard Tab order starts at the skip
 *   link/header; on subsequent route changes focus moves to the main landmark.
 * - When the URL carries a hash (e.g. `/uslugi#seo`) it scrolls to the matching
 *   section instead, smoothly, after the target has rendered. This also covers
 *   legacy service routes that redirect to a section anchor.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''))
      let innerFrame = 0

      const scrollToTarget = (): boolean => {
        const target = document.getElementById(id)
        if (!target) return false
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        })
        return true
      }

      const frame = requestAnimationFrame(() => {
        // The target may not be in the DOM on the very first frame; retry once.
        if (!scrollToTarget())
          innerFrame = requestAnimationFrame(scrollToTarget)
      })

      return () => {
        cancelAnimationFrame(frame)
        if (innerFrame) cancelAnimationFrame(innerFrame)
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
