import { NextResponse } from "next/server";
import { z } from "zod";
import user from "../../../../modules/users/users";
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
export async function POST(request: Request) {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({
            error: parsed.error
        }, {
            status: 400
        })
    }
    const data = parsed.data
    try {
        const response = await user.login({
            email: data.email,
            password: data.password
        });
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