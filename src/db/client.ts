import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import appConfig from "@/config/appConfig"
import * as schema from "@/db/schema"

const {
  db: { host, user, password, port, name },
} = appConfig

const client = postgres(
  `postgresql://${user}:${password}@${host}:${port}/${name}`,
)

export const db = drizzle(client, { schema })
