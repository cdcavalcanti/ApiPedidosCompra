import Fastify from "fastify"
import { loggerMiddleware } from "./middlewares/logger"

import { InMemoryOrderRepository } from "./repositories/inMemoryOrderRepository"
import { OrderService } from "./services/orderService"
import { OrderController } from "./controllers/orderController"
import { orderRoutes } from "./routes/orderRoutes"

import { ProductController } from "./controllers/productController"
import { productRoutes } from "./routes/productsRoutes"

export function buildApp() {
  const app = Fastify({
    logger: false,
  })

  app.register(loggerMiddleware)

  // Orders
  const orderRepo = new InMemoryOrderRepository()
  const orderService = new OrderService(orderRepo)
  const orderController = new OrderController(orderService)
  app.register(async (instance) => {
    await orderRoutes(instance, orderController)
  })

  // Products
  const productController = new ProductController()
  app.register(async (instance) => {
    await productRoutes(instance, productController)
  })

  // Health check
  app.get("/health", async () => ({ status: "ok" }))

  return app
}
