import { FastifyInstance } from "fastify"
import { OrderController } from "../controllers/orderController"
import { requireFields } from "../middlewares/requireFields"

export async function orderRoutes(app: FastifyInstance, controller: OrderController) {
  app.post("/orders", { preHandler: requireFields(["cliente", "dataPedido", "itens"]) }, controller.create)
  app.get("/orders", controller.list)
  app.patch(
    "/orders/:id/status",
    { preHandler: requireFields(["status"]) },
    controller.updateStatus
  )
  app.delete("/orders/:id", controller.delete)
}
