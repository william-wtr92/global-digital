import { faker } from "@faker-js/faker"
import { randomUUID } from "crypto"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import {
  type InsertArea,
  type InsertCompany,
  company,
  type InsertUser,
  users,
  area,
} from "./schema"
import { hashPassword } from "../utils/hashPassword"
import appConfig from "@/config/appConfig"

const {
  db: { host, user, password, port, name },
} = appConfig

const areaId = randomUUID()

const usersSeed = async (db: NodePgDatabase) => {
  const [passwordHash, passwordSalt] = await hashPassword("Password123@")

  const usersData: InsertUser[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      passwordHash,
      passwordSalt,
      phoneNumber: faker.phone.number(),
      avatarUrl: faker.image.url(),
      isVerified: true,
    },
  ]

  await db.insert(users).values(usersData)
}

const areasSeed = async (db: NodePgDatabase) => {
  const usersData: InsertArea[] = [
    {
      id: areaId,
      value: "farmer",
    },
  ]

  await db.insert(area).values(usersData)
}

const companiesSeed = async (db: NodePgDatabase) => {
  const companiesData: InsertCompany[] = [
    {
      businessName: faker.company.name(),
      areaId,
      description: faker.company.catchPhrase(),
      headQuarter: faker.location.streetAddress({ useFullAddress: true }),
      kbisUrl: faker.image.url(),
      logo: faker.image.url(),
    },
  ]

  await db.insert(company).values(companiesData)
}

;(async () => {
  const client = new Pool({
    host,
    user,
    password,
    port,
    database: name,
  })

  const db = drizzle(client)

  try {
    await Promise.all([usersSeed(db), areasSeed(db)])
    await companiesSeed(db)
    // eslint-disable-next-line no-console
    console.info("Seeds ran successfully")
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info("Error with seeds: ", error)
  }
})()
