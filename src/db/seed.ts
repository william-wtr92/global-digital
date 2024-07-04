import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import appConfig from "@/config/appConfig"
import {
  type InsertFreelance,
  type InsertEmployee,
  type InsertArea,
  type InsertCompany,
  type InsertMission,
  type InsertUser,
  area,
  users,
  company,
  mission,
  employee,
  freelance,
  candidate,
  employeeRole,
  type InsertEmployeeRole,
  type InsertRole,
  role,
} from "@/db/schema"
import { hashPassword } from "@/utils/hashPassword"

const {
  db: { host, user, password, port, name },
} = appConfig

const seed = async () => {
  const client = new Pool({
    host,
    user,
    password,
    port,
    database: name,
  })

  const db = drizzle(client)

  await db.delete(candidate)
  await db.delete(employeeRole)
  await db.delete(freelance)
  await db.delete(employee)
  await db.delete(mission)
  await db.delete(company)
  await db.delete(area)
  await db.delete(users)
  await db.delete(role)

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
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "test1@gmail.com",
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

  const selectFreelanceUser = await db
    .select()
    .from(users)
    .where(eq(users.email, "test@gmail.com"))

  const areasData: InsertArea[] = [
    { value: "IT" },
    { value: "Marketing" },
    { value: "Finance" },
    { value: "Human Resources" },
  ]

  await db.insert(area).values(areasData)

  const selectITArea = await db.select().from(area).where(eq(area.value, "IT"))

  const freelanceData: InsertFreelance[] = [
    {
      userId: selectFreelanceUser[0].id,
      jobTitle: "Software Engineer",
      businessName: "William Business",
      areaId: selectITArea[0].id,
      localisation: "Paris",
      registrationNumber: "123456789",
    },
  ]

  await db.insert(freelance).values(freelanceData)

  const companiesData: InsertCompany[] = [
    {
      businessName: "Test Company",
      logo: "https://www.google.com",
      kbisUrl: "https://www.google.com",
      headQuarter: "Paris",
      description: "This is a test company",
      areaId: selectITArea[0].id,
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

  const selectEmployeeUser = await db
    .select()
    .from(users)
    .where(eq(users.email, "test@gmail.com"))

  const employeesData: InsertEmployee[] = [
    {
      userId: selectEmployeeUser[0].id,
      companyId: selectCompany[0].id,
    },
  ]

  await db.insert(employee).values(employeesData)

  const selectEmployee = await db.select().from(employee)

  const roleDatas: InsertRole[] = [{ value: "owner" }, { value: "manager" }]

  await db.insert(role).values(roleDatas)

  const selectRole = await db.select().from(role)

  const employeesRole: InsertEmployeeRole[] = [
    {
      employeeId: selectEmployee[0].id,
      companyId: selectCompany[0].id,
      roleId: selectRole[0].id,
    },
  ]

  await db.insert(employeeRole).values(employeesRole)
}

;(async () => {
  try {
    await seed()
    // eslint-disable-next-line no-console
    console.info("Seeds ran successfully")
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info("Error with seeds: ", error)
  }
})()
