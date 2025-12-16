/**
 * Dashboard API functions
 * 대시보드 관련 API 호출 함수들을 정의합니다.
 * React Query와 함께 사용하려면 queries.ts를 import하세요.
 */

import type { Customer, PurchaseFrequency } from '@/lib/mockData';
import type { SortOrder } from '@/types';
import { fetcher } from '../fetcher';

type PurchaseFrequencyParams = {
  from?: string;
  to?: string;
};

/** 가격대별 구매 빈도 데이터를 조회합니다 */
export const getPurchaseFrequency = (params: PurchaseFrequencyParams) => {
  return fetcher.get<PurchaseFrequency[]>({
    path: '/api/purchase-frequency',
    query: params,
  });
};

type GetCustomersParams = {
  sortBy?: SortOrder;
  name?: string;
};

/** 고객 목록을 조회합니다 */
export const getCustomers = (params: GetCustomersParams) => {
  return fetcher.get<Customer[]>({
    path: '/api/customers',
    query: params,
  });
};
