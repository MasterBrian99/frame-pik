import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import LoginPage from '@/app/auth/login-page';
import MainLayout from '@/app/main/layout/main-layout';
import ProfileLayout from '@/app/main/pages/profile/layout/profile-layout';
import CollectionItemPage from '@/app/main/pages/profile/pages/collection-item-page/collection-item-page';
import CollectionPage from '@/app/main/pages/profile/pages/collection-page/collection-page';
import SnapPage from '@/app/main/pages/profile/pages/snap-page';
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
const routesForAuthenticatedOnly: RouteObject[] = [
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
            element: <ProfileLayout />,
            loader: async () => {
              startProgress();
              await Promise.all([import('@/app/main/pages/profile/layout/profile-layout')]);
              endProgress();
              return null;
            },
            children: [
              {
                path: '',
                element: <Navigate to="/profile/snaps" replace />,
              },
              {
                path: 'snaps',
                element: <SnapPage />,
              },
              {
                path: 'collections',
                element: <CollectionPage />,
              },
              {
                path: 'collections/:id',
                element: <CollectionItemPage />,
              },
            ],
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
