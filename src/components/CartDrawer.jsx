import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONTACT_PHONES } from '../constants/site';
import OptimizedImage from './ui/OptimizedImage';
import { formatPrice, pickLocale } from '../data/menu';

export default function CartDrawer() {
  const { t, i18n } = useTranslation();
  const { lines, subtotal, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const language = i18n.resolvedLanguage === 'my' ? 'my' : 'en';
  const orderPhone = CONTACT_PHONES[0];

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label={t('cart.close')}
        onClick={closeCart}
        className={`absolute inset-0 bg-ink-950/45 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase text-secondary-700">{t('cart.kicker')}</p>
            <h2 id="cart-title" className="font-display text-2xl font-semibold text-ink-900">
              {t('cart.title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t('cart.close')}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center px-8 text-center">
            <div>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary-700">
                <ShoppingBag className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-ink-600">{t('cart.empty')}</p>
              <Link
                to="/menu"
                onClick={closeCart}
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                {t('cart.browse')}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {lines.map((line) => (
                <li key={line.id} className="rounded-2xl border border-ink-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      {line.image ? (
                        <OptimizedImage
                          src={line.image}
                          alt=""
                          width={56}
                          height={56}
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-display text-lg font-semibold text-ink-900">
                          {pickLocale(line.name, language)}
                        </p>
                        <p className="mt-1 text-sm text-primary-700">{formatPrice(line.price)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      className="inline-flex min-h-12 min-w-12 items-center text-sm font-medium text-ink-500 hover:text-primary-700"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-ink-200">
                      <button
                        type="button"
                        aria-label={t('cart.decrease')}
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="grid h-12 w-12 place-items-center text-ink-800 hover:text-primary-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={t('cart.increase')}
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="grid h-12 w-12 place-items-center text-ink-800 hover:text-primary-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-ink-900">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink-100 px-5 py-5">
              <div className="flex items-center justify-between text-ink-900">
                <span className="font-medium">{t('cart.subtotal')}</span>
                <span className="font-display text-2xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm text-ink-500">{t('cart.note')}</p>
              <a
                href={orderPhone.href}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700"
              >
                {t('cart.call')} · {orderPhone.display}
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
