import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import argon2 from "argon2";
type UserType = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(payload: UserType) {
  try {
    const user = await db.insert(users).values({
      id: crypto.randomUUID().toString(),
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });
    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      })
      .from(users)
      .where(eq(users.id, id));

    if (!user.length) return false;

    return user[0];
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllUser() {
  try {
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      })
      .from(users);

    if (!user.length) return false;

    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
