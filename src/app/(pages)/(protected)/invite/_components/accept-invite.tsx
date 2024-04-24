"use client";

import api from "@/app/api/api";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";

type AcceptInviteProps = {
  bid: string;
};

const AcceptInvite = ({ bid }: AcceptInviteProps) => {
  const { data: user } = useCurrentUser();

  const [message, setMessage] = useState<string>("");

  const handleAccept = async () => {
    const { success, message } = await api.acceptInvite(bid, user?.id!);

    if (!success) {
      setMessage(message!);
      return;
    }
    if (success) {
      setMessage(message!);
      return;
    }
  };

  return (
    <>
      <Button onClick={handleAccept}>Accept Invite</Button>
      <p>{message}</p>
    </>
  );
};

export default AcceptInvite;
