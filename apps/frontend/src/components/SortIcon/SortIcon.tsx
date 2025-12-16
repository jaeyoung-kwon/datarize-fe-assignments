import ArrowDown from '#/arrow_down.svg?react';
import ArrowUp from '#/arrow_up.svg?react';
import type { SortOrder } from '@/types';

interface SortIconProps {
  sortBy: SortOrder | null;
}

export const SortIcon = ({ sortBy }: SortIconProps) => {
  if (!sortBy) return null;

  if (sortBy === 'desc') {
    return <ArrowDown style={{ marginLeft: '0.5rem', width: '1rem' }} />;
  }

  return <ArrowUp style={{ marginLeft: '0.5rem', width: '1rem' }} />;
};
