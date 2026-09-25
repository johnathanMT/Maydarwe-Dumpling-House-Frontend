import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      brand: {
        name: 'Maydarwe',
        tagline: 'Dumpling House',
      },
      nav: {
        main: 'Main navigation',
        skip: 'Skip to content',
        home: 'Home',
        menu: 'Menu',
        about: 'About',
        contact: 'Contact',
        order: 'Order now',
        language: 'Choose language',
        openMenu: 'Open navigation',
        closeMenu: 'Close navigation',
        cart: 'Cart',
        cartCount_one: 'Cart, {{count}} item',
        cartCount_other: 'Cart, {{count}} items',
      },
      footer: {
        about: 'Handmade dumplings, made fresh every day.',
        follow: 'Follow us',
        explore: 'Explore',
        contact: 'Call us',
        hours: 'Hours',
        hoursValue: 'Daily, 10:00 AM – 9:00 PM',
        rights: 'All rights reserved.',
      },
      pages: {
        comingSoon: 'This page is under construction.',
        home: { title: 'Welcome to Maydarwe' },
        menu: { title: 'Our menu' },
        about: { title: 'About us' },
        contact: { title: 'Get in touch' },
      },
    },
  },
  my: {
    translation: {
      brand: {
        name: 'Maydarwe',
        tagline: 'ဖက်ထုပ်ဆိုင်',
      },
      nav: {
        main: 'ပင်မလမ်းညွှန်',
        skip: 'အကြောင်းအရာသို့ ကျော်သွားရန်',
        home: 'ပင်မစာမျက်နှာ',
        menu: 'မီနူး',
        about: 'ကျွန်ုပ်တို့အကြောင်း',
        contact: 'ဆက်သွယ်ရန်',
        order: 'ယခုမှာယူမည်',
        language: 'ဘာသာစကား ရွေးချယ်ရန်',
        openMenu: 'လမ်းညွှန်ကို ဖွင့်ရန်',
        closeMenu: 'လမ်းညွှန်ကို ပိတ်ရန်',
        cart: 'ဈေးခြင်း',
        cartCount_other: 'ဈေးခြင်းထဲတွင် {{count}} ခု',
      },
      footer: {
        about: 'နေ့စဉ် လတ်လတ်ဆတ်ဆတ် လက်ဖြင့်ပြုလုပ်ထားသော ဖက်ထုပ်များ။',
        follow: 'ကျွန်ုပ်တို့ကို Follow လုပ်ပါ',
        explore: 'စာမျက်နှာများ',
        contact: 'ဖုန်းဆက်ရန်',
        hours: 'ဖွင့်ချိန်',
        hoursValue: 'နေ့စဉ်၊ နံနက် ၁၀:၀၀ – ည ၉:၀၀',
        rights: 'မူပိုင်ခွင့်အားလုံး ရယူထားသည်။',
      },
      pages: {
        comingSoon: 'ဤစာမျက်နှာကို ပြင်ဆင်နေဆဲဖြစ်ပါသည်။',
        home: { title: 'Maydarwe မှ ကြိုဆိုပါသည်' },
        menu: { title: 'ကျွန်ုပ်တို့၏ မီနူး' },
        about: { title: 'ကျွန်ုပ်တို့အကြောင်း' },
        contact: { title: 'ဆက်သွယ်ရန်' },
      },
    },
  },
};

// Keep <html lang> in sync so Burmese typography and screen readers work.
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng?.startsWith('my') ? 'my' : 'en';
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'my'],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'maydarwe-lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
