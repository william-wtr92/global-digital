import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

import * as schema from "@/db/schema"

const { DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env

const client = new Client({
  connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`,
})

await client.connect()

export const db = drizzle(client, { schema })
