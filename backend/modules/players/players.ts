import db from "../../db";
import { players } from "../../db/schema";
import { Player, createPlayer } from "../../types/player";
import { eq } from "drizzle-orm";
class Players {
    constructor() { }
    async getAllPlayers() {
        try {
            const all_players: Player[] = await db.transaction(async (txn) => {
                return await txn.select().from(players)
            })
            return all_players;
        }
        catch (e) {
            console.log("something went wrong", e);
            throw new Error("An error occurred")
        }

    }
    async createPlayer(players_list: createPlayer[]) {
        try {
            for (let player of players_list) {
                const team_id = await db.transaction(async (txn) => {
                    return await txn.query.teams.findFirst({
                        where: (fields, { eq }) => eq(fields.name, player.team_name)
                    })
                })
                if (!team_id) {
                    throw new Error("Team not found")
                }
                //Insert player
                const player_id = await db.transaction(async (txn) => {
                    return await txn.insert(players).values({
                        name: player.name,
                        team_id: team_id.team_id,
                        player_id: player.player_id,
                        player_position: player.player_position,
                        player_cost: player.player_cost,
                        total_points: 0
                    }).returning({ player_id: players.player_id })

                })
            }


        }
        catch (e) {
            console.log("something went wrong", e);
            throw new Error("An error occurred")
        }
    }
}