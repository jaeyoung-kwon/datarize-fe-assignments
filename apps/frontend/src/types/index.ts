/**
 * 공통 타입 정의
 */

export type SortOrder = 'asc' | 'desc';

export interface Purchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
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
