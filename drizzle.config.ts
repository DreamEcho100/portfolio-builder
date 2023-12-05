import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db",
  // out: "./src/server/db",,
  out: "./drizzle",
  driver: "pg",
  // connectionString: env.DATABASE_URL,
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["portfolio_builder_*"],
} satisfies Config;
