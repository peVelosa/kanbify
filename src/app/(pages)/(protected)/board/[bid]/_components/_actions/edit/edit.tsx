import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditForm from "./edit-form";

const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button className="flex w-full gap-4">
            Edit <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
          </DialogHeader>
          <EditForm onClick={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Edit;
