import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllMessagesByRoomId(roomId: number) {
  try {
    const messagesData = await db
      .select()
      .from(messages)
      .where(eq(messages.roomId, roomId));
    if (!messagesData.length) return false;
    return messagesData;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
