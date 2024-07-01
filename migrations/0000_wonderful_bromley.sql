CREATE TABLE IF NOT EXISTS "Chat" (
	"id" integer PRIMARY KEY NOT NULL,
	"senderId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Company" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Employee" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"companyId" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Freelance" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"saved_jobs" json[],
	"resume" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FreelanceSkills" (
	"id" integer PRIMARY KEY NOT NULL,
	"skillsId" integer NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Jobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"companyId" integer NOT NULL,
	"name" text,
	"description" text NOT NULL,
	"keyword" json[] NOT NULL,
	"price" integer NOT NULL,
	"missionDuration" date NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Skills" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderId_Users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_receiverId_Users_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_Company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Freelance" ADD CONSTRAINT "Freelance_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FreelanceSkills" ADD CONSTRAINT "FreelanceSkills_skillsId_Skills_id_fk" FOREIGN KEY ("skillsId") REFERENCES "public"."Skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FreelanceSkills" ADD CONSTRAINT "FreelanceSkills_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_companyId_Company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Skills" ADD CONSTRAINT "Skills_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
