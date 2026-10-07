export type ServiceVisualVariant =
  'website' | 'ecommerce' | 'web-design' | 'seo' | 'support'

const serviceVisuals: Record<string, ServiceVisualVariant> = {
  website: 'website',
  ecommerce: 'ecommerce',
  'web-design': 'web-design',
  seo: 'seo',
  support: 'support',
}

/** Maps a service id to its mockup variant, or `null` when none is defined. */
export function getServiceVisual(
  serviceId: string,
): ServiceVisualVariant | null {
  return serviceVisuals[serviceId] ?? null
}

/**
 * Real photographic visuals, keyed by service id. When present they take
 * precedence over the decorative mockup for that service.
 */
const servicePhotos: Record<string, string> = {
  website: '/images/uslugi-2.jpg',
  ecommerce: '/images/uslugi-1.jpg',
}

/** Maps a service id to its photo source, or `null` when none is defined. */
export function getServicePhoto(serviceId: string): string | null {
  return servicePhotos[serviceId] ?? null
}
