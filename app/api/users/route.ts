import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { createUser } from "@/services/user.service";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    const hashPassword = await argon2.hash(password);
    await createUser({
      email,
      name: username,
      password: hashPassword,
    });

    return new NextResponse(
      JSON.stringify({ message: "Successfully register", status: 201 }),
      { status: 201 }
    );
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e.message, status: 500 }), {
      status: 500,
    });
  }
}
