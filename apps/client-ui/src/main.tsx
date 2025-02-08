import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./i18n/config";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./auth";
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

// Import the generated route tree

// Create a new router instance

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
