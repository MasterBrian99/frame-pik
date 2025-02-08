import LoginPage from '@/app/auth/login-page/login-page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(public)/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
