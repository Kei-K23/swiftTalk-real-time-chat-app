import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  foreignKey,
  AnyMySqlColumn,
  text,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").default("null"),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }).default("img"),
});

export const friends = mysqlTable(
  "friends",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    friendId: varchar("friendId", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      cpk: primaryKey(table.userId, table.friendId),
    };
  }
);

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const rooms = mysqlTable(
  "rooms",
  {
    id: int("id").primaryKey().notNull().autoincrement(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    ownerId: varchar("ownerId", { length: 255 }),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.ownerId],
        foreignColumns: [users.id],
      }),
    };
  }
);

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().notNull().autoincrement(),
  message: varchar("message", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).references(
    (): AnyMySqlColumn => users.id
  ),
  roomId: int("roomId").references((): AnyMySqlColumn => rooms.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
});
