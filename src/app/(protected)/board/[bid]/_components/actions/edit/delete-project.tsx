import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams } from "next/navigation";
import useDeleteBoard from "@/hooks/mutations/use-delete-board";
import { DeleteBoardSchema } from "@/actions/delete-board/schema";

const DeleteProject = () => {
  const params = useParams() as { bid: string };
  const { data: user } = useCurrentUser();
  const { mutate } = useDeleteBoard({ bid: params.bid });

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const [confirmDeletion, setConfirmDeletion] = useState<string>("");

  const handleDelete = () => {
    const validatedFields = DeleteBoardSchema.safeParse({
      deleteProject: confirmDeletion,
    });
    if (!validatedFields.success) return;
    mutate({ bid: params.bid, user_id: user?.id! });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="font-bold">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              board and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="board-title" className="font-normal">
              type <span className="font-bold">delete my project</span> to
              enable the delete button
            </Label>
            <Input
              id="board-title"
              name="board-title"
              onChange={(e) => setConfirmDeletion(e.target.value)}
              value={confirmDeletion}
            />
          </div>
          <DialogFooter>
            <Button variant={"default"} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              // disabled={confirmDeletion !== "delete my project"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProject;
