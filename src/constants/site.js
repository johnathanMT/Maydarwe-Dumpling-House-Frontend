/**
 * Single source of truth for business facts.
 *
 * Everything the site says about the shop — hours, phones, ordering links,
 * address — comes from BUSINESS. The UI, the translations (through
 * interpolation), the <head> meta tags (through vite.config.js) and the
 * open/closed status all read from here, so a change is made once.
 *
 * This file must stay plain JavaScript with no browser globals or JSX:
 * vite.config.js imports it at build time.
 */

export const SITE_URL = 'https://maydarwedumpling.com';

export const BUSINESS = {
  name: {
    en: 'Maydarwe Dumpling House',
    my: 'မေဓါဝီဖက်ထုပ်အိုးကပ်ဆိုင်',
  },
  established: 2021,
  timeZone: 'Asia/Yangon',

  // 24-hour "HH:MM". Open every day of the week.
  hours: {
    opens: '09:00',
    closes: '20:00',
  },

  // First entry is the primary ordering line.
  phones: [
    { display: '09-788167047', e164: '+959788167047' },
    { display: '09-421119495', e164: '+959421119495' },
  ],

  // Street line shown beside the map. The pin itself is MAPS_PIN.
  address: {
    en: 'G/528 (A), in front of B.E.M.S. No. 4, Maydarwe Road, Ward (G), North Okkalapa Township, Yangon',
    my: 'ဂ/၅၂၈ (A) ၊ အ.လ.က - ၄ ကျောင်းရှေ့ မေဓါဝီလမ်း ၊ (ဂ)ရပ်ကွက် မြောက်ဥက္ကလာပမြို့နယ် ၊ ရန်ကုန်မြို့',
    city: { en: 'Yangon', my: 'ရန်ကုန်' },
    // Optional: what to search for on Google Maps. Defaults to the name + address.
    mapsQuery: '',
  },

  links: {
    grab: 'https://app.grab.com/s/Tgdxro4N',
    foodpanda: 'https://foodpanda.go.link/lINRB',
    facebook: 'https://www.facebook.com/share/19MK2TSnJb/?mibextid=wwXIfr',
    messengerPageId: 'maydarwedumpling',
  },
};

export const PRIMARY_PHONE = BUSINESS.phones[0];

export const telHref = (phone) => `tel:${phone.e164}`;

/** Messenger deep link with a pre-filled order: https://m.me/{pageId}?text=… */
export function messengerOrderHref(text) {
  const pageId = BUSINESS.links.messengerPageId.trim();
  if (!pageId) return BUSINESS.links.facebook;
  return `https://m.me/${encodeURIComponent(pageId)}?text=${encodeURIComponent(text)}`;
}

export const hasAddress = () => BUSINESS.address.en.trim().length > 0;

export function mapsQuery() {
  const { address } = BUSINESS;
  return address.mapsQuery || [BUSINESS.name.en, address.en, address.city.en].filter(Boolean).join(', ');
}

/** The shop pin. Used by the address link in the footer and on the contact page. */
export const MAPS_URL = 'https://maps.app.goo.gl/W3EpjYz76sKvwDNj9?g_st=ic';

/** Coordinates of that same pin, so the embedded map drops the marker on the shop. */
export const MAPS_PIN = { lat: 16.8988787, lng: 96.1529404 };

export const mapsDirectionsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery())}`;

export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${MAPS_PIN.lat},${MAPS_PIN.lng}&z=16&output=embed`;

/** "09:00" → "9:00 AM", used for English copy and build-time meta tags. */
export function formatTimeEn(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Default meta description, injected into index.html at build time. */
export function defaultDescription() {
  const { opens, closes } = BUSINESS.hours;
  return `${BUSINESS.name.en} | ${BUSINESS.name.my} — handmade pan-fried dumplings, mala xiang guo and noodles in ${BUSINESS.address.city.en}, Myanmar. Open daily ${formatTimeEn(opens)} – ${formatTimeEn(closes)}. Order by phone, Grab or foodpanda.`;
}

// Share image (1200×630) and icons live in /public so crawlers can fetch them by a fixed URL.
export const OG_IMAGE_PATH = '/og-image.jpg';

export const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/menu', labelKey: 'nav.menu' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
];

// 'my' is the ISO 639-1 code for Burmese; "MM" is only the display label
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'my', label: 'MM', name: 'မြန်မာ' },
];
