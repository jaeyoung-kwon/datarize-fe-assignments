import Header from '@/components/Header'
import CustomerDetailModal from '@/components/dashboard/CustomerDetailModal'
import CustomerList from '@/components/dashboard/CustomerList'
import PurchaseFrequencyChart from '@/components/dashboard/PurchaseFrequencyChart'
import type { Customer } from '@/lib/mockData'
import styled from '@emotion/styled'
import { useState } from 'react'

const Index = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <Container>
      <ContentWrapper>
        <Header />

        <ChartListContainer>
          <PurchaseFrequencyChart />
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </ChartListContainer>

        <CustomerDetailModal customer={selectedCustomer} open={dialogOpen} onClose={handleCloseDialog} />
      </ContentWrapper>
    </Container>
  )
}

export default Index

const Container = styled.div`
  min-height: 100vh;
  background-color: hsl(var(--background));
`

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const ChartListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
