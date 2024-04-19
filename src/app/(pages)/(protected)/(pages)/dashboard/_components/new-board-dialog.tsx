import { TCreateBoardSchema } from "@/actions/create-board/type";
import { CreateBoardSchema } from "@/actions/create-board/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useNewBoard from "@/hooks/mutations/use-new-board";

export default function NewBoardDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TCreateBoardSchema>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    reValidateMode: "onSubmit",
  });

  const { mutate } = useNewBoard();

  const onSubmit = async (data: TCreateBoardSchema) => {
    setIsOpen(false);
    mutate(data);
  };

  const resetForm = () => form.reset();

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
          resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="bg-emerald-600 font-semibold tracking-wider hover:bg-emerald-500"
            size={"sm"}
          >
            Create new board
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="mb-4 text-2xl font-semibold">Create new board</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your board name..." {...field} />
                    </FormControl>
                    <FormDescription>This is your board name.</FormDescription>
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
              <Button
                type="submit"
                className="ml-auto block"
                disabled={form.formState.isSubmitting}
              >
                Create
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
