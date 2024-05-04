import { Button } from "@/components/ui/button";
import AllowTo from "../../board/allow-to";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import InviteLink from "./invite-link";

const Invite = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AllowTo allowTo={["ADMIN", "OWNER"]}>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DialogTrigger asChild>
            <Button
              className="flex w-full gap-4"
              variant={"outline"}
            >
              Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite some to collaborator</DialogTitle>
            </DialogHeader>
            <InviteLink />
          </DialogContent>
        </Dialog>
      </AllowTo>
    </>
  );
};

export default Invite;
