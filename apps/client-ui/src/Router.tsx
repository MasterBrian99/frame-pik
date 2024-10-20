import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const MainLayout = React.lazy(() => import('@/app/main/layout/layout'));
const ProfileLayout = React.lazy(() => import('@/app/main/pages/profile/layout/layout'));
const HomePage = React.lazy(() => import('@/app/main/pages/home-page/home-page'));
const ProfilePage = React.lazy(
  () => import('@/app/main/pages/profile/pages/profile-page/profile-page')
);
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
