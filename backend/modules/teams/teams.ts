import { createTeam } from "../../types/teams";
import { user_teams, team_players } from "../../db/schema";
import db from "../../db";
class Team {
    constructor() { }
    async create(team_details: createTeam) {
        const [user_id, players, team_name] = [team_details.user_id, team_details.players, team_details.team_name];
        try {
            //Run checks
            this.checks(players);
            //Create the team
            const team_id = await db.transaction(async (txn) => {
                return await txn.insert(user_teams).values({
                    user_id: user_id,
                    team_name: team_name
                }).returning({ team_id: user_teams.team_id })
            })
            //Add players to the team - We are using our own generated player id.
            await db.transaction(async (txn) => {
                for (let player of players) {
                    await txn.insert(team_players).values({
                        team_id: team_id[0].team_id,
                        player_id: player.id
                    })
                }
            })
        }
        catch (e) {
            console.log("something went wrong", e);
            throw new Error("An error occurred")
        }



    }
    checks(players: createTeam["players"]) {
        //Max number of players should be 15
        if (players.length > 15) {
            throw new Error("Maximum number of players should be 15")
        }
        //Have a maximum and minimum of 2 goalkeepers
        const goalkeepers = players.filter(player => player.player_position === "goalkeeper");
        if (goalkeepers.length > 2 || goalkeepers.length < 2) {
            throw new Error("You should have 2 goalkeepers")
        }
        //Have a maximum and minimum of 5 defenders
        const defenders = players.filter(player => player.player_position === "defender");
        if (defenders.length > 5 || defenders.length < 5) {
            throw new Error("You should have 5 defenders")
        }
        //Have a maximum and minimum of 5 midfielders
        const midfielders = players.filter(player => player.player_position === "midfielder");
        if (midfielders.length > 5 || midfielders.length < 5) {
            throw new Error("You should have 5 midfielders")
        }
        //Have a maximum and minimum of 3 forwards
        const forwards = players.filter(player => player.player_position === "forward");
        if (forwards.length > 3 || forwards.length < 3) {
            throw new Error("You should have 3 forwards")
        }
    }
}
const team = new Team();
export default team;