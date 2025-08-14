import { FastifyReply, FastifyRequest } from "fastify"
import { ProductService } from "../services/productService"
import { Product } from "../models/productModel"

const productService = new ProductService()

export class ProductController {
  async create(req: FastifyRequest<{ Body: Omit<Product, "id" | "createdAt" | "updatedAt"> }>, reply: FastifyReply) {
    try {
      const product = productService.create(req.body)
      return reply.status(201).send(product)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: "Error creating product" })
    }
  }

  async list(_req: FastifyRequest, reply: FastifyReply) {
    try {
      const products = productService.list()
      return reply.send(products)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: "Error listing products" })
    }
  }

   async listFromNitro(_req: FastifyRequest, reply: FastifyReply) {
   try {
      const products = await productService.listFromNitro()
      return reply.send(products)
   } catch (error: any) {
      return reply.status(500).send({ error: error.message })
   }
   }

  async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const product = productService.findById(id)
      if (!product) {
        return reply.status(404).send({ error: "Product not found" })
      }
      return reply.send(product)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: "Error fetching product" })
    }
  }

  async update(req: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Product, "id" | "createdAt">> }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const product = productService.update(id, req.body)
      if (!product) {
        return reply.status(404).send({ error: "Product not found" })
      }
      return reply.send(product)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: "Error updating product" })
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const deleted = productService.delete(id)
      if (!deleted) {
        return reply.status(404).send({ error: "Product not found" })
      }
      return reply.status(204).send()
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: "Error deleting product" })
    }
  }
}