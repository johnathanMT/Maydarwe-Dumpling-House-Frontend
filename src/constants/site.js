export const BRAND_LOGO_SRC = '/maydawe_dumpling_logo.JPG';

export const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/menu', labelKey: 'nav.menu' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
];

// "09-..." local format → +95 international format for tel: links
export const CONTACT_PHONES = [
  { display: '09-788167047', href: 'tel:+959788167047' },
  { display: '09-421119495', href: 'tel:+959421119495' },
];

export const FACEBOOK_ORDER_URL = 'https://www.facebook.com/share/19MK2TSnJb/?mibextid=wwXIfr';

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: FACEBOOK_ORDER_URL },
  { name: 'Messenger', href: 'https://m.me/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/' },
];

// 'my' is the ISO 639-1 code for Burmese; "MM" is only the display label
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'my', label: 'MM', name: 'မြန်မာ' },
];
