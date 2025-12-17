import CustomerDetailModal from '@/pages/dashboard/components/CustomerDetailModal/CustomerDetailModal';
import CustomerList from '@/pages/dashboard/components/CustomerList';
import DashBoardHeader from '@/pages/dashboard/components/DashBoardHeader';
import PurchaseFrequencyChart from '@/pages/dashboard/components/PurchaseFrequencyChart';
import styled from '@emotion/styled';
import { useCustomerDetailModal } from './hooks/useCustomDetailModal';

const DashBoardPage = () => {
  const { selectedCustomer, open, openModal, closeModal } =
    useCustomerDetailModal();

  return (
    <Container>
      <DashBoardHeader />

      <ContentWrapper>
        <PurchaseFrequencyChart />
        <CustomerList onSelectCustomer={openModal} />
      </ContentWrapper>

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          open={open}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default DashBoardPage;

const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 1028px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
