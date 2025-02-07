import RegisterPage from "@/app/auth/register-page/register-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});
