import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/productController";
import { requireFields } from "../middlewares/requireFields";
import { Product, UUID } from "../models/productModel";

export async function productRoutes(app: FastifyInstance, controller: ProductController) {
  app.post<{
    Body: Omit<Product, "id" | "createdAt" | "updatedAt">
  }>(
    "/products",
    { preHandler: requireFields(["nome", "preco", "descricao"]) },
    controller.create.bind(controller)
  );

  app.get("/products", controller.list.bind(controller));

  app.get<{ Params: { id: UUID } }>(
    "/products/:id",
    controller.getById.bind(controller)
  );

  app.patch<{
    Params: { id: UUID };
    Body: Partial<Omit<Product, "id" | "createdAt">>
  }>(
    "/products/:id",
    controller.update.bind(controller)
  );

  app.delete<{ Params: { id: UUID } }>(
    "/products/:id",
    controller.delete.bind(controller)
  );
}
