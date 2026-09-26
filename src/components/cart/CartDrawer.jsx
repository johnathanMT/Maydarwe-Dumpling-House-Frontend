import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Minus, Phone, Plus, ShoppingBag } from 'lucide-react';
import { useCart, useCartActions } from '../../context/CartContext';
import { useUiActions, useUiState } from '../../context/UiContext';
import { PRIMARY_PHONE, telHref } from '../../constants/site';
import { useLang } from '../../lib/businessHours';
import Sheet, { SheetCloseButton } from '../ui/Sheet';
import Button from '../ui/Button';
import OptimizedImage from '../ui/OptimizedImage';
import { PHOTOS } from '../../assets/photos';
import { formatPrice, pickLocale } from '../../data/menu';

export default function CartDrawer() {
  const { t } = useTranslation();
  const language = useLang();
  const { lines, subtotal } = useCart();
  const { updateQuantity, removeItem } = useCartActions();
  const { isCartOpen } = useUiState();
  const { closePanel, openOrder } = useUiActions();
  const titleId = useId();

  return (
    <Sheet open={isCartOpen} onClose={closePanel} labelledBy={titleId} variant="drawer">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase text-secondary-700">{t('cart.kicker')}</p>
          <h2 id={titleId} className="font-display text-2xl font-semibold text-ink-900">
            {t('cart.title')}
          </h2>
        </div>
        <SheetCloseButton onClick={closePanel} label={t('cart.close')} />
      </div>

      {lines.length === 0 ? (
        <div className="grid flex-1 place-items-center px-8 text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary-700">
              <ShoppingBag className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-ink-600">{t('cart.empty')}</p>
            <Button as={Link} to="/menu" onClick={closePanel} size="sm" className="mt-6">
              {t('cart.browse')}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {lines.map((line) => {
              const name = pickLocale(line.name, language);
              return (
                <li key={line.id} className="rounded-2xl border border-ink-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      {PHOTOS[line.photo] ? (
                        <OptimizedImage
                          image={PHOTOS[line.photo]}
                          alt=""
                          sizes="56px"
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-display text-lg font-semibold text-ink-900">{name}</p>
                        <p className="mt-1 text-sm text-primary-700">{formatPrice(line.price, language)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      className="inline-flex min-h-12 min-w-12 items-center text-sm font-medium text-ink-500 hover:text-primary-700"
                    >
                      {t('cart.remove')}
                      <span className="sr-only">: {name}</span>
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-ink-200">
                      <button
                        type="button"
                        aria-label={`${t('cart.decrease')}: ${name}`}
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="grid h-12 w-12 place-items-center text-ink-800 hover:text-primary-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`${t('cart.increase')}: ${name}`}
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="grid h-12 w-12 place-items-center text-ink-800 hover:text-primary-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-semibold tabular-nums text-ink-900">{formatPrice(line.price * line.quantity, language)}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-ink-100 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-center justify-between text-ink-900">
              <span className="font-medium">{t('cart.subtotal')}</span>
              <span className="font-display text-2xl font-semibold tabular-nums">{formatPrice(subtotal, language)}</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">{t('cart.note')}</p>
            <Button as="a" href={telHref(PRIMARY_PHONE)} block className="mt-4">
              <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {t('cart.call')} · <span className="tabular-nums">{PRIMARY_PHONE.display}</span>
            </Button>
            <Button variant="secondary" block className="mt-2" onClick={openOrder}>
              {t('cart.moreWays')}
            </Button>
          </div>
        </>
      )}
    </Sheet>
  );
}
