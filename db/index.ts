import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const connection = await createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
});

export const db = drizzle(connection);
