export interface Player {
    name: string;
    id: number;
    team_id: number;
    player_id: number;
    total_points: number;
    player_position: "goalkeeper" | "defender" | "midefielder" | "forward";
    player_cost: number;
}
export interface createPlayer{
    name: string;
    team_name: string;
    player_id: number;
    player_position: "goalkeeper" | "defender" | "midefielder" | "forward";
    player_cost: number;
}