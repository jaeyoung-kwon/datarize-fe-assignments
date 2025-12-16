import ArrowDown from '#/arrow_down.svg?react'
import ArrowUp from '#/arrow_up.svg?react'
import Search from '#/search.svg?react'
import { fetcher } from '@/apis/fetcher'
import type { Customer } from '@/lib/mockData'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/styles/styled'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void
}

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 640px) {
    width: 16rem;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.mutedForeground};
`

const SearchInput = styled(Input)`
  padding-left: 2.25rem;
`

const TableWrapper = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
  overflow: hidden;
`

const SortButton = styled(Button)`
  padding: 0;
  font-weight: 600;
  height: auto;

  &:hover {
    background-color: transparent;
  }
`

const LoadingCell = styled(TableCell)`
  height: 8rem;
`

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const EmptyCell = styled(TableCell)`
  height: 8rem;
  color: ${theme.colors.mutedForeground};
`

const CustomerRow = styled(TableRow)<{ isEven: boolean }>`
  cursor: pointer;
  background-color: ${({ isEven }) => (isEven ? `${theme.colors.muted}50` : theme.colors.card)};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.accent}15;
  }
`

const CustomerIdCell = styled(TableCell)`
  font-family: monospace;
  font-size: 0.875rem;
  color: ${theme.colors.mutedForeground};
`

const CustomerNameCell = styled(TableCell)`
  font-weight: 500;
`

const AmountCell = styled(TableCell)`
  font-weight: 600;
`

const getCustomers = async (params: { sortBy?: 'asc' | 'desc'; name?: string }) => {
  return await fetcher.get<Customer[]>({
    path: '/api/customers',
    query: params,
  })
}

const CustomerList = ({ onSelectCustomer }: CustomerListProps) => {
  const [searchName, setSearchName] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | undefined>(undefined)

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers', searchName, sortBy],
    queryFn: () => getCustomers({ name: searchName, sortBy }),
  })

  const handleSort = () => {
    if (!sortBy) {
      setSortBy('desc')
    } else if (sortBy === 'desc') {
      setSortBy('asc')
    } else {
      setSortBy(undefined)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount)
  }

  const getSortIcon = () => {
    if (!sortBy) return
    if (sortBy === 'desc') return <ArrowDown style={{ marginLeft: '0.5rem', width: '1rem' }} />
    return <ArrowUp style={{ marginLeft: '0.5rem', width: '1rem' }} />
  }

  return (
    <Card style={{ animationDelay: '0.1s' }}>
      <CardHeader style={{ paddingBottom: '1rem' }}>
        <HeaderRow>
          <CardTitle>고객 목록</CardTitle>
          <SearchWrapper>
            <SearchIcon>
              <Search style={{ width: '1rem' }} />
            </SearchIcon>
            <SearchInput
              placeholder="고객 이름 검색..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </SearchWrapper>
        </HeaderRow>
      </CardHeader>
      <CardContent>
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: '100px' }}>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead align="center">구매 횟수</TableHead>
                <TableHead align="right">
                  <SortButton variant="ghost" onClick={handleSort}>
                    총 구매 금액
                    {getSortIcon()}
                  </SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <LoadingCell colSpan={4} align="center">
                    <LoadingWrapper>
                      <Spinner size={24} />
                    </LoadingWrapper>
                  </LoadingCell>
                </TableRow>
              ) : customers?.length === 0 ? (
                <TableRow>
                  <EmptyCell colSpan={4} align="center">
                    검색 결과가 없습니다
                  </EmptyCell>
                </TableRow>
              ) : (
                customers?.map((customer, index) => (
                  <CustomerRow key={customer.id} isEven={index % 2 !== 0} onClick={() => onSelectCustomer(customer)}>
                    <CustomerIdCell>{customer.id}</CustomerIdCell>
                    <CustomerNameCell>{customer.name}</CustomerNameCell>
                    <TableCell align="center">
                      <Badge>{customer.count}</Badge>
                    </TableCell>
                    <AmountCell align="right">{formatCurrency(customer.totalAmount)}</AmountCell>
                  </CustomerRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  )
}

export default CustomerList
