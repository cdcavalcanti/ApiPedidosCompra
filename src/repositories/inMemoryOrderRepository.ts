import { Order, OrderStatus, UUID } from "../models/order"
import { OrderRepository } from "./orderRepository"

export class InMemoryOrderRepository implements OrderRepository {
  private storage: Map<UUID, Order> = new Map()

  async create(order: Order): Promise<Order> {
    this.storage.set(order.id, order)
    return order
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.storage.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  }

  async findById(id: UUID): Promise<Order | null> {
    return this.storage.get(id) ?? null
  }

  async updateStatus(id: UUID, status: OrderStatus): Promise<Order | null> {
    const existing = this.storage.get(id)
    if (!existing) return null
    const updated: Order = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    }
    this.storage.set(id, updated)
    return updated
  }

  async delete(id: UUID): Promise<boolean> {
    return this.storage.delete(id)
  }
}
