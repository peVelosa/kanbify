import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { params: { uid: string } };

export async function GET(request: Request, { params }: Params) {
  const { uid: id } = params;

  try {
    const boardsOwned = await db.board.findMany({
      where: {
        owner_id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        _count: {
          select: {
            collaborators: true,
          },
        },
      },
    });

    const boardsCollaborated = await db.collaborator.findMany({
      where: {
        user_id: id,
        AND: {
          board: {
            NOT: {
              owner_id: id,
            },
          },
        },
      },
      select: {
        board: {
          select: {
            id: true,
            title: true,
            description: true,
            _count: {
              select: {
                collaborators: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      boardsOwned,
      boardsCollaborated,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 404 });
  }
}
