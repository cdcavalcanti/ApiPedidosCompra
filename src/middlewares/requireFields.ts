import { FastifyRequest, FastifyReply } from "fastify"

export function requireFields(required: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const body = (req.body ?? {}) as Record<string, any>
    const missing = required.filter((k) => body[k] === undefined || body[k] === null)
    if (missing.length) {
      return reply.code(400).send({
        error: `Campos obrigatórios ausentes: ${missing.join(", ")}`,
      })
    }
  }
}