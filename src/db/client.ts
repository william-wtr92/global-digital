import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

import appConfig from "@/config/appConfig"
import * as schema from "@/db/schema"

const {
  db: { host, user, password, port, name },
} = appConfig

const client = new Client({
  host,
  user,
  password,
  port,
  database: name,
})

await client.connect()

export const db = drizzle(client, { schema })
