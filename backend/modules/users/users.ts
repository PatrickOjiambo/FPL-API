import { z } from "zod";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import db from "../../db";
import bcrypt from "bcrypt";
const dataSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string()
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
type dSchema = z.infer<typeof dataSchema>;
type lSchema = z.infer<typeof loginSchema>;
class User {
    constructor() { }
    async create(signup_data: dSchema) {
        const [email, password, name] = [signup_data.email, signup_data.password, signup_data.username];
        //Check if the email exists
        const isUserAlreadyRegistered = await db.transaction(async (txn) => {
            return await txn.query.users.findFirst({
                where: (fields, { eq }) => eq(fields.email, email)
            })
        })
        if (isUserAlreadyRegistered) {
            throw new Error("User already exists");
        }
        const hashed_password = bcrypt.hashSync(password, 10)
        //Create the user
        const user = await db.transaction(async (txn) => {
            return await txn.insert(users).values({
                username: name,
                password: hashed_password,
                email: email
            }).returning({ user_id: users.user_id })
        })
        return user;
    }
    async login(login_data: lSchema) {
        const [email, password] = [login_data.email, login_data.password];
        const user = await db.transaction(async (txn) => {
            return await txn.query.users.findFirst({
                where: (fields, { eq }) => eq(fields.email, email)
            })
        })
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }
        return user.user_id;
    }
}

const user = new User();
export default user;