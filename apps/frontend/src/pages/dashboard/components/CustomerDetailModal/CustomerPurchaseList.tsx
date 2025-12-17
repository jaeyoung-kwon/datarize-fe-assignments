import ShoppingBagIcon from '#/shopping_bag.svg?react';
import { dashboardQueries } from '@/apis/dashboard/queries';
import { Divider } from '@/components/Divider';
import type { Customer } from '@/lib/mockData';
import { theme } from '@/styles/theme';
import { formatCurrency, formatDate } from '@/utils';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';

interface CustomerPurchaseListProps {
  customer: Customer;
}

const CustomerPurchaseList = ({ customer }: CustomerPurchaseListProps) => {
  const { data: purchases } = useSuspenseQuery(
    dashboardQueries.customerPurchases({ id: customer.id }),
  );

  // Group purchases by date
  const purchasesByDate = purchases.reduce(
    (acc, purchase) => {
      const date = purchase.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(purchase);
      return acc;
    },
    {} as Record<string, typeof purchases>,
  );

  return (
    <>
      <StatsGrid>
        <StatItem>
          <StatValue>{purchases.length}</StatValue>
          <StatLabel>총 구매 횟수</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue accent>{formatCurrency(customer.totalAmount)}</StatValue>
          <StatLabel>총 구매 금액</StatLabel>
        </StatItem>
      </StatsGrid>

      <ScrollArea>
        {Object.entries(purchasesByDate)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([date, datePurchases]) => (
            <PurchaseGroup key={date}>
              <DateHeader>
                <ShoppingBagIcon
                  style={{ width: '1rem', height: '1rem' }}
                  color={theme.colors.mutedForeground}
                />
                <DateText>{formatDate(date)}</DateText>
              </DateHeader>
              {datePurchases?.map((purchase, index) => (
                <PurchaseItem key={index}>
                  <Thumbnail>
                    <ThumbnailImage
                      src={purchase.imgSrc}
                      alt={purchase.product}
                    />
                  </Thumbnail>
                  <ProductInfo>
                    <ProductName>{purchase.product}</ProductName>
                    <ProductQuantity>
                      수량: {purchase.quantity}개
                    </ProductQuantity>
                  </ProductInfo>
                  <Price>{formatCurrency(purchase.price)}</Price>
                </PurchaseItem>
              ))}
              <Divider />
            </PurchaseGroup>
          ))}
      </ScrollArea>
    </>
  );
};

export default CustomerPurchaseList;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.p<{ accent?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ accent }) =>
    accent ? theme.colors.accent : theme.colors.foreground};
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.mutedForeground};
`;

const ScrollArea = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 0 1.5rem;
`;

const PurchaseGroup = styled.div`
  padding: 1rem 0 0;
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const DateText = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

const PurchaseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
  background-color: ${theme.colors.card};
  margin-bottom: 0.75rem;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.muted}80;
  }
`;

const Thumbnail = styled.div`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: calc(${theme.radius} - 4px);
  background-color: ${theme.colors.muted};
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.p`
  font-weight: 500;
  color: ${theme.colors.foreground};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductQuantity = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.mutedForeground};
  margin-top: 0.25rem;
`;

const Price = styled.p`
  font-weight: 600;
  color: ${theme.colors.foreground};
  text-align: right;
`;
