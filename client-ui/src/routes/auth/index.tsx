import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
  loader: () => {
    redirect({
      to: "/auth/login",
      throw: true,
    });
  },
});

function RouteComponent() {
  return <div>Hello "/auth/"!</div>;
}
