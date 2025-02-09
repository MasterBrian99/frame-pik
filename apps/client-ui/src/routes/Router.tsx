import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import LoginPage from '@/app/auth/login-page';
import MainLayout from '@/app/main/layout/main-layout';
import ProfilePage from '@/app/main/pages/profile-page/profile-page';
import { useAuth } from '@/provider/auth-provider';
import { endProgress, startProgress } from '@/shared/progress';
import { ProtectedRoute } from './protected-route';

const publicRoutes = [
  {
    path: '/auth',
    element: <Outlet />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      // {
      //   path: 'register',
      //   element: <SignUpPage />,
      // },
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
          await Promise.all([import('@/app/main/layout/main-layout')]);
          endProgress();
          return null;
        },
        children: [
          {
            path: '/',
            element: <Outlet />,
            loader: async () => {
              startProgress();
              endProgress();
              return null;
            },
          },
          {
            path: '/profile',
            element: <ProfilePage />,
            loader: async () => {
              startProgress();
              await Promise.all([import('@/app/main/pages/profile-page/profile-page')]);
              endProgress();
              return null;
            },
            children: [],
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
    ]
    // {
    //   future: {
    //     v7_relativeSplatPath: true,
    //     v7_fetcherPersist: true,
    //     v7_normalizeFormMethod: true,
    //   },
    // }
  );

  return <RouterProvider router={router} />;
}
