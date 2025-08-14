import { Product } from "../models/productModel"
import { ProductFactory } from "../factories/productFactory"

export class ProductRepository {
  private readonly baseUrl = process.env.NITRO_API_URL as string
  private readonly token = process.env.NITRO_API_TOKEN as string

  async listFromNitro(): Promise<Product[]> {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch products from Nitro: ${res.statusText}`)
    }

    const data = await res.json()

    // data pode vir como { products: [...] } ou como um array direto
    const productList = Array.isArray(data) ? data : data.products

    return productList.map((p: any) => ProductFactory.create(p))
  }
}
