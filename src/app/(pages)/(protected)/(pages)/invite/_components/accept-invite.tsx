"use client";

import { acceptInvite } from "@/app/actions/accept-invite";
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
    const response = await acceptInvite({ bid, uid: user?.id });

    if (response?.error) {
      setMessage(response.error);
      return;
    }
    if (response?.success) {
      setMessage(response.success);
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
