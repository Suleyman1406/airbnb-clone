import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const userExistWithEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (userExistWithEmail) {
      return new NextResponse("The user with this email already exists.", {
        status: 500,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error("REGISTER", err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
