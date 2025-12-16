/**
 * Dashboard Query Factory
 * React Query와 함께 사용하는 쿼리 팩토리입니다.
 * queryKey와 queryFn을 함께 관리하여 타입 안전성과 일관성을 보장합니다.
 *
 * @example
 * const { data } = useQuery(dashboardQueries.customers({ name: 'John' }));
 */

import { getCustomers, getPurchaseFrequency } from '.';

export const dashboardQueries = {
  /** 모든 대시보드 쿼리의 기본 키 */
  all: ['dashboard'] as const,

  /** 가격대별 구매 빈도 쿼리 */
  purchaseFrequency: (params: { from?: string; to?: string }) => ({
    queryKey: [...dashboardQueries.all, 'purchaseFrequency', params] as const,
    queryFn: () => getPurchaseFrequency(params),
  }),

  /** 고객 목록 쿼리 */
  customers: (params: { sortBy?: 'asc' | 'desc'; name?: string }) => ({
    queryKey: [...dashboardQueries.all, 'customers', params] as const,
    queryFn: () => getCustomers(params),
    retry: (failureCount: number, error: unknown) => {
      // 404 에러면 재시도하지 않음
      if (error && typeof error === 'object' && 'status' in error) {
        if ((error as { status: number }).status === 404) {
          return false;
        }
      }
      // 그 외 에러는 최대 3번까지 재시도
      return failureCount < 3;
    },
  }),
};
