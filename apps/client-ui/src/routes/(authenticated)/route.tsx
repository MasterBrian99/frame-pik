import MainLayout from "@/app/main/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
