# Maydarwe Dumpling House — Frontend

React 19 + Vite 8 + Tailwind CSS 3 + React Router 7 + react-i18next (Burmese / English), deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Checks translations and security, regenerates `vercel.json` headers, builds into `dist/`, then scans `dist/` for secrets and source maps |
| `npm run preview` | Serves the production build locally with the production security headers |
| `npm run format` / `format:check` | Prettier: rewrite / check formatting (Tailwind classes are sorted too) |
| `npm run lint` | ESLint, zero warnings allowed: React Hooks + React Compiler checks, XSS and security rules, accessibility (jsx-a11y) |
| `npm run typecheck` | TypeScript over the JSDoc types (`checkJs`, strict) |
| `npm run check` | CI guard: translations, security tripwires, `vercel.json` in sync, types |
| `npm run test:e2e` | Playwright smoke tests on phone + desktop Chromium, against the production build (run `npm run build` first) |
| `npm run verify` | Everything CI checks locally: format, lint, check, build, smoke tests |
| `npm run headers` | Rewrites the `headers` section of `vercel.json` from `src/lib/securityHeaders.js` |
| `npm run audit` | Fails on high-severity vulnerabilities in shipped dependencies |

## Developer workflow

- **Node 22** (`.nvmrc`; `nvm use`). `npm install` also installs the Git hooks (Husky).
- **Style:** Prettier owns formatting (`.prettierrc.json`, 120 columns, single quotes). ESLint owns correctness; `eslint-config-prettier` keeps them from arguing. Editors without Prettier follow `.editorconfig`.
- **Pre-commit hook:** formats and lints only the staged files (lint-staged). **Pre-push hook:** type check.
- **Fast Refresh rule:** a `.jsx` file exports components only. Constants, lookup tables and hooks live in their own `.js` file (e.g. `context/useCart.js` next to `context/CartProvider.jsx`, `menu/meatTypes.js` next to `menu/meatIcons.jsx`).
- **First-time Playwright:** `npx playwright install chromium`, then `npm run build && npm run test:e2e`. `npm run test:e2e:ui` opens the interactive runner.

## Continuous integration

Every push and pull request to `main` runs `.github/workflows/main.yml` (and weekly, for newly published advisories):

| Job | Fails when |
| --- | --- |
| Secret scan (TruffleHog) | a verified or unverified credential appears in the new commits |
| Format, lint, types, security checks, build | any formatting drift, lint warning, type error, security tripwire, npm advisory or unsigned package |
| Smoke tests (Playwright) | a page crashes, logs an error, violates the CSP, calls an unapproved origin, or the menu / cart / language / loading screen stops working |
| Performance budgets (Lighthouse) | a page drops below its budget (`lighthouserc.json`): performance score, LCP, CLS, TBT, FCP, JavaScript / font / CSS / total bytes, accessibility 100, SEO 100 |
| Dependencies (OSV-Scanner) | the lockfile contains a known-vulnerable or known-malicious package |
| Static analysis (Semgrep) | JavaScript, React, secrets or workflow-injection rules match |
| **CI passed** | any job above did not succeed: make this the one required check in branch protection |

`codeql.yml` adds GitHub CodeQL (security-extended) when the repository is public. Dependabot (`.github/dependabot.yml`) proposes npm and Actions updates weekly, waiting 5 days after a release.

**Budgets:** they were calibrated on the build of September 2026 (mobile, simulated slow 4G) with headroom for CI noise. If a change *deliberately* makes a page heavier, raise that page's number in `lighthouserc.json` in the same pull request, so the decision is visible in review.

## Where things live

```
src/
├── constants/site.js        BUSINESS: hours, phones, address, ordering links (single source of truth)
├── data/menu.js             Dishes, prices, categories (plain JS; also feeds the JSON-LD)
├── locales/{en,my}/…json    All UI text. Business facts are interpolated, never typed in
├── assets/
│   ├── photos/              Dish photos → responsive AVIF/WebP/JPEG at build time (vite-imagetools)
│   ├── brand/               Logo
│   └── partners/            Put grab.svg + foodpanda.svg here to self-host the partner logos
├── components/
│   ├── layout/              Layout, Navbar, Footer, BottomNav
│   ├── cart/                CartDrawer, CartToast
│   ├── order/               OrderSheet (phone / Grab / foodpanda / Facebook)
│   ├── hero/                Hero, HeroShowcase (photo → on-demand 3D), DumplingScene, ChefMascot
│   ├── menu/                DishCard, DishPhoto, categoryIcons
│   └── ui/                  Button, Eyebrow, SectionHeading, PageHeader, CtaBanner, ArrowLink,
│                            Sheet (accessible modal), Reveal (scroll animation), OptimizedImage, …
├── context/                 CartProvider + useCart (cart, persisted in localStorage), UiProvider + useUi (panels, toast)
├── lib/                     seo (per-route meta), structuredData (JSON-LD), securityHeaders (CSP),
│                            businessHours, motion, sanitize, chunkReload
├── pages/                   Home, Menu, About, Contact, NotFound
└── styles/fonts.js          Self-hosted fonts
scripts/                     check-i18n.mjs, check-security.mjs, sync-vercel-headers.mjs, scan-dist.mjs
tests/e2e/                   Playwright smoke tests (fixtures.js: hermetic network + error/CSP checks)
public/                      og-image.jpg, icons, robots.txt, sitemap.xml, draco/ (3D decoder)
```

## Common changes

- **Hours, phones, address, delivery links:** edit `BUSINESS` in `src/constants/site.js`. The header strip, footer, contact page, order sheet, open/closed badge, meta description and JSON-LD all update. Filling in `address.en`/`address.my` turns on the address card, map and "Get directions".
- **A new dish photo:** add a lowercase `.jpg` to `src/assets/photos/`, import it in `src/assets/photos/index.js`, and set `photo:` on the dish in `src/data/menu.js`.
- **Text:** edit both `src/locales/en/translation.json` and `src/locales/my/translation.json`; `npm run check` tells you if one is missing a key.
- **CSP / caching:** edit `src/lib/securityHeaders.js`, then `npm run headers`.
- **Google Search Console:** set `MAYDARWE_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel's environment variables (or verify by DNS).
