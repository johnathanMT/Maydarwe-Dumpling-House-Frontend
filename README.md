# Maydarwe Dumpling House — Frontend

React + Vite + Tailwind CSS (v3) + React Router + react-i18next (English / Burmese).

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build

## Structure

```
src/
├── main.jsx              entry point (loads i18n + styles)
├── App.jsx               router
├── i18n.js               react-i18next setup (EN / MM, remembered in localStorage)
├── index.css             Tailwind + Burmese typography fixes
├── constants/site.js     nav links, phone numbers, social links, languages
├── locales/
│   ├── en/translation.json
│   └── my/translation.json
├── components/
│   ├── layout/           Layout, Navbar, Footer
│   └── ui/               BrandLogo, LanguageToggle, PagePlaceholder
└── pages/                Home, Menu, About, Contact
```

## To do

- Replace social URLs in `src/constants/site.js`
- Paste the Google Maps embed URL in `src/components/layout/Footer.jsx`
- Swap the placeholder "M" seal in `BrandLogo.jsx` for the real logo
- Fine-tune brand hex values in `tailwind.config.js` against the logo
