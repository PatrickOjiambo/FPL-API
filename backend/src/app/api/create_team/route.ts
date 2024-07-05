import { NextResponse } from "next/server";
import team from "../../../../modules/teams/teams";
import { createTeam } from "../../../../types/teams";
import { create } from "domain";
export async function POST(request: Request) {
    const data: createTeam = await request.json();
    try {
        const response = await team.create(data);
        return NextResponse.json(response, {
            status: 200
        })
    }
    catch (e) {
        console.log("something went wrong", e);
        return NextResponse.json({
            error: e instanceof Error ? e.message : "An error occurred"
        }, {
            status: 500
        })
    }
}