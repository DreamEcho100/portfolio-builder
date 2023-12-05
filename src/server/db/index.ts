// import { Client } from "@planetscale/database";
// import { drizzle } from "drizzle-orm/planetscale-serverless";

import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { env } from "../../env.js";

export * as dbSchema from "./schema";
import * as dbSchema from "./schema";
import postgres from "postgres";

// // for migrations
// const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
export const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema: dbSchema });

// export const db = drizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema: dbSchema },
// );
