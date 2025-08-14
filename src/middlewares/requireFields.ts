import { FastifyRequest, FastifyReply } from "fastify"

export function requireFields(fields: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const body = (req.body ?? {}) as Record<string, any>
    const missing = fields.filter(field => body[field] === undefined || body[field] === null)

    if (missing.length > 0) {
      return reply.status(400).send({
        error: `Campos obrigatórios faltando: ${missing.join(", ")}`,
      })
    }
  }
}