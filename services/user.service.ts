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

export async function getUserByEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user.length) throw new Error("Could not find user! invalid email");

    const authUser = await argon2.verify(user[0].password as string, password);

    if (!authUser) throw new Error("Invalid password!");

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
