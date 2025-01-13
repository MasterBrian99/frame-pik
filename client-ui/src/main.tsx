import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./i18n/config";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
const router = createRouter({ routeTree });

// Import the generated route tree

// Create a new router instance

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
