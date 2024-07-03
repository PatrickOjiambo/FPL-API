CREATE TABLE IF NOT EXISTS "fixtures" (
	"id" serial PRIMARY KEY NOT NULL,
	"fixture_id" integer NOT NULL,
	"team_h" integer NOT NULL,
	"team_a" integer NOT NULL,
	"event" integer NOT NULL,
	"finished" integer NOT NULL,
	CONSTRAINT "fixtures_fixture_id_unique" UNIQUE("fixture_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameweek" (
	"id" serial PRIMARY KEY NOT NULL,
	"gameweek_id" integer NOT NULL,
	CONSTRAINT "gameweek_gameweek_id_unique" UNIQUE("gameweek_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_points_per_gameweek" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" integer NOT NULL,
	"gameweek_id" integer NOT NULL,
	"points" integer NOT NULL,
	"minutes_played" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"player_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"total_points" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"team_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_team_h_teams_id_fk" FOREIGN KEY ("team_h") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_team_a_teams_id_fk" FOREIGN KEY ("team_a") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_event_gameweek_id_fk" FOREIGN KEY ("event") REFERENCES "public"."gameweek"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_points_per_gameweek" ADD CONSTRAINT "player_points_per_gameweek_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_points_per_gameweek" ADD CONSTRAINT "player_points_per_gameweek_gameweek_id_gameweek_id_fk" FOREIGN KEY ("gameweek_id") REFERENCES "public"."gameweek"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
