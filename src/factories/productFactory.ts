import { Product, ProductData } from "../models/productModel"
import { randomUUID } from "crypto"

export class ProductFactory {
  static create(data: ProductData): Product {
    return {
      id: data.id ?? randomUUID(),
      title: data.title,
      cover: data.cover,
      salePage: data.sale_page,
      paymentType: data.payment_type,
      productType: data.product_type,
      deliveryType: data.delivery_type,
      categoryId: data.id_category,
      amount: data.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
