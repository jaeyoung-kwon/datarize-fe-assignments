import type { Customer, PurchaseFrequency } from '@/lib/mockData';
import { fetcher } from '../fetcher';

type PurchaseFrequencyParams = {
  from?: string;
  to?: string;
};

export const getPurchaseFrequency = (params: PurchaseFrequencyParams) => {
  return fetcher.get<PurchaseFrequency[]>({
    path: '/api/purchase-frequency',
    query: params,
  });
};

type GetCustomersParams = {
  sortBy?: 'asc' | 'desc';
  name?: string;
};

export const getCustomers = (params: GetCustomersParams) => {
  return fetcher.get<Customer[]>({
    path: '/api/customers',
    query: params,
  });
};
