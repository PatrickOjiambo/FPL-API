import { pgTable, integer, text, AnyPgColumn, serial, unique, doublePrecision } from "drizzle-orm/pg-core";

export const teams = pgTable('teams', {
    id: serial("id").notNull().primaryKey(),
    name: text("name").notNull(),
    short_name: text("short_name").notNull(),
    team_id: integer("team_id").notNull(),
})

export const players = pgTable('players', {
    id: serial("id").notNull().primaryKey(),
    name: text("name").notNull(),
    player_id: integer("player_id").notNull(),
    team_id: integer("team_id").notNull().references(() => teams.id),
    total_points: integer("total_points").notNull(),
    player_position: text("player_position", { enum: ["goalkeeper", "defender", "midefielder", "forward"] }).notNull(),
    player_cost: doublePrecision("player_cost").notNull(),

})

export const gameweek = pgTable('gameweek', {
    id: serial("id").notNull().primaryKey(),
    gameweek_no: integer("gameweek_id").notNull().unique(),
})

export const player_points_per_gameweek = pgTable('player_points_per_gameweek', {
    id: serial("id").notNull().primaryKey(),
    player_id: integer("player_id").notNull().references(() => players.id),
    gameweek_id: integer("gameweek_id").notNull().references(() => gameweek.id),
    points: integer("points").notNull(),
    minutes_played: integer("minutes_played").notNull(),
})

export const fixtures = pgTable('fixtures', {
    id: serial("id").notNull().primaryKey(),
    fixture_id: integer("fixture_id").notNull().unique(),
    team_h: integer("team_h").notNull().references(() => teams.id),
    team_a: integer("team_a").notNull().references(() => teams.id),
    event: integer("event").notNull().references(() => gameweek.id),
    finished: integer("finished").notNull(),

})