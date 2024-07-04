import { z } from "zod"
import user from "../../../../modules/users/users";
import { NextResponse } from "next/server";
const passwordschema = z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number");
const dataSchema = z.object({
    email: z.string().email(),
    password: passwordschema,
    username: z.string()
});
export async function POST(request: Request) {
    const body = await request.json();
    const parsed = dataSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({
            error: parsed.error
        }, {
            status: 400
        })

    }
    const data = parsed.data
    try {
        const response = await user.create({
            email: data.email,
            password: data.password,
            username: data.username
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