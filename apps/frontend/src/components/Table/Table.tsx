import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const TableHeader = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ clickable?: boolean; striped?: boolean }>`
  transition: ${theme.transitions.default};

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.accent}15;
    }
  `}

  ${({ striped }) =>
    striped &&
    `
    &:nth-of-type(odd) {
      background-color: ${theme.colors.background};
    }
    &:nth-of-type(even) {
      background-color: ${theme.colors.muted}50;
    }
  `}
`;

export const TableHead = styled.th<{ align?: 'left' | 'center' | 'right' }>`
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-align: ${({ align = 'left' }) => align};
  background-color: ${theme.colors.muted}80;
  color: ${theme.colors.foreground};
`;

export const TableCell = styled.td<{ align?: 'left' | 'center' | 'right' }>`
  padding: 0.75rem 1rem;
  text-align: ${({ align = 'left' }) => align};
  border-bottom: 1px solid ${theme.colors.border};
`;
