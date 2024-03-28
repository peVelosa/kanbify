import { generateInvite } from "@/actions/invite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoard } from "@/hooks/use-board";
import { useState } from "react";

const InviteLink = () => {
  const { data: board } = useBoard();
  const [link, setLink] = useState<string>("");

  const generateLink = async () => {
    const inviteLink = await generateInvite({
      bid: board?.id,
      title: board?.title!,
    });
    setLink(`${window.location.origin}/invite/${inviteLink}`);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="invite">Invite</Label>
        <Input id="invite" name="invite" defaultValue={link} />
        <span className="block text-xs font-semibold text-red-500">
          Anyone with this link can access you board
        </span>
        <Button onClick={generateLink}>Generate Link</Button>
      </div>
    </>
  );
};

export default InviteLink;
