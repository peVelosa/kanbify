import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BaseSyntheticEvent } from "react";
import { TEditBoardSchema } from "@/app/actions/edit-board/type";

type EditFormProps = {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  form: UseFormReturn<TEditBoardSchema, any, TEditBoardSchema>;
};

const EditForm = ({ onSubmit, form }: EditFormProps) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@email.com" {...field} />
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
    </>
  );
};

export default EditForm;
