import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { DefaultResponse } from "@/types/responses";
import { Board } from "@/types/board";

type Params = { params: { uid: string } };

type Response = DefaultResponse<{ boardsOwned: Board[]; boardsCollaborated: Board[] }>;

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

    return NextResponse.json<Response>({
      success: true,
      data: {
        boardsOwned,
        boardsCollaborated: boardsCollaborated.map(({ board }) => board),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<Response>(
      {
        success: false,
        message: "Error fetching boards",
      },
      { status: 404 },
    );
  }
}

export type Data = Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;
