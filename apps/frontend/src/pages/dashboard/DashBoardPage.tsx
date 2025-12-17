import type { Customer } from '@/lib/mockData';
import CustomerList from '@/pages/dashboard/components/CustomerList';
import DashBoardHeader from '@/pages/dashboard/components/DashBoardHeader';
import PurchaseFrequencyChart from '@/pages/dashboard/components/PurchaseFrequencyChart';
import styled from '@emotion/styled';
import { useState } from 'react';
import CustomerDetailModal from '@/pages/dashboard/components/CustomerDetailModal/CustomerDetailModal';

const DashBoardPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container>
      <DashBoardHeader />

      <ContentWrapper>
        <PurchaseFrequencyChart />
        <CustomerList onSelectCustomer={handleSelectCustomer} />
      </ContentWrapper>

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          open={dialogOpen}
          onClose={handleCloseDialog}
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
