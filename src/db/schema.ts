import {
  boolean,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const users = pgTable("Users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  phoneNumber: text("phone_number").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const area = pgTable("Area", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  value: text("value").notNull(),
})

export const role = pgTable("Role", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  value: text("value").notNull(),
})

export const freelance = pgTable("Freelance", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  jobTitle: text("saved_jobs").notNull(),
  businessName: text("business_name").notNull(),
  areaId: uuid("area_id")
    .references(() => area.id)
    .notNull(),
  localisation: text("localisation").notNull(),
  registrationNumber: text("registration_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const employee = pgTable("Employee", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  companyId: uuid("company_id")
    .references(() => company.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const employeeRole = pgTable("Employee_role", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  employeeId: uuid("employee_id")
    .references(() => employee.id)
    .notNull(),
  roleId: uuid("role_id")
    .references(() => role.id)
    .notNull(),
  companyId: uuid("company_id")
    .references(() => company.id)
    .notNull(),
})

export const company = pgTable("Company", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  businessName: text("business_name").notNull(),
  logo: text("logo").notNull(),
  kbisUrl: text("kbis_url").notNull(),
  headQuarter: text("head_quarter").notNull(),
  description: text("description").notNull(),
  areaId: uuid("area_id")
    .references(() => area.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const candidate = pgTable("Candidate", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  missionId: uuid("mission_id")
    .references(() => mission.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const mission = pgTable("Missions", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  companyId: uuid("company_id")
    .references(() => company.id)
    .notNull(),
  status: text("status").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  operating: text("operating").notNull(),
  localisation: text("localisation").notNull(),
  price: real("price").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertFreelance = typeof freelance.$inferInsert
export type SelectFreelance = typeof freelance.$inferSelect

export type InsertEmployee = typeof employee.$inferInsert
export type SelectEmployee = typeof employee.$inferSelect

export type InsertEmployeeRole = typeof employeeRole.$inferInsert
export type SelectEmployeeRole = typeof employeeRole.$inferSelect

export type InsertRole = typeof role.$inferInsert
export type SelectRole = typeof role.$inferSelect

export type InsertMission = typeof mission.$inferInsert
export type SelectMission = typeof mission.$inferSelect

export type InsertCandidate = typeof candidate.$inferInsert
export type SelectCandidate = typeof candidate.$inferSelect

export type InsertCompany = typeof company.$inferInsert
export type SelectCompany = typeof company.$inferSelect

export type InsertArea = typeof area.$inferInsert
export type SelectArea = typeof area.$inferSelect
