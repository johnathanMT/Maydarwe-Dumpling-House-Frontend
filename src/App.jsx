import { lazy } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RouteError from './components/ui/RouteError';
import RootError from './components/ui/RootError';
import { UiProvider } from './context/UiContext';
import { CartProvider } from './context/CartContext';
import { DURATION, EASE_OUT, loadMotionFeatures } from './lib/motion';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // Last line of defence: the shell itself failed. Renders without the layout.
    errorElement: <RootError />,
    children: [
      {
        // A page failed: keep the header and footer, show a friendly message.
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Home /> },
          { path: 'menu', element: <Menu /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    // reducedMotion="user": visitors who ask their OS for less motion get fades only, no movement.
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION.ui, ease: EASE_OUT }}>
      {/* `strict` forbids the heavy `motion.*` components; use the light `m.*` ones. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <UiProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </UiProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
