/**
 * 포맷팅 유틸리티 함수들
 */

import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

export const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'yyyy년 M월 d일 (EEE)', { locale: ko });
};
