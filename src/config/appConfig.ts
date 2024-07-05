import { config } from "dotenv"
import { z } from "zod"

config({ path: ".env.local" })

const appConfigSchema = z
  .object({
    port: z.number(),
    db: z.object({
      host: z.string(),
      user: z.string(),
      password: z.string(),
      port: z.number(),
      name: z.string(),
      migrations: z.object({
        schema: z.string(),
        out: z.string(),
        dialect: z.literal("postgresql"),
      }),
    }),
    security: z.object({
      cookies: z.object({
        authExpiration: z.number(),
      }),
      jwt: z.object({
        secret: z.string(),
        expiresIn: z.string(),
        algorithm: z.literal("HS512"),
      }),
      password: z.object({
        saltlen: z.number(),
        keylen: z.number(),
        iterations: z.number(),
        digest: z.string(),
        pepper: z.string(),
      }),
      stripe: z.object({
        privateKey: z.string(),
        publicKey: z.string(),
      }),
    }),
    baseURL: z.string(),
    api: z.object({
      baseApiURL: z.string(),
    }),
  })
  .strict()

const appConfig = appConfigSchema.parse({
  port: parseInt(process.env.PORT!, 10),
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!, 10),
    name: process.env.DB_NAME,
    migrations: {
      schema: "./src/db/schema.ts",
      out: "./migrations",
      dialect: "postgresql",
    },
  },
  security: {
    cookies: {
      authExpiration: 60 * 60 * 24 * 7,
    },
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET!,
      expiresIn: "2 days",
      algorithm: "HS512",
    },
    password: {
      saltlen: parseInt(process.env.PASSWORD_SALTLEN!, 10),
      keylen: parseInt(process.env.PASSWORD_KEYLEN!, 10),
      iterations: parseInt(process.env.PASSWORD_ITERATIONS!, 10),
      digest: process.env.PASSWORD_DIGEST,
      pepper: process.env.PASSWORD_PEPPER,
    },
    stripe: {
      privateKey: process.env.STRIPE_SECRET_KEY,
      publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  api: {
    baseApiURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  },
})

export default appConfig
