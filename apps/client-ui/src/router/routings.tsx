import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import AuthLayout from '@/app/auth/layout/auth-layout'
export const Routings = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          {routes.map((routeProps) => (
            <Route {...routeProps} key={routeProps.path as string} />
          ))}
        </Route>

        {/* {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))} */}
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </Suspense>
  )
}
