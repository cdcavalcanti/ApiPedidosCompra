import { FastifyRequest, FastifyReply } from "fastify"
import { OrderService } from "../services/orderService"
import { OrderStatus } from "../models/order"

export class OrderController {
  constructor(private service: OrderService) {}

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as any
      const created = await this.service.createOrder({
        cliente: body.cliente,
        dataPedido: body.dataPedido,
        itens: body.itens,
      })
      return reply.code(201).send(created)
    } catch (err: any) {
      return reply.code(400).send({ error: err.message })
    }
  }

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const orders = await this.service.listOrders()
    return reply.send(orders)
  }

  updateStatus = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as any
      const { status } = req.body as { status: OrderStatus }
      const updated = await this.service.updateStatus(id, status)
      return reply.send(updated)
    } catch (err: any) {
      return reply.code(400).send({ error: err.message })
    }
  }

  delete = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as any
      await this.service.deleteOrder(id)
      return reply.code(204).send()
    } catch (err: any) {
      return reply.code(404).send({ error: err.message })
    }
  }
}
