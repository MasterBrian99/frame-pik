import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useAuth } from '@/provider/auth-provider';
import React from 'react';
const MainLayout = React.lazy(() => import('@/app/main/layout/layout'));
const ProfileLayout = React.lazy(() => import('@/app/profile/layout/layout'));
const AuthLayout = React.lazy(() => import('@/app/auth/layout/layout'));
const LoginPage = React.lazy(() => import('@/app/auth/pages/login-page'));
const SignUpPage = React.lazy(() => import('@/app/auth/pages/sign-up-page'));
const ProfilePage = React.lazy(() => import('@/app/profile/pages/profile-page/profile-page'));
const ProfileCollectionPage = React.lazy(() => import('@/app/profile/pages/collection-page/collection-page'));
const publicRoutes  = [
    {
        path:"/",
    element: <MainLayout />,
    children:[]

    },
    {
      path:"/profile",
  element: <ProfileLayout />,
  children:[{
    path:"",
    element:<ProfilePage/>
  },{
    path:"collection",
    element:<ProfileCollectionPage/>
  }]

  },
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
//   {
//     path: '/',
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: '/',
//         element: <MainLayout />,
//         loader: async () => {
//           startProgress();
//           await Promise.all([import('@/app/main/layout')]);
//           endProgress();
//           return null;
//         },
//         children: [
//           {
//             path: '/',
//             element: <Outlet />,
//             loader: async () => {
//               startProgress();
//               endProgress();
//               return null;
//             },
//           },
//           {
//             path: '/profile',
//             element: <ProfileLayout />,
//             loader: async () => {
//               startProgress();
//               await Promise.all([import('@/app/main/pages/profile/layout/profile-layout')]);
//               endProgress();
//               return null;
//             },
//             children: [
//               {
//                 path: '',
//                 element: <Navigate to="/profile/snaps" replace />,
//               },
//               {
//                 path: 'snaps',
//                 element: <SnapPage />,
//               },
//               {
//                 path: 'collections',
//                 element: <CollectionPage />,
//               },
//               {
//                 path: 'collections/:id',
//                 element: <CollectionItemPage />,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
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
