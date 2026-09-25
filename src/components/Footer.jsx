import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Phone } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/menu', labelKey: 'nav.menu' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
];

const CONTACT_PHONES = [
  { display: '09-788167047', href: 'tel:+959788167047' },
  { display: '09-421119495', href: 'tel:+959421119495' },
];

function FooterHeading({ children }) {
  return <h2 className="font-display text-lg font-semibold text-white">{children}</h2>;
}

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-5">
          <p className="font-display text-2xl font-semibold text-white">{t('brand.name')}</p>
          <p className="mt-1 text-sm font-medium text-secondary-400">{t('brand.tagline')}</p>
          <p className="mt-5 max-w-xs">{t('footer.about')}</p>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>{t('footer.explore')}</FooterHeading>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map(({ to, labelKey, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `transition-colors hover:text-secondary-300 ${isActive ? 'text-secondary-400' : ''}`
                  }
                >
                  {t(labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>{t('footer.contact')}</FooterHeading>
          <ul className="mt-4 space-y-3">
            {CONTACT_PHONES.map(({ display, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 text-ink-100 transition-colors hover:text-secondary-300"
                >
                  <Phone className="h-4 w-4 text-secondary-400" strokeWidth={2} />
                  <span className="tabular-nums">{display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>{t('footer.hours')}</FooterHeading>
          <p className="mt-4 inline-flex items-start gap-2 text-ink-100">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" strokeWidth={2} />
            <span>{t('footer.hoursValue')}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-ink-500 sm:px-6 lg:px-8">
          © {year} {t('brand.official')}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
