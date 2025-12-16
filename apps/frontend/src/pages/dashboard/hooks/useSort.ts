import { useSearchParamState } from '../../../hooks/useSearchParamState';
import type { SortOrder } from '@/types';

export const useSort = () => {
  const [sortBy, setSortBy] = useSearchParamState<SortOrder | null>('sort', {
    defaultValue: null,
  });

  const handleSort = () => {
    if (!sortBy) {
      setSortBy('desc');
    } else if (sortBy === 'desc') {
      setSortBy('asc');
    } else {
      setSortBy(null);
    }
  };

  return {
    sortBy,
    handleSort,
  };
};
