import type { Customer } from '@/lib/mockData'

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void
}

const CustomerList = ({ onSelectCustomer }: CustomerListProps) => {
  return <div>고객 목록 영역</div>
}

export default CustomerList
