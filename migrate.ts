// import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
// import postgres from "postgres";
import { env } from "./src/env.js";
// // import { queryClient } from ".";

import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { env } from "process";

// console.log("queryClient");
// const queryClient = postgres(env.DATABASE_URL);

// // async function handleMigration() {
// // for migrations
// console.log("migrationClient");
// const migrationClient = postgres(env.DATABASE_URL, {
//   max: 1,
//   ssl: { rejectUnauthorized: false },
// });
// console.log("migrate");
// await migrate(drizzle(migrationClient), {
//   migrationsFolder: "./src/server/db",
// });

// // Don't forget to close the connection, otherwise the script will hang
// console.log("queryClient.end()");
// await queryClient.end();
// // }

// process.exit(1);

// await handleMigration();

const client = postgres(env.DATABASE_URL, {
  // ssl: { rejectUnauthorized: false },
  max: 1,
});

async function postgresMigrate() {
  try {
    const db: PostgresJsDatabase = drizzle(client);

    // Migrate
    console.log("Migrating...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Done!");
  } catch (error) {
    console.log("%cError", "color: red; font-weight: bold;");
    console.error(error);
  } finally {
    process.exit(0);
  }
}

await postgresMigrate();
