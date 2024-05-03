import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUpdateBoard from "@/hooks/mutations/use-update-board";
import { useBoard } from "@/hooks/use-board";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteProjectForm from "./delete-project";
import AllowTo from "../../board/allow-to";
import { useParams } from "next/navigation";
import {
  BoardSchemaCreateOrUpdate,
  type TBoardSchemaCreateOrUpdate,
} from "@/server/api/routers/board/schemas/board.schemas";

type EditFormProps = {
  onClick: () => void;
};

const EditForm = ({ onClick }: EditFormProps) => {
  const params = useParams() as { bid: string };

  const { data: board } = useBoard();
  const { mutate } = useUpdateBoard({ bid: params.bid });

  const form = useForm<TBoardSchemaCreateOrUpdate>({
    resolver: zodResolver(BoardSchemaCreateOrUpdate),
    defaultValues: {
      title: board?.title,
      description: board?.description ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: TBoardSchemaCreateOrUpdate) => {
    onClick();

    mutate({
      bid: params.bid,
      description: values.description,
      title: values.title,
    });
  });

  const [title, description] = [form.getValues("title"), form.getValues("description")];

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of your project"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <AllowTo allowTo={["OWNER"]}>
        <DeleteProjectForm />
      </AllowTo>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant={"outline"}
          onClick={onClick}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            (title === board?.title && description === board?.description)
          }
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EditForm;
