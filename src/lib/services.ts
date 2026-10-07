/**
 * Typed service-page content (BG + EN).
 * Bulgarian is the primary locale. The EN array reuses slugs/ids/related and
 * overrides only the localized fields.
 */

import type { Localized, Locale } from './i18n.ts'
import type { ProcessStep } from './content.ts'

export type FaqItem = {
  question: string
  answer: string
}

export type ServiceDeliverable = {
  title: string
  description: string
}

export type ServiceProblem = {
  heading: string
  paragraphs: string[]
}

export type ServiceHero = {
  eyebrow: string
  title: string
  accent?: string
  lead: string
}

export const serviceSlugs = [
  'izrabotka-na-sait',
  'izrabotka-na-online-magazin',
  'web-design',
  'seo',
  'poddrazhka',
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]

export type ServicePage = {
  slug: ServiceSlug
  enSlug: string
  /**
   * Anchor id used when the service is presented as a section on `/uslugi`.
   * The EN anchor is always `enSlug`.
   */
  anchor: string
  id: string
  index: string
  title: string
  summary: string
  points: string[]
  related: ServiceSlug[]
  hero: ServiceHero
  meta: {
    title: string
    description: string
  }
  problem: ServiceProblem
  deliverablesIntro: string
  deliverables: ServiceDeliverable[]
  processIntro: string
  process: ProcessStep[]
  faq: FaqItem[]
}

const bgServices: ServicePage[] = [
  {
    slug: 'izrabotka-na-sait',
    enSlug: 'website-development',
    anchor: 'izrabotka-na-sait',
    id: 'website',
    related: ['izrabotka-na-online-magazin', 'web-design', 'seo', 'poddrazhka'],
    index: '01',
    title: 'Изработка на сайт',
    summary:
      'Представителни сайтове, които представят бизнеса ви ясно, уверено и професионално.',
    points: [
      'Стратегия и структура',
      'Индивидуален дизайн',
      'Адаптивна изработка',
    ],
    hero: {
      eyebrow: 'Изработка на сайт',
      title: 'Изработка на сайт',
      accent: 'за бизнес с характер.',
      lead: 'Създаваме модерни и професионални сайтове, изградени според целите и идентичността на вашия бизнес. Фокусът е върху ясната структура, доброто потребителско изживяване и безупречното представяне на всяко устройство.',
    },
    meta: {
      title: 'Изработка на сайт | Website Studio R',
      description:
        'Изработка на фирмен сайт за бизнеса ви — уеб дизайн, уеб разработка, адаптивен дизайн, SEO основа и оптимизация на скоростта.',
    },
    problem: {
      heading: 'Когато сайтът не работи в полза на бизнеса',
      paragraphs: [
        'Много сайтове са създадени, за да „просто съществуват“. Те не обясняват какво прави бизнесът, не вдъхват доверие и не водят посетителя към следваща стъпка.',
        'Резултатът е скъп трафик, който не се превръща в запитвания, и усещане, че сайтът не отговаря на нивото на самата услуга.',
        'Изграждаме сайта около реалните въпроси на клиента: какво предлагате, защо да ви се доверят и как да направят следващата стъпка.',
      ],
    },
    deliverablesIntro:
      'Всяка изработка включва пълния набор от дейности, нужни сайтът да бъде завършен и готов за работа.',
    deliverables: [
      {
        title: 'Индивидуален дизайн',
        description:
          'Уникален визуален език, съобразен с бранда, а не готов шаблон.',
      },
      {
        title: 'Адаптивна разработка',
        description: 'Коректно изживяване на телефон, таблет и настолен екран.',
      },
      {
        title: 'CMS интеграция',
        description:
          'Възможност да управлявате съдържанието сами, без техническа подготовка.',
      },
      {
        title: 'Контактни форми',
        description: 'Ясни пътища за връзка със защита от нежелани изпращания.',
      },
      {
        title: 'SEO основа',
        description:
          'Семантична структура, мета данни и технически основи за индексиране.',
      },
      {
        title: 'Аналитика',
        description:
          'Проследяване на посещения и поведение, за да знаете какво работи.',
      },
      {
        title: 'Оптимизация на скоростта',
        description: 'Бързо зареждане и стабилни Core Web Vitals.',
      },
    ],
    processIntro:
      'Работим в ясен процес, в който винаги знаете на какъв етап е проектът.',
    process: [
      {
        step: '01',
        title: 'Проучване',
        description:
          'Разбираме бизнеса, целите и аудиторията, преди да предложим структура.',
      },
      {
        step: '02',
        title: 'Структура и съдържание',
        description:
          'Подреждаме страниците и посланията така, че да водят до действие.',
      },
      {
        step: '03',
        title: 'Дизайн',
        description:
          'Създаваме визуална система и макети за всички ключови екрани.',
      },
      {
        step: '04',
        title: 'Разработка',
        description:
          'Изграждаме сайта, тестваме и оптимизираме преди стартиране.',
      },
      {
        step: '05',
        title: 'Стартиране',
        description:
          'Публикуваме, свързваме аналитиката и оставаме на разположение.',
      },
    ],
    faq: [
      {
        question: 'Колко струва изработката на сайт?',
        answer:
          'Зависи от обхвата — броя на страниците, функционалностите и сложността на дизайна. След кратък разговор получавате ясна оферта.',
      },
      {
        question: 'Колко време отнема изработката на сайт?',
        answer:
          'Зависи от обхвата. Представителен сайт обикновено отнема между три и шест седмици от старта до публикуване.',
      },
      {
        question: 'Мога ли да управлявам съдържанието сам?',
        answer:
          'Да. При нужда свързваме сайта с CMS, така че да редактирате текстове, изображения и страници без техническа помощ.',
      },
      {
        question: 'Сайтът ще работи ли на телефон?',
        answer:
          'Да. Всяка страница се проектира и тества за мобилни, таблетни и настолни екрани.',
      },
      {
        question: 'Какво се случва след стартирането?',
        answer:
          'Можете да продължите с план за поддръжка, който покрива актуализации, сигурност и развитие.',
      },
    ],
  },
  {
    slug: 'izrabotka-na-online-magazin',
    enSlug: 'online-store-development',
    anchor: 'online-magazin',
    id: 'ecommerce',
    related: ['web-design', 'seo', 'poddrazhka'],
    index: '02',
    title: 'Онлайн магазин',
    summary:
      'Онлайн магазини, изградени около реалния процес на продажба и поведението на клиента.',
    points: ['Каталог и продукти', 'Checkout поток', 'Интеграции и плащания'],
    hero: {
      eyebrow: 'Онлайн магазин',
      title: 'Онлайн магазин',
      accent: 'създаден за лесна покупка.',
      lead: 'Изграждаме онлайн магазини с удобна навигация, ясна продуктова структура и плавен процес на покупка. Решението е съобразено с начина, по който продавате, и може да се развива заедно с бизнеса ви.',
    },
    meta: {
      title: 'Изработка на онлайн магазин | Website Studio R',
      description:
        'Изработка на онлайн магазин с продуктов каталог, количка, плащания и административен панел — e-commerce сайт за вашия бизнес.',
    },
    problem: {
      heading: 'Когато пътят до покупка е твърде дълъг',
      paragraphs: [
        'Онлайн магазинът губи клиенти на всяка неясна стъпка — при търсенето на продукт, при избора на вариант, при плащането.',
        'Техническите пречки и объркващият checkout са сред най-честите причини кошницата да остане изоставена.',
        'Проектираме магазина около реалния процес на продажба: от намирането на продукта до потвърждението на поръчката.',
      ],
    },
    deliverablesIntro:
      'Покриваме целия път на клиента и всичко необходимо за управление на магазина.',
    deliverables: [
      {
        title: 'Продуктов каталог',
        description:
          'Категории, варианти, размери и наличности, подредени логично.',
      },
      {
        title: 'Търсене и филтри',
        description:
          'Бързо намиране на продукта чрез филтри по ключови характеристики.',
      },
      {
        title: 'Количка и поръчка',
        description: 'Плавен процес на поръчка с минимално триене.',
      },
      {
        title: 'Онлайн плащания',
        description:
          'Интеграция с разплащателни доставчици според нуждите на бизнеса.',
      },
      {
        title: 'Управление на поръчки',
        description: 'Административен панел за статуси, наличности и клиенти.',
      },
      {
        title: 'Доставка и интеграции',
        description:
          'Връзка с куриерски и складови системи, когато е необходимо.',
      },
      {
        title: 'Оптимизация на скоростта',
        description: 'Бързо зареждане на магазина и стабилни Core Web Vitals.',
      },
      {
        title: 'SEO основа',
        description:
          'Семантична структура и техническа основа за индексиране на продуктите.',
      },
      {
        title: 'Аналитика',
        description:
          'Проследяване на продажби, конверсия и поведение в магазина.',
      },
    ],
    processIntro:
      'Процесът е адаптиран към спецификите на електронната търговия.',
    process: [
      {
        step: '01',
        title: 'Проучване',
        description:
          'Анализираме продуктите, клиентите и начина, по който се извършва продажбата.',
      },
      {
        step: '02',
        title: 'Структура',
        description: 'Дефинираме категории, филтри и пътя до покупка.',
      },
      {
        step: '03',
        title: 'Дизайн',
        description:
          'Проектираме продуктови страници и checkout, които вдъхват доверие.',
      },
      {
        step: '04',
        title: 'Разработка',
        description:
          'Изграждаме магазина, интеграциите и административния панел.',
      },
      {
        step: '05',
        title: 'Тестване и стартиране',
        description:
          'Проверяваме поръчки и плащания, преди магазинът да стане публичен.',
      },
    ],
    faq: [
      {
        question: 'Колко струва изработката на онлайн магазин?',
        answer:
          'Зависи от обхвата на каталога, интеграциите и функционалностите. След кратък разговор получавате ясна оферта.',
      },
      {
        question: 'Кои плащания могат да бъдат интегрирани?',
        answer:
          'Работим с разпространени доставчици на онлайн плащания и с наложен платеж. Изборът зависи от пазара и предпочитанията ви.',
      },
      {
        question: 'Мога ли да управлявам продуктите сам?',
        answer:
          'Да. Административният панел позволява добавяне на продукти, редакция на цени и проследяване на поръчки.',
      },
      {
        question: 'Магазинът ще работи ли на телефон?',
        answer:
          'Да. Мобилната версия е приоритет, тъй като голяма част от покупките се случват от телефон.',
      },
      {
        question: 'Възможно ли е надграждане след старта?',
        answer:
          'Да. Архитектурата се планира така, че да позволява нови функции и растеж на каталога.',
      },
    ],
  },
  {
    slug: 'web-design',
    enSlug: 'web-design',
    anchor: 'web-design',
    id: 'web-design',
    related: ['izrabotka-na-sait', 'izrabotka-na-online-magazin'],
    index: '03',
    title: 'Web design',
    summary:
      'Изчистен премиум визуален език, който отличава бранда ви от конкуренцията.',
    points: ['Визуална посока', 'UI система', 'Типография и бранд'],
    hero: {
      eyebrow: 'Уеб дизайн',
      title: 'Web Design',
      accent: 'с ясна визуална идентичност.',
      lead: 'Създаваме визуална концепция, която прави сайта разпознаваем, модерен и лесен за използване. Работим с типография, цветове, композиция и UX, за да постигнем дизайн с характер и ясна логика.',
    },
    meta: {
      title: 'Уеб дизайн | Website Studio R',
      description:
        'Уеб дизайн с визуална посока, UI система и типография — модерен дизайн на сайт, който изглежда премиум и води до действие.',
    },
    problem: {
      heading: 'Когато дизайнът не носи доверие',
      paragraphs: [
        'Дизайнът е първото впечатление и често единственият шанс да задържите посетителя.',
        'Шаблонните решения правят бизнеса неразличим, а претрупаните интерфейси затрудняват намирането на важното.',
        'Изграждаме визуална система, която подчертава характера на бранда и улеснява потребителя.',
      ],
    },
    deliverablesIntro:
      'Дизайнът се предава като завършена система, готова за разработка.',
    deliverables: [
      {
        title: 'Визуална посока',
        description:
          'Определяме посоката — настроение, цветове, типография и тон.',
      },
      {
        title: 'Потребителско изживяване (UX)',
        description:
          'Подреждаме екраните и пътя на потребителя така, че да водят до действие.',
      },
      {
        title: 'UI система',
        description: 'Последователни компоненти и правила за тяхната употреба.',
      },
      {
        title: 'Типография',
        description:
          'Подбор и йерархия на шрифтовете за ясно четене и характер.',
      },
      {
        title: 'Компоненти',
        description: 'Бутони, форми, навигация и секции с всички състояния.',
      },
      {
        title: 'Адаптивен дизайн',
        description: 'Макети за телефон, таблет и настолен екран.',
      },
      {
        title: 'Документация',
        description: 'Правила за използване на системата при бъдещо развитие.',
      },
    ],
    processIntro: 'Дизайнът следва структурата и целите, а не обратното.',
    process: [
      {
        step: '01',
        title: 'Проучване',
        description: 'Разбираме бранда, аудиторията и контекста на пазара.',
      },
      {
        step: '02',
        title: 'Посока',
        description: 'Дефинираме визуална посока и концепция.',
      },
      {
        step: '03',
        title: 'Макети',
        description: 'Проектираме ключовите екрани и състояния.',
      },
      {
        step: '04',
        title: 'Система',
        description: 'Превръщаме дизайна в последователна UI система.',
      },
      {
        step: '05',
        title: 'Предаване',
        description: 'Подготвяме файловете и документацията за разработка.',
      },
    ],
    faq: [
      {
        question: 'Какво е необходимо, за да започнем?',
        answer:
          'Достатъчен е кратък разговор за бранда, целите и примери, които харесвате. Оттам нататък преминаваме към посока и макети.',
      },
      {
        question: 'Можете ли да работите с вече съществуващ бранд?',
        answer:
          'Да. Дизайнът се съобразява с наличната идентичност и я развива, без да я нарушава.',
      },
      {
        question: 'Получавам ли файловете за разработка?',
        answer:
          'Да. Предаваме макети, компоненти и правила, от които разработката да продължи.',
      },
      {
        question: 'Правите ли само дизайн без разработка?',
        answer:
          'Възможно е. Обикновено обаче дизайн и разработка вървят заедно за по-добър краен резултат.',
      },
      {
        question: 'Колко версии на дизайна са включени?',
        answer:
          'Работим итеративно с обратна връзка на всеки етап, вместо да представяме един финален вариант.',
      },
    ],
  },
  {
    slug: 'seo',
    enSlug: 'seo',
    anchor: 'seo',
    id: 'seo',
    related: ['izrabotka-na-sait', 'izrabotka-na-online-magazin', 'poddrazhka'],
    index: '04',
    title: 'SEO',
    summary:
      'Техническа и съдържателна основа, която помага сайтът ви да бъде откриван в Google.',
    points: [
      'Технически SEO',
      'Семантична структура',
      'Скорост и Core Web Vitals',
    ],
    hero: {
      eyebrow: 'SEO',
      title: 'SEO',
      accent: 'за по-добра видимост онлайн.',
      lead: 'Оптимизираме структурата, съдържанието и техническата основа на сайта, за да бъде по-лесно разбираем от Google и по-откриваем от потенциални клиенти. Подходът е дългосрочен и е насочен към реална органична видимост, без обещания за „гарантирани позиции“.',
    },
    meta: {
      title: 'SEO оптимизация | Website Studio R',
      description:
        'SEO оптимизация на сайт — техническа и съдържателна оптимизация за Google, семантична структура, скорост и Core Web Vitals.',
    },
    problem: {
      heading: 'Когато сайтът съществува, но не се намира',
      paragraphs: [
        'Добър сайт, който никой не намира, не носи стойност на бизнеса.',
        'Често причината не е липсата на съдържание, а технически пречки, неясна структура и страници, които търсачките не разбират.',
        'Работим върху основата: как е структуриран сайтът, какво съдържа и как се зарежда.',
      ],
    },
    deliverablesIntro:
      'Работата обхваща техническата и съдържателната страна на оптимизацията.',
    deliverables: [
      {
        title: 'Технически одит',
        description: 'Преглед на индексиране, структура, мета данни и грешки.',
      },
      {
        title: 'Семантична структура',
        description: 'Ясна йерархия на заглавията и логика на страниците.',
      },
      {
        title: 'On-page оптимизация',
        description: 'Заглавия, описания и съдържание, съобразени с търсенето.',
      },
      {
        title: 'Съдържание',
        description:
          'Насоки за текстове, които отговарят на реалните въпроси на клиентите.',
      },
      {
        title: 'Скорост',
        description: 'Оптимизация на зареждането и Core Web Vitals.',
      },
      {
        title: 'Локално присъствие',
        description:
          'Данни за бизнеса и структурирани данни, където са приложими.',
      },
      {
        title: 'Проследяване',
        description: 'Настройка на аналитика и наблюдение на резултатите.',
      },
    ],
    processIntro: 'Започваме с одит и приоритети, а не с обещания.',
    process: [
      {
        step: '01',
        title: 'Одит',
        description: 'Преглеждаме сайта технически и съдържателно.',
      },
      {
        step: '02',
        title: 'Приоритети',
        description: 'Определяме кое ще донесе най-голяма полза първо.',
      },
      {
        step: '03',
        title: 'Техническа работа',
        description: 'Отстраняваме пречките пред индексирането и скоростта.',
      },
      {
        step: '04',
        title: 'Съдържание',
        description: 'Подреждаме и развиваме съдържанието около търсенето.',
      },
      {
        step: '05',
        title: 'Наблюдение',
        description: 'Следим резултатите и коригираме посоката.',
      },
    ],
    faq: [
      {
        question: 'Гарантирате ли първо място в Google?',
        answer:
          'Не. Никой не може да гарантира конкретна позиция. Работим върху техническата и съдържателната основа, която дава устойчив резултат с времето.',
      },
      {
        question: 'Колко време отнема да се видят резултати?',
        answer:
          'SEO е процес, а не еднократна промяна. Първите подобрения обикновено се забелязват в рамките на няколко месеца.',
      },
      {
        question: 'Работите ли с вече съществуващ сайт?',
        answer:
          'Да. Започваме с одит на текущото състояние и приоритизираме най-важните промени.',
      },
      {
        question: 'Включва ли се създаване на съдържание?',
        answer:
          'Даваме насоки и структура за съдържанието; при нужда помагаме и с изготвянето му.',
      },
    ],
  },
  {
    slug: 'poddrazhka',
    enSlug: 'maintenance',
    anchor: 'poddrazhka',
    id: 'support',
    related: ['izrabotka-na-sait', 'izrabotka-na-online-magazin'],
    index: '05',
    title: 'Поддръжка',
    summary:
      'Дългосрочна грижа за сайта — актуализации, сигурност и развитие след старта.',
    points: ['Мониторинг', 'Обновления', 'Нови функционалности'],
    hero: {
      eyebrow: 'Поддръжка',
      title: 'Поддръжка',
      accent: 'за сайт, който остава в добра форма.',
      lead: 'Грижим се сайтът да остане актуален, сигурен и технически стабилен след стартирането му. Можем да поемем промени по съдържанието, технически корекции, подобрения и развитие на нови функционалности.',
    },
    meta: {
      title: 'Поддръжка на сайт | Website Studio R',
      description:
        'Поддръжка на уеб сайт — мониторинг, актуализации, сигурност, резервни копия и развитие след стартиране.',
    },
    problem: {
      heading: 'Когато сайтът е оставен без грижа',
      paragraphs: [
        'Сайтът не е готов продукт, който остава непроменен. Технологиите се развиват, а изискванията на бизнеса — също.',
        'Без редовна поддръжка се появяват уязвимости, забавено зареждане и дребни проблеми, които с времето стават скъпи.',
        'Поемаме тази грижа, за да можете да се съсредоточите върху бизнеса.',
      ],
    },
    deliverablesIntro:
      'Плановете за поддръжка се съобразяват с мащаба и нуждите на сайта.',
    deliverables: [
      {
        title: 'Мониторинг',
        description: 'Следим достъпността и основните показатели на сайта.',
      },
      {
        title: 'Актуализации',
        description: 'Обновяваме системите и зависимостите своевременно.',
      },
      {
        title: 'Сигурност',
        description: 'Предпазваме сайта от често срещани заплахи и уязвимости.',
      },
      {
        title: 'Резервни копия',
        description: 'Редовни копия, за да е сигурно възстановяването.',
      },
      {
        title: 'Промени по съдържание',
        description: 'Малки редакции и допълнения, когато са нужни.',
      },
      {
        title: 'Нови функционалности',
        description: 'Развитие на сайта според нуждите на бизнеса.',
      },
      {
        title: 'Техническа поддръжка',
        description: 'Ясна комуникация и навременна реакция при проблем.',
      },
    ],
    processIntro: 'Поддръжката е непрекъснат процес с ясна комуникация.',
    process: [
      {
        step: '01',
        title: 'Преглед',
        description: 'Оценяваме състоянието на сайта и нуждите от поддръжка.',
      },
      {
        step: '02',
        title: 'План',
        description: 'Определяме обхвата, честотата и отговорностите.',
      },
      {
        step: '03',
        title: 'Наблюдение',
        description: 'Следим сайта и реагираме при нужда.',
      },
      {
        step: '04',
        title: 'Развитие',
        description: 'Надграждаме функционалности според целите.',
      },
    ],
    faq: [
      {
        question: 'Задължителна ли е поддръжката?',
        answer:
          'Не е задължителна, но е препоръчителна. Без нея сайтът постепенно губи сигурност и производителност.',
      },
      {
        question:
          'Мога ли да използвам поддръжка и за сайт, който не сте правили вие?',
        answer:
          'Да. Започваме с преглед на текущото състояние и предлагаме реалистичен план.',
      },
      {
        question: 'Включени ли са нови функции?',
        answer:
          'Малките промени са част от поддръжката. По-големите разработки се планират отделно.',
      },
      {
        question: 'Как се комуникира при проблем?',
        answer:
          'По имейл и телефон, с ясно дефинирано време за реакция според плана.',
      },
    ],
  },
]

type ServiceOverride = Omit<
  ServicePage,
  'slug' | 'enSlug' | 'anchor' | 'id' | 'index' | 'related'
>

const enOverrides: Record<ServiceSlug, ServiceOverride> = {
  'izrabotka-na-sait': {
    title: 'Website development',
    summary:
      'Representative websites that present your business clearly, confidently and professionally.',
    points: ['Strategy & structure', 'Custom design', 'Responsive build'],
    hero: {
      eyebrow: 'Website development',
      title: 'Website development',
      accent: 'for a business with character.',
      lead: 'We create modern, professional websites built around the goals and identity of your business. The focus is on a clear structure, a good user experience and flawless performance on every device.',
    },
    meta: {
      title: 'Website development | Website Studio R',
      description:
        'Representative websites with custom design, responsive development, a CMS and an SEO foundation. Working with businesses across Bulgaria.',
    },
    problem: {
      heading: 'When a website does not work in favour of the business',
      paragraphs: [
        'Many websites are built simply to exist. They do not explain what the business does, fail to build trust and do not move the visitor to the next step.',
        'The result is expensive traffic that never becomes enquiries, and a feeling that the site does not match the level of the service itself.',
        'We build the site around the customer’s real questions: what you offer, why to trust you and how to take the next step.',
      ],
    },
    deliverablesIntro:
      'Every build includes the full set of work needed to ship a finished, ready-to-run website.',
    deliverables: [
      {
        title: 'Custom design',
        description:
          'A unique visual language tailored to the brand, not a ready-made template.',
      },
      {
        title: 'Responsive development',
        description: 'A correct experience on phone, tablet and desktop.',
      },
      {
        title: 'CMS integration',
        description:
          'The ability to manage content yourself, without technical knowledge.',
      },
      {
        title: 'Contact forms',
        description:
          'Clear ways to get in touch, protected from unwanted submissions.',
      },
      {
        title: 'SEO foundation',
        description:
          'Semantic structure, meta data and the technical basics for indexing.',
      },
      {
        title: 'Analytics',
        description: 'Tracking visits and behaviour so you know what works.',
      },
      {
        title: 'Speed optimisation',
        description: 'Fast loading and stable Core Web Vitals.',
      },
    ],
    processIntro:
      'We work in a clear process, so you always know where the project stands.',
    process: [
      {
        step: '01',
        title: 'Discovery',
        description:
          'We get to know the business, goals and audience before proposing a structure.',
      },
      {
        step: '02',
        title: 'Structure & content',
        description:
          'We organise the pages and messaging so they lead to action.',
      },
      {
        step: '03',
        title: 'Design',
        description:
          'We create a visual system and mock-ups for all key screens.',
      },
      {
        step: '04',
        title: 'Development',
        description: 'We build the site, test and optimise before launch.',
      },
      {
        step: '05',
        title: 'Launch',
        description: 'We publish, connect analytics and remain available.',
      },
    ],
    faq: [
      {
        question: 'How long does a website take?',
        answer:
          'It depends on scope. A representative website usually takes between three and six weeks from start to launch.',
      },
      {
        question: 'Can I manage the content myself?',
        answer:
          'Yes. When needed we connect a CMS so you can edit text, images and pages without technical help.',
      },
      {
        question: 'Will the website work on mobile?',
        answer:
          'Yes. Every page is designed and tested for mobile, tablet and desktop screens.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'You can continue with a maintenance plan covering updates, security and growth.',
      },
    ],
  },
  'izrabotka-na-online-magazin': {
    title: 'Online store',
    summary:
      'Online stores built around the real sales process and customer behaviour.',
    points: [
      'Catalogue & products',
      'Checkout flow',
      'Integrations & payments',
    ],
    hero: {
      eyebrow: 'Online store',
      title: 'Online store',
      accent: 'built for easy shopping.',
      lead: 'We build online stores with convenient navigation, a clear product structure and a smooth purchase process. The solution is tailored to the way you sell and can grow together with your business.',
    },
    meta: {
      title: 'Online store development | Website Studio R',
      description:
        'Online stores with a product catalogue, cart, payments and an admin panel — a solution tailored to the real sales process.',
    },
    problem: {
      heading: 'When the path to purchase is too long',
      paragraphs: [
        'An online store loses customers at every unclear step — searching for a product, choosing an option, paying.',
        'Technical hurdles and a confusing checkout are among the most common reasons a cart is abandoned.',
        'We design the store around the real sales process: from finding a product to confirming the order.',
      ],
    },
    deliverablesIntro:
      'We cover the entire customer journey and everything needed to run the store.',
    deliverables: [
      {
        title: 'Product catalogue',
        description:
          'Categories, variants, sizes and stock, organised logically.',
      },
      {
        title: 'Search & filters',
        description: 'Quickly find a product via filters on key attributes.',
      },
      {
        title: 'Cart & checkout',
        description: 'A smooth ordering process with minimal friction.',
      },
      {
        title: 'Online payments',
        description: 'Integration with payment providers to suit the business.',
      },
      {
        title: 'Order management',
        description: 'An admin panel for statuses, stock and customers.',
      },
      {
        title: 'Shipping & integrations',
        description:
          'Connections to courier and warehouse systems when needed.',
      },
      {
        title: 'Analytics',
        description: 'Tracking sales, conversion and behaviour in the store.',
      },
    ],
    processIntro: 'The process is adapted to the specifics of e-commerce.',
    process: [
      {
        step: '01',
        title: 'Discovery',
        description:
          'We analyse the products, customers and how the sale is made.',
      },
      {
        step: '02',
        title: 'Structure',
        description: 'We define categories, filters and the path to purchase.',
      },
      {
        step: '03',
        title: 'Design',
        description:
          'We design product pages and a checkout that builds trust.',
      },
      {
        step: '04',
        title: 'Development',
        description: 'We build the store, integrations and the admin panel.',
      },
      {
        step: '05',
        title: 'Testing & launch',
        description:
          'We verify orders and payments before the store goes live.',
      },
    ],
    faq: [
      {
        question: 'Which payments can be integrated?',
        answer:
          'We work with common online payment providers and cash on delivery. The choice depends on the market and your preferences.',
      },
      {
        question: 'Can I manage products myself?',
        answer:
          'Yes. The admin panel lets you add products, edit prices and track orders.',
      },
      {
        question: 'Will the store work on mobile?',
        answer:
          'Yes. The mobile version is a priority, since much of the shopping happens on a phone.',
      },
      {
        question: 'Is it possible to grow after launch?',
        answer:
          'Yes. The architecture is planned so new features and catalogue growth are possible.',
      },
    ],
  },
  'web-design': {
    title: 'Web design',
    summary: 'A refined premium visual language that sets your brand apart.',
    points: ['Visual direction', 'UI system', 'Typography & brand'],
    hero: {
      eyebrow: 'Web design',
      title: 'Web design',
      accent: 'with a clear visual identity.',
      lead: 'We create a visual concept that makes the website recognisable, modern and easy to use. We work with typography, colour, composition and UX to achieve a design with character and clear logic.',
    },
    meta: {
      title: 'Web design | Website Studio R',
      description:
        'Web design with visual direction, a UI system and typography tailored to the brand. Design that looks premium and works for the business.',
    },
    problem: {
      heading: 'When the design does not build trust',
      paragraphs: [
        'Design is the first impression and often the only chance to keep a visitor.',
        'Template solutions make a business indistinguishable, while cluttered interfaces make it hard to find what matters.',
        'We build a visual system that highlights the character of the brand and helps the user.',
      ],
    },
    deliverablesIntro:
      'The design is handed over as a finished system, ready for development.',
    deliverables: [
      {
        title: 'Visual direction',
        description:
          'We set the direction — mood, colours, typography and tone.',
      },
      {
        title: 'UI system',
        description: 'Consistent components and rules for their use.',
      },
      {
        title: 'Typography',
        description:
          'Font selection and hierarchy for clear reading and character.',
      },
      {
        title: 'Components',
        description: 'Buttons, forms, navigation and sections in all states.',
      },
      {
        title: 'Responsive design',
        description: 'Mock-ups for phone, tablet and desktop.',
      },
      {
        title: 'Documentation',
        description: 'Rules for using the system as the project grows.',
      },
    ],
    processIntro:
      'Design follows the structure and goals, not the other way around.',
    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'We get to know the brand, audience and market context.',
      },
      {
        step: '02',
        title: 'Direction',
        description: 'We define the visual direction and concept.',
      },
      {
        step: '03',
        title: 'Mock-ups',
        description: 'We design the key screens and states.',
      },
      {
        step: '04',
        title: 'System',
        description: 'We turn the design into a consistent UI system.',
      },
      {
        step: '05',
        title: 'Handover',
        description: 'We prepare the files and documentation for development.',
      },
    ],
    faq: [
      {
        question: 'Can you work with an existing brand?',
        answer:
          'Yes. The design follows the existing identity and develops it without breaking it.',
      },
      {
        question: 'Do I receive the design files?',
        answer:
          'Yes. We hand over mock-ups, components and rules for development to continue.',
      },
      {
        question: 'Do you offer design only, without development?',
        answer:
          'It is possible. Usually design and development go together for a better result.',
      },
      {
        question: 'How many design versions are included?',
        answer:
          'We work iteratively with feedback at every stage rather than delivering one final version.',
      },
    ],
  },
  seo: {
    title: 'SEO',
    summary:
      'A technical and content foundation that helps your site get found in Google.',
    points: ['Technical SEO', 'Semantic structure', 'Speed & Core Web Vitals'],
    hero: {
      eyebrow: 'SEO',
      title: 'SEO',
      accent: 'for better online visibility.',
      lead: 'We optimise the structure, content and technical foundation of the site so it is easier for Google to understand and easier for potential customers to find. The approach is long-term and focused on real organic visibility, without promises of guaranteed positions.',
    },
    meta: {
      title: 'SEO services | Website Studio R',
      description:
        'Technical and content SEO — semantic structure, on-page optimisation, speed and Core Web Vitals. We work on a sustainable foundation, not promises.',
    },
    problem: {
      heading: 'When a website exists but cannot be found',
      paragraphs: [
        'A good website that nobody finds brings no value to the business.',
        'Often the cause is not a lack of content but technical hurdles, an unclear structure and pages search engines cannot understand.',
        'We work on the foundation: how the site is structured, what it contains and how it loads.',
      ],
    },
    deliverablesIntro:
      'The work covers both the technical and the content side of optimisation.',
    deliverables: [
      {
        title: 'Technical audit',
        description: 'A review of indexing, structure, meta data and errors.',
      },
      {
        title: 'Semantic structure',
        description: 'Clear heading hierarchy and page logic.',
      },
      {
        title: 'On-page optimisation',
        description:
          'Titles, descriptions and content aligned with search intent.',
      },
      {
        title: 'Content',
        description:
          'Guidance for copy that answers customers’ real questions.',
      },
      {
        title: 'Speed',
        description: 'Loading optimisation and Core Web Vitals.',
      },
      {
        title: 'Local presence',
        description: 'Business data and structured data where applicable.',
      },
      {
        title: 'Tracking',
        description: 'Setting up analytics and monitoring results.',
      },
    ],
    processIntro: 'We start with an audit and priorities, not promises.',
    process: [
      {
        step: '01',
        title: 'Audit',
        description: 'We review the site technically and in terms of content.',
      },
      {
        step: '02',
        title: 'Priorities',
        description: 'We decide what will bring the greatest benefit first.',
      },
      {
        step: '03',
        title: 'Technical work',
        description: 'We remove hurdles to indexing and speed.',
      },
      {
        step: '04',
        title: 'Content',
        description: 'We organise and develop content around search.',
      },
      {
        step: '05',
        title: 'Monitoring',
        description: 'We track results and adjust direction.',
      },
    ],
    faq: [
      {
        question: 'Do you guarantee a first place in Google?',
        answer:
          'No. Nobody can guarantee a specific position. We work on the technical and content foundation that delivers sustainable results over time.',
      },
      {
        question: 'How long before results appear?',
        answer:
          'SEO is a process, not a one-off change. First improvements usually appear within a few months.',
      },
      {
        question: 'Do you work on existing websites?',
        answer:
          'Yes. We start with an audit of the current state and prioritise the most important changes.',
      },
      {
        question: 'Does this include content creation?',
        answer:
          'We provide guidance and structure for content, and can help create it if needed.',
      },
    ],
  },
  poddrazhka: {
    title: 'Maintenance',
    summary:
      'Ongoing care for your website — updates, security and growth after launch.',
    points: ['Monitoring', 'Updates', 'New features'],
    hero: {
      eyebrow: 'Maintenance',
      title: 'Maintenance',
      accent: 'for a website that stays in good shape.',
      lead: 'We take care that the website stays current, secure and technically stable after launch. We can handle content changes, technical fixes, improvements and the development of new features.',
    },
    meta: {
      title: 'Website maintenance | Website Studio R',
      description:
        'Long-term website maintenance — monitoring, updates, security, backups and new features after launch.',
    },
    problem: {
      heading: 'When a website is left without care',
      paragraphs: [
        'A website is not a finished product that stays unchanged. Technology evolves, and so do business needs.',
        'Without regular maintenance, vulnerabilities, slow loading and small issues appear that become costly over time.',
        'We take on that care so you can focus on your business.',
      ],
    },
    deliverablesIntro:
      'Maintenance plans are tailored to the size and needs of the website.',
    deliverables: [
      {
        title: 'Monitoring',
        description: 'We watch availability and the key metrics of the site.',
      },
      {
        title: 'Updates',
        description: 'We update systems and dependencies in good time.',
      },
      {
        title: 'Security',
        description:
          'We protect the site from common threats and vulnerabilities.',
      },
      {
        title: 'Backups',
        description: 'Regular backups so recovery is safe.',
      },
      {
        title: 'Content changes',
        description: 'Small edits and additions when needed.',
      },
      {
        title: 'New features',
        description: 'Developing the site according to business needs.',
      },
      {
        title: 'Technical support',
        description: 'Clear communication and a timely response to issues.',
      },
    ],
    processIntro: 'Maintenance is an ongoing process with clear communication.',
    process: [
      {
        step: '01',
        title: 'Review',
        description:
          'We assess the state of the site and its maintenance needs.',
      },
      {
        step: '02',
        title: 'Plan',
        description: 'We define scope, frequency and responsibilities.',
      },
      {
        step: '03',
        title: 'Monitoring',
        description: 'We watch the site and react when needed.',
      },
      {
        step: '04',
        title: 'Growth',
        description: 'We build features according to your goals.',
      },
    ],
    faq: [
      {
        question: 'Is maintenance required?',
        answer:
          'It is not required, but it is recommended. Without it a site gradually loses security and performance.',
      },
      {
        question: 'Can you maintain a website you did not build?',
        answer:
          'Yes. We start with a review of the current state and offer a realistic plan.',
      },
      {
        question: 'Are new features included?',
        answer:
          'Small changes are part of maintenance. Larger development is planned separately.',
      },
      {
        question: 'How do we communicate when there is a problem?',
        answer:
          'By email and phone, with a clearly defined response time in the plan.',
      },
    ],
  },
}

export const services: Localized<ServicePage[]> = {
  bg: bgServices,
  en: bgServices.map((service) => ({
    ...service,
    ...enOverrides[service.slug],
  })),
}

export function getServices(locale: Locale): ServicePage[] {
  return services[locale]
}

export function getServiceBySlug(
  locale: Locale,
  slug: string,
): ServicePage | undefined {
  return services[locale].find((service) => service.slug === slug)
}

/** The in-page anchor id for a service section on the services index page. */
export function getServiceAnchor(
  locale: Locale,
  service: Pick<ServicePage, 'anchor' | 'enSlug'>,
): string {
  return locale === 'en' ? service.enSlug : service.anchor
}

/** Localized link to a service section on the services index page. */
export function getServiceHref(
  locale: Locale,
  service: Pick<ServicePage, 'anchor' | 'enSlug'>,
): string {
  const path = locale === 'en' ? '/en/services' : '/uslugi'
  return `${path}#${getServiceAnchor(locale, service)}`
}

function assertRelatedServices(): void {
  const known = new Set<string>(serviceSlugs)
  for (const service of bgServices) {
    if (service.related.includes(service.slug)) {
      throw new Error(
        `Service "${service.slug}" cannot reference itself in "related".`,
      )
    }
    for (const related of service.related) {
      if (!known.has(related)) {
        throw new Error(
          `Service "${service.slug}" references unknown related slug "${related}".`,
        )
      }
    }
  }
}

assertRelatedServices()
