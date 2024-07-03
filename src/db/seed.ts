import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import {
  type InsertMission,
  type InsertEmployee,
  type InsertArea,
  type InsertCompany,
  company,
  type InsertUser,
  users,
  area,
  employee,
  mission,
} from "./schema"
import { hashPassword } from "../utils/hashPassword"
import appConfig from "@/config/appConfig"

const {
  db: { host, user, password, port, name },
} = appConfig

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
    await db.delete(employee)
    await db.delete(mission)
    await db.delete(company)
    await db.delete(area)
    await db.delete(users)

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

    await db.insert(users).values(usersData)

    const areasData: InsertArea[] = [
      {
        value: "Paris",
      },
    ]

    await db.insert(area).values(areasData)

    const selectArea = await db
      .select()
      .from(area)
      .where(eq(area.value, "Paris"))

    const companiesData: InsertCompany[] = [
      {
        businessName: "Test Company",
        logo: "https://www.google.com",
        kbisUrl: "https://www.google.com",
        headQuarter: "Paris",
        description: "This is a test company",
        areaId: selectArea[0].id,
      },
    ]

    await db.insert(company).values(companiesData)

    const selectCompany = await db
      .select()
      .from(company)
      .where(eq(company.businessName, "Test Company"))

    const missionsData: InsertMission[] = [
      {
        companyId: selectCompany[0].id,
        status: "pending",
        title: "Test Mission",
        description: "This is a test mission",
        operating: "remote",
        localisation: "Paris",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    ]

    await db.insert(mission).values(missionsData)

    const selectUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "test@gmail.com"))

    const employeesData: InsertEmployee[] = [
      {
        userId: selectUser[0].id,
        companyId: selectCompany[0].id,
      },
    ]

    await db.insert(employee).values(employeesData)

    // eslint-disable-next-line no-console
    console.info("Seeds ran successfully")
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info("Error with seeds: ", error)
  }
})()
