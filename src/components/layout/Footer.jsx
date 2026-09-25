import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { CONTACT_PHONES, NAV_LINKS, SOCIAL_LINKS } from '../../constants/site';

function FooterHeading({ children }) {
  return <h2 className="font-display text-lg font-semibold text-white">{children}</h2>;
}

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div aria-hidden="true" className="h-1 bg-primary-600" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        {/* Brand + socials */}
        <div className="sm:col-span-2 lg:col-span-4">
          <BrandLogo variant="dark" />
          <p className="mt-5 max-w-xs">{t('footer.about')}</p>

          <p className="mt-8 font-medium text-white">{t('footer.follow')}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-ink-700 px-4 py-1.5 text-sm text-ink-100 transition-colors hover:border-secondary-400 hover:text-secondary-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Page links */}
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

        {/* Phones */}
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

        {/* Map */}
        <div className="sm:col-span-2 lg:col-span-4">
          <FooterHeading>{t('footer.location')}</FooterHeading>
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-ink-700 bg-ink-900 sm:aspect-[16/9] lg:aspect-[4/3]">
            {/*
              Replace the placeholder below with your Google Maps embed:
              Google Maps → Share → Embed a map → copy the src URL.

              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
                title="Maydarwe Dumpling House location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            */}
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <MapPin className="mx-auto h-7 w-7 text-secondary-400" strokeWidth={1.75} />
                <p className="mt-2 text-sm text-ink-400">{t('footer.mapPlaceholder')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-ink-500 sm:px-6 lg:px-8">
          © {year} Maydarwe Dumpling House. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
