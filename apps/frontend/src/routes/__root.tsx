import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { globalStyles } from '@/styles/globalStyles';
import { theme } from '@/styles/theme';
import NotFoundPage from '@/pages/notFound/NotFoundPage';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  ),
  notFoundComponent: NotFoundPage,
});
