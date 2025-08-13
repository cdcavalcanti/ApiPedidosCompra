import { Order, OrderItem, OrderStatus, UUID } from "../models/order"
import { randomUUID } from "crypto"

export class OrderFactory {
  static create(input: {
    cliente: string
    dataPedido: string
    itens: Array<{ produto: string; quantidade: number; valorUnitario: number }>
  }): Order {
    const id: UUID = randomUUID()
    const now = new Date().toISOString()

    const itens: OrderItem[] = input.itens.map((i) => ({
      produto: i.produto,
      quantidade: i.quantidade,
      valorUnitario: i.valorUnitario,
      subtotal: +(i.quantidade * i.valorUnitario).toFixed(2),
    }))

    const total = +itens.reduce((acc, i) => acc + i.subtotal, 0).toFixed(2)

    return {
      id,
      cliente: input.cliente,
      dataPedido: input.dataPedido,
      status: OrderStatus.EM_ANALISE,
      itens,
      total,
      createdAt: now,
      updatedAt: now,
    }
  }
}
