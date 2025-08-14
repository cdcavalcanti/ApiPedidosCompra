// src/controllers/nitroController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { NitroService } from "../services/nitroService";

const nitroService = new NitroService();

export class NitroController {
  async createPayment(req: FastifyRequest, reply: FastifyReply) {
    const { amount, description, customerId } = req.body as any;
    try {
      const payment = await nitroService.createPayment({ amount, description, customerId });
      reply.send(payment);
    } catch (err) {
      reply.status(500).send({ error: "Erro ao criar pagamento" });
    }
  }

  async getPayment(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      const payment = await nitroService.getPayment(id);
      reply.send(payment);
    } catch (err) {
      reply.status(500).send({ error: "Erro ao consultar pagamento" });
    }
  }
}
