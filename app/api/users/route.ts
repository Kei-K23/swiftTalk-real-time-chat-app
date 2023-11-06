import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { createUser, getUserByEmailAndPassword } from "@/services/user.service";

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

export async function GET(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email && !password) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing request fields! email and password is required",
          status: 400,
        }),
        {
          status: 400,
        }
      );
    }

    const user = await getUserByEmailAndPassword({ email, password });
    console.log(user);
    return new NextResponse(JSON.stringify({ data: user, status: 200 }), {
      status: 200,
    });
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e.message, status: 500 }), {
      status: 500,
    });
  }
}
