import { db } from "@/db";
import { messages, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function createMessage({
  message,
  roomId,
  userId,
}: {
  message: string;
  roomId: number;
  userId: string;
}) {
  try {
    await db.insert(messages).values({ message, roomId, userId });
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllMessagesByRoomId(roomId: number, limit = 15) {
  try {
    const messagesData = await db
      .select({
        messageId: messages.id,
        message: messages.message,
        userId: users.id,
        userImg: users.image,
        userEmail: users.email,
        userName: users.name,
      })
      .from(messages)
      .where(eq(messages.roomId, roomId))
      .leftJoin(users, eq(users.id, messages.userId))
      .orderBy(desc(messages.createdAt))
      .limit(limit);
    if (!messagesData.length) return false;
    return messagesData;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
