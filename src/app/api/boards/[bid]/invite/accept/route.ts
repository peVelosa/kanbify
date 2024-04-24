import { db } from "@/lib/db";
import { Invite } from "@/types/invite";
import { DefaultResponse } from "@/types/responses";
import { NextResponse } from "next/server";

type Params = { params: { bid: string } };
type Response = DefaultResponse<Invite | null>;

export async function POST(
  request: Request,
  { params: { bid } }: Params,
): Promise<NextResponse<Response>> {
  const { uid } = await request.json();

  if (!uid) return NextResponse.json({ success: false, message: "Invalid request data" });

  try {
    const alreadyMember = await db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          user_id: uid,
          board_id: bid,
        },
      },
    });

    if (alreadyMember)
      return NextResponse.json({
        success: false,
        message: "You are already a member of this board",
      });

    await db.collaborator.create({
      data: {
        board_id: bid,
        user_id: uid,
        role: "EMPLOYEE",
      },
    });
    return NextResponse.json({
      success: true,
      message: "You have successfully joined the board",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export type Data = Awaited<ReturnType<typeof POST>> extends NextResponse<infer T> ? T : never;
