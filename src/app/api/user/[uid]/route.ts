import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { params: { uid: string } };

export async function GET(request: Request, { params }: Params) {
  const { uid } = params;
  return NextResponse.json({ error: "something wen wrong" });

  try {
    const user = await db.user.findUnique({
      where: {
        email: uid,
        OR: [
          {
            id: uid,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        emailVerified: true,
        image: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "something wen wrong" });
  }
}
