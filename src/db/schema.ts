import {
  date,
  integer,
  json,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const users = pgTable("Users", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const freelance = pgTable("Freelance", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  savedJobs: json("saved_jobs").notNull().array(),
  resume: text("resume").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const employee = pgTable("Employee", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  companyId: integer("companyId")
    .references(() => company.id)
    .notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const company = pgTable("Company", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const jobs = pgTable("Jobs", {
  id: integer("id").primaryKey().notNull(),
  companyId: integer("companyId")
    .references(() => company.id)
    .notNull(),
  name: text("name"),
  description: text("description").notNull(),
  keyword: json("keyword").array().notNull(),
  price: integer("price").notNull(),
  missionDuration: date("missionDuration").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const chat = pgTable("Chat", {
  id: integer("id").primaryKey().notNull(),
  senderId: integer("senderId")
    .references(() => users.id)
    .notNull(),
  receiverId: integer("receiverId")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const skills = pgTable("Skills", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
})

export const freelanceSkills = pgTable("FreelanceSkills", {
  id: integer("id").primaryKey().notNull(),
  skillsId: integer("skillsId")
    .references(() => skills.id)
    .notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertFreelance = typeof freelance.$inferInsert
export type SelectFreelance = typeof freelance.$inferSelect

export type InsertEmployee = typeof employee.$inferInsert
export type SelectEmployee = typeof employee.$inferSelect

export type InsertCompany = typeof company.$inferInsert
export type SelectCompany = typeof company.$inferSelect

export type InsertJobs = typeof jobs.$inferInsert
export type SelectJobs = typeof jobs.$inferSelect

export type InsertChat = typeof chat.$inferInsert
export type SelectChat = typeof chat.$inferSelect

export type InsertSkills = typeof skills.$inferInsert
export type SelectSkills = typeof skills.$inferSelect

export type InsertFreelanceSkills = typeof freelanceSkills.$inferInsert
export type SelectFreelanceSkills = typeof freelanceSkills.$inferSelect
