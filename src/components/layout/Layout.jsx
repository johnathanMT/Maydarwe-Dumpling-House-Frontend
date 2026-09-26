import { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactLenis, useLenis } from 'lenis/react';
import { bindLenis } from '../../lib/lenisControl';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import CartDrawer from '../cart/CartDrawer';
import OrderSheet from '../order/OrderSheet';
import AnnouncementBar from '../ui/AnnouncementBar';
import ScrollProgress from '../ui/ScrollProgress';
import BackToTop from '../ui/BackToTop';
import CartToast from '../cart/CartToast';
import LoadingScreen from '../ui/LoadingScreen';
import { introAlreadySeen } from '../../lib/introSession';

/**
 * What Layout passes to pages through <Outlet context>; read it with useOutletContext().
 * @typedef {object} LayoutOutletContext
 * @property {boolean} introReady True once the first-load curtain has gone (or never showed).
 * @property {boolean} introSkipped True when the curtain was not shown on this load.
 */

const LENIS_OPTIONS = {
  lerp: 0.085,
  smoothWheel: true,
  anchors: true,
  autoToggle: true,
  stopInertiaOnNavigate: true,
};

function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    bindLenis(lenis);
    return () => bindLenis(null);
  }, [lenis]);
  return null;
}

/**
 * Renders nothing; tells Layout the page inside <Suspense> has mounted.
 * @param {object} props
 * @param {() => void} props.onMounted
 */
function ContentMounted({ onMounted }) {
  useEffect(() => {
    onMounted();
  }, [onMounted]);
  return null;
}

function PageFallback() {
  return <div className="min-h-[60vh] bg-white" aria-hidden="true" />;
}

/** App shell shared by every route. Pages render into <Outlet />. */
export default function Layout() {
  const { t } = useTranslation();
  // The curtain only plays on the first page load of a visit (see introSession.js).
  const [showIntro] = useState(() => !introAlreadySeen());
  const [ready, setReady] = useState(() => !showIntro);
  const [contentMounted, setContentMounted] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const markContentMounted = useCallback(() => setContentMounted(true), []);

  // While the curtain is up, also wait for the web fonts, so Burmese text doesn't
  // visibly swap fonts the moment the curtain lifts.
  useEffect(() => {
    if (!showIntro) return undefined;
    let alive = true;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (alive) setFontsReady(true);
    });
    return () => {
      alive = false;
    };
  }, [showIntro]);

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisBridge />
      {ready ? null : <LoadingScreen appReady={contentMounted && fontsReady} onDone={markReady} />}
      <div inert={ready ? undefined : true} className="flex min-h-dvh flex-col bg-ivory pb-[5.75rem] md:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {t('nav.skip')}
      </a>

      {/* Desktop only: on phones it competed with the header and bottom nav. */}
      <div className="hidden lg:block">
        <ScrollProgress />
      </div>
      <AnnouncementBar />
      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet context={/** @satisfies {LayoutOutletContext} */ ({ introReady: ready, introSkipped: !showIntro })} />
          <ContentMounted onMounted={markContentMounted} />
        </Suspense>
      </main>

      <Footer />
      <BottomNav />
      <BackToTop />
      <CartToast />
      <CartDrawer />
      <OrderSheet />
      <ScrollRestoration />
    </div>
    </ReactLenis>
  );
}
