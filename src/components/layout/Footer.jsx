import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Phone } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { Reveal } from '../ui/Reveal';
import { BUSINESS, MAPS_URL, NAV_LINKS, telHref } from '../../constants/site';
import { useBusinessCopy, useLang } from '../../lib/businessHours';

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
function FooterHeading({ children }) {
  return <h2 className="font-display text-lg font-semibold text-white">{children}</h2>;
}

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const copy = useBusinessCopy();
  const lang = useLang();
  const address = BUSINESS.address[lang] || BUSINESS.address.en;

  return (
    <Reveal as="footer" distance={40} className="bg-ink-950 text-ink-300">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-28">
        <div className="sm:col-span-2 lg:col-span-5">
          <BrandLogo size="footer" />
          <p className="mt-5 max-w-sm leading-relaxed">{t('footer.about')}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-100">{address}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-start gap-2 text-sm font-medium leading-relaxed text-secondary-300 underline decoration-secondary-500/70 underline-offset-4 transition-colors duration-200 hover:text-secondary-100 hover:decoration-secondary-300"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span>{t('footer.viewOnMaps')}</span>
            <span className="sr-only">({t('order.newTab')})</span>
          </a>
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
                    `inline-flex min-h-12 min-w-12 items-center px-0.5 transition-colors hover:text-secondary-300 ${isActive ? 'text-secondary-400' : ''}`
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
            {BUSINESS.phones.map((phone) => (
              <li key={phone.e164}>
                <a
                  href={telHref(phone)}
                  className="inline-flex min-h-12 items-center gap-2 text-ink-100 transition-colors hover:text-secondary-300"
                >
                  <Phone className="h-4 w-4 text-secondary-400" strokeWidth={2} />
                  <span className="tabular-nums">{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>{t('footer.hours')}</FooterHeading>
          <p className="mt-4 inline-flex items-start gap-2 text-ink-100">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" strokeWidth={2} />
            <span>{t('hours.daily', copy)}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-ink-500 sm:px-6 lg:px-8">
          © {year} {t('brand.official')}. {t('footer.rights')}
        </p>
      </div>
    </Reveal>
  );
}
