import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth/")({
  loader: () => {
    redirect({
      to: "/auth/login",
      throw: true,
    });
  },
});
