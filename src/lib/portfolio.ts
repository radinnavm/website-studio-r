/**
 * Typed portfolio data (BG + EN).
 * Add future projects by extending `bgProjects`; the EN array reuses ids/slugs
 * and overrides only localized fields.
 */

import type { Localized, Locale } from './i18n.ts'

export type TechnicalDecision = {
  title: string
  body: string
}

export type CaseStudy = {
  overview: string[]
  challenge: string[]
  approach: string[]
  role: string[]
  responsive: string[]
  technicalDecisions: TechnicalDecision[]
  features: string[]
  note: string
}

export const projectSlugs = ['maison-elise'] as const

export type ProjectSlug = (typeof projectSlugs)[number]

export type Project = {
  id: string
  slug: ProjectSlug
  name: string
  category: string
  year: string
  label: string
  summary: string
  description: string
  technologies: string[]
  tags: string[]
  image: string | null
  imageAlt: string
  featured: boolean
  caseStudy?: CaseStudy
}

const bgProjects: Project[] = [
  {
    id: 'maison-elise',
    slug: 'maison-elise',
    name: 'Maison Élise',
    category: 'E-commerce · Fashion',
    year: '2025',
    label: 'Портфолио проект',
    summary: 'Онлайн магазин с изчистена визия и фокус върху продукта.',
    description:
      'Премиум онлайн магазин за моден бранд — изчистен интерфейс, внимателна типография и плавен път до покупка. Проектът съчетава силна визуална идентичност с бързо и надеждно изживяване.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'Prisma',
      'Redux Toolkit',
      'RTK Query',
      'Stripe',
      'Cloudinary',
      'Testing',
    ],
    tags: ['Онлайн магазин', 'Web design', 'Разработка'],
    image: '/work/maison-elise.svg',
    imageAlt:
      'Начална страница на онлайн магазин Maison Élise с изчистен продуктов layout',
    featured: true,
    caseStudy: {
      overview: [
        'Maison Élise е онлайн магазин за моден бранд, разработен като цялостно уеб приложение — от продуктов каталог и количка до административен панел и онлайн плащания.',
        'Проектът е изграден около изчистена визия, ясна навигация и стабилна техническа основа, върху която магазинът да може да се развива.',
      ],
      challenge: [
        'Целта беше да се създаде магазин, който изглежда като част от самия бранд, а не като стандартна платформа за електронна търговия.',
        'Трябваше да съчетаем премиум визуален език с практичността на реален процес на продажба: намиране на продукт, избор, поръчка и плащане.',
        'Допълнително предизвикателство беше поддръжката на растеж — каталог, поръчки и съдържание, които да могат да се развиват без преправяне на основата.',
      ],
      approach: [
        'Проектът е разделен на отделен frontend и backend, с ясни слоеве за данни, бизнес логика и презентация.',
        'Frontend-ът е изграден с React и TypeScript, а състоянието и заявките към сървъра се управляват с Redux Toolkit и RTK Query.',
        'Backend-ът е реализиран с Node.js и Express, с Prisma за достъп до базата данни и PostgreSQL (Supabase) като основно хранилище.',
        'Плащанията минават през Stripe, а административен панел позволява управление на продукти и поръчки.',
      ],
      role: [
        'Website Studio R пое проекта изцяло — от структурата и визуалния език до frontend и backend разработката.',
        'Дефинирахме архитектурата, изградихме интерфейса и реализирахме функционалностите за каталог, поръчки и плащания.',
        'Проектът е разработен като портфолио проект, а не като поръчка от реален клиент.',
      ],
      responsive: [
        'Интерфейсът е проектиран така, че да работи еднакво добре на телефон, таблет и настолен екран.',
        'Продуктовите страници и процесът на поръчка са оптимизирани за мобилни екрани, където се случва голяма част от покупките.',
        'Размерите на изображенията и адаптивната типография намаляват разместванията при зареждане.',
      ],
      technicalDecisions: [
        {
          title: 'RTK Query за работа със сървъра',
          body: 'Заявките и кеширането са централизирани, което намалява дублирането и улеснява синхронизацията между отделните екрани.',
        },
        {
          title: 'Prisma като слой за данни',
          body: 'Схемата на базата е описана ясно и типобезопасно, което прави промените предвидими и намалява риска от грешки.',
        },
        {
          title: 'Разделяне на отговорностите',
          body: 'Frontend и backend са отделни приложения с ясен интерфейс помежду си, което улеснява развитието и поддръжката.',
        },
        {
          title: 'Плащания чрез Stripe',
          body: 'Плащанията са изнесени към специализиран доставчик, вместо чувствителни данни да се съхраняват в самото приложение.',
        },
        {
          title: 'Тестване на ключови пътища',
          body: 'Критичните сценарии — каталог, количка и поръчка — са покрити с тестове, за да се предотвратят регресии при промени.',
        },
      ],
      features: [
        'Продуктов каталог',
        'Филтриране и търсене',
        'Регистрация и вход',
        'Количка',
        'Завършване на поръчка',
        'Управление на поръчки',
        'Административен панел',
        'Онлайн плащания',
        'Адаптивен дизайн',
        'Тестване',
      ],
      note: 'Cloudinary е предвиден като част от архитектурата за управление на изображения; интеграцията може да бъде завършена при публикуване. Проектът е разработен като цялостно приложение, но все още не е публикуван в реална среда, затова е представен като технически портфолио проект, а не като работещ публичен магазин.',
    },
  },
]

type ProjectOverride = Omit<
  Project,
  'id' | 'slug' | 'name' | 'technologies' | 'image' | 'featured'
>

const enOverrides: Record<ProjectSlug, ProjectOverride> = {
  'maison-elise': {
    category: 'E-commerce · Fashion',
    year: '2025',
    label: 'Portfolio project',
    summary:
      'An online store with a refined visual and a focus on the product.',
    description:
      'A premium online store for a fashion brand — a clean interface, careful typography and a smooth path to purchase. The project combines a strong visual identity with a fast, reliable experience.',
    tags: ['Online store', 'Web design', 'Development'],
    imageAlt:
      'Homepage of the Maison Élise online store with a clean product layout',
    caseStudy: {
      overview: [
        'Maison Élise is an online store for a fashion brand, built as a complete web application — from product catalogue and cart to an admin panel and online payments.',
        'The project is built around a clean visual, clear navigation and a stable technical foundation the store can grow on.',
      ],
      challenge: [
        'The goal was to create a store that feels like part of the brand itself, not a standard e-commerce platform.',
        'We had to combine a premium visual language with the practicality of a real sales process: finding a product, choosing, ordering and paying.',
        'A further challenge was supporting growth — catalogue, orders and content that could evolve without rebuilding the foundation.',
      ],
      approach: [
        'The project is split into a separate frontend and backend, with clear layers for data, business logic and presentation.',
        'The frontend is built with React and TypeScript, with state and server requests managed by Redux Toolkit and RTK Query.',
        'The backend is built with Node.js and Express, using Prisma for database access and PostgreSQL (Supabase) as the main store.',
        'Payments go through Stripe, and an admin panel allows managing products and orders.',
      ],
      role: [
        'Website Studio R took on the project end to end — from structure and visual language to frontend and backend development.',
        'We defined the architecture, built the interface and implemented the catalogue, order and payment features.',
        'The project was developed as a portfolio project, not as a commission from a real client.',
      ],
      responsive: [
        'The interface is designed to work equally well on phone, tablet and desktop.',
        'Product pages and the checkout are optimised for mobile screens, where much of the shopping happens.',
        'Image dimensions and responsive typography reduce layout shift on load.',
      ],
      technicalDecisions: [
        {
          title: 'RTK Query for server communication',
          body: 'Requests and caching are centralised, reducing duplication and easing synchronisation between screens.',
        },
        {
          title: 'Prisma as the data layer',
          body: 'The database schema is described clearly and type-safely, making changes predictable and reducing the risk of errors.',
        },
        {
          title: 'Separation of responsibilities',
          body: 'Frontend and backend are separate applications with a clear interface between them, easing development and maintenance.',
        },
        {
          title: 'Payments via Stripe',
          body: 'Payments are handled by a specialised provider rather than storing sensitive data in the application.',
        },
        {
          title: 'Testing key paths',
          body: 'Critical scenarios — catalogue, cart and order — are covered by tests to prevent regressions on changes.',
        },
      ],
      features: [
        'Product catalogue',
        'Filtering & search',
        'Registration & login',
        'Cart',
        'Checkout',
        'Order management',
        'Admin dashboard',
        'Online payments',
        'Responsive design',
        'Testing',
      ],
      note: 'Cloudinary is planned as part of the architecture for image management; the integration can be completed at publish time. The project was built as a complete application but has not been deployed to a live environment, so it is presented as a technical portfolio project rather than a working public store.',
    },
  },
}

function assertOverridesComplete(): void {
  for (const project of bgProjects) {
    if (!(project.slug in enOverrides)) {
      throw new Error(`Project "${project.slug}" is missing an EN override.`)
    }
  }
}

assertOverridesComplete()

export const projects: Localized<Project[]> = {
  bg: bgProjects,
  en: bgProjects.map((project) => ({
    ...project,
    ...enOverrides[project.slug],
  })),
}

export function getProjects(locale: Locale): Project[] {
  return projects[locale]
}

export function getProjectBySlug(
  locale: Locale,
  slug: string,
): Project | undefined {
  return projects[locale].find((project) => project.slug === slug)
}

export function getFeaturedProject(locale: Locale): Project | undefined {
  return projects[locale].find((project) => project.featured)
}
