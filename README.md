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
| `npm run build` | Checks translations, regenerates `vercel.json` headers, then builds into `dist/` |
| `npm run preview` | Serves the production build locally with the production security headers |
| `npm run lint` | ESLint with security and React Hooks rules |
| `npm run check` | CI guard: translations complete in both languages, `vercel.json` headers in sync |
| `npm run headers` | Rewrites the `headers` section of `vercel.json` from `src/lib/securityHeaders.js` |
| `npm run audit` | Fails on high-severity vulnerabilities in shipped dependencies |

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
├── context/                 CartContext (persisted in localStorage), UiContext (panels, toast)
├── lib/                     seo (per-route meta), structuredData (JSON-LD), securityHeaders (CSP),
│                            businessHours, motion, sanitize, chunkReload
├── pages/                   Home, Menu, About, Contact, NotFound
└── styles/fonts.js          Self-hosted fonts
scripts/                     check-i18n.mjs, sync-vercel-headers.mjs
public/                      og-image.jpg, icons, robots.txt, sitemap.xml, draco/ (3D decoder)
```

## Common changes

- **Hours, phones, address, delivery links:** edit `BUSINESS` in `src/constants/site.js`. The header strip, footer, contact page, order sheet, open/closed badge, meta description and JSON-LD all update. Filling in `address.en`/`address.my` turns on the address card, map and "Get directions".
- **A new dish photo:** add a lowercase `.jpg` to `src/assets/photos/`, import it in `src/assets/photos/index.js`, and set `photo:` on the dish in `src/data/menu.js`.
- **Text:** edit both `src/locales/en/translation.json` and `src/locales/my/translation.json`; `npm run check` tells you if one is missing a key.
- **CSP / caching:** edit `src/lib/securityHeaders.js`, then `npm run headers`.
- **Google Search Console:** set `MAYDARWE_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel's environment variables (or verify by DNS).
