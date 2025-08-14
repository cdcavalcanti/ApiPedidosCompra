export type UUID = string

export interface ProductData {
  id?: UUID
  title: string
  cover: string
  sale_page: string
  payment_type: number
  product_type: "digital" | "fisico"
  delivery_type: 1 | 2
  id_category: number
  amount: number
}

export interface Product {
  id: UUID
  title: string
  cover: string
  salePage: string
  paymentType: number
  productType: "digital" | "fisico"
  deliveryType: 1 | 2
  categoryId: number
  amount: number
  createdAt: string
  updatedAt: string
}

export const products: Product[] = []
