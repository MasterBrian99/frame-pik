import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const LoginPage = React.lazy(
  () => import('@/app/auth/page/login-page/login-page')
)

const HomePage = React.lazy(
  () => import('@/app/main/pages/home-page/home-page')
)

export const routes: Array<PathRouteProps> = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <HomePage />
  }
]

export const privateRoutes: Array<PathRouteProps> = []
