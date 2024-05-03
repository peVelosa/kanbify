"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

type AcceptInviteProps = {
  bid: string;
  iid: string;
};

const AcceptInvite = ({ bid, iid }: AcceptInviteProps) => {
  const { mutateAsync: acceptInvite } = trpc.boards.invite.accept.useMutation();

  const [message, setMessage] = useState("");

  const handleAccept = async () => {
    const { message } = await acceptInvite({
      bid,
      iid,
    });

    setMessage(message);
  };

  return (
    <>
      <Button onClick={handleAccept}>Accept Invite</Button>
      <p>{message}</p>
    </>
  );
};

export default AcceptInvite;
