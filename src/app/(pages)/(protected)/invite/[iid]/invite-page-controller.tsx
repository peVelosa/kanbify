"use server";

import { db } from "@/server/db";
import InvitePageView from "./invite-page-view";

export type Invite = Awaited<ReturnType<typeof fetchInvite>>;

const fetchInvite = async (iid: string) => {
  return await db.invite.findFirst({
    where: {
      id: iid,
    },
    select: {
      board_id: true,
      board_title: true,
    },
  });
};

const InvitePageController = async ({ iid }: { iid: string }) => {
  const invite = await fetchInvite(iid);

  return (
    <>
      <InvitePageView invite={invite} />
    </>
  );
};

export default InvitePageController;
