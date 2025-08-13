import { Order, OrderStatus, UUID } from "../models/order"
import { OrderRepository } from "../repositories/orderRepository"
import { OrderFactory } from "../factories/orderFactory"

export class OrderService {
  constructor(private repo: OrderRepository) {}

  async createOrder(input: {
    cliente: string
    dataPedido: string
    itens: Array<{ produto: string; quantidade: number; valorUnitario: number }>
  }): Promise<Order> {
    if (!input.itens.length) {
      throw new Error("Pedido deve conter pelo menos um item.")
    }
    for (const item of input.itens) {
      if (item.quantidade <= 0 || item.valorUnitario < 0) {
        throw new Error("Item inválido: quantidade deve ser > 0 e valorUnitario >= 0.")
      }
    }
    const order = OrderFactory.create(input)
    return this.repo.create(order)
  }

  async listOrders(): Promise<Order[]> {
    return this.repo.findAll()
  }

  async updateStatus(id: UUID, status: OrderStatus): Promise<Order> {
    this.ensureValidStatus(status)

    const existing = await this.repo.findById(id)
    if (!existing) {
      throw new Error("Pedido não encontrado.")
    }
    if (existing.status === OrderStatus.CANCELADO) {
      throw new Error("Não é possível alterar o status de um pedido Cancelado.")
    }
    if (existing.status === OrderStatus.APROVADO && status !== OrderStatus.APROVADO) {
      throw new Error("Pedido Aprovado não pode retornar para outro status.")
    }

    const updated = await this.repo.updateStatus(id, status)
    if (!updated) throw new Error("Falha ao atualizar status.")
    return updated
  }

  async deleteOrder(id: UUID): Promise<void> {
    const ok = await this.repo.delete(id)
    if (!ok) throw new Error("Pedido não encontrado.")
  }

  private ensureValidStatus(status: string): asserts status is OrderStatus {
    const allowed = Object.values(OrderStatus)
    if (!allowed.includes(status as OrderStatus)) {
      throw new Error(`Status inválido. Permitidos: ${allowed.join(", ")}`)
    }
  }
}
