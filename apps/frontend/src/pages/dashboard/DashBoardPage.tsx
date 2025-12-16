import Header from '@/components/Header';
import CustomerDetailModal from '@/components/dashboard/CustomerDetailModal';
import CustomerList from '@/components/dashboard/CustomerList';
import PurchaseFrequencyChart from '@/components/dashboard/PurchaseFrequencyChart';
import type { Customer } from '@/lib/mockData';
import styled from '@emotion/styled';
import { useState } from 'react';

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
      <Header />

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
