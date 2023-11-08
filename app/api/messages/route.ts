import {
  createMessage,
  getAllMessagesByRoomId,
} from "@/services/message.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, roomId, userId } = await req.json();
    await createMessage({ message, roomId, userId });

    return new NextResponse(
      JSON.stringify({
        success: true,
        status: 201,
      }),
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e.message, status: 500 }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") as string, 10);
    const messages = await getAllMessagesByRoomId(id);

    if (!messages)
      return new NextResponse(
        JSON.stringify({
          error: `no messages for this chat room with id ${id}`,
          status: 400,
        }),
        {
          status: 400,
        }
      );

    if (messages)
      return new NextResponse(
        JSON.stringify({
          data: messages,
          status: 200,
        }),
        {
          status: 200,
        }
      );
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e.message, status: 500 }), {
      status: 500,
    });
  }
}
