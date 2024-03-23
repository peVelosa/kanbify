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
import { TEditBoardSchema } from "@/actions/edit-board/type";
import { EditBoardSchema } from "@/app/actions/edit-board/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBoard } from "@/hooks/use-board";
import { useCurrentUser } from "@/hooks/use-current-user";
import EditForm from "./edit-form";
import useEditForm from "@/hooks/mutations/use-edit-form";

const EditButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: board } = useBoard();
  const { data: user } = useCurrentUser();
  const { mutate } = useEditForm({ bid: board!.id });

  const form = useForm<TEditBoardSchema>({
    resolver: zodResolver(EditBoardSchema),
    defaultValues: {
      title: board?.title,
      description: board?.description ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: TEditBoardSchema) => {
    handleClose();
    mutate({
      bid: board?.id,
      description: values.description,
      title: values.title,
      user_id: user?.id,
      titleChanged: values.title !== board?.title,
    });
  });

  const handleClose = () => setIsOpen(false);

  const [title, description] = [
    form.getValues("title"),
    form.getValues("description"),
  ];

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
          <EditForm form={form} onSubmit={onSubmit} />
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={
                title === board?.title && description === board?.description
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
