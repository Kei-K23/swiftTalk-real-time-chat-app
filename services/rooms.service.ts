import { db } from "@/db";
import { rooms } from "@/db/schema";

export async function getAllRooms() {
  try {
    const roomsData = await db.select().from(rooms);
    if (!roomsData.length) return false;
    return roomsData;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
