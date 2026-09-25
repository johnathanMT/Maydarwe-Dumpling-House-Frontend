import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import my from './locales/my/translation.json';

// Keep <html lang> in sync so the Burmese CSS rules and screen readers work.
// Registered before init() because init emits the first 'languageChanged'.
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng?.startsWith('my') ? 'my' : 'en';
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      my: { translation: my },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'my'],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false }, // React already escapes output
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'maydarwe-lang',
      caches: ['localStorage'], // remembers the visitor's choice
    },
  });

export default i18n;
