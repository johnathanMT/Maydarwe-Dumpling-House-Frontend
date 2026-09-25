import { Flame, Soup, Wheat } from 'lucide-react';

const FALLBACK_WASH = {
  mala: 'from-secondary-700 via-primary-800 to-ink-950',
  noodles: 'from-ink-800 via-ink-900 to-ink-950',
  dumplings: 'from-primary-700 via-primary-900 to-ink-950',
};

export default function DishPhoto({ item, alt, className = '' }) {
  const wash = FALLBACK_WASH[item.category] ?? FALLBACK_WASH.dumplings;
  const Icon = item.category === 'mala' ? Flame : item.category === 'noodles' ? Wheat : Soup;

  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-ink-100 ${item.inStock ? '' : 'grayscale'} ${className}`}>
      {item.image ? (
        <img
          src={item.image}
          alt={alt}
          width={800}
          height={600}
          className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-110"
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
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/10 ring-1 ring-secondary-300/50 backdrop-blur-sm">
              <Icon className="h-7 w-7 text-secondary-300" strokeWidth={1.5} />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
