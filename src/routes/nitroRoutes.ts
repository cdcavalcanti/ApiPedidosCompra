import { FastifyInstance } from "fastify";
import { NitroController } from "../controllers/nitroController";

const controller = new NitroController();

export async function nitroRoutes(app: FastifyInstance) {
  app.post("/nitro/payments", controller.createPayment.bind(controller));
  app.get("/nitro/payments/:id", controller.getPayment.bind(controller));
}
