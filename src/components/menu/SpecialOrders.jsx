import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Phone } from 'lucide-react';
import { PRIMARY_PHONE, telHref } from '../../constants/site';
import { fadeUp, stagger } from '../../lib/motion';
import Button from '../ui/Button';

const CLOUD = 'https://res.cloudinary.com/dhlhzmmtt/image/upload';

/** Same photos, delivered smaller than the original uploads. */
const photo = (version, id, width) => `${CLOUD}/f_auto,q_auto,c_limit,w_${width}/${version}/${id}`;

/**
 * Overlapping prints. Mobile is a vertical cascade; from md the same five
 * prints sit in one composed cluster beside the invitation.
 */
const FRAMES = [
  {
    src: photo('v1790427356', 'IMG_8016_cbz6or.jpg', 1600),
    altKey: 'pages.menu.specialPhoto1',
    place: 'left-[5%] top-[1%] z-10 h-[34%] w-[86%] md:left-[1%] md:top-[4%] md:h-[56%] md:w-[58%]',
    tilt: '-rotate-1 md:-rotate-2',
  },
  {
    src: photo('v1790427357', 'IMG_8019_v5brsd.jpg', 1200),
    altKey: 'pages.menu.specialPhoto4',
    place: 'right-[4%] top-[26%] z-20 h-[28%] w-[48%] md:right-[5%] md:top-0 md:h-[46%] md:w-[40%]',
    tilt: 'rotate-2',
  },
  {
    src: photo('v1790427353', 'IMG_8012_n6miep.jpg', 1200),
    altKey: 'pages.menu.specialPhoto2',
    place: 'left-[4%] top-[43%] z-30 h-[25%] w-[48%] md:left-auto md:right-[4%] md:top-[40%] md:h-[28%] md:w-[44%]',
    tilt: '-rotate-2 md:-rotate-1',
  },
  {
    src: photo('v1790427354', 'IMG_8013_wecdgz.jpg', 1200),
    altKey: 'pages.menu.specialPhoto3',
    place: 'left-[7%] top-[60%] z-20 h-[27%] w-[46%] md:bottom-auto md:left-[1%] md:top-[52%] md:h-[36%] md:w-[34%]',
    tilt: 'rotate-1 md:rotate-2',
  },
  {
    src: photo('v1790427353', 'IMG_8011_q1zkly.jpg', 1200),
    altKey: 'pages.menu.specialPhoto5',
    place: 'right-[4%] top-[67%] z-40 h-[30%] w-[46%] md:bottom-auto md:left-[26%] md:right-auto md:top-[54%] md:h-[38%] md:w-[32%]',
    tilt: '-rotate-2',
  },
];

/**
 * Catering close for the menu page: a short invitation, the kitchen phone,
 * and a collage of real special-order photos.
 */
export default function SpecialOrders() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden border-t border-secondary-200/80 bg-[linear-gradient(180deg,#FDFAF6_0%,#FFF8EA_46%,#FDFAF6_100%)] py-24 md:py-32"
      aria-labelledby="special-orders-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-secondary-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-primary-100/60 blur-3xl"
      />

      <m.div
        className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8"
        variants={stagger(0.16, 0.04)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <m.div variants={fadeUp(24)} className="max-w-xl lg:col-span-4">
          <span aria-hidden="true" className="mb-6 block h-px w-16 bg-secondary-500" />
          <h2
            id="special-orders-title"
            className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl lg:text-[3.25rem]"
          >
            {t('pages.menu.specialTitle')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">{t('pages.menu.specialBody')}</p>
          <div className="mt-8">
            <Button
              as="a"
              href={telHref(PRIMARY_PHONE)}
              magnetic
              className="h-auto max-w-xl whitespace-normal px-7 py-3.5 text-left leading-snug !bg-primary-900 !shadow-[0_18px_40px_-16px_rgba(64,4,14,0.75)] ring-2 ring-secondary-400/80 hover:!bg-primary-800"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />
              {t('pages.menu.specialCta')}
            </Button>
          </div>
        </m.div>

        <m.ul
          variants={stagger(0.1, 0.05)}
          className="relative mt-8 h-[36rem] sm:h-[40rem] md:mt-4 md:h-[34rem] lg:col-span-8 lg:mt-0 lg:h-[36rem] xl:h-[40rem]"
        >
          <li
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[1%] hidden h-[50%] w-[54%] -rotate-1 rounded-[1.85rem] border border-secondary-400/90 md:block"
          />
          {FRAMES.map(({ src, altKey, place, tilt }) => (
            <m.li key={altKey} variants={fadeUp(22)} className={`group absolute hover:z-50 ${place}`}>
              <div
                className={`h-full rounded-[1.35rem] bg-white p-1.5 shadow-lift ring-1 ring-secondary-200/90 transition duration-700 ease-in-out group-hover:z-50 group-hover:rotate-0 group-hover:shadow-[0_32px_60px_-28px_rgba(64,4,14,0.55)] sm:p-2 ${tilt}`}
              >
                <div className="h-full overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt={t(altKey)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </m.li>
          ))}
        </m.ul>
      </m.div>
    </section>
  );
}
