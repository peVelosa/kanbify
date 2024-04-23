import { getRole } from "@/app/actions/get-role";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { params: { bid: string } };

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
