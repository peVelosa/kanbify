"use client";

import PasswordInput from "@/app/(pages)/auth/_components/form/password-input";
import FormError from "@/app/(pages)/auth/_components/form/form-error";
import FormSuccess from "@/app/(pages)/auth/_components/form/form-success";
import FormWarning from "@/app/(pages)/auth/_components/form/form-warning";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Requirements from "../_components/form/requirements";
import type { TRegisterSchema, TPasswordRequirements } from "@/server/api/routers/auth/schemas";
import type { UseFormReturn } from "react-hook-form";
import type { RouterOutput } from "@/types/trpc";

type RegisterPageViewProps = {
  onSubmit: (values: TRegisterSchema) => void;
  requirements: TPasswordRequirements;
  form: UseFormReturn<TRegisterSchema, any, undefined>;
  message: RouterOutput["auth"]["register"] | null;
};

export default function RegisterPageView({
  form,
  message,
  onSubmit,
  requirements,
}: RegisterPageViewProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isSubmitted && !form.formState.isSubmitSuccessful && (
          <Requirements {...requirements} />
        )}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError error={message?.error} />
        <FormWarning warning={message?.warning} />
        <FormSuccess success={message?.success} />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
