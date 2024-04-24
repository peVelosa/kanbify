import { getRole } from "@/app/actions/get-role";
import { db } from "@/lib/db";
import { DefaultResponse } from "@/types/responses";
import { NextResponse } from "next/server";
import { BoardData } from "@/types/board";

type Params = { params: { bid: string; uid: string } };
type Response = DefaultResponse<BoardData | null>;

export async function GET(
  request: Request,
  { params: { bid, uid } }: Params,
): Promise<NextResponse<Response>> {
  try {
    const data = await db.board.findUnique({
      where: {
        id: bid,
        AND: [
          {
            collaborators: {
              some: {
                user_id: uid,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        columns: {
          select: {
            id: true,
            title: true,
            _count: {
              select: {
                cards: true,
              },
            },
            order: true,
          },
        },
      },
    });

    // if (!data) return NextResponse.redirect(new URL(`/dashboard`, request.url)).json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}

export type Data = Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;

export async function PUT(
  request: Request,
  { params: { bid, uid } }: Params,
): Promise<NextResponse<DefaultResponse>> {
  const { title, titleChanged, description } = await request.json();

  if (!bid || !uid)
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  if (!title) return NextResponse.json({ success: false, message: "Title can't be empty" });

  if (title.length < 3)
    return NextResponse.json({
      success: false,
      message: "Title must be at least 3 characters long",
    });

  try {
    const boardsTitle = await db.user.findUnique({
      where: {
        id: uid,
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
      return NextResponse.json({
        success: false,
        message: "Title already exists. Please choose another title.",
      });

    const isAllowed = await getRole({
      bid,
      user_id: uid,
      desiredRole: ["OWNER", "ADMIN"],
    });

    if (!isAllowed)
      return NextResponse.json({
        success: false,
        message: "You don't have permission to edit this board",
      });

    await db.board.update({
      where: {
        id: bid,
        AND: {
          collaborators: {
            some: {
              user_id: uid,
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

    return NextResponse.json({ success: true, message: "Board edited" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error editing board" });
  }
}

export async function DELETE(
  request: Request,
  { params: { bid, uid } }: Params,
): Promise<NextResponse<DefaultResponse>> {
  try {
    const isAllowed = await getRole({ bid, user_id: uid, desiredRole: ["OWNER"] });

    if (!isAllowed)
      return NextResponse.json<DefaultResponse>({
        success: false,
        message: "You don't have permission to delete this board",
      });

    await db.board.delete({
      where: {
        id: bid,
      },
    });
    return NextResponse.json<DefaultResponse>({ success: true, message: "Board Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json<DefaultResponse>(
      { success: false, message: "Error deleting board" },
      { status: 404 },
    );
  }
}
