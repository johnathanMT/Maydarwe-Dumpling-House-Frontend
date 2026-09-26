import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { sanitizeLanguage } from './lib/sanitize';
import en from './locales/en/translation.json';
import my from './locales/my/translation.json';

// The JSON files in src/locales are the ONLY place strings live.
// Business facts (hours, year, phone, city) are interpolated from
// src/constants/site.js — never type them into a translation.
const resources = {
  en: { translation: en },
  my: { translation: my },
};

// Keep <html lang> in sync so Burmese typography and screen readers work.
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = sanitizeLanguage(lng);
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources,
      fallbackLng: 'my',
      supportedLngs: ['en', 'my'],
      nonExplicitSupportedLngs: true,
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage'],
        lookupLocalStorage: 'maydarwe-lang',
        caches: ['localStorage'],
        convertDetectedLanguage: (lng) => sanitizeLanguage(lng),
      },
    },
    () => {
      document.documentElement.lang = sanitizeLanguage(i18n.resolvedLanguage);
    }
  );
