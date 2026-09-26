import OptimizedImage from '../ui/OptimizedImage';
import { PHOTOS } from '../../assets/photos';
import { CATEGORY_ICONS } from './categoryIcons';

const FALLBACK_WASH = {
  mala: 'from-secondary-700 via-primary-800 to-ink-950',
  noodles: 'from-ink-800 via-ink-900 to-ink-950',
  dumplings: 'from-primary-700 via-primary-900 to-ink-950',
};

// Card widths: 1 column on phones, 2 from `sm`, 3 from `lg` (max container 1280px).
const CARD_SIZES = '(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw';

export default function DishPhoto({ item, alt, className = '' }) {
  const wash = FALLBACK_WASH[item.category] ?? FALLBACK_WASH.dumplings;
  const Icon = CATEGORY_ICONS[item.category] ?? CATEGORY_ICONS.dumplings;
  const photo = PHOTOS[item.photo];

  return (
    <div className={`relative aspect-square overflow-hidden bg-ivory ${item.inStock ? '' : 'grayscale'} ${className}`}>
      {photo ? (
        <OptimizedImage
          image={photo}
          alt={alt}
          sizes={CARD_SIZES}
          pictureClassName="block h-full w-full"
          className="h-full w-full object-contain object-center"
        />
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${wash}`} />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgb(232 160 6 / 0.35), transparent 42%), radial-gradient(circle at 80% 80%, rgb(200 16 46 / 0.4), transparent 46%)',
            }}
          />
          <div className="absolute inset-4 rounded-[1.25rem] border border-secondary-400/30" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 ring-1 ring-butter/60 backdrop-blur-sm">
              <Icon className="h-7 w-7 text-butter" strokeWidth={1.5} />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
