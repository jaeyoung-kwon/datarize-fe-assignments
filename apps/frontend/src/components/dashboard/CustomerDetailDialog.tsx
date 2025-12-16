import type { Customer } from '@/lib/mockData'

interface CustomerDetailDialogProps {
  customer: Customer | null
  open: boolean
  onClose: () => void
}

const CustomerDetailDialog = ({ customer, open, onClose }: CustomerDetailDialogProps) => {
  if (!open || !customer) return null
  return <div>고객 상세 다이얼로그</div>
}

export default CustomerDetailDialog
