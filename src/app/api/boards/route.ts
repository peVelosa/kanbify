import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { uid, title, description } = await request.json();

  if (!uid || !title) return { error: "Invalid data" };

  try {
    await db.board.create({
      data: {
        title,
        description,
        owner: {
          connect: {
            id: uid,
          },
        },
        columns: {
          createMany: {
            data: [
              {
                title: "To Do",
                order: 1,
              },
              {
                title: "In Progress",
                order: 2,
              },
              {
                title: "Done",
                order: 3,
              },
            ],
          },
        },
        collaborators: {
          create: {
            user_id: uid,
            role: "OWNER",
          },
        },
      },
    });
    return NextResponse.json({ success: { description: "Board Created" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating board" }, { status: 404 });
  }
}
