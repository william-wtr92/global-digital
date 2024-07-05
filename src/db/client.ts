import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

import appConfig from "@/config/appConfig"
import * as schema from "@/db/schema"

const {
  db: { host, user, password, port, name },
} = appConfig

let db: ReturnType<typeof drizzle>

if (process.env.IS_BUILD === "false") {
  const client = new Client({
    host,
    user,
    password,
    port,
    database: name,
  })

  try {
    await client.connect()
  } catch (error) {
    process.stderr.write((error as Error).message)
  }

  db = drizzle(client, { schema })
}

export { db }
