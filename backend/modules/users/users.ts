import { z } from "zod";
import { users  } from "../../db/schema";
import { eq } from "drizzle-orm";
import db from "../../db";
import bcrypt from "bcrypt";
const dataSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string()
});
type dSchema = z.infer<typeof dataSchema>;
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
            })
        })
    }
}

const user = new User();
export default user;