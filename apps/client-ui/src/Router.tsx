import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LoginPage from './app/auth/login-page';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
