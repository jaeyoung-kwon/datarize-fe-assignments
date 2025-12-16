import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { globalStyles } from '@/styles/globalStyles';
import { theme } from '@/styles/theme';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
