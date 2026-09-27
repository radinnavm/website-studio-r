# Website Studio R

Premium web development studio site for a Bulgarian agency offering custom
websites, online stores, web design, SEO and long-term support.

> Изработка на сайтове и онлайн магазини за бизнеси в България.

## Stack

- React 19
- TypeScript
- Vite
- React Router (v7)
- CSS Modules
- Node.js (contact API — no extra dependencies)
- ESLint + Prettier

## Getting started

```bash
npm install
npm run dev        # start dev server (with the contact API)
```

Open http://localhost:5173.

## Scripts

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the dev server with HMR + contact API      |
| `npm run build`        | Type-check + production build                    |
| `npm run preview`      | Preview the production build (with contact API)  |
| `npm start`            | Production server (serves `dist/` + contact API) |
| `npm run lint`         | Run ESLint                                       |
| `npm run lint:fix`     | Fix ESLint issues                                |
| `npm run format`       | Format with Prettier                             |
| `npm run format:check` | Check formatting                                 |
| `npm run typecheck`    | Run TypeScript type-check                        |
| `npm test`             | Run unit tests (node:test)                       |

## Architecture

```
src/
├── config/          # site metadata (name, url, nav, contact)
├── lib/             # typed content data, SEO head manager, contact schema
├── styles/          # design tokens, reset, global base, utilities
├── components/
│   ├── ui/          # primitives: Container, Section, Button, Eyebrow, ...
│   ├── layout/      # Header, MobileNav, Footer, ScrollToTop
│   ├── home/        # homepage sections (Hero, Services, SelectedWork, ...)
│   └── contact/     # ContactForm
└── routes/          # route-level pages

server/
├── index.ts          # production Node server (static dist/ + API)
├── vite.ts           # dev/preview middleware plugin for POST /api/contact
├── contact-handler.ts# request validation, honeypot, rate limit
├── email.ts          # email adapter abstraction (console | resend)
└── rate-limit.ts     # in-memory rate limiter
```

## Contact form & email

The contact form posts JSON to `POST /api/contact`, which validates and
normalizes input server-side (shared schema in `src/lib/contact.ts`), applies a
honeypot and a rate limit, then delivers via an email adapter.

- **Development / preview** — the Vite plugin (`server/vite.ts`) serves the API
  in-process.
- **Production** — `npm start` runs `server/index.ts`, which defaults to
  `NODE_ENV=production`, serves the built `dist/` and the same API, and refuses
  to start without a real email provider (so PII is never silently logged).

Configure delivery via environment variables (see `.env.example`). `.env` is
git-ignored; never commit real values.

```bash
cp .env.example .env
# EMAIL_PROVIDER=resend
# RESEND_API_KEY=...
# CONTACT_TO_EMAIL=...
# CONTACT_FROM_EMAIL=...
```

`EMAIL_PROVIDER=console` logs submissions and is intended for local development
only. A SendGrid adapter can be added by implementing the `EmailAdapter`
interface in `server/email.ts`.

Rate limiting uses the socket IP by default. Behind a reverse proxy you
control, set `TRUST_PROXY=1` so the first `X-Forwarded-For` address is used.
Leave it unset otherwise — the header is spoofable and would bypass the limit.

Missing static assets (e.g. `/assets/*.js`) return a real `404`; only
extensionless paths fall back to the SPA entry point.

To run the production server locally without real email credentials, set
`NODE_ENV=development` so it falls back to the console adapter:

```bash
npm run build
NODE_ENV=development npm start
```

## Content

Copy lives in `src/lib/content.ts`, `src/lib/services.ts`,
`src/lib/portfolio.ts` and `src/config/site.ts` (brand + contact). Move to a CMS
later by swapping these data sources.

## Notes

- The site is bilingual. Bulgarian is the primary locale (URLs without prefix)
  and English lives under `/en/`. Content is typed as `Localized<{ bg, en }>`
  in `src/lib/*`; the language switcher maps each page to its equivalent and
  `hreflang` alternates are emitted per locale.
- No database or authentication. The contact API is stateless.
- Design tokens are defined in `src/styles/tokens.css`.
- SEO metadata is applied via `useSeo` in `src/lib/seo.ts`.
- `npm start` requires Node.js 22.18+ (native TypeScript type stripping).
