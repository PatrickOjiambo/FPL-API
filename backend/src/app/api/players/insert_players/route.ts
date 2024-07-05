import { NextResponse } from "next/server";
import { createPlayer } from "../../../../../types/player";
import player from "../../../../../modules/players/players";
export async function post(request: Request) {
    const data: createPlayer[] = await request.json();
    try {
        player.createPlayer(data);
        return NextResponse.json({ message: "Players inserted successfully" }, { status: 200 });
    }
    catch (e) {
        console.log("something went wrong", e);
        return NextResponse.json({ error: e instanceof Error ? e.message : "An error occurred" }, { status: 500 });
    }

}