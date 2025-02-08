import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/auth";

interface MyRouterContext {
  auth: AuthContext;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
function RootComponent() {
  const queryClient = React.useMemo(() => new QueryClient({}), []);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet />
          <Toaster />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
