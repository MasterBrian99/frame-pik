import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useAuth } from '@/provider/auth-provider';
import { ProtectedRoute } from './protected-route';

const MainLayout = React.lazy(() => import('@/app/main/layout/layout'));
const ProfileLayout = React.lazy(() => import('@/app/profile/layout/layout'));
const AuthLayout = React.lazy(() => import('@/app/auth/layout/layout'));
const LoginPage = React.lazy(() => import('@/app/auth/pages/login-page'));
const SignUpPage = React.lazy(() => import('@/app/auth/pages/sign-up-page'));
const ProfilePage = React.lazy(() => import('@/app/profile/pages/profile-page/profile-page'));
const ProfileCollectionPage = React.lazy(
  () => import('@/app/profile/pages/collection-page/collection-page')
);
const publicRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
    ],
  },
];
const routesForAuthenticatedOnly: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [],
      },
      {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
          {
            path: 'collection',
            element: <ProfileCollectionPage />,
          },
        ],
      },
    ],
  },
];
const routesForNotAuthenticatedOnly: RouteObject[] = [];

export function Router() {
  const { token } = useAuth();
  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}
