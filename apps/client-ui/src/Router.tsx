import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LoginPage from './app/auth/login-page';
import MainLayout from './app/main/layout/main-layout';
import ProfilePage from './app/main/pages/profile/profile-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Outlet />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/register',
        element: <div>Register</div>,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
