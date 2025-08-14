import { Product, products, UUID } from "../models/productModel"
import { randomUUID } from "crypto"
import { ProductFactory } from "../factories/productFactory"

export class ProductService {
  private readonly baseUrl = process.env.NITRO_API_URL as string
  private readonly token = process.env.NITRO_API_TOKEN as string

  create(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    }

    products.push(newProduct)
    return newProduct
  }

  list(): Product[] {
    return products
  }

  async listFromNitro(): Promise<Product[]> {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch products from Nitro: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    const productList = Array.isArray(data) ? data : data.products

    return productList.map((p: any) => ProductFactory.create(p))
  }

  findById(id: UUID): Product | undefined {
    return products.find(p => p.id === id)
  }

  update(id: UUID, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | undefined {
    const product = products.find(p => p.id === id)
    if (!product) return undefined

    Object.assign(product, updates, {
      updatedAt: new Date().toISOString(),
    })

    return product
  }

  delete(id: UUID): boolean {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return false

    products.splice(index, 1)
    return true
  }
}
