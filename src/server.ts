import { buildApp } from "./app"

const PORT = Number(process.env.PORT ?? 3333)
const HOST = process.env.HOST ?? "0.0.0.0"

async function main() {
  const app = buildApp()
  try {
    await app.listen({ port: PORT, host: HOST })
    console.log(`🚀 Server running at http://${HOST}:${PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
