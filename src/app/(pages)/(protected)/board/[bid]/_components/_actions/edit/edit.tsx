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
import AllowTo from "../../board/allow-to";

const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AllowTo allowTo={["ADMIN", "OWNER"]}>
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
      </AllowTo>
    </>
  );
};

export default Edit;
