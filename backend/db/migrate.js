const dotenv = require("dotenv");
dotenv.config({
  path: "./.env.local",
});
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const { drizzle } = require("drizzle-orm/postgres-js");

// const run = process.env.RUN;

// if (run !== "init") {
//   console.log("migrations complete");
//   process.exit(0);
// }

console.log("CONNECTION STRING :: ", process.env.PG_CONNECTION_STRING);

const migrationClient = postgres(process.env.PG_CONNECTION_STRING, {
  max: 1,
});

const db = drizzle(migrationClient, {
  logger: {
    logQuery(query, params) {
      console.log("QUERY:", query, params);
    },
  },
});

(async () => {
  await migrate(db, {
    migrationsFolder: "./db/migrations",
  });

  console.log("migrations complete");

  process.exit(0);
})();