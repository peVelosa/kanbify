import Link from "next/link";
import AcceptInvite from "../_components/accept-invite";
import { Invite } from "./page";
import { Button } from "@/components/ui/button";

type InviteViewProps = {
  invite: Invite;
};

const InviteView = ({ invite }: InviteViewProps) => {
  return (
    <>
      <div className="mx-auto w-fit space-y-8 text-center">
        {!invite ? (
          <>
            <h1 className="text-xl">Invalid invite</h1>
            <Button asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          </>
        ) : (
          <>
            <h1>
              You are been invited to join <span className="font-bold">{invite.board_title}</span>
            </h1>
            <AcceptInvite bid={invite.board_id} />
          </>
        )}
      </div>
    </>
  );
};

export default InviteView;
