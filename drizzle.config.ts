import { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db",
  driver: "mysql2",
  strict: true,
  verbose: true,
  dbCredentials: {
    host: "localhost",
    user: "kei",
    password: "mypassword",
    database: "real_time_chat_app",
  },
} satisfies Config;
