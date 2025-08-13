import { Order, UUID, OrderStatus } from "../models/order"

export interface OrderRepository {
  create(order: Order): Promise<Order>
  findAll(): Promise<Order[]>
  findById(id: UUID): Promise<Order | null>
  updateStatus(id: UUID, status: OrderStatus): Promise<Order | null>
  delete(id: UUID): Promise<boolean>
}
