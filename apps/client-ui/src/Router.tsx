import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import Layout from './app/auth/layout/layout';
import LoginPage from './app/auth/pages/login-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element:<Layout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage/>,
      },
      {
        path: '/auth/register',
        element: <div>Register</div>,
      },
    ],
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
