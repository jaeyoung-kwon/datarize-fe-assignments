export interface Purchase {
  productId: number
  customerId: number
  quantity: number
  date: string
}

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface PurchaseFrequency {
  range: string
  count: number
}
