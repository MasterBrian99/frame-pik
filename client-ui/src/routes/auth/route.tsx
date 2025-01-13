import AuthLayout from "@/app/auth/layout/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthLayout />;
}
