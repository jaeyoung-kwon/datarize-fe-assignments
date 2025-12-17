import { dashboardQueries } from '@/apis/dashboard/queries';
import type { Customer } from '@/types';
import type { SortOrder } from '@/types';
import { Badge } from '@/components/Badge';
import { TableBody, TableCell, TableRow } from '@/components/Table';
import { formatCurrency } from '@/utils';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useSuspenseQuery } from '@tanstack/react-query';

interface CustomerTableBodyProps {
  name: string;
  sortBy: SortOrder | null;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerTableBody = ({
  name,
  sortBy,
  onSelectCustomer,
}: CustomerTableBodyProps) => {
  const { data: customers } = useSuspenseQuery(
    dashboardQueries.customers({
      name,
      sortBy: sortBy ? sortBy : undefined,
    }),
  );

  if (customers.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <EmptyCell colSpan={4} align="center">
            검색 결과가 없습니다
          </EmptyCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {customers.map((customer, index) => (
        <CustomerRow
          key={customer.id}
          isEven={index % 2 !== 0}
          onClick={() => onSelectCustomer(customer)}
        >
          <CustomerIdCell>{customer.id}</CustomerIdCell>
          <CustomerNameCell>{customer.name}</CustomerNameCell>
          <TableCell align="center">
            <Badge>{customer.count}</Badge>
          </TableCell>
          <AmountCell align="left">
            {formatCurrency(customer.totalAmount)}
          </AmountCell>
        </CustomerRow>
      ))}
    </TableBody>
  );
};

export default CustomerTableBody;

const EmptyCell = styled(TableCell)`
  height: 8rem;
  color: ${theme.colors.mutedForeground};
`;

const CustomerRow = styled(TableRow)<{ isEven: boolean }>`
  cursor: pointer;
  background-color: ${({ isEven }) =>
    isEven ? `${theme.colors.muted}50` : theme.colors.card};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.accent}15;
  }
`;

const CustomerIdCell = styled(TableCell)`
  font-family: monospace;
  font-size: 0.875rem;
  color: ${theme.colors.mutedForeground};
`;

const CustomerNameCell = styled(TableCell)`
  font-weight: 500;
`;

const AmountCell = styled(TableCell)`
  font-weight: 600;
`;
