import CloseIcon from '#/close.svg?react';
import UserIcon from '#/user.svg?react';
import { useClickOutsideRef } from '@/hooks/useClickOutsideRef';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Customer } from '@/types';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import CustomerPurchaseList from './CustomerPurchaseList';
import CustomerDetailModalLoading from './CustomerDetailModalLoading';
import CustomerDetailModalLoadError from './CustomerDetailModalLoadError';

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
  useScrollLock({ enabled: open });
  const ref = useClickOutsideRef<HTMLDivElement>(onClose);

  return (
    <Overlay open={open}>
      <ModalContainer ref={ref} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderContent>
            <Avatar>
              <UserIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </Avatar>
            <CustomerInfo>
              <CustomerName>{customer.name}</CustomerName>
            </CustomerInfo>
            <CloseButton onClick={onClose}>
              <CloseIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </CloseButton>
          </HeaderContent>
        </ModalHeader>

        <ErrorBoundary FallbackComponent={CustomerDetailModalLoadError}>
          <Suspense fallback={<CustomerDetailModalLoading />}>
            <CustomerPurchaseList customer={customer} />
          </Suspense>
        </ErrorBoundary>
      </ModalContainer>
    </Overlay>
  );
};

export default CustomerDetailModal;

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background-color: ${theme.colors.card};
  border-radius: ${theme.radius};
  max-width: 42rem;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  animation: fadeIn 0.2s ease-out;
`;

const ModalHeader = styled.div`
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
