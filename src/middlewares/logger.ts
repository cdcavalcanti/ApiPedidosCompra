import { FastifyInstance } from "fastify"

export async function loggerMiddleware(app: FastifyInstance) {
  app.addHook("onRequest", async (req) => {
    const now = new Date().toISOString()
    console.log(`[REQ] ${now} - ${req.method} ${req.url}`)
  })
}
