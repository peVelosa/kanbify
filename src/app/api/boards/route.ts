import { db } from "@/lib/db";
import { DefaultResponse } from "@/types/responses";
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
    return NextResponse.json<DefaultResponse>({
      success: true,
      message: "Your board has been created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<DefaultResponse>(
      { success: false, message: "An error occurred while creating your board" },
      { status: 404 },
    );
  }
}
