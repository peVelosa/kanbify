import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditForm from "./edit-form";
import { TEditBoardSchema } from "@/actions/edit-board/type";
import { EditBoardSchema } from "@/app/actions/edit-board/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBoard } from "@/hooks/use-board";
import { editBoard } from "@/app/actions/edit-board";
import { useCurrentUser } from "@/hooks/use-current-user";

const EditButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: board } = useBoard();
  const { data: user } = useCurrentUser();

  const form = useForm<TEditBoardSchema>({
    resolver: zodResolver(EditBoardSchema),
    defaultValues: {
      title: board?.title,
      description: board?.description ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: TEditBoardSchema) => {
    if (values.title === board?.title) return;

    const response = await editBoard({
      title: values.title,
      description: values.description,
      bid: board?.id,
      user_id: user?.id,
    });
  });

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="flex w-full gap-4">
            Edit <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Board</DialogTitle>
          <EditForm onSubmit={onSubmit} form={form} />
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
