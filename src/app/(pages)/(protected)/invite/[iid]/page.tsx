import { db } from "@/lib/db";
import InviteView from "./invite-view";

type InvitePageProps = {
  params: {
    iid: string;
  };
};

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

const InvitePage = async ({ params: { iid } }: InvitePageProps) => {
  const invite = await fetchInvite(iid);

  return <InviteView invite={invite} />;
};

export default InvitePage;
