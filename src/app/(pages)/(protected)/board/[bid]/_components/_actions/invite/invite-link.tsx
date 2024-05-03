import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoard } from "@/hooks/use-board";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";

const InviteLink = () => {
  const { data: board } = useBoard();
  const [link, setLink] = useState<string>("");
  const { mutateAsync: generateInvite } = trpc.boards.invite.generate.useMutation();

  const generateInviteLink = async () => {
    const invite = await generateInvite({ bid: board?.id! });
    setLink(`${window.location.origin}/invite/${invite?.id}`);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="invite">Invite</Label>
        <Input
          id="invite"
          name="invite"
          defaultValue={link}
        />
        <span className="block text-xs font-semibold text-red-500">
          Anyone with this link can access you board
        </span>
        <Button onClick={generateInviteLink}>Generate Link</Button>
      </div>
    </>
  );
};

export default InviteLink;
