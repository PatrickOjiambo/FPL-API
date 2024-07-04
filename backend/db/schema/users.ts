import { pgTable, integer, text, AnyPgColumn, serial, unique, primaryKey } from "drizzle-orm/pg-core";
import { players } from "./fpl";
export const users = pgTable('users', {
    user_id: serial("user_id").notNull().primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    total_points: integer("points").notNull(),
    team_name: text("team_name").notNull(),
}
)
export const user_teams = pgTable('user_teams', {
    team_id: serial("team_id").notNull().primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.user_id),
})
export const team_players = pgTable('team_players', {
    id: serial("id").notNull().primaryKey(),
    team_id: integer("team_id").notNull().references(() => user_teams.team_id),
    player_id: integer("player_id").notNull().references(() => players.id),
})