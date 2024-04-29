import { db } from "@/server/db";
import { Invite } from "@/types/invite";
import { DefaultResponse } from "@/types/responses";
import { NextResponse } from "next/server";

type Params = { params: { bid: string } };
type Response = DefaultResponse<Invite | null>;

export async function POST(
  request: Request,
  { params: { bid } }: Params,
): Promise<NextResponse<Response>> {
  const { title } = await request.json();

  try {
    const hasInvite = await db.invite.findFirst({
      where: {
        board_id: bid,
      },
    });

    if (hasInvite) {
      await db.invite.delete({
        where: {
          board_id: bid,
        },
      });
    }

    const invite = await db.invite.create({
      data: {
        board_id: bid,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
        board_title: title,
      },
    });

    return NextResponse.json({ success: true, data: invite });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}

export type Data = Awaited<ReturnType<typeof POST>> extends NextResponse<infer T> ? T : never;
