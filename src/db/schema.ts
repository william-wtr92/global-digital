import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

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

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertFreelance = typeof freelance.$inferInsert
export type SelectFreelance = typeof freelance.$inferSelect

export type InsertEmployee = typeof employee.$inferInsert
export type SelectEmployee = typeof employee.$inferSelect
