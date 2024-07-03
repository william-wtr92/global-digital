ALTER TABLE "Company" ADD COLUMN "area_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Company" ADD CONSTRAINT "Company_area_id_Area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."Area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Company" DROP COLUMN IF EXISTS "name";