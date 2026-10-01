import { useEffect, useRef, useState } from 'react'

type UseRevealOptions = {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number
  /** Root margin used to trigger slightly before the element enters view. */
  rootMargin?: string
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function canReveal(): boolean {
  return typeof IntersectionObserver !== 'undefined' && !prefersReducedMotion()
}

/**
 * Subtle reveal-on-scroll. Returns a ref to attach to an element and a flag
 * that should toggle an `is-visible` class. Respects `prefers-reduced-motion`
 * and degrades gracefully when `IntersectionObserver` is unavailable.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0,
  rootMargin = '0px 0px -10% 0px',
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  // Start revealed when motion is reduced or observation is unsupported.
  const [visible, setVisible] = useState(() => !canReveal())

  useEffect(() => {
    if (visible) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            return
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible, threshold, rootMargin])

  return { ref, visible }
}

/** Joins a CSS-module class with the shared reveal utilities. */
export function revealClass(
  base: string | undefined,
  visible: boolean,
): string {
  return [base, 'reveal', visible ? 'is-visible' : null]
    .filter(Boolean)
    .join(' ')
}
