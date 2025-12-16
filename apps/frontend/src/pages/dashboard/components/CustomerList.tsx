import { useSearchParamState } from '@/hooks/useSearchParamState';
import { useSort } from '@/pages/dashboard/hooks/useSort';
import type { Customer } from '@/lib/mockData';
import { SearchInput } from '@/components/SearchInput';
import { SortIcon } from '@/components/SortIcon';
import { ErrorBoundary } from 'react-error-boundary';
import { Table, TableHead, TableHeader, TableRow } from '@/components/Table';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Card from '../../../components/Card';
import { Suspense, useEffect, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Button } from '@/components/Button';
import { CustomerTableBody } from './CustomerTableBody';
import CustomerListLoadError from './CustomerListLoadError';
import CustomerListLoading from './CustomerListLoading';

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList = ({ onSelectCustomer }: CustomerListProps) => {
  const [searchName, setSearchName] = useState('');
  const [, setSearchNameParam] = useSearchParamState('searchName');
  const { sortBy, handleSort } = useSort();
  const debouncedSearchInput = useDebouncedValue(searchName, 300);

  useEffect(() => {
    setSearchNameParam(debouncedSearchInput);
  }, [debouncedSearchInput, setSearchNameParam]);

  return (
    <Card
      title="고객 목록"
      headerAction={
        <SearchInput
          placeholder="고객 이름 검색..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      }
    >
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '100px' }}>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead align="center">구매 횟수</TableHead>
              <TableHead style={{ width: '132px' }} align="left">
                <SortButton variant="ghost" onClick={handleSort}>
                  총 구매 금액
                  <SortIcon sortBy={sortBy} />
                </SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <ErrorBoundary FallbackComponent={CustomerListLoadError}>
            <Suspense fallback={<CustomerListLoading />}>
              <CustomerTableBody
                name={debouncedSearchInput}
                sortBy={sortBy}
                onSelectCustomer={onSelectCustomer}
              />
            </Suspense>
          </ErrorBoundary>
        </Table>
      </TableWrapper>
    </Card>
  );
};

export default CustomerList;

const TableWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
`;

const SortButton = styled(Button)`
  padding: 0;
  font-weight: 600;
  height: auto;

  &:hover {
    background-color: transparent;
  }
`;
