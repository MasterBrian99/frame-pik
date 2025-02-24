import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './routes/Router';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import AuthProvider from './provider/auth-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <NavigationProgress />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
