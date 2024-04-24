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
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteProjectForm from "./delete-project";
import AllowTo from "../../board/allow-to";
import { z } from "zod";
import { TEditBoardSchema } from "@/schemas";
import { useParams } from "next/navigation";

export const EditBoardSchema = z.object({
  title: z.string().min(3).trim(),
  description: z.string().optional().default(""),
});

type EditFormProps = {
  onClick: () => void;
};

const EditForm = ({ onClick }: EditFormProps) => {
  const params = useParams() as { bid: string };

  const { data: board } = useBoard();
  const { data: user } = useCurrentUser();
  const { mutate } = useUpdateBoard({ bid: board!.id });

  const form = useForm<TEditBoardSchema>({
    resolver: zodResolver(EditBoardSchema),
    defaultValues: {
      title: board?.title,
      description: board?.description ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: TEditBoardSchema) => {
    onClick();

    mutate({
      bid: params.bid,
      description: values.description,
      title: values.title,
      uid: user?.id!,
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
