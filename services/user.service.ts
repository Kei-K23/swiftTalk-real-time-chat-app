import { db } from "@/db";
import { users } from "@/db/schema";

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
