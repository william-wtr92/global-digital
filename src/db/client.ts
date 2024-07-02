import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

import * as schema from "@/db/schema"

const { DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_HOST } = process.env

const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT!, 10),
  database: DB_NAME,
})

await client.connect()

export const db = drizzle(client, { schema })
