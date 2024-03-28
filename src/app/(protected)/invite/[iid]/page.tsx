import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import AcceptInvite from "./_components/accept-invite";

type InvitePageProps = {
  params: {
    iid: string;
  };
};

const InvitePage = async ({ params: { iid } }: InvitePageProps) => {
  const invite = await db.invite.findFirst({
    where: {
      id: iid,
    },
  });

  if (!invite) {
    return (
      <div className="mx-auto w-fit space-y-8 text-center">
        <h1 className="text-xl">Invalid invite</h1>
        <Button asChild>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-fit space-y-8 text-center">
        <h1>
          You are been invited to join{" "}
          <span className="font-bold">{invite.board_title}</span>
        </h1>
        <AcceptInvite bid={invite.board_id} />
      </div>
    </>
  );
};

export default InvitePage;
