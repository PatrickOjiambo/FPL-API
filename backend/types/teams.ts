import { z } from "zod"
interface Player {
    id: number,
    player_id: number,
    team_id: number,
    player_position: string,
    player_cost: number,
    player_name: string,
}
export interface createTeam {
    user_id: number,
    team_name: string,
    players: Player[]
}