import { getCustomers, getPurchaseFrequency } from '.';

export const dashboardQueries = {
  all: ['dashboard'] as const,

  purchaseFrequency: (params: { from?: string; to?: string }) => ({
    queryKey: [...dashboardQueries.all, 'purchaseFrequency', params] as const,
    queryFn: () => getPurchaseFrequency(params),
  }),

  customers: (params: { sortBy?: 'asc' | 'desc'; name?: string }) => ({
    queryKey: [...dashboardQueries.all, 'customers', params] as const,
    queryFn: () => getCustomers(params),
  }),
};
