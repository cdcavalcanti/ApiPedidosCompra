import Fastify from "fastify"
import { loggerMiddleware } from "./middlewares/logger"
import { InMemoryOrderRepository } from "./repositories/inMemoryOrderRepository"
import { OrderService } from "./services/orderService"
import { OrderController } from "./controllers/orderController"
import { orderRoutes } from "./routes/orderRoutes"

export function buildApp() {
  const app = Fastify({
    logger: false,
  })


  app.register(loggerMiddleware)

  const repo = new InMemoryOrderRepository()
  const service = new OrderService(repo)
  const controller = new OrderController(service)

  app.register(async (instance) => {
    await orderRoutes(instance, controller)
  })

  app.get("/health", async () => ({ status: "ok" }))

  return app
}
