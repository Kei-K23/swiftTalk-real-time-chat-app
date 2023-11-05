import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  host: "localhost",
  user: "kei",
  password: "mypassword",
  database: "real_time_chat_app",
});

export const db = drizzle(connection);
