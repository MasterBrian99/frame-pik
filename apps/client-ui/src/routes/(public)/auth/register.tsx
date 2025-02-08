import RegisterPage from '@/app/auth/register-page/register-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/auth/register')({
  component: RegisterPage,
})
