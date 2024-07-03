import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import { area, type InsertArea, type InsertUser, users } from "./schema"
import { hashPassword } from "../utils/hashPassword"
import appConfig from "@/config/appConfig"

const {
  db: { host, user, password, port, name },
} = appConfig

const usersSeed = async () => {
  const client = new Pool({
    host,
    user,
    password,
    port,
    database: name,
  })

  const db = drizzle(client)

  const [passwordHash, passwordSalt] = await hashPassword("Password123@")

  const usersData: InsertUser[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      passwordHash,
      passwordSalt,
      phoneNumber: "0606060606",
      avatarUrl: "https://www.google.com",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.delete(users).where(eq(users.email, "test@gmail.com"))
  await db.insert(users).values(usersData)
}

const areaSeed = async () => {
  const client = new Pool({
    host,
    user,
    password,
    port,
    database: name,
  })

  const db = drizzle(client)

  const areaSeeds: InsertArea[] = [
    { value: "IT" },
    { value: "Marketing" },
    { value: "Finance" },
    { value: "Human Resources" },
  ]

  await db.insert(area).values(areaSeeds)
}

;(async () => {
  try {
    await usersSeed()
    await areaSeed()
    // eslint-disable-next-line no-console
    console.info("Seeds ran successfully")
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info("Error with seeds: ", error)
  }
})()
