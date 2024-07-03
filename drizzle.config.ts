import { defineConfig } from "drizzle-kit"

import appConfig from "@/config/appConfig"

const {
  user,
  password,
  port,
  name,
  migrations: { schema, out, dialect },
} = appConfig.db

export default defineConfig({
  schema,
  out,
  dialect,
  dbCredentials: {
    url: `postgresql://${user}:${password}@localhost:${port}/${name}`,
  },
})
