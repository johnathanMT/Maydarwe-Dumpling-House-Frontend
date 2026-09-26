/**
 * schema.org Restaurant data, generated from the same BUSINESS and MENU
 * data the site renders, and injected into index.html at build time
 * (vite.config.js). Search engines read it without running JavaScript;
 * it powers rich results such as hours, price range and the menu.
 *
 * Plain JavaScript only: this runs in Node during the build.
 */
import { BUSINESS, OG_IMAGE_PATH, SITE_URL, hasAddress } from '../constants/site.js';
import { CATEGORIES, MENU_ITEMS } from '../data/menu.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const grouped = (n) => new Intl.NumberFormat('en-US').format(n);

export function restaurantJsonLd() {
  const prices = MENU_ITEMS.map((item) => item.price);
  const { address } = BUSINESS;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: BUSINESS.name.en,
    alternateName: BUSINESS.name.my,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    logo: `${SITE_URL}/icon-192.png`,
    telephone: BUSINESS.phones[0].e164,
    foundingDate: String(BUSINESS.established),
    servesCuisine: ['Dumplings', 'Chinese', 'Shan', 'Sichuan'],
    priceRange: `Ks ${grouped(Math.min(...prices))} – ${grouped(Math.max(...prices))}`,
    currenciesAccepted: 'MMK',
    address: {
      '@type': 'PostalAddress',
      ...(hasAddress() ? { streetAddress: address.en } : {}),
      addressLocality: address.city.en,
      addressCountry: 'MM',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS,
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    sameAs: [BUSINESS.links.facebook],
    hasMenu: {
      '@type': 'Menu',
      url: `${SITE_URL}/menu`,
      hasMenuSection: CATEGORIES.map((category) => ({
        '@type': 'MenuSection',
        name: category.title.en,
        hasMenuItem: MENU_ITEMS.filter((item) => item.category === category.id).map((item) => ({
          '@type': 'MenuItem',
          name: item.name.en,
          alternateName: item.name.my,
          description: item.blurb.en,
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'MMK',
            availability: item.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          },
        })),
      })),
    },
  };
}

/** Serialise for an inline <script type="application/ld+json"> (no "</script>" breakout). */
export function jsonLdScriptContent(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
