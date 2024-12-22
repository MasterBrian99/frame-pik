import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
// import MainLayout from '@/app/main/layout/layout';
import { useAuth } from '@/provider/auth-provider';
import { endProgress, startProgress } from '@/shared/progress';
import { ProtectedRoute } from './protected-route';

const AuthLayout = React.lazy(() => import('@/app/auth/layout/layout'));
const MainLayout = React.lazy(() => import('@/app/main/layout/layout'));
const SignInPage = React.lazy(() => import('@/app/auth/pages/sign-in-page/sign-in-page'));
const ProfileLayout = React.lazy(() => import('@/app/main/pages/profile/layout/layout'));
const HomePage = React.lazy(() => import('@/app/main/pages/home-page/home-page'));
const ProfilePage = React.lazy(
  () => import('@/app/main/pages/profile/pages/profile-page/profile-page')
);
const SignUpPage = React.lazy(() => import('@/app/auth/pages/sign-up-page/sign-up-page'));
const WallPage = React.lazy(() => import('@/app/main/pages/wall/wall-page/wall-page'));
const WallCreatePage = React.lazy(
  () => import('@/app/main/pages/wall/wall-create-page/wall-create-page')
);

// const router = createBrowserRouter([

//   {
//     path: '/auth',
//     element: <AuthLayout />,
//     children: [
//       {
//         path: 'login',
//         element: <SignInPage />,
//       },
//     ],
//   }
// ]);

const publicRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignInPage />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
    ],
  },
];
const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        loader: async () => {
          startProgress();
          await Promise.all([import('@/app/main/layout/layout')]);
          endProgress();
          return null;
        },
        children: [
          {
            path: '/',
            element: <HomePage />,
            loader: async () => {
              startProgress();
              await Promise.all([import('@/app/main/pages/home-page/home-page')]);
              endProgress();
              return null;
            },
          },
          {
            path: '/profile',
            element: <ProfileLayout />,
            loader: async () => {
              startProgress();
              await Promise.all([import('@/app/main/pages/profile/layout/layout')]);
              endProgress();
              return null;
            },
            children: [
              {
                path: '',
                element: <ProfilePage />,
                loader: async () => {
                  startProgress();
                  await Promise.all([
                    import('@/app/main/pages/profile/pages/profile-page/profile-page'),
                  ]);
                  endProgress();
                  return null;
                },
              },
            ],
          },
          {
            path: 'wall',
            element: <WallPage />,
            loader: async () => {
              startProgress();
              await Promise.all([import('@/app/main/pages/wall/wall-page/wall-page')]);
              endProgress();

              return null;
            },
          },
          {
            path: 'wall/create',
            element: <WallCreatePage />,
            loader: async () => {
              startProgress();
              await Promise.all([
                import('@/app/main/pages/wall/wall-create-page/wall-create-page'),
              ]);
              endProgress();
              return null;
            },
          },
        ],
      },
    ],
  },
];

const routesForNotAuthenticatedOnly: RouteObject[] = [];

export function Router() {
  const { token } = useAuth();
  const router = createBrowserRouter(
    [
      ...publicRoutes,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
      },
    }
  );

  return <RouterProvider router={router} />;
}

// https://github.com/Exlint/dashboard/blob/main/apps/frontend/src/App.router.tsx
