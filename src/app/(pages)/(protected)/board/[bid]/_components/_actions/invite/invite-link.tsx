import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoard } from "@/hooks/use-board";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";

const DEFAULT_LINK = window.location.origin + "/invite";

const InviteLink = () => {
  const { data: board } = useBoard();
  const { data: invite, isLoading } = trpc.boards.invite.find.useQuery(
    {
      bid: board?.id,
    },
    {
      enabled: !!board?.id,
    },
  );
  const { mutateAsync: generateInvite, isPending } = trpc.boards.invite.generate.useMutation();
  const [link, setLink] = useState<string>("");

  const generateInviteLink = async () => {
    const invite = await generateInvite({ bid: board?.id! });
    setLink(`${DEFAULT_LINK}/${invite?.id}`);
  };

  useEffect(() => {
    if (!invite?.id) return;
    setLink(`${DEFAULT_LINK}/${invite?.id}`);
  }, [invite?.id]);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="invite">Invite</Label>
        <Input
          id="invite"
          name="invite"
          defaultValue={link}
          readOnly
          placeholder={"Generate a link to invite others"}
        />
        <span className="block text-xs font-semibold text-red-500">
          Anyone with this link can access you board.This invite will last for 3 hours.
        </span>
        <Button
          onClick={generateInviteLink}
          disabled={isLoading || isPending}
        >
          Generate Link
        </Button>
      </div>
    </>
  );
};

export default InviteLink;
