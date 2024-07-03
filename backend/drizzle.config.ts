import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    dialect: "postgresql",
    schema: "./db/schema/index.ts",
    out: "./db/migrations",
    dbCredentials: {
        url: process.env.PG_CONNECTION_STRING!,
    },
} satisfies Config;