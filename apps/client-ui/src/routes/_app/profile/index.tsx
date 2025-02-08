import ProfilePage from "@/app/main/pages/profile-page/profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/profile/")({
  component: ProfilePage,
});
