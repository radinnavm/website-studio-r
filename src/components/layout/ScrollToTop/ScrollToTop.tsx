import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll to the top on route changes. On the initial mount the page is
 * left untouched so keyboard Tab order starts at the skip link/header; on
 * subsequent route changes (including language switches) focus moves to the
 * main landmark so screen-reader and keyboard users know a new page loaded.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
