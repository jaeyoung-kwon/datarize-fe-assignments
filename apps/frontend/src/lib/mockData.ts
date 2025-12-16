export interface Purchase {
  productId: number
  customerId: number
  quantity: number
  date: string
}

export interface Customer {
  id: string
  name: string
  totalPurchases: number
  totalAmount: number
}

export interface PurchaseFrequency {
  priceRange: string
  count: number
  minPrice: number
  maxPrice: number
}
