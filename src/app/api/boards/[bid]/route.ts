import { getRole } from "@/app/actions/get-role";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { params: { bid: string } };

export async function PUT(request: Request, { params: { bid } }: Params) {
  const { uid: user_id, title, titleChanged, description } = await request.json();

  if (!bid || !user_id) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (!title) return NextResponse.json({ error: "Title can't be empty" });

  if (title.length < 3)
    return NextResponse.json({ error: "Title must be at least 3 characters long" });

  try {
    const boardsTitle = await db.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        boards: {
          select: {
            title: true,
          },
        },
      },
    });

    const titleExists = boardsTitle?.boards.some((board) => board.title === title);
    if (titleExists && titleChanged)
      return NextResponse.json({ error: "Title already exists. Please choose another title." });

    const isAllowed = await getRole({
      bid,
      user_id,
      desiredRole: ["OWNER", "ADMIN"],
    });

    if (!isAllowed)
      return NextResponse.json({ error: "You don't have permission to edit this board" });

    await db.board.update({
      where: {
        id: bid,
        AND: {
          collaborators: {
            some: {
              user_id,
              AND: {
                role: "OWNER" || "ADMIN",
                board_id: bid,
              },
            },
          },
        },
      },
      data: {
        title: title.trim(),
        description: description.trim(),
      },
    });
    return NextResponse.json({ success: { description: "Board edited" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error editing board" });
  }
}

export async function DELETE(request: Request, { params: { bid } }: Params) {
  const { uid } = await request.json();

  try {
    const isAllowed = await getRole({ bid, user_id: uid, desiredRole: ["OWNER"] });

    if (!isAllowed) return { error: "You don't have permission to delete this board" };

    await db.board.delete({
      where: {
        id: bid,
      },
    });
    return NextResponse.json({ success: "Board Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting board" }, { status: 404 });
  }
}
