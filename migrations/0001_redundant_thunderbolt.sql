ALTER TABLE "Mission" RENAME TO "Missions";--> statement-breakpoint
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_mission_id_Mission_id_fk";
--> statement-breakpoint
ALTER TABLE "Missions" DROP CONSTRAINT "Mission_company_id_Company_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_mission_id_Missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."Missions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Missions" ADD CONSTRAINT "Missions_company_id_Company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
