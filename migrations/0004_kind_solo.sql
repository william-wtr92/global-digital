CREATE TABLE IF NOT EXISTS "Candidate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mission_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Mission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"status" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"operating" text NOT NULL,
	"localisation" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "password_hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "password_salt" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_mission_id_Mission_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."Mission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Mission" ADD CONSTRAINT "Mission_company_id_Company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "password";