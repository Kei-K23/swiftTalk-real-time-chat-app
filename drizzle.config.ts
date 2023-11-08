import { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./db/schema.ts",
  out: "./db/migration",
  driver: "mysql2",
  strict: true,
  verbose: true,
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER_NAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  },
} satisfies Config;
