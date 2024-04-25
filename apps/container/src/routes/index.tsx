import { paths } from '@mfe-tutorial/data';
import { withSuspense } from '@mfe-tutorial/ui';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = withSuspense(lazy(() => import('../pages/home')));
const LoginPage = withSuspense(lazy(() => import('../pages/login')));
const Info = withSuspense(lazy(() => import('info/InfoContainer')));

export const routes: RouteObject[] = [
  {
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.info,
    element: <Info />,
  },
];
