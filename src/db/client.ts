import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

import appConfig from "@/config/appConfig"
import * as schema from "@/db/schema"

const {
  isBuild,
  db: { host, user, password, port, name },
} = appConfig
const client = new Client({
  host,
  user,
  password,
  port,
  database: name,
})

try {
  if (isBuild === "false") {
    await client.connect()
  }
} catch (error) {
  process.stderr.write((error as Error).message)
}

export const db = drizzle(client, { schema })
