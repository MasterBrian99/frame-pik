import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import AuthProvider from './provider/auth-provider';
import { Router } from './routes/Router';
import { theme } from './theme';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" />
          <NavigationProgress />
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
