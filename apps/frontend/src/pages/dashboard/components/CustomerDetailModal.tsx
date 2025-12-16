import CloseIcon from '#/close.svg?react';
import ShoppingBagIcon from '#/shopping_bag.svg?react';
import UserIcon from '#/user.svg?react';
import { dashboardQueries } from '@/apis/dashboard/queries';
import { Divider } from '@/components/Divider';
import { Spinner } from '@/components/Spinner';
import { useClickOutsideRef } from '@/hooks/useClickOutsideRef';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Customer } from '@/lib/mockData';
import { theme } from '@/styles/theme';
import { formatCurrency } from '@/utils';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CustomerDetailModalProps {
  customer: Customer;
  open: boolean;
  onClose: () => void;
}

const CustomerDetailModal = ({
  customer,
  open,
  onClose,
}: CustomerDetailModalProps) => {
  const { data: purchases, isLoading } = useQuery(
    dashboardQueries.customerPurchases({ id: customer.id }),
  );

  useScrollLock({ enabled: open });
  const ref = useClickOutsideRef<HTMLDivElement>(onClose);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'yyyy년 M월 d일 (EEE)', { locale: ko });
  };

  // Group purchases by date
  const purchasesByDate = purchases?.reduce(
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

  const totalQuantity =
    purchases?.reduce((sum, purchase) => sum + purchase.quantity, 0) || 0;

  return (
    <Overlay isOpen={open}>
      <DialogContainer ref={ref} onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <HeaderContent>
            <Avatar>
              <UserIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </Avatar>
            <CustomerInfo>
              <CustomerName>{customer?.name}</CustomerName>
            </CustomerInfo>
            <CloseButton onClick={onClose}>
              <CloseIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </CloseButton>
          </HeaderContent>
        </DialogHeader>

        <StatsGrid>
          <StatItem>
            <StatValue>{totalQuantity}</StatValue>
            <StatLabel>총 구매 횟수</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue accent>
              {customer ? formatCurrency(customer.totalAmount) : '₩0'}
            </StatValue>
            <StatLabel>총 구매 금액</StatLabel>
          </StatItem>
        </StatsGrid>

        <ScrollArea>
          {isLoading ? (
            <LoadingWrapper>
              <Spinner size={24} />
            </LoadingWrapper>
          ) : (
            <>
              {purchasesByDate &&
                Object.entries(purchasesByDate)
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
                          </ProductInfo>
                          <Price>{formatCurrency(purchase.price)}</Price>
                        </PurchaseItem>
                      ))}
                      <Divider />
                    </PurchaseGroup>
                  ))}
            </>
          )}
        </ScrollArea>
      </DialogContainer>
    </Overlay>
  );
};

export default CustomerDetailModal;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const DialogContainer = styled.div`
  background-color: ${theme.colors.card};
  border-radius: ${theme.radius};
  max-width: 42rem;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  animation: fadeIn 0.2s ease-out;
`;

const DialogHeader = styled.div`
  background: ${theme.gradients.dashboard};
  padding: 1.25rem 1.5rem;
  color: ${theme.colors.primaryForeground};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const CustomerName = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primaryForeground};
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.8;
  transition: ${theme.transitions.default};

  &:hover {
    opacity: 1;
  }
`;

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
  max-height: 400px;
  overflow-y: auto;
  padding: 0 1.5rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
`;

const PurchaseGroup = styled.div`
  padding: 1rem 0;
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

const Price = styled.p`
  font-weight: 600;
  color: ${theme.colors.foreground};
  text-align: right;
`;
